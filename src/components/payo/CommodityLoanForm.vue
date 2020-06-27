<template>
  <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
    <b-form-group label="Full Name" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.fullname" disabled :class="$v.form.fullname.$error ? 'is-invalid' : ''" @blur="$v.form.fullname.$touch()" />
      <div v-if="$v.form.fullname.$error">
        <span v-if="!$v.form.fullname.required" class="error-text">Please complete your profile to fill this details</span>
      </div>
    </b-form-group>
    <b-form-group label="Staff ID Number" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.staffId" disabled :class="$v.form.staffId.$error ? 'is-invalid' : ''" @blur="$v.form.staffId.$touch()" />
      <div v-if="$v.form.staffId.$error">
        <span v-if="!$v.form.staffId.required" class="error-text">Please complete your profile to fill this details</span>
      </div>
    </b-form-group>
    <b-form-group label="Current College" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.college" disabled :class="$v.form.college.$error ? 'is-invalid' : ''" @blur="$v.form.college.$touch()" />
      <div v-if="$v.form.college.$error">
        <span v-if="!$v.form.college.required" class="error-text">Please complete your profile to fill this details</span>
      </div>
    </b-form-group>
    <b-form-group label="Current Department" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.department" disabled :class="$v.form.department.$error ? 'is-invalid' : ''" @blur="$v.form.department.$touch()" />
      <div v-if="$v.form.department.$error">
        <span v-if="!$v.form.department.required" class="error-text">Please complete your profile to fill this details</span>
      </div>
    </b-form-group>
    <b-form-group label="Phone Number" class="has-float-label mb-4">
      <b-form-input type="text" v-model="form.phone" disabled :class="$v.form.phone.$error ? 'is-invalid' : ''" @blur="$v.form.phone.$touch()" />
      <div v-if="$v.form.phone.$error">
        <span v-if="!$v.form.phone.required" class="error-text">Please complete your profile to fill this details</span>
      </div>
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
    <b-form-group label="Choose Loan Guarantors (two)" class="has-float-label mb-4">
      <b-form-select multiple v-model="form.guarantors" :options="guarantors" v-if="guarantors.length && processing == false"></b-form-select>
      <b-form-select v-model="form.guarantors" :options="emptyOptions" v-else></b-form-select>
      <div v-if="$v.form.guarantors.$error">
        <span v-if="!$v.form.guarantors.required" class="error-text">Please select two guarantors for your loan applications.</span>
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
  props: { user: Object, guarantors: Array },
  data() {
    return {
      form: {
        fullname: this.user.first_name + ' ' + this.user.last_name,
        phone: this.user.phone_number,
        college: this.user.college,
        department: this.user.department,
        staffId: this.user.employed_valid_id_card,
        nature: '',
        amountWords: '',
        repaymentAmount: '',
        startDate: null,
        amount: null,
        interest: 5,
        tenure: null,
        guarantors: []
      },
      emptyOptions: [
        { value: null, text: 'Sorry there are no guarantors available for now, try again later...' },
      ],
      options: [
        { value: 90, text: '3 months' },
        { value: 180, text: '6 months' },
        { value: 365, text: '1 year' },
        { value: 730, text: '2 years' },
      ],
      timeout: null,
      requestError: null
    }
  },
  computed: {
    ...mapGetters('loan', ['processing']),
  },
  validations: {
    form: {
      fullname: {
        required
      },
      college: {
        required
      },
      department: {
        required
      },
      phone: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
        numeric
      },
      staffId: {
        required,
        minLength: minLength(7),
        maxLength: maxLength(8),
        numeric
      },
      guarantors: {
        required
      },
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
    calcRepaymentAmount() {
      let { amount, interest, tenure } = this.form
      let payload = {
        amount,
        interest,
        duration: tenure
      }
      this.form.repaymentAmount = this.interest(payload)
    },
    interest(payload) {
      console.log(payload)
      if (payload.amount == '' || payload.amount == null) {
        return 0
      } else {
        // calculate loan timeline divide days/365
        let loanDuration = Number(payload.duration) / 365
        const interestRate = Number(payload.interest) / 100
        return Math.round(payload.amount * (1 + (interestRate * loanDuration)))
      }
    },
    formSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const loggedInUser = this.user
        const loanDate = this.form.startDate
        const payload = {
          commodity_nature: this.form.nature,
          loan_type: 'Commodity Loan',
          tenure: this.form.tenure,
          interest: this.form.interest,
          principal_amount: this.form.amount,
          principal_amount_words: this.form.amountWords,
          repayment_amount: this.form.repaymentAmount.toString(),
          repayment_date: loanDate.getFullYear() + '-' + loanDate.getMonth() + '-' + loanDate.getDate(),
          guarantors: this.form.guarantors
        }
        try {
          this.CommodityLoanRequest(payload)
          this.requestError = false
          location.reload()
        } catch (err) {
          return err
        }
      }
    },
  },
  watch: {
    'form.amount': {
      handler: function(amount) {
        console.log(amount)
        if (amount.length >= 5) {
          this.calcRepaymentAmount()
        }
      }
    },
    'form.tenure': {
      handler: function(tenure) {
        this.calcRepaymentAmount()
      }
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
