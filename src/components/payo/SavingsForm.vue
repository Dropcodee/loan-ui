<template>
  <div>
    <b-row v-if="!getUser">
      <b-colxx>
        <b-form
          @submit.prevent="formSubmit"
          class="av-tooltip tooltip-label-bottom"
        >
          <!-- <h6 class="mb-4 text-center">Car Aquisition</h6> -->
          <b-row>
            <b-colxx sm="12">
              <b-form-group label="Fullname" class="has-float-label mb-4">
                <b-form-input
                  disabled
                  type="text"
                  v-model="form.fullname"
                  :class="$v.form.fullname.$error ? 'is-invalid' : ''"
                  @blur="$v.form.fullname.$touch()"
                />
                <div v-if="$v.form.fullname.$error">
                  <span v-if="!$v.form.fullname.required" class="error-text"
                    >Please complete your profile to fill this details</span
                  >
                </div>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Staff ID" class="has-float-label mb-4">
                <b-form-input
                  disabled
                  type="text"
                  v-model="form.staff_id"
                  :class="$v.form.staff_id.$error ? 'is-invalid' : ''"
                  @blur="$v.form.staff_id.$touch()"
                />
                <div v-if="$v.form.staff_id.$error">
                  <span v-if="!$v.form.staff_id.required" class="error-text"
                    >Please complete your profile to fill this details</span
                  >
                </div>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="College" class="has-float-label mb-4">
                <b-form-input
                  disabled
                  type="text"
                  v-model="form.college"
                  :class="$v.form.college.$error ? 'is-invalid' : ''"
                  @blur="$v.form.college.$touch()"
                />
                <div v-if="$v.form.college.$error">
                  <span v-if="!$v.form.college.required" class="error-text"
                    >Please complete your profile to fill this details</span
                  >
                </div>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Department" class="has-float-label mb-4">
                <b-form-input
                  disabled
                  type="text"
                  v-model="form.department"
                  :class="$v.form.department.$error ? 'is-invalid' : ''"
                  @blur="$v.form.department.$touch()"
                />
                <div v-if="$v.form.department.$error">
                  <span v-if="!$v.form.department.required" class="error-text"
                    >Please complete your profile to fill this details</span
                  >
                </div>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="GSM NO" class="has-float-label mb-4">
                <b-form-input
                  disabled
                  type="text"
                  v-model="form.phone"
                  :class="$v.form.phone.$error ? 'is-invalid' : ''"
                  @blur="$v.form.phone.$touch()"
                />
                <div v-if="$v.form.phone.$error">
                  <span v-if="!$v.form.phone.required" class="error-text"
                    >Please complete your profile to fill this details</span
                  >
                </div>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12">
              <b-form-group label="Account Number" class="has-float-label mb-4">
                <b-form-input
                  type="text"
                  v-model="form.acct_no"
                  :class="$v.form.acct_no.$error ? 'is-invalid' : ''"
                  @blur="$v.form.acct_no.$touch()"
                />
                <div v-if="$v.form.acct_no.$error">
                  <span v-if="!$v.form.acct_no.required" class="error-text"
                    >Please enter your Account Number.</span
                  >
                  <span v-if="!$v.form.acct_no.numeric" class="error-text"
                    >Account number must contain numbers alone.</span
                  >
                </div>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="6">
              <b-form-group
                label="Monthly Deposit"
                class="has-float-label mb-4"
              >
                <b-form-input
                  type="text"
                  v-model="form.monthly_deposit"
                  :class="$v.form.monthly_deposit.$error ? 'is-invalid' : ''"
                  @blur="$v.form.monthly_deposit.$touch()"
                />
                <div v-if="$v.form.monthly_deposit.$error">
                  <span
                    v-if="!$v.form.monthly_deposit.required"
                    class="error-text"
                    >Please enter the amount you wish to deposit on a monthly
                    basis.</span
                  >
                  <span
                    v-if="!$v.form.monthly_deposit.numeric"
                    class="error-text"
                    >Savings must contain numbers alone.</span
                  >
                </div>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="6">
              <b-form-group
                label="Deposit type"
                class="has-float-label mb-4"
              >
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
                  :options="options"
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
            </b-colxx>
          </b-row>
          <div class="d-flex justify-content-around align-items-center">
            <b-button
              variant="success"
              type="submit"
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

      <FormPreviewSavings
        class="has-float-label mb-4"
        :user="user"
        :previewData="form"
        title="Savings Application Preview"
      />
    </b-row>
    <b-row v-else>
      <b-colxx xxs="12">
        <div class="separator mb-5"></div>
        <p style="font-size: 13.6px" class="lead">
          You already have a savings account, Please
          <router-link
            to="/app/pages/billing/SavingsPayment"
            style="color: #2a863f"
            class="secondary"
            >click here &nbsp;</router-link
          >to pay your monthly savings
        </p>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import FormPreviewSavings from "./FormPreviewSavings";
import {
  required,
  maxLength,
  numeric,
  minLength,
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "CarAcquisition",
  props: { user: Object, guarantors: Array, requestError: [Boolean, null] },

  components: { FormPreviewSavings },
  computed: {
    ...mapGetters("savings", ["processing"]),
    ...mapGetters("savings", ["getUser"]),
  },

  data() {
    return {
      userSavings: null,
      // days: [
      //   "Sunday",
      //   "Monday",
      //   "Tuesday",
      //   "Wednesday",
      //   "Thursday",
      //   "Friday",
      //   "Saturday"
      // ],
      options: [
        { value: "automatic", text: "Automatic" },
        { value: "manual", text: "Manual" },
        // { value: 180, text: "6 months" },
        // { value: 365, text: "1 year" },
        // { value: 730, text: "2 years" }
      ],
      form: {
        fullname: this.user.first_name + " " + this.user.last_name,
        staff_id: this.user.employed_valid_id_card,
        college: this.user.college,
        department: this.user.department,
        phone: this.user.phone_number,
        acct_no: null,
        monthly_deposit: null,
        charge: null,
        // interest: 8,
        // tenure: null
      },
      // yearlyInterest: 0,
      loanTotal: 0,
    };
  },
  validations: {
    form: {
      fullname: {
        required,
      },
      college: {
        required,
      },
      charge: {
        required,
      },
      department: {
        required,
      },
      phone: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
        numeric,
      },
      staff_id: {
        required,
        minLength: minLength(7),
        maxLength: maxLength(8),
        numeric,
      },
      acct_no: {
        required,
        numeric,
      },
      monthly_deposit: {
        required,
        numeric,
      },
    },
  },
  methods: {
    ...mapActions("savings", ["createSavings"]),
    ...mapActions("savings", ["getSavings"]),
    moment: function () {
      return moment();
    },

    formSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const loggedInUser = this.user;
        const payload = {
          monthly_payment: this.form.monthly_deposit,
          account_number: this.form.acct_no,
          schedule: this.form.charge
        };
        // console.log(payload);
        // this.step++;
        try {
          this.createSavings(payload);
        } catch (err) {
          return err;
        }
      }
    },
  },
  watch: {},
  created() {
    this.getSavings();
  },
};
</script>
<style lang="css" scoped>
</style>
