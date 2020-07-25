<template>
  <div>
    <h2 class="text-center mt-4">Here are some of our services</h2>
    <b-row>
      <b-colxx lg="12" xl="12">
        <draggable class="col mt-4">
          <b-colxx class="mb-4">
            <b-card>
              <b-card-header class="p-0 position-relative">
                <div class="position-absolute handle card-icon">
                  <i class="simple-icon-shuffle" />
                </div>
              </b-card-header>
              <b-card-body v-if="getUser" class="align-items-center">
                <b-card-text>
                  <h5 class="mb-0 card-title lead">Monthly Deposits</h5>
                  <p
                    class="mt-4"
                    style="font-size: 20px; max-width: 40rem"
                  >Click the button below if you wish to make your monthly deposit</p>
                </b-card-text>
                <div>
                  <paystack
                    :amount="getUser.amount * 100"
                    :email="currentUser.email"
                    :paystackkey="paystackkey"
                    :callback="callback"
                    :reference="reference"
                    :close="close"
                    :embed="false"
                    style="background: none; border: 0; padding: 0;"
                  >
                    <i class="fas fa-money-bill-alt"></i>
                    <b-button variant="success" size="lg" class="btn-lg">Deposit</b-button>
                  </paystack>
                </div>
              </b-card-body>
              <b-card-body v-else>
                <b-card-text>
                  <h5 class="mb-0 card-title lead">Monthly Deposits</h5>
                  <p class="mt-4">
                    You don't have a savings account, Please
                    <router-link
                      to="/app/pages/services/savings-application"
                      style="color: #2a863f;"
                      class="secondary"
                    >click here &nbsp;</router-link>to create your savings account
                  </p>
                </b-card-text>
              </b-card-body>
            </b-card>
          </b-colxx>
        </draggable>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import paystack from "vue-paystack";
import { mapGetters, mapActions, mapState } from "vuex";
import Draggable from "vuedraggable";

export default {
  components: {
    paystack,
    draggable: Draggable,
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("savings", ["getUser"]),
    ...mapState("notification", ["notifications"]),
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < Math.random() * 100; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    },
  },
  data() {
    return {
      requestError: null,
      paystackkey: "pk_test_706a3aea6696fcb3d8cfd4107621aef869a134f4",
      // reference: null, //paystack public key
    };
  },
  watch: {
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < Math.random() * 100; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    },
    notifications: {
      handler: function (notifications) {
        for (let i in notifications) {
          if (notifications[i].type == "error") {
            this.$notify("error", "Error Message", notifications[i].message, {
              duration: 3000,
              permanent: false,
            });
            this.requestError = true;
            setTimeout(() => this.removeNotification(notifications[i]), 5000);
          } else if (notifications[i].type == "success") {
            this.$notify("success", "Message", notifications[i].message, {
              duration: 3000,
              permanent: false,
            });
            this.requestError = false;
            setTimeout(() => this.removeNotification(notifications[i]), 3000);
          }
        }
      },
    },
  },
  methods: {
    ...mapActions("savings", ["getSavings"]),
    ...mapActions("savings", ["createTransaction"]),
    ...mapActions("notification", ["remove"]),
    removeNotification(notification) {
      this.remove(notification);
    },
    callback: function (response) {
      let payload = Object.assign(response, {
        savings_id: this.getUser.id,
        amount: this.getUser.amount,
        payment_date: new Date(Date.now()),
      });
      console.log(payload);
      this.createTransaction(payload);
      // this.reference();
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    close: function () {
      // console.log("Payment closed");
    },
  },
  created() {
    this.getSavings();
  },
};
</script>