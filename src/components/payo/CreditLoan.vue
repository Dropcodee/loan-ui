<template>
  <b-row>
    <b-colxx>
      <b-form
        @submit.prevent="formSubmit"
        class="av-tooltip tooltip-label-bottom"
      >
        <b-form-group label="Full Name" class="has-float-label mb-4">
          <b-form-input
            type="text"
            v-model="form.fullname"
            disabled
            :class="$v.form.fullname.$error ? 'is-invalid' : ''"
            @blur="$v.form.fullname.$touch()"
          />
          <div v-if="$v.form.fullname.$error">
            <span v-if="!$v.form.fullname.required" class="error-text"
              >Please complete your profile to fill this details</span
            >
          </div>
        </b-form-group>
        <b-form-group label="Staff ID Number" class="has-float-label mb-4">
          <b-form-input
            type="text"
            v-model="form.staff_id"
            disabled
            :class="$v.form.staff_id.$error ? 'is-invalid' : ''"
            @blur="$v.form.staff_id.$touch()"
          />
          <div v-if="$v.form.staff_id.$error">
            <span v-if="!$v.form.staff_id.required" class="error-text"
              >Please complete your profile to fill this details</span
            >
          </div>
        </b-form-group>
        <b-form-group label="Current College" class="has-float-label mb-4">
          <b-form-input
            type="text"
            v-model="form.college"
            disabled
            :class="$v.form.college.$error ? 'is-invalid' : ''"
            @blur="$v.form.college.$touch()"
          />
          <div v-if="$v.form.college.$error">
            <span v-if="!$v.form.college.required" class="error-text"
              >Please complete your profile to fill this details</span
            >
          </div>
        </b-form-group>
        <b-form-group label="Current Department" class="has-float-label mb-4">
          <b-form-input
            type="text"
            v-model="form.department"
            disabled
            :class="$v.form.department.$error ? 'is-invalid' : ''"
            @blur="$v.form.department.$touch()"
          />
          <div v-if="$v.form.department.$error">
            <span v-if="!$v.form.department.required" class="error-text"
              >Please complete your profile to fill this details</span
            >
          </div>
        </b-form-group>
        <b-form-group label="Phone Number" class="has-float-label mb-4">
          <b-form-input
            type="text"
            v-model="form.phone"
            disabled
            :class="$v.form.phone.$error ? 'is-invalid' : ''"
            @blur="$v.form.phone.$touch()"
          />
          <div v-if="$v.form.phone.$error">
            <span v-if="!$v.form.phone.required" class="error-text"
              >Please complete your profile to fill this details</span
            >
          </div>
        </b-form-group>
        <b-form-group
          label="Nature Of Credit (Regular or Emmergency)"
          class="has-float-label mb-4"
        >
          <b-form-select
            v-model="form.credit_nature"
            :options="loanNature"
            :class="$v.form.credit_nature.$error ? 'is-invalid' : ''"
            @blur="$v.form.credit_nature.$touch()"
          ></b-form-select>
          <div v-if="$v.form.credit_nature.$error">
            <span v-if="!$v.form.credit_nature.required" class="error-text"
              >Please select the nature of your loan.
            </span>
          </div>
        </b-form-group>
        <b-form-group label="Loan Amount" class="has-float-label mb-4">
          <b-form-input
            type="text"
            v-model="form.loan_amount"
            :class="$v.form.loan_amount.$error ? 'is-invalid' : ''"
            @blur="$v.form.loan_amount.$touch()"
          />
          <div v-if="$v.form.loan_amount.$error">
            <span v-if="!$v.form.loan_amount.required" class="error-text"
              >Please enter your loan requst amount
            </span>
            <span v-if="!$v.form.loan_amount.minLength" class="error-text"
              >Sorry can't request for a loan less than is 10,000</span
            >
            <!-- <span
              v-if="!$v.form.loan_amount.maxLength"
              class="error-text"
            >Sorry here is your current maximum loan request amount {{ $v.form.amount.$params.maxLength.max }}, please not that this amount is based on your current savings for the past 3 months.</span> -->
            <span v-if="!$v.form.loan_amount.numeric" class="error-text"
              >Loan Amount must contain numbers alone.</span
            >
          </div>
        </b-form-group>
        <b-form-group
          label="Method of loan repayment"
          class="has-float-label mb-4"
        >
          <b-form-select
            v-model="form.repayment_method"
            :options="options"
          ></b-form-select>
          <div v-if="$v.form.repayment_method.$error">
            <span v-if="!$v.form.repayment_method.required" class="error-text"
              >Please lets know how you wish to make your loan payments.</span
            >
          </div>
        </b-form-group>
        <b-form-group label="Interest Rate" class="has-float-label mb-4">
          <b-form-input
            type="text"
            v-model="form.loanInterest + '%'"
            disabled
          />
          <div v-if="$v.form.loanInterest.$error">
            <span v-if="!$v.form.loanInterest.required" class="error-text"
              >Please check back for loan percentages.</span
            >
          </div>
        </b-form-group>
        <b-row>
          <b-colxx sm="6">
            <b-form-group label="Loan Purpose" class="has-float-label mb-4">
              <b-form-input type="text" v-model="form.loan_purpose" />
              <div v-if="$v.form.loan_purpose.$error">
                <span v-if="!$v.form.loan_purpose.required" class="error-text"
                  >Please tell us the purpose of this loan your about to
                  request.</span
                >
              </div>
            </b-form-group></b-colxx
          >
          <b-colxx sm="6">
            <b-form-group
              label="Loan Payment Commencement Date"
              class="has-float-label mb-4"
            >
              <v-date-picker
                mode="single"
                v-model="form.startDate"
                :input-props="{
                  class: 'form-control',
                  placeholder: $t('form-components.date'),
                }"
              ></v-date-picker>
              <div v-if="$v.form.startDate.$error">
                <span v-if="!$v.form.startDate.required" class="error-text"
                  >Choose when you want to begin your loan repayment
                  thanks.</span
                >
              </div>
            </b-form-group></b-colxx
          >
          <b-colxx sm="6">
            <b-form-group
              label="Choose Loan Guarantors (two)"
              class="has-float-label mb-4"
            >
              <multiselect
                v-model="form.guarantors"
                :options="guarantors"
                :multiple="true"
                :searchable="true"
                deselectLabel="Press enter to remove"
                :max="2"
                label="name"
                placeholder="Select two guarantors of your choice"
                @remove="removeGuarantor"
              ></multiselect>
              <div v-if="$v.form.guarantors.$error">
                <span v-if="!$v.form.guarantors.required" class="error-text"
                  >Please select two guarantors for your loan
                  applications.</span
                >
                <span v-if="!$v.form.guarantors.minLength" class="error-text"
                  >Please select two guarantors for your loan
                  applications.</span
                >
              </div>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="6">
            <b-form-group
              label="Guarantors repayment percentage"
              class="has-float-label mb-4"
            >
              <b-form-select
                v-model="form.repayment_percentage"
                :options="percentages"
              ></b-form-select>
              <div v-if="$v.form.repayment_percentage.$error">
                <span
                  v-if="!$v.form.repayment_percentage.required"
                  class="error-text"
                  >Please share the loan among the selected guarantors.</span
                >
              </div>
            </b-form-group>
          </b-colxx></b-row
        >
        <b-form-group label="Deposit type" class="has-float-label mb-4">
          <!-- <b-form-input
                  type="text"
                  v-model="form.monthly_deposit"
                  :class="$v.form.monthly_deposit.$error ? 'is-invalid' : ''"
                  @blur="$v.form.monthly_deposit.$touch()"
                /> -->
          <b-form-select
            :class="$v.form.charge.$error ? 'is-invalid' : ''"
            @blur="$v.form.charge.$touch()"
            v-model="form.charge"
            :options="schedule"
          ></b-form-select>

          <div v-if="$v.form.charge.$error">
            <span v-if="!$v.form.charge.required" class="error-text"
              >Please pick an option.</span
            >
            <!-- <span
                    v-if="!$v.form.charge.numeric"
                    class="error-text"
                  >Savings must contain numbers alone.</span> -->
          </div>
        </b-form-group>
        <div class="d-flex justify-content-around align-items-center">
          <b-button
            type="submit"
            @click.prevent="formSubmit"
            variant="success"
            size="lg"
            :disabled="$v.$anyError || processing"
            :class="{
              'btn-multiple-state btn-shadow btn-block': true,
              'show-spinner': processing,
              'show-success': !processing && requestError === false,
              'show-fail': !processing && requestError,
            }"
          >
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
    </b-colxx>
    <form-preview
      :user="user"
      :previewData="form"
      title="Credit Loan Application Preview"
    />
  </b-row>
