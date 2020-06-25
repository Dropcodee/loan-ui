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
        <h6 class="mb-4 text-center">Credit Form</h6>
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
                <b-form-group label="GSM NO">
                  <b-form-input type="text" v-model="form.phoneNo" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Email">
                  <b-form-input type="email" v-model="form.email" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Natur of Credit (REGULAR OR EMERGENCY)">
                  <b-form-input type="text" v-model="form.credit_nature" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Loan Amount">
                  <b-form-input type="text" v-model="form.loan_amount" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Loan Purpose">
                  <b-form-input type="text" v-model="form.loan_purpose" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Target Loan Obligation (If any)">
                  <b-form-input type="text" v-model="form.loan_obligation" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Monthly Thrift Contribution">
                  <b-form-input type="text" v-model="form.monthly_thrift_contribution" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Monthly Regular Loan Repayment (If any)">
                  <b-form-input type="text" v-model="form.regular_loan_repayment" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Monthly Emergency Loan Repayment (If any)">
                  <b-form-input type="text" v-model="form.emergency_loan_repayment" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Quick Loan Repayment (If any)">
                  <b-form-input type="text" v-model="form.quick_loan_repayment" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Borrower Account Details">
                  <b-form-input type="text" v-model="form.borrower_acct_details" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Method of Repayment (Monthly or Single)">
                  <b-form-input type="text" v-model="form.repayment_method" />
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
                <b-form-group label="Email">
                  <b-form-input type="email" v-model="form.guarantor_a.email" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="GSM NO">
                  <b-form-input type="text" v-model="form.guarantor_a.phoneNo" />
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
                <b-form-group label="Email">
                  <b-form-input type="email" v-model="form.guarantor_b.email" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="GSM NO">
                  <b-form-input type="text" v-model="form.guarantor_b.phoneNo" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group label="Amount Guranteed">
                  <b-form-input type="text" v-model="form.guarantor_b.amount_guaranteed" />
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
            I {{form.fullname}} hereby declare that the statements made herein are true and correct
            <h6>Terms</h6>
            <ul style="text-align: justify">
              <li>The agreement made this {{days[new Date().getDay().toString()]}} of _not_sure_whats_here_ between Landmark University Staff Cooperative Multipurpose Society Limited (herin after referred to as the lender) on the one hand and {{form.fullname}} (herein refered as the borrower) on the other hand requires ₦{{form.loan_name}} for the purpose of {{form.loan_purpose}} and whereas the borrower has applied to the lender for the said sum of ₦{{form.loan_ammount}} for the purpose aforementioned which the lender has agreed upon having the repayment therefore together with the 10% interest thereon secured in thereinafter appearing</li>
              <li>
                In pursusance of the above agreement and in consideration of the sum of ₦{{form.loan_amount}} now paid by the lender to the borrower, receipt whereof the borrower hereby acknowledges, the borrower's agreement with the lender shall be that:
                <ul>
                  <li>The borrower shall repay the sum of ₦{{form.loan_amount}} with interest thereon at the rate of 10% from the date hereof over a period _computed_months_ in equal and consecutive monthly installments of _computed_repayment_ the first installment being due on _computed_date_</li>
                  <li>During continuance of this agreement, the borrower shall pay by check-off from his or her salary monthly the sum of N _computed_ to the lender</li>
                </ul>
              </li>
              <li>If the borrower is either expelled from membership or leaves the service of the University, the whole outstanding principal plus interest shall become payable forthwith</li>
              <li>The borrower may terminate this agreement at any time by paying to the society the amount of the principal outstanding and the interest in respect of the said loan</li>
              <li>No neglect, delay or indulgence by the society enforcing any of the terms or conditions of this agreement shall prejudice the strict right of the lender concerning this loan</li>
            </ul>
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
        fullname: "",
        staff_id: "",
        credit_nature: "",
        loan_purpose: "",
        loan_amount: "",
        phoneNo: "",
        loan_obligation: "",
        monthly_thrift_contribution: "",
        regular_loan_repayment: "",
        emergency_loan_repayment: "",
        quick_loan_repayment: "",
        borrower_acct_details: "",
        email: "",
        repayment_method: "",
        guarantor_a: {
          fullname: "",
          staff_id: "",
          email: "",
          PhoneNo: "",
          amount_guaranteed: 0
        },
        guarantor_b: {
          fullname: "",
          staff_id: "",
          email: "",
          PhoneNo: "",
          amount_guaranteed: 0
        }
      },
      yearlyInterest: 0,
      loanTotal: 0,
      header: "Credit Loan",
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
