<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="header" />
        <div class="separator mb-5"></div>
        <p class="lead">Welcome back {{ currentUser.first_name.charAt(0).toUpperCase() + currentUser.first_name.slice(1) }} {{ currentUser.last_name.charAt(0).toUpperCase() + currentUser.last_name.slice(1) }}</p>
        <p v-if="currentUser.account_number == null">Please Complete your profile to get started. <router-link
            to="/"
            class="primary"
          > Click Here </router-link>
        </p>
        <p v-else> Please fill out all the details for your loan application</p>
      </b-colxx>
    </b-row>
    <CommodityLoan
      :guarantors="guarantorsList"
      :user="currentUser"
      :requestError='requestError'
    />
  </div>
</template>
<script>
import CommodityLoan from "@/components/payo/CommodityLoanForm";
import { mapGetters, mapActions, mapState } from "vuex";
import ash from "lodash";

export default {
  name: "loan-application",
  components: {
    CommodityLoan
  },
  data() {
    return {
      header: "Commodity Loan Application",
      guarantorsList: [],
      requestError: null
    };
  },

  computed: {
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("loan", ["potentialGuarantors", "processing"]),
    ...mapState("notification", ["notifications"])
  },
  methods: {
    ...mapActions("notification", ["remove"]),
    ...mapActions("loan", ["FetchGuarantors"]),
    removeNotification(notification) {
      console.log(notification);
      this.remove(notification);
    },
    pushToGurantorsList(guarantor) {
      // console.log(guarantor);
      this.guarantorsList.push({
        value: guarantor.id,
        name:
          ash.startCase(guarantor.first_name) +
          " " +
          ash.startCase(guarantor.last_name)
      });
    }
  },
  watch: {
    notifications: {
      handler: function(notifications) {
        for (let i in notifications) {
          if (notifications[i].type == "error") {
            this.$notify("error", "Error Message", notifications[i].message, {
              duration: 3000,
              permanent: false
            });
            this.requestError = true;
            setTimeout(() => this.removeNotification(notifications[i]), 5000);
          } else if (notifications[i].type == "success") {
            this.$notify("success", "Message", notifications[i].message, {
              duration: 3000,
              permanent: false
            });
            this.requestError = false;
            setTimeout(() => this.removeNotification(notifications[i]), 3000);
          }
        }
      }
    },
    potentialGuarantors: {
      handler: function(potentialGuarantors) {
        // let as be root this to enable us get the root methods.
        let as = this;
        potentialGuarantors.forEach(function(guarantor) {
          // statements
          as.pushToGurantorsList(guarantor);
        });
      }
    }
  },
  created() {
    this.FetchGuarantors();
  }
};
</script>
<style lang="css" scoped>
.mt-12 {
  margin-top: 4rem;
}

.mt-8 {
  margin-top: 3rem;
}
</style>