</template>
<script>
import FormPreview from "./FormPreview";
import {
  required,
  maxLength,
  numeric,
  minLength,
} from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "CreditLoan",
  props: {
    user: Object,
    guarantors: Array,
    requestError: [Boolean, null],
  },
  components: { FormPreview },
  data() {
    return {
      options: [
        { value: 30, text: "Monthly" },
        { value: 365, text: "Yearly" },
      ],
      loanNature: [
        { value: "regular", text: "Regular Credit Loan" },
        { value: "emergency", text: "Emergency Credit Loan" },
      ],
      percentages: [
        { value: "5050", text: "50% - 50%" },
        { value: "6040", text: "60% - 40%" },
        { value: "7030", text: "70% - 30%" },
      ],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      schedule: [
        { value: "automatic", text: "Automatic" },
        { value: "manual", text: "Manual" },
      ],
      form: {
        fullname: this.user.first_name + " " + this.user.last_name,
        staff_id: this.user.employed_valid_id_card,
        phone: this.user.phone_number,
        college: this.user.college,
        department: this.user.department,
        credit_nature: "",
        loan_purpose: "",
        loan_amount: "",
        loanInterest: 6,
        phone: this.user.phone_number,
        loan_obligation: "",
        monthly_thrift_contribution: "",
        regular_loan_repayment: 0,
        emergency_loan_repayment: "",
        quick_loan_repayment: "",
        borrower_acct_details: "",
        email: this.user.email,
        repayment_method: "",
        repayment_percentage: "",
        startDate: null,
        displayDate: null,
        guarantors: [],
        charge: null,
      },
    };
  },
  computed: {
    ...mapGetters("loan", ["processing"]),
  },
  validations: {
    form: {
      fullname: { required },
      college: { required },
      department: { required },
      email: { required },
      repayment_percentage: { required },
      loanInterest: { required },
      phone: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
        numeric,
      },
      charge: {
        required,
      },
      staff_id: {
        required,
        minLength: minLength(7),
        maxLength: maxLength(8),
        numeric,
      },
      startDate: { required },
      credit_nature: { required },
      loan_amount: { required, minLength: minLength(5), numeric },
      loan_purpose: { required },
      repayment_method: { required },
      guarantors: { required, minLength: minLength(2) },
    },
  },
  methods: {
    ...mapActions("loan", ["CreditLoanRequest"]),
    moment: function () {
      return moment();
    },
    hideModal(refname) {
      this.$refs[refname].hide();
      console.log("hide modal:: " + refname);

      if (refname === "modalnestedinline") {
        this.$refs["modalnested"].show();
      }
    },
    removeGuarantor(removedOption, id) {
      // console.log(removedOption.value);
      this.form.guarantors.forEach((guarantor) => {
        if (guarantor.value === removedOption.value) {
          this.form.guarantors.splice(guarantor);
        }
        return guarantor;
      });
    },
    formatDate() {
      this.form.displayDate = moment(this.form.startDate).format("MMM Do YYYY");
      console.log(this.form.displayDate);
    },
    setGuarantorDetails(guarantors, percentage) {
      // calculate guarantors repayment amount
      let guarantorAB, guarantorA, guarantorB;
      const guarantorsIds = [];
      switch (percentage) {
        case "5050":
          guarantorAB = (this.form.regular_loan_repayment / 100) * 50;
          guarantors.forEach((guarantor) => {
            guarantorsIds.push({
              id: guarantor.value,
              name: guarantor.name,
              repayment_amount: Math.round(guarantorAB),
            });
          });
          break;
        case "6040":
          guarantorA = (this.form.regular_loan_repayment / 100) * 60;
          guarantorB = (this.form.regular_loan_repayment / 100) * 40;
          guarantors.forEach((guarantor, index) => {
            if (index === 0) {
              guarantorsIds.push({
                id: guarantor.value,
                name: guarantor.name,
                repayment_amount: Math.round(guarantorA),
              });
            } else if (index === 1) {
              guarantorsIds.push({
                id: guarantor.value,
                name: guarantor.name,
                repayment_amount: Math.round(guarantorB),
              });
            }
          });
          break;
        case "7030":
          guarantorA = (this.form.regular_loan_repayment / 100) * 70;
          guarantorB = (this.form.regular_loan_repayment / 100) * 30;
          guarantors.forEach((guarantor, index) => {
            if (index === 0) {
              guarantorsIds.push({
                id: guarantor.value,
                name: guarantor.name,
                repayment_amount: Math.round(guarantorA),
              });
            } else if (index === 1) {
              guarantorsIds.push({
                id: guarantor.value,
                name: guarantor.name,
                repayment_amount: Math.round(guarantorB),
              });
            }
          });
          break;
      }
      this.form.guarantors = guarantorsIds;
      // console.log(this.form.guarantors);
    },
    formSubmit() {
      console.log("submitted!!!");
      this.$v.$touch();
      let backendTenure;
      if (!this.$v.$invalid) {
        const backendDate = moment(this.form.startDate).format("YYYY-MM-D");
        const payload = {
          loan_type: "Credit Loan",
          loan_amount: this.form.loan_amount,
          loan_purpose: this.form.loan_purpose,
          repayment_date: backendDate,
          guarantors: this.form.guarantors,
          repayment_amount: this.form.regular_loan_repayment.toString(),
          interest: this.form.loanInterest,
          method_of_repayment: this.form.repayment_method.toString(),
          credit_loan_type: this.form.credit_nature,
          tenure: this.form.repayment_method,
          schedule: this.form.charge,
        };
        try {
          this.CreditLoanRequest(payload);
          console.log(payload);
        } catch (err) {
          return err;
        }
      } else {
        return console.log(this.$v.$invalid);
      }
    },
    interestCalculator(method) {
      // loan calculation formulars
      let loanDuration = Number(this.form.repayment_method) / 365;
      const interestRate = Number(this.form.loanInterest) / 100;
      let loanTotalPayment = Math.round(
        this.form.loan_amount * (1 + interestRate * loanDuration)
      );
      if (method == 30) {
        return (this.form.regular_loan_repayment = Math.round(
          loanTotalPayment
        ));
        // console.log("monthly: ", this.form.regular_loan_repayment);
      } else {
        return (this.form.regular_loan_repayment = Math.round(
          loanTotalPayment
        ));
        // console.log("yearly: ", this.form.regular_loan_repayment);
      }
    },
  },
  watch: {
    "form.repayment_method": {
      handler: function (method) {
        this.interestCalculator(method);
      },
    },
    "form.loan_amount": {
      handler: function (amount) {
        this.interestCalculator(this.form.repayment_method);
      },
    },
    "form.startDate": {
      handler: function (startDate) {
        this.formatDate();
      },
    },
    "form.repayment_percentage": {
      handler: function (percentage) {
        this.setGuarantorDetails(this.form.guarantors, percentage);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.preview-text {
  margin-top: 5px;
  font-size: 20px;
  font-weight: 600;
}
</style>
