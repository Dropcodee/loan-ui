<template>
  <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
    <b-form-group label="Full Name" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.fullname" disabled />
    </b-form-group>
    <b-form-group label="Staff ID Number" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.staffId" disabled />
    </b-form-group>
    <b-form-group label="Current College" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.college" disabled />
    </b-form-group>
    <b-form-group label="Current Department" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.department" disabled />
    </b-form-group>
    <b-form-group label="Phone Number" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.phone" disabled />
    </b-form-group>
    <b-form-group label="Nature Of Item(s)" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.nature" :class="$v.form.nature.$error ? 'is-invalid' : ''" @blur="$v.form.nature.$touch()" />
      <div v-if="$v.form.nature.$error">
        <span v-if="!$v.form.nature.required" class="error-text">Please enter the nature of the items you wish to purchase. </span>
      </div>
    </b-form-group>
    <b-form-group label="Loan Amount In Words" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.amountWords" :class="$v.form.amountWords.$error ? 'is-invalid' : ''" @blur="$v.form.amountWords.$touch()" />
      <div v-if="$v.form.amountWords.$error">
        <span v-if="!$v.form.amountWords.required" class="error-text">Please enter your loan request amount in words </span>
      </div>
    </b-form-group>
    <b-form-group label="Loan Amount" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.amount" :class="$v.form.amount.$error ? 'is-invalid' : ''" @blur="$v.form.amount.$touch()" />
      <div v-if="$v.form.amount.$error">
        <span v-if="!$v.form.amount.required" class="error-text">Please enter your loan requst amount </span>
        <span v-if="!$v.form.amount.minLength" class="error-text">Sorry can't request for a loan less than is 10,000</span>
        <span v-if="!$v.form.amount.maxLength" class="error-text">Sorry here is your current maximum loan request amount {{ $v.form.amount.$params.maxLength.max }}, please not that this amount is based on your current savings for the past 3 months.</span>
        <span v-if="!$v.form.amount.numeric" class="error-text">Loan Amount must contain numbers alone.</span>
      </div>
    </b-form-group>
    <b-form-group label="Interest Rate" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.interest + '%'" disabled />
    </b-form-group>
    <b-form-group label="Loan Payment Commencement Date" class="has-float-label mb-4">
      <v-date-picker mode="single" v-model="form.startDate" :input-props="{ class:'form-control', placeholder: $t('form-components.date') }"></v-date-picker>
      <div v-if="$v.form.startDate.$error">
        <span v-if="!$v.form.startDate.required" class="error-text">Choose when you want to begin your loan repayment thanks.</span>
      </div>
    </b-form-group>
    <b-form-group label="Loan Payment Duration" class="has-float-label mb-4">
      <b-form-select v-model="form.tenure" :options="options"></b-form-select>
      <div v-if="$v.form.tenure.$error">
        <span v-if="!$v.form.tenure.required" class="error-text">Please lets know how long it will take you to repay your loan thanks.</span>
      </div>
    </b-form-group>
    <div class="d-flex justify-content-around align-items-center">
      <b-button type="submit" variant="success" size="lg" :disabled="$v.$anyError || processing" :class="{'btn-multiple-state btn-shadow btn-block': true,
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
</template>
<script>
import { required, maxLength, numeric, minLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommodityLoanForm',
  props: { user: Object },
  data() {
    return {
      form: {
        fullname: this.user.first_name + ' ' + this.user.last_name,
        phone: this.user.phone_number,
        college: '',
        department: '',
        staffId: '',
        nature: '',
        amountWords: '',
        startDate: null,
        amount: null,
        interest: 5,
        tenure: null,
      },
      options: [
        { value: 13, text: '3 months' },
        { value: 26, text: '6 months' },
        { value: 52, text: '1 year' },
        { value: 104, text: '2 years' },
      ],
      yearlyInterest: 0,
      loanTotal: 0,
      timeout: null,
      requestError: null
    }
  },
  computed: {
    ...mapGetters('loan', ['processing']),
  },
  validations: {
    form: {
      nature: {
        required
      },
      startDate: {
        required
      },
      amountWords: {
        required
      },
      amount: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(60000),
        numeric
      },
      tenure: {
        required
      },
    }
  },
  methods: {
    ...mapActions('loan', ['CommodityLoanRequest']),
    formSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const loggedInUser = this.user
        if (loggedInUser.employed_work_id_card && loggedInUser.address) {
          const { amount, tenure, interest } = this.form
          const payload = {
            principal_amount: amount,
            tenure,
            interest
          }
          try {
            this.CommodityLoanRequest(payload)
            this.requestError = false
          } catch (err) {
            return err
          }
        } else {
          const notification = {
                type: 'error',
                message: 'Please complete your profile & start a savings account to qualify for loan application.'
            }
            this.$store.dispatch('notification/add', notification, {
                root: true
            })
        }
      }
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
