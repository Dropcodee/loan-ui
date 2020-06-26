<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="header" />
        <div class="separator mb-5"></div>
        <p
          class="lead"
        >Welcome back {{ currentUser.first_name.charAt(0).toUpperCase() + currentUser.first_name.slice(1) }} {{ currentUser.last_name.charAt(0).toUpperCase() + currentUser.last_name.slice(1) }}</p>
        <p v-if="currentUser.account_number == null">
          Please Complete your profile to get started.
          <router-link to="/" class="primary">Click Here</router-link>
        </p>
        <p v-else>Please fill out all the details for your loan application</p>
      </b-colxx>
    </b-row>
    <b-row>
      <div class="form-side">
        <h6 class="mb-4 text-center">Apply for Car Aquisition</h6>
        <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
          <b-card class="w-100 mx-auto">
            <h6 class="mb-4 text-center">Applicants Information</h6>
            <b-row>
              <b-colxx sm="6">
                <b-form-group label="Fullname">
                  <b-form-input type="text" v-model="form.fullname" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Staff ID">
                  <b-form-input type="text" v-model="form.staff_id" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="College">
                  <b-form-input type="text" v-model="form.college" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Department">
                  <b-form-input type="text" v-model="form.department" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="GSM NO">
                  <b-form-input type="text" v-model="form.phoneNo" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Nature of Asset (Car, Motor Cycle etc.)">
                  <b-form-input type="text" v-model="form.asset_nature" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Brand of Asset">
                  <b-form-input type="text" v-model="form.car_brand" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Salary">
                  <b-form-input type="text" v-model="form.salary" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Repayment Duration">
                  <b-form-input type="text" v-model="form.repayment_durationtext" />
                </b-form-group>
              </b-colxx>
            </b-row>
            <!-- <b-form-group label="Loan Amount" class="has-float-label mb-4">
              
            <div class="d-flex justify-content-around align-items-center">
              <b-button
                type="submit"
                variant="primary"
                size="lg"
                :disabled="$v.$anyError || processing"
                :class="{'btn-multiple-state btn-shadow btn-block': true,
                    'show-spinner': processing,
                    'show-success': !processing && requestError === false,
                    'show-fail': !processing && requestError }"
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
            </div>-->
          </b-card>
          <b-card style="margin-top: 20px" class="w-100 mx-auto">
            <h6 class="mb-4 text-center">Guarantor A</h6>
            <b-row>
              <b-colxx sm="6">
                <b-form-group label="Fullname">
                  <b-form-input type="text" v-model="form.guarantor_a.fullname" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Staff ID">
                  <b-form-input type="text" v-model="form.guarantor_a.staff_id" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="College">
                  <b-form-input type="text" v-model="form.guarantor_a.college" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Department">
                  <b-form-input type="text" v-model="form.guarantor_a.department" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="GSM NO">
                  <b-form-input type="text" v-model="form.guarantor_a.phoneNo" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Years in Society">
                  <b-form-input type="text" v-model="form.guarantor_a.years_society" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Monthly Savings">
                  <b-form-input type="number" v-model="form.guarantor_a.monthly_savings" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Amount Guranteed">
                  <b-form-input type="text" v-model="form.guarantor_a.amount_guaranteed" />
                  <span>*In the event the burrower defaults in the monthly repyment, the guarantor will be liable to pay the amount outstanding*</span>
                </b-form-group>
              </b-colxx>
            </b-row>
          </b-card>
          <b-card style="margin-top: 20px" class="w-100 mx-auto">
            <h6 class="mb-4 text-center">Guarantor B</h6>
            <b-row>
              <b-colxx sm="6">
                <b-form-group label="Fullname">
                  <b-form-input type="text" v-model="form.guarantor_b.fullname" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Staff ID">
                  <b-form-input type="text" v-model="form.guarantor_b.staff_id" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="College">
                  <b-form-input type="text" v-model="form.guarantor_b.college" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Department">
                  <b-form-input type="text" v-model="form.guarantor_b.department" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="GSM NO">
                  <b-form-input type="text" v-model="form.guarantor_b.phoneNo" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Years in Society">
                  <b-form-input type="text" v-model="form.guarantor_b.years_society" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Monthly Savings">
                  <b-form-input type="number" v-model="form.guarantor_a.monthly_savings" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Amount Guranteed">
                  <b-form-input type="text" v-model="form.guarantor_a.amount_guaranteed" />
                  <span>*In the event the burrower defaults in the monthly repyment, the guarantor will be liable to pay the amount outstanding*</span>
                </b-form-group>
              </b-colxx>
            </b-row>
            <b-button
              style="border-radius: 0"
              v-b-modal.modalbasic
              variant="primary"
              class="mt-4"
            >Submit</b-button>
            <h6
              class="mt-4"
            >Please Note: The Cooperative Society has the right to impond the Vehicle purchased in the event of non-compliance with above stated condition of repayment on the scheme</h6>
          </b-card>
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
        </b-form>
      </div>
      <!-- <b-card class="w-40 mx-auto">
        <h2 class="text-center mb-4 mt-4">Loan Request Preview</h2>
        <h3 class="mt-12">
          Loan Request Amount:
          <span class="text-center ml-2">&#8358; {{ form.amount }}</span>
        </h3>
        <h3 class="mt-4">
          Loan Interest Amount:
          <span class="text-center ml-2">&#8358; {{ yearlyInterest }}</span>
        </h3>
        <h3 class="mt-4">
          Total Amount Payable:
          <span class="text-center ml-2">&#8358; {{ loanTotal }}</span>
        </h3>
        <h3 class="mt-4">
          Repayment Timeline:
          <span class>{{ form.tenure }} Yr</span>
        </h3>
      </b-card>-->
    </b-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { required, maxLength, numeric } from "vuelidate/lib/validators";

export default {
  name: "car-aquisition",

  data() {
    return {
      options: [
        { value: 1, text: "1 year" },
        { value: 2, text: "2 years" }
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
