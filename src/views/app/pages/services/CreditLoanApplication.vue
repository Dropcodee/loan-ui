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
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { required, maxLength, numeric } from "vuelidate/lib/validators";
import CreditLoanForm from "@/components/payo/CreditLoan";
export default {
  name: "land-application",
  components: { CreditLoanForm },
  data() {
    return {
      header: "Credit Loan Application"
    };
  },
  computed: {
    ...mapGetters("loan", ["processing"]),
    ...mapGetters("user", ["currentUser"]),
    ...mapState("notification", ["notifications"])
  },
  methods: {
    ...mapActions("loan", ["NewLoanRequest"]),
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
          this.requestError = false;
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
          setTimeout(() => as.removeNotification(notifications[i]), 3000);
        }
      }
    },
    "form.amount": function(amount) {
      this.interest(amount);
    },
    "form.tenure": function(tenure) {
      this.interest(this.form.amount);
    }
  }
};
</script>
<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.mt-12 {
  margin-top: 4rem;
}

.mt-8 {
  margin-top: 3rem;
}
</style>
