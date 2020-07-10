<template>
  <div>
    <b-row>
      <b-colxx>
        <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
          <!-- <h6 class="mb-4 text-center">Car Aquisition</h6> -->
          <b-row>
            <b-colxx sm="12">
              <b-form-group label="Fullname" class="has-float-label mb-4">
                <b-form-input disabled type="text" v-model="form.fullname" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Staff ID" class="has-float-label mb-4">
                <b-form-input disabled type="text" v-model="form.staff_id" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="College" class="has-float-label mb-4">
                <b-form-input disabled type="text" v-model="form.college" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Department" class="has-float-label mb-4">
                <b-form-input disabled type="text" v-model="form.department" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="GSM NO" class="has-float-label mb-4">
                <b-form-input disabled type="text" v-model="form.phone" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group
                label="Nature of Asset (Car, Motor Cycle etc.)"
                class="has-float-label mb-4"
              >
                <b-form-input type="text" v-model="form.asset_nature" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Brand of Asset" class="has-float-label mb-4">
                <b-form-input type="text" v-model="form.car_brand" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Salary" class="has-float-label mb-4">
                <b-form-input type="text" v-model="form.salary" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Loan Payment Duration" class="has-float-label mb-4">
                <b-form-select v-model="form.tenure" :options="options"></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Guarantors" class="has-float-label mb-4">
                <multiselect
                  v-if="guarantors && guarantors.length"
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
                <b-form-select v-model="form.guarantors" :options="emptyOptions" v-else></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group>
                <b-button
                  style="border-radius: 0"
                  v-b-modal.modalbasic
                  variant="primary"
                  class="mt-4"
                >Submit</b-button>
              </b-form-group>
            </b-colxx>
          </b-row>
        </b-form>
      </b-colxx>

      <FormPreview
        class="has-float-label mb-4"
        :user="user"
        :previewData="form"
        title="Car Aquisition Application Preview"
      />
    </b-row>
    <b-row>
      <div class="form-side">
        <h6
          class="mt-4"
        >Please Note: The Cooperative Society has the right to impond the Vehicle purchased in the event of non-compliance with above stated condition of repayment on the scheme</h6>
        <b-modal id="modalbasic" ref="modalbasic" size="lg" title="Terms and Condition">
          <h6>Terms</h6>
          <ul>
            <li>Maximum credit facility is three (3) time the savings per qualified member</li>
            <li>It is meant for co-operators with personal savings who required financial assistance for car purchase only with evidence of purchase</li>
            <li>Simple interest of 8% on credit facility per annum</li>
            <li>Maximum refund duration allowed is twenty-four (24) months</li>
            <li>It is for only registered Cooperators on thrift savings scheme with consent loan repayments record</li>
            <li>
              The CAS form is to be collected from the Cooperative Seceteraiat from
              <i>non-refundable</i> fee of One Thousand Naira only payable to Landmark University Cooperative through Zenith Bank Account
              <i>1012910075</i>
            </li>
            <li>
              Benefecial will be attendended to on
              <b>First-Come-First-Serve</b> basis
              <i>subject to availability of fund</i>
            </li>
            <li>No Co-operator shall leave employment of LU without 100% liquidation of the car credit facility</li>
            <li>Payment will be made by check in the benefeciary's name or electronic transfer to the benefeciary's account</li>
          </ul>
          <h6>Eligibilty</h6>
          <ul>
            <li>Your membership of the cooperative must not be less than one year old</li>
            <li>Monthly savings must not be lses than ₦10,000 monthly at any time after benefitting</li>
            <li>Co-operator must be without any debt liability from either regulation or emergency credit months duration</li>
            <li>The above stated conditions/eligibility criteria also applies to guarantors</li>
          </ul>
          <p>I {{form.fullname}} approved and agree to the above stated terms/condition for the Car Aquisition Credit Facility Scheme of LUSCMSI</p>
          <template slot="modal-footer">
            <b-button variant="primary" type="submit" @click.prevent="formSubmit">I Agree</b-button>
            <b-button variant="secondary" @click="hideModal('modalbasic')">Cancel</b-button>
          </template>
        </b-modal>
      </div>
    </b-row>
  </div>
