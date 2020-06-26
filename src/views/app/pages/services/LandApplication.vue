<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="header" />
        <div class="separator mb-5"></div>
        <p class="lead">Welcome back {{ currentUser.first_name.charAt(0).toUpperCase() + currentUser.first_name.slice(1) }} {{ currentUser.last_name.charAt(0).toUpperCase() + currentUser.last_name.slice(1) }}</p>
        <p v-if="currentUser.account_number == null">Please Complete your profile to get started. <router-link to="/" class="primary"> Click Here </router-link>
        </p>
        <p v-else> Please fill out all the details for your loan application</p>
      </b-colxx>
    </b-row>
    <b-row>
      <b-card class="w-40 mx-auto">
        <div class="form-side">
          <h6 class="mb-4 text-center">Apply for personal loan</h6>
          <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
            <b-form-group label="Loan Amount" class="has-float-label mb-4">
              <b-form-input type="text" v-model="form.amount" :class="$v.form.amount.$error ? 'is-invalid' : ''" @blur="$v.form.amount.$touch()" />
              <div v-if="$v.form.amount.$error">
                <span v-if="!$v.form.amount.required" class="error-text">Please enter your loan requst amount </span>
                <span v-if="!$v.form.amount.maxLength" class="error-text">Sorry here is your current maximum loan request amount {{ $v.form.amount.$params.maxLength.max }}, please not that this amount is based on your current savings for the past 3 months.</span>
                <span v-if="!$v.form.amount.numeric" class="error-text">Loan Amount must contain numbers alone.</span>
              </div>
            </b-form-group>
            <b-form-group label="Interest Rate" class="has-float-label mb-4">
              <b-form-input type="text" v-bind:value="form.interest + '%'" disabled />
            </b-form-group>
            <b-form-group label="Loan Payment Tenure" class="has-float-label mb-4">
              <b-form-select v-model="form.tenure" :options="options"></b-form-select>
              <div v-if="$v.form.tenure.$error">
                <span v-if="!$v.form.tenure.required" class="error-text">Please lets know how long it will take you to repay your loan thanks.</span>
              </div>
            </b-form-group>
            <div class="d-flex justify-content-around align-items-center">
              <b-button type="submit" variant="primary" size="lg" :disabled="$v.$anyError || processing" :class="{'btn-multiple-state btn-shadow btn-block': true,
                    'show-spinner': processing,
                    'show-success': !processing && requestError === false,
                    'show-fail': !processing && requestError }">
                <span class="spinner d-inline-block">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
                </span>
                <span class="icon success">
                  <i class="simple-icon-check"></i>
                </span>
                <span class="icon fail">
                  <i class="simple-icon-exclamation"></i>
                </span>
                <span class="label">Apply</span>
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
      <b-card class="w-40 mx-auto">
        <h2 class="text-center mb-4 mt-4">Loan Request Preview</h2>
        <h3 class="mt-12">Loan Request Amount: <span class="text-center ml-2"> &#8358; {{ form.amount }}</span></h3>
        <h3 class="mt-4">Loan Interest Amount: <span class="text-center ml-2"> &#8358; {{ yearlyInterest }}</span></h3>
        <h3 class="mt-4">Total Amount Payable: <span class="text-center ml-2"> &#8358; {{ loanTotal }}</span></h3>
        <h3 class="mt-4">Repayment Timeline: <span class=""> {{ form.tenure }} Yr</span></h3>
      </b-card>
    </b-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { required, maxLength, numeric } from 'vuelidate/lib/validators'

export default {

  name: 'land-application',

  data() {
    return {
      options: [
        { value: 1, text: '1 year' },
        { value: 2, text: '2 years' },
      ],
      form: {
        amount: 0,
        interest: 5,
        tenure: 1,
      },
      yearlyInterest: 0,
      loanTotal: 0,
      header: 'Loan Application Form',
      timeout: null,
      requestError: null
    };
  },
  validations: {
    form: {
      amount: {
        required,
        maxLength: maxLength(30000),
        numeric
      },
      tenure: {
        required
      },
    }
  },
  computed: {
    ...mapGetters('loan', ['processing']),
    ...mapGetters('user', ['currentUser']),
    ...mapState('notification', ["notifications"]),
  },
  methods: {
    ...mapActions('loan', ['NewLoanRequest']),
    ...mapActions('notification', ["remove"]),
    formSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const { amount, tenure, interest } = this.form
        const payload = {
          principal_amount: amount,
          tenure,
          interest
        }
        try {
          this.NewLoanRequest(payload)
          this.requestError = false
        } catch (err) {
          return err
        }
      }
    },
    interest(amount) {
      if (amount == '' || amount == null) {
        return 0
      } else {
        const interestRate = this.form.interest / 100
        const newInterest = interestRate * amount
        this.yearlyInterest = newInterest * this.form.tenure
        this.loanTotal = parseInt(amount) + parseInt(this.yearlyInterest)
      }
    },
    removeNotification(notification) {
      console.log(notification)
      this.remove(notification)
    },
  },
  watch: {
    notifications(notifications) {
      for (let i in notifications) {
        if (notifications[i].type == 'error') {
          this.$notify("error", "Error Message", notifications[i].message, {
            duration: 3000,
            permanent: false
          });
          this.requestError = true
          let as = this;
          setTimeout(() => as.removeNotification(notifications[i]), 3000)
        } else if (notifications[i].type == 'success') {
          this.$notify("success", "Message", notifications[i].message, {
            duration: 3000,
            permanent: false
          });
          let as = this;
          setTimeout(() => as.removeNotification(notifications[i]), 3000)
        }
      }
    },
    'form.amount': function(amount) {
      this.interest(amount)
    },
    'form.tenure': function(tenure) {
      this.interest(this.form.amount)
    }
  }
};

</script>
<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.mt-12 {
  margin-top: 4rem
}

.mt-8 {
  margin-top: 3rem
}

</style>
