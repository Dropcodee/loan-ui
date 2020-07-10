<template>
  <div>
    <b-row>
      <b-colxx>
        <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
          <h6 class="mb-4 text-center">Car Aquisition</h6>
          <b-row>
            <b-colxx sm="12">
              <b-form-group label="Fullname">
                <b-form-input type="text" v-model="form.fullname" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Staff ID">
                <b-form-input type="text" v-model="form.staff_id" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="College">
                <b-form-input type="text" v-model="form.college" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Department">
                <b-form-input type="text" v-model="form.department" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="GSM NO">
                <b-form-input type="text" v-model="form.phoneNo" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Nature of Asset (Car, Motor Cycle etc.)">
                <b-form-input type="text" v-model="form.asset_nature" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Brand of Asset">
                <b-form-input type="text" v-model="form.car_brand" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Salary">
                <b-form-input type="text" v-model="form.salary" />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Loan Payment Duration">
                <b-form-select v-model="form.tenure" :options="options"></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Guarantors">
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

      <form-preview style="margin-top: 65px;"
        :user="currentUser"
        :previewData="form"
        title="Commodity Loan Application Preview"
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
import { mapGetters, mapActions, mapState } from "vuex";
import { required, maxLength, numeric } from "vuelidate/lib/validators";
import FormPreview from "@/components/payo/FormPreview";
import moment from "moment";

export default {
  name: "car-aquisition",
  components: { FormPreview },

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
      form: {
        fullname: "",
        staff_id: "",
        college: "",
        department: "",
        phoneNo: "",
        asset_nature: "",
        car_brand: "",
        salary: "",
        repayment_duration: "",
        guarantor_a: {
          fullname: "",
          staff_id: "",
          College: "",
          Department: "",
          PhoneNo: "",
          years_society: 0,
          monthly_savings: 0,
          amount_guaranteed: 0
        },
        guarantor_b: {
          fullname: "",
          staff_id: "",
          College: "",
          Department: "",
          PhoneNo: "",
          years_society: 0,
          monthly_savings: 0,
          amount_guaranteed: 0
        }
        // amount: 0,
        // interest: 5,
        // tenure: 1
      },
      yearlyInterest: 0,
      loanTotal: 0,
      header: "Car Aquistion Form",
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
      }
    }
  },
  computed: {
    ...mapGetters("loan", ["processing"]),
    ...mapGetters("user", ["currentUser"]),
    ...mapState("notification", ["notifications"])
  },
  methods: {
    ...mapActions("loan", ["FetchGuarantors"]),
    pushToGurantorsList(guarantor) {
      // console.log(guarantor);
      this.guarantorsList.push({
        value: guarantor.id,
        name:
          ash.startCase(guarantor.first_name) +
          " " +
          ash.startCase(guarantor.last_name)
      });
    },
    hideModal(refname) {
      this.$refs[refname].hide();
      console.log("hide modal:: " + refname);

      if (refname === "modalnestedinline") {
        this.$refs["modalnested"].show();
      }
    },
    somethingModal(refname) {
      this.$refs[refname].hide();
      console.log("something modal:: " + refname);

      if (refname === "modalnestedinline") {
        this.$refs["modalnested"].show();
      }
    },
    // ...mapActions("loan", ["NewLoanRequest"]),
    // ...mapActions("notification", ["remove"]),
    formSubmit() {
      // this.$v.$touch();
      // if (!this.$v.$invalid) {
      //   const { amount, tenure, interest } = this.form;
      //   const payload = {
      //     principal_amount: amount,
      //     tenure,
      //     interest
      //   };
      //   try {
      //     this.NewLoanRequest(payload);
      //     this.requestError = false;
      //   } catch (err) {
      //     return err;
      //   }
      // }
      console.log(this.form);
    }
    // interest(amount) {
    //   if (amount == "" || amount == null) {
    //     return 0;
    //   } else {
    //     const interestRate = this.form.interest / 100;
    //     const newInterest = interestRate * amount;
    //     this.yearlyInterest = newInterest * this.form.tenure;
    //     this.loanTotal = parseInt(amount) + parseInt(this.yearlyInterest);
    //   }
    // },
    // removeNotification(notification) {
    //   console.log(notification);
    //   this.remove(notification);
    // }
  },
  watch: {
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
    // notifications(notifications) {
    //   for (let i in notifications) {
    //     if (notifications[i].type == "error") {
    //       this.$notify("error", "Error Message", notifications[i].message, {
    //         duration: 3000,
    //         permanent: false
    //       });
    //       this.requestError = true;
    //       let as = this;
    //       setTimeout(() => as.removeNotification(notifications[i]), 3000);
    //     } else if (notifications[i].type == "success") {
    //       this.$notify("success", "Message", notifications[i].message, {
    //         duration: 3000,
    //         permanent: false
    //       });
    //       let as = this;
    //       setTimeout(() => as.removeNotification(notifications[i]), 3000);
    //     }
    //   }
    // },
    // "form.amount": function(amount) {
    //   this.interest(amount);
    // },
    // "form.tenure": function(tenure) {
    //   this.interest(this.form.amount);
    // }
  },
  created() {
    this.FetchGuarantors();
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
