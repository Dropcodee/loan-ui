<template>
  <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
    <b-card class="w-100 mx-auto">
      <h6 class="mb-4 text-center">Applicants Information</h6>
      <b-row>
        <b-colxx sm="6">
          <b-form-group label="Fullname">
            <b-form-input type="text" v-model="form.fullname" disabled :class="$v.form.fullname.$error ? 'is-invalid' : ''" @blur="$v.form.fullname.$touch()" />
            <div v-if="$v.form.fullname.$error">
              <span v-if="!$v.form.fullname.required" class="error-text">Please complete your profile to fill this details</span>
            </div>
          </b-form-group>
        </b-colxx>
        <b-colxx sm="6">
          <b-form-group label="Staff ID">
            <b-form-input type="text" v-model="form.staff_id" disabled :class="$v.form.staff_id.$error ? 'is-invalid' : ''" @blur="$v.form.staff_id.$touch()" />
            <div v-if="$v.form.staff_id.$error">
              <span v-if="!$v.form.staff_id.required" class="error-text">Please complete your profile to fill this details</span>
            </div>
          </b-form-group>
        </b-colxx>
        <b-colxx sm="6">
          <b-form-group label="GSM NO">
            <b-form-input type="text" v-model="form.phone" disabled :class="$v.form.phone.$error ? 'is-invalid' : ''" @blur="$v.form.phone.$touch()" />
            <div v-if="$v.form.phone.$error">
              <span v-if="!$v.form.phone.required" class="error-text">Please complete your profile to fill this details</span>
            </div>
          </b-form-group>
        </b-colxx>
        <b-colxx sm="6">
          <b-form-group label="Email">
            <b-form-input type="email" v-model="form.email" disabled :class="$v.form.email.$error ? 'is-invalid' : ''" @blur="$v.form.email.$touch()" />
            <div v-if="$v.form.email.$error">
              <span v-if="!$v.form.email.required" class="error-text">Please complete your profile to fill this details</span>
            </div>
          </b-form-group>
        </b-colxx>
        <b-colxx sm="6">
          <b-form-group label="Natur of Credit (REGULAR OR EMERGENCY)">
            <b-form-select v-model="form.credit_nature" :options="loanNature" :class="$v.form.email.$error ? 'is-invalid' : ''" @blur="$v.form.email.$touch()"></b-form-select>
            <div v-if="$v.form.credit_nature.$error">
              <span v-if="!$v.form.credit_nature.required" class="error-text">Please Lets know the nature of your loan</span>
            </div>
          </b-form-group>
        </b-colxx>
        <b-colxx sm="6">
          <b-form-group label="Loan Amount">
            <b-form-input type="text" v-model="form.loan_amount" :class="$v.form.loan_amount.$error ? 'is-invalid' : ''" @blur="$v.form.loan_amount.$touch()" />
            <div v-if="$v.form.loan_amount.$error">
              <span v-if="!$v.form.loan_amount.required" class="error-text">Let us know how much loan you wish to request for.</span>
            </div>
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
      <b-button style="border-radius: 0" v-b-modal.modalbasic variant="primary" class="mt-4">Submit</b-button>
      <h6 class="mt-4">Please Note: The Cooperative Society has the right to impond the Vehicle purchased in the event of non-compliance with above stated condition of repayment on the scheme</h6>
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
</template>
<script>
import { required, maxLength, numeric, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'CreditLoan',
  props: { user: Object },
  data() {
    return {
      options: [
        { value: 1, text: "1 year" },
        { value: 2, text: "2 years" }
      ],
      loanNature: [
        { value: 'regular', text: "Regular Credit Loan" },
        { value: 'emergency', text: "Emergency Credit Loan" }
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
        fullname: this.user.first_name + ' ' + this.user.last_name,
        staff_id: this.user.employed_valid_id_card,
        credit_nature: "",
        loan_purpose: "",
        loan_amount: "",
        phone: this.user.phone_number,
        loan_obligation: "",
        monthly_thrift_contribution: "",
        regular_loan_repayment: "",
        emergency_loan_repayment: "",
        quick_loan_repayment: "",
        borrower_acct_details: "",
        email: this.user.email,
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
    };
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
      email: {
        required
      },
      phone: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
        numeric
      },
      staff_id: {
        required,
        minLength: minLength(7),
        maxLength: maxLength(8),
        numeric
      },
      credit_nature: {
        required
      },
      loan_amount: {
        required
      }
    }
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
    ...mapActions("loan", ["CreditLoanRequest"]),
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
</style>
