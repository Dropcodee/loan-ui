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
    <credit-loan-form
      :processing="processing"
      :user="currentUser"
      :guarantors="guarantorsList"
      :requestError='requestError'
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { required, maxLength, numeric } from "vuelidate/lib/validators";
import CreditLoanForm from "@/components/payo/CreditLoan";
import ash from "lodash";

export default {
  name: "land-application",
  components: { CreditLoanForm },
  data() {
    return {
      header: "Credit Loan Application",
      guarantorsList: [],
      requestError: null
    };
  },
  computed: {
    ...mapGetters("loan", ["processing", "potentialGuarantors"]),
    ...mapGetters("user", ["currentUser"]),
    ...mapState("notification", ["notifications"])
  },
  methods: {
    ...mapActions("loan", ["NewLoanRequest", "FetchGuarantors"]),
    ...mapActions("notification", ["remove"]),
    formSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const { amount, tenure, interest } = this.form;
        const payload = {
          principal_amount: amount,
          tenure,
          interest
        };
        try {
          this.NewLoanRequest(payload);
        } catch (err) {
          return err;
        }
      }
    },
    interest(amount) {
      if (amount == "" || amount == null) {
        return 0;
      } else {
        const interestRate = this.form.interest / 100;
        const newInterest = interestRate * amount;
        this.yearlyInterest = newInterest * this.form.tenure;
        this.loanTotal = parseInt(amount) + parseInt(this.yearlyInterest);
      }
    },
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
    notifications(notifications) {
      for (let i in notifications) {
        if (notifications[i].type == "error") {
          this.$notify("error", "Error Message", notifications[i].message, {
            duration: 3000,
            permanent: false
          });
          this.requestError = true;
          let as = this;
          setTimeout(() => as.removeNotification(notifications[i]), 3000);
        } else if (notifications[i].type == "success") {
          this.$notify("success", "Message", notifications[i].message, {
            duration: 3000,
            permanent: false
          });
          let as = this;
          this.requestError = false;
          setTimeout(() => as.removeNotification(notifications[i]), 3000);
        }
      }
    },
    "form.amount": function(amount) {
      this.interest(amount);
    },
    "form.tenure": function(tenure) {
      this.interest(this.form.amount);
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