</template>
<script>
import FormPreview from "./FormPreview";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CarAcquisition",
  props: { user: Object, guarantors: Array, requestError: [Boolean, null] },

  components: { FormPreview },
  computed: {
    ...mapGetters("loan", ["processing"])
  },

  data() {
    return {
      emptyOptions: [
        {
          value: null,
          text:
            "Sorry there are no guarantors available for now, try again later..."
        }
      ],
      options: [
        { value: 90, text: "3 months" },
        { value: 180, text: "6 months" },
        { value: 365, text: "1 year" },
        { value: 730, text: "2 years" }
      ],
      loanNature: [
        { value: "regular", text: "Regular Credit Loan" },
        { value: "emergency", text: "Emergency Credit Loan" }
      ],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      form: {
        fullname: this.user.first_name + " " + this.user.last_name,
        staff_id: this.user.employed_valid_id_card,
        college: this.user.college,
        department: this.user.department,
        phone: this.user.phone_number,
        asset_nature: "",
        car_brand: "",
        salary: "",
        repayment_duration: "",
        // guarantor_a: {
        //   fullname: "",
        //   staff_id: "",
        //   College: "",
        //   Department: "",
        //   PhoneNo: "",
        //   years_society: 0,
        //   monthly_savings: 0,
        //   amount_guaranteed: 0
        // },
        // guarantor_b: {
        //   fullname: "",
        //   staff_id: "",
        //   College: "",
        //   Department: "",
        //   PhoneNo: "",
        //   years_society: 0,
        //   monthly_savings: 0,
        //   amount_guaranteed: 0
        // }
        // amount: 0,
        // interest: 5,
        // tenure: 1
      },
      yearlyInterest: 0,
      loanTotal: 0
    };
  },
  methods: {
    ...mapActions("loan", ["CommodityLoanRequest"]),
    moment: function() {
      return moment();
    },
    hideModal (refname) {
      this.$refs[refname].hide()
      console.log('hide modal:: ' + refname)

      if (refname === 'modalnestedinline') {
        this.$refs['modalnested'].show()
      }
    },
    removeGuarantor(removedOption, id) {
      // console.log(removedOption.value);
      this.form.guarantors.forEach(guarantor => {
        if (guarantor.value === removedOption.value) {
          this.form.guarantors.splice(guarantor);
        }
        return guarantor;
      });
    },
    calcRepaymentAmount() {
      let { amount, interest, tenure } = this.form;
      let payload = {
        amount,
        interest,
        duration: tenure
      };
      this.form.repaymentAmount = this.interest(payload);
    },
    interest(payload) {
      // console.log(payload);
      if (payload.amount == "" || payload.amount == null) {
        return 0;
      } else {
        // calculate loan timeline divide days/365
        let loanDuration = Number(payload.duration) / 365;
        const interestRate = Number(payload.interest) / 100;
        return Math.round(payload.amount * (1 + interestRate * loanDuration));
      }
    },
    formatDate() {
      this.form.displayDate = moment(this.form.startDate).format("MMM Do YYYY");
      console.log(this.form.displayDate);
    },
    formSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const loggedInUser = this.user;
        const backendDate = moment(this.form.startDate).format("YYYY-MM-D");
        const guarantorsIds = [];
        this.form.guarantors.forEach(guarantor => {
          guarantorsIds.push(guarantor.value);
        });
        const payload = {
          commodity_nature: this.form.nature,
          loan_type: "Commodity Loan",
          tenure: this.form.tenure,
          interest: this.form.interest,
          principal_amount: this.form.amount,
          repayment_amount: this.form.repaymentAmount.toString(),
          repayment_date: backendDate,
          guarantors: guarantorsIds
        };
        try {
          this.CommodityLoanRequest(payload);
        } catch (err) {
          return err;
        }
      }
    }
  },
  watch: {
    "form.amount": {
      handler: function(amount) {
        console.log(amount);
        if (amount.length >= 5) {
          this.calcRepaymentAmount();
        }
      }
    },
    "form.tenure": {
      handler: function(tenure) {
        this.calcRepaymentAmount();
      }
    },
    "form.startDate": {
      handler: function(startDate) {
        this.formatDate();
      }
    }
  }
};
</script>
<style lang="css" scoped>
</style>
