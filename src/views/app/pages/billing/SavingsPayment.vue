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
              <b-card-body class="align-items-center">
                <b-card-text>
                  <h5 class="mb-0 card-title lead">Monthly Deposits</h5>
                  <p
                    class="mt-4"
                    style="font-size: 20px; max-width: 40rem"
                  >Click the button below if you wish to make your monthly deposit</p>
                </b-card-text>
                <div>
                  <paystack
                    :amount="amount"
                    :email="email"
                    :paystackkey="paystackkey"
                    :callback="callback"
                    :reference="reference"
                    :close="close"
                    :embed="false"
                    style="background: none; border: 0; padding: 0;"
                  >
                    <i class="fas fa-money-bill-alt"></i>
                    <b-button variant="success" size="lg" class="btn-lg">Click</b-button>
                  </paystack>
                </div>
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
import { mapGetters } from "vuex";
import Draggable from "vuedraggable";

export default {
  components: {
    paystack,
    draggable: Draggable
  },
  data() {
    return {
      paystackkey: "pk_test_706a3aea6696fcb3d8cfd4107621aef869a134f4", //paystack public key
      email: "foobar@example.com", // Customer email
      amount: 1000000 // in kobo
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < Math.random() * 100; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    }
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
    }
  },
  methods: {
    callback: function(response) {
      var transaction = JSON.parse(
        localStorage.getItem("Transactions") || "[]"
      );
      transaction.push(
        Object.assign(response, {
          user_id: this.currentUser.id,
          amount: this.amount / 100
        })
      );
      localStorage.setItem("Transactions", JSON.stringify(transaction));
    },
    close: function() {
      // console.log("Payment closed");
    }
  }
};
</script>