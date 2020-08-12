<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side">
          <p class="text-white h2">Become a member of LMU Loan Coperative today.</p>
          <p class="white mb-0">
            Please use this form to register.
            <br />If you are a member, please
            <router-link tag="a" to="/user/login" class="white">login</router-link>.
          </p>
        </div>
        <div class="form-side">
          <router-link tag="a" to="/">
            <span class="logo-single" />
          </router-link>
          <h6 class="mb-4">New Membership</h6>
          <b-form @submit.prevent="formSubmit">
            <div v-if="step == 1">
              <b-row>
                <b-colxx sm="6">
                  <b-form-group label="First Name" class="has-float-label mb-4">
                    <b-form-input
                      type="text"
                      v-model="form.firstname"
                      :class="$v.form.firstname.$error ? 'is-invalid' : ''"
                      @blur="$v.form.firstname.$touch()"
                    />
                    <div v-if="$v.form.firstname.$error">
                      <span
                        v-if="!$v.form.firstname.required"
                        class="error-text"
                      >Please enter your Firstname</span>
                    </div>
                  </b-form-group>
                </b-colxx>
                <b-colxx sm="6">
                  <b-form-group label="Last Name" class="has-float-label mb-4">
                    <b-form-input
                      type="text"
                      v-model="form.lastname"
                      :class="$v.form.lastname.$error ? 'is-invalid' : ''"
                      @blur="$v.form.lastname.$touch()"
                    />
                    <div v-if="$v.form.lastname.$error">
                      <span
                        v-if="!$v.form.lastname.required"
                        class="error-text"
                      >Please enter your Last Name</span>
                    </div>
                  </b-form-group>
                </b-colxx>
              </b-row>
              <b-form-group label="Department" class="has-float-label mb-4">
                <b-form-input
                  type="text"
                  v-model="form.department"
                  :class="$v.form.department.$error ? 'is-invalid' : ''"
                  @blur="$v.form.department.$touch()"
                />
                <div v-if="$v.form.department.$error">
                  <span
                    v-if="!$v.form.department.required"
                    class="error-text"
                  >Please enter your current department</span>
                </div>
              </b-form-group>
              <b-form-group label="College" class="has-float-label mb-4">
                <b-form-input
                  type="text"
                  v-model="form.college"
                  :class="$v.form.college.$error ? 'is-invalid' : ''"
                  @blur="$v.form.college.$touch()"
                />
                <div v-if="$v.form.college.$error">
                  <span
                    v-if="!$v.form.college.required"
                    class="error-text"
                  >Please enter your current college</span>
                  <!-- <span
                    v-if="!$v.form.phone.minLength"
                    class="error-text"
                  >Phone number must have up to {{ $v.form.phone.$params.minLength.min }} digits e.g 08022334455</span>
                  <span
                    v-if="!$v.form.phone.maxLength"
                    class="error-text"
                  >Phone number must have maximum of {{ $v.form.phone.$params.maxLength.max }} digits e.g 08022334455</span>
                  <span
                    v-if="!$v.form.phone.numeric"
                    class="error-text"
                  >Phone number must contain numbers alone.</span>-->
                </div>
              </b-form-group>
              <b-form-group label="Position" class="has-float-label mb-4">
                <b-form-input
                  type="text"
                  v-model="form.position"
                  :class="$v.form.position.$error ? 'is-invalid' : ''"
                  @blur="$v.form.position.$touch()"
                />
                <div v-if="$v.form.position.$error">
                  <span
                    v-if="!$v.form.position.required"
                    class="error-text"
                  >Please enter your current position</span>
                  <!-- <span
                    v-if="!$v.form.phone.minLength"
                    class="error-text"
                  >Phone number must have up to {{ $v.form.phone.$params.minLength.min }} digits e.g 08022334455</span>
                  <span
                    v-if="!$v.form.phone.maxLength"
                    class="error-text"
                  >Phone number must have maximum of {{ $v.form.phone.$params.maxLength.max }} digits e.g 08022334455</span>
                  <span
                    v-if="!$v.form.phone.numeric"
                    class="error-text"
                  >Phone number must contain numbers alone.</span>-->
                </div>
              </b-form-group>
              <b-form-group label="Staff ID Card NO" class="has-float-label mb-4">
                <b-form-input
                  type="text"
                  v-model="form.staff_id"
                  :class="$v.form.staff_id.$error ? 'is-invalid' : ''"
                  @blur="$v.form.staff_id.$touch()"
                />
                <div v-if="$v.form.staff_id.$error">
                  <span
                    v-if="!$v.form.staff_id.required"
                    class="error-text"
                  >Please enter your current staff number</span>
                  <!-- <span
                    v-if="!$v.form.phone.minLength"
                    class="error-text"
                  >Phone number must have up to {{ $v.form.phone.$params.minLength.min }} digits e.g 08022334455</span>
                  <span
                    v-if="!$v.form.phone.maxLength"
                    class="error-text"
                  >Phone number must have maximum of {{ $v.form.phone.$params.maxLength.max }} digits e.g 08022334455</span>-->
                  <!-- <span
                    v-if="!$v.form.phone.numeric"
                    class="error-text"
                  >Phone number must contain numbers alone.</span>-->
                </div>
              </b-form-group>
            </div>
            <div v-else-if="step==2">
              <b-form-group label="Address" class="has-float-label mb-4">
                <b-form-input
                  type="text"
                  v-model="form.address"
                  :class="$v.form.address.$error ? 'is-invalid' : ''"
                  @blur="$v.form.address.$touch()"
                />
                <div v-if="$v.form.address.$error">
                  <span
                    v-if="!$v.form.address.required"
                    class="error-text"
                  >Please enter your home address</span>
                  <!-- <span v-if="!$v.form.email.email" class="error-text">Please enter a valid E-mail</span> -->
                </div>
              </b-form-group>
              <b-row>
                <b-colxx sm="6">
                  <b-form-group label="Your Phone" class="has-float-label mb-4">
                    <b-form-input
                      type="text"
                      v-model="form.phone"
                      :class="$v.form.phone.$error ? 'is-invalid' : ''"
                      @blur="$v.form.phone.$touch()"
                    />
                    <div v-if="$v.form.phone.$error">
                      <span
                        v-if="!$v.form.phone.required"
                        class="error-text"
                      >Please enter your current phone number</span>
                      <span
                        v-if="!$v.form.phone.minLength"
                        class="error-text"
                      >Phone number must have up to {{ $v.form.phone.$params.minLength.min }} digits e.g 08022334455</span>
                      <span
                        v-if="!$v.form.phone.maxLength"
                        class="error-text"
                      >Phone number must have maximum of {{ $v.form.phone.$params.maxLength.max }} digits e.g 08022334455</span>
                      <span
                        v-if="!$v.form.phone.numeric"
                        class="error-text"
                      >Phone number must contain numbers alone.</span>
                    </div>
                  </b-form-group>
                </b-colxx>
                <b-colxx sm="6">
                  <b-form-group label="Your E-mail" class="has-float-label mb-4">
                    <b-form-input
                      type="email"
                      v-model="form.email"
                      :class="$v.form.email.$error ? 'is-invalid' : ''"
                      @blur="$v.form.email.$touch()"
                    />
                    <div v-if="$v.form.email.$error">
                      <span
                        v-if="!$v.form.email.required"
                        class="error-text"
                      >Please enter your E-mail</span>
                      <span
                        v-if="!$v.form.email.email"
                        class="error-text"
                      >Please enter a valid E-mail</span>
                    </div>
                  </b-form-group>
                </b-colxx>
              </b-row>
              <b-form-group label="Nature of Employment" class="has-float-label mb-4">
                <b-form-select v-model="form.nature_of_employment" :options="nature"></b-form-select>
                <!-- 
                <b-form-input
                  type="email"
                  v-model="form.nature_of_employment"
                  :class="$v.form.nature_of_employment.$error ? 'is-invalid' : ''"
                  @blur="$v.form.nature_of_employment.$touch()"
                />-->
                <div v-if="$v.form.nature_of_employment.$error">
                  <span
                    v-if="!$v.form.nature_of_employment.required"
                    class="error-text"
                  >Please choose your nature of employment</span>
                  <!-- <span v-if="!$v.form.email.email" class="error-text">Please enter a valid E-mail</span> -->
                </div>
              </b-form-group>
              <b-form-group label="Date of Employment" class="has-float-label mb-4">
                <v-date-picker
                  mode="single"
                  v-model="form.date_of_employment"
                  :input-props="{ class:'form-control', placeholder: $t('form-components.date') }"
                ></v-date-picker>
                <!-- <b-form-input
                  type="email"
                  v-model="form.date_of_employment"
                  :class="$v.form.date_of_employment.$error ? 'is-invalid' : ''"
                  @blur="$v.form.date_of_employment.$touch()"
                />-->
                <div v-if="$v.form.date_of_employment.$error">
                  <span
                    v-if="!$v.form.date_of_employment.required"
                    class="error-text"
                  >Please enter your date of employment</span>
                  <!-- <span v-if="!$v.form.email.email" class="error-text">Please enter a valid E-mail</span> -->
                </div>
              </b-form-group>
              <b-form-group label="Marital Status" class="has-float-label mb-4">
                <b-form-select v-model="form.marital_status" :options="marital"></b-form-select>
                <!-- 
                <b-form-input
                  type="email"
                  v-model="form.marital_status"
                  :class="$v.form.marital_status.$error ? 'is-invalid' : ''"
                  @blur="$v.form.marital_status.$touch()"
                />-->
                <div v-if="$v.form.marital_status.$error">
                  <span
                    v-if="!$v.form.marital_status.required"
                    class="error-text"
                  >Please choose your marital status</span>
                  <!-- <span v-if="!$v.form.email.email" class="error-text">Please enter a valid E-mail</span> -->
                </div>
              </b-form-group>
            </div>
            <div v-else-if="step == 3">
              <b-form-group label="Are you in any cooperative?" class="has-float-label mb-4">
                <b-form-select v-model="form.cooperative" :options="cooperative"></b-form-select>

                <!-- <b-form-input
                  type="email"
                  v-model="form.email"
                  :class="$v.form.email.$error ? 'is-invalid' : ''"
                  @blur="$v.form.email.$touch()"
                />-->
                <div v-if="$v.form.cooperative.$error">
                  <span
                    v-if="!$v.form.cooperative.required"
                    class="error-text"
                  >Please choose an option</span>
                  <!-- <span v-if="!$v.form.email.email" class="error-text">Please enter a valid E-mail</span> -->
                </div>
              </b-form-group>
              <b-row v-if="form.cooperative == 1">
                <b-colxx sm="6">
                  <b-form-group label="Name of membership" class="has-float-label mb-4">
                    <b-form-input
                      type="text"
                      v-model="form.name_of_membership"
                      :class="$v.form.name_of_membership.$error ? 'is-invalid' : ''"
                      @blur="$v.form.name_of_membership.$touch()"
                    />
                    <div v-if="$v.form.name_of_membership.$error">
                      <span
                        v-if="!$v.form.name_of_membership.required"
                        class="error-text"
                      >Please enter your name of membership</span>
                      <!-- <span
                        v-if="!$v.form.email.email"
                        class="error-text"
                      >Please enter a valid E-mail</span>-->
                    </div>
                  </b-form-group>
                </b-colxx>
                <b-colxx sm="6">
                  <b-form-group label="Date of membership" class="has-float-label mb-4">
                    <v-date-picker
                      mode="single"
                      v-model="form.date_of_membership"
                      :input-props="{ class:'form-control', placeholder: $t('form-components.date') }"
                    ></v-date-picker>
                    <div v-if="$v.form.date_of_membership.$error">
                      <span
                        v-if="!$v.form.date_of_membership.required"
                        class="error-text"
                      >Please enter your date of membership</span>
                    </div>
                  </b-form-group>
                </b-colxx>
              </b-row>
              <b-row>
                <b-colxx sm="6">
                  <b-form-group label="Savings of Interest" class="has-float-label mb-4">
                    <b-form-select v-model="form.savings" :options="savings"></b-form-select>

                    <!-- <b-form-input
                      type="text"
                      v-model="form.savings"
                      :class="$v.form.savings.$error ? 'is-invalid' : ''"
                      @blur="$v.form.savings.$touch()"
                    />-->
                    <div v-if="$v.form.savings.$error">
                      <span
                        v-if="!$v.form.savings.required"
                        class="error-text"
                      >Please enter your savings interest</span>
                      <!-- <span
                        v-if="!$v.form.email.email"
                        class="error-text"
                      >Please enter a valid E-mail</span>-->
                    </div>
                  </b-form-group>
                </b-colxx>
                <b-colxx sm="6">
                  <b-form-group label="Monthly Income" class="has-float-label mb-4">
                    <b-form-input
                      type="number"
                      v-model="form.income"
                      :class="$v.form.income.$error ? 'is-invalid' : ''"
                      @blur="$v.form.income.$touch()"
                    />
                    <div v-if="$v.form.income.$error">
                      <span
                        v-if="!$v.form.income.required"
                        class="error-text"
                      >Please enter your monthly income</span>
                      <!-- <span
                        v-if="!$v.form.email.email"
                        class="error-text"
                      >Please enter a valid E-mail</span>-->
                    </div>
                  </b-form-group>
                </b-colxx>
              </b-row>
              <b-form-group label="Name of Next of Kin" class="has-float-label mb-4">
                <b-form-input
                  type="text"
                  v-model="form.kin_name"
                  :class="$v.form.kin_name.$error ? 'is-invalid' : ''"
                  @blur="$v.form.kin_name.$touch()"
                />
                <div v-if="$v.form.kin_name.$error">
                  <span
                    v-if="!$v.form.kin_name.required"
                    class="error-text"
                  >Please enter next of kin name</span>
                  <!-- <span v-if="!$v.form.email.email" class="error-text">Please enter a valid E-mail</span> -->
                </div>
              </b-form-group>
              <b-form-group label="Address of Kin" class="has-float-label mb-4">
                <b-form-input
                  type="text"
                  v-model="form.kin_address"
                  :class="$v.form.kin_address.$error ? 'is-invalid' : ''"
                  @blur="$v.form.kin_address.$touch()"
                />
                <div v-if="$v.form.kin_address.$error">
                  <span
                    v-if="!$v.form.kin_address.required"
                    class="error-text"
                  >Please enter next of kin address</span>
                  <!-- <span v-if="!$v.form.email.email" class="error-text">Please enter a valid E-mail</span> -->
                </div>
              </b-form-group>
              <b-row>
                <b-colxx sm="6">
                  <b-form-group label="Email of Kin" class="has-float-label mb-4">
                    <b-form-input
                      type="email"
                      v-model="form.kin_email"
                      :class="$v.form.kin_email.$error ? 'is-invalid' : ''"
                      @blur="$v.form.kin_email.$touch()"
                    />
                    <div v-if="$v.form.kin_email.$error">
                      <span
                        v-if="!$v.form.kin_email.required"
                        class="error-text"
                      >Please enter next of kin E-mail</span>
                      <span
                        v-if="!$v.form.kin_email.email"
                        class="error-text"
                      >Please enter a valid E-mail</span>
                    </div>
                  </b-form-group>
                </b-colxx>
                <b-colxx sm="6">
                  <b-form-group label="Phone NO of Kin" class="has-float-label mb-4">
                    <b-form-input
                      type="text"
                      v-model="form.kin_phone"
                      :class="$v.form.kin_phone.$error ? 'is-invalid' : ''"
                      @blur="$v.form.kin_phone.$touch()"
                    />
                    <div v-if="$v.form.kin_phone.$error">
                      <span
                        v-if="!$v.form.kin_phone.required"
                        class="error-text"
                      >Please enter next of kin phone number</span>
                      <span
                        v-if="!$v.form.kin_phone.minLength"
                        class="error-text"
                      >Phone number must have up to {{ $v.form.kin_phone.$params.minLength.min }} digits e.g 08022334455</span>
                      <span
                        v-if="!$v.form.kin_phone.maxLength"
                        class="error-text"
                      >Phone number must have maximum of {{ $v.form.kin_phone.$params.maxLength.max }} digits e.g 08022334455</span>
                      <span
                        v-if="!$v.form.kin_phone.numeric"
                        class="error-text"
                      >Phone number must contain numbers alone.</span>
                    </div>
                  </b-form-group>
                </b-colxx>
              </b-row>
              <b-row>
                <b-colxx sm="6">
                  <b-form-group label="Your Password" class="has-float-label mb-4">
                    <b-form-input
                      type="password"
                      v-model="form.password"
                      :class="$v.form.password.$error ? 'is-invalid' : ''"
                      @blur="$v.form.password.$touch()"
                    />
                    <div v-if="$v.form.password.$error">
                      <span
                        v-if="!$v.form.password.required"
                        class="error-text"
                      >Please enter your password</span>
                      <span
                        v-if="!$v.form.password.minLength"
                        class="error-text"
                      >Password must have at least {{ $v.form.password.$params.minLength.min }} characters.</span>
                    </div>
                  </b-form-group>
                </b-colxx>
                <b-colxx sm="6">
                  <b-form-group label="Confirm Password" class="has-float-label mb-4">
                    <b-form-input
                      type="password"
                      v-model="form.confirmPassword"
                      :class="$v.form.confirmPassword.$error ? 'is-invalid' : ''"
                      @blur="$v.form.confirmPassword.$touch()"
                    />
                    <div v-if="$v.form.confirmPassword.$error">
                      <span
                        v-if="!$v.form.confirmPassword.sameAsPassword"
                        class="error-text"
                      >Passwords must be identical.</span>
                    </div>
                  </b-form-group>
                </b-colxx>
              </b-row>
            </div>

            <div class="d-flex justify-content-end align-items-center">
              <b-button
                v-if="step == 2 || step == 3"
                @click="step--"
                variant="secondary"
                size="lg"
                class="btn-shadow"
                :class="{'btn-multiple-state btn-shadow': true,
                    'show-spinner': processing,
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
                <!-- <span class="icon fail">
                  <i class="simple-icon-exclamation"></i>
                </span>-->
                <span class="label">Back</span>
              </b-button>&nbsp;
              &nbsp;
              &nbsp;
              <b-button
                v-if="step == 3"
                type="submit"
                variant="primary"
                size="lg"
                :disabled="$v.$anyError || processing"
                class="btn-shadow"
                :class="{'btn-multiple-state btn-shadow': true,
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
                <span class="label">Register</span>
              </b-button>
              <b-button
                v-if="step == 1 || step == 2"
                @click="step++"
                variant="primary"
                size="lg"
                class="btn-shadow"
                :class="{'btn-multiple-state btn-shadow': true,
                    'show-spinner': processing, }"
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
                <span class="label">Next</span>
              </b-button>
            </div>
            <br />
            <div class="d-flex justify-content-between align-items-center">
              <span>
                Have an account?
                <router-link tag="a" to="/user/login">Login here</router-link>
              </span>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import {
  required,
  requiredIf,
  minLength,
  email,
  maxLength,
  sameAs,
  numeric,
} from "vuelidate/lib/validators";
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      nature: [
        { value: "Tenure", text: "Tenure" },
        { value: "Sabbatical", text: "Sabbatical" },
        { value: "Contract", text: "Contract" },
      ],
      marital: [
        { value: "Married", text: "Married" },
        { value: "Single", text: "Single" },
      ],
      cooperative: [
        { value: true, text: "Yes" },
        { value: false, text: "No" },
      ],

      savings: [
        { value: "thrift", text: "Thrift" },
        { value: "Target", text: "Target" },
      ],

      step: 1,
      form: {
        firstname: "",
        lastname: "",
        department: "",
        college: "",
        position: "",
        staff_id: "",
        address: "",
        nature_of_employment: "",
        date_of_employment: null,
        marital_status: "",
        cooperative: "",
        name_of_membership: "",
        date_of_membership: null,
        savings: "",
        income: "",
        kin_name: "",
        kin_address: "",
        kin_email: "",
        kin_phone: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      requestError: null,
    };
  },
  validations: {
    form: {
      firstname: {
        required,
      },
      lastname: {
        required,
      },
      email: {
        required,
        email,
      },
      department: {
        required,
      },
      college: {
        required,
      },
      position: {
        required,
      },
      address: {
        required,
      },
      cooperative: {
        required,
      },
      nature_of_employment: {
        required,
      },
      date_of_employment: {
        required,
      },
      staff_id: {
        required,
      },
      marital_status: {
        required,
      },
      cooperative: {
        required,
      },
      name_of_membership: {
        required: requiredIf(function () {
          return this.form.cooperative;
        }),
      },
      date_of_membership: {
        required: requiredIf(function () {
          return this.form.cooperative;
        }),
      },
      savings: {
        required,
      },
      income: {
        required,
      },
      kin_name: {
        required,
      },
      kin_address: {
        required,
      },
      kin_email: {
        required,
        email,
      },
      kin_phone: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
      },
      phone: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
        numeric,
      },
      password: {
        required,
        minLength: minLength(7),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  computed: {
    ...mapGetters("user", ["processing"]),
    ...mapState("notification", ["notifications"]),
  },
  methods: {
    ...mapActions("user", ["RegisterUser"]),
    ...mapActions("notification", ["remove"]),
    formatDate() {
      this.form.displayDate = moment(this.form.startDate).format("MMM Do YYYY");
      console.log(this.form.displayDate);
    },
    formSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const {
          firstname,
          lastname,
          email,
          phone,
          password,
          income,
          college,
          department,
          staff_id,
          address,
          nature_of_employment,
          marital_status,
          position,
          date_of_membership,
          name_of_membership,
          cooperative,
          date_of_employment,
          kin_name,
          kin_address,
          kin_email,
          kin_phone,
          savings,
        } = this.form;
        console.log(this.form);
        try {
          const payload = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
            phone_number: phone,
            address: address,
            college: college,
            date_of_membership:
              date_of_membership != null
                ? moment(date_of_membership).format("YYYY-MM-D")
                : null,
            date_started: moment(date_of_employment).format("YYYY-MM-D"),
            department: department,
            employed_work_id_card: staff_id,
            employment: position,
            in_cooperative: cooperative,
            kin_name: kin_name,
            kin_address: kin_address,
            kin_email: kin_email,
            kin_phone: kin_phone,
            marital_status: marital_status,
            monthly_income: income,
            name_of_membership: name_of_membership,
            nature_of_employment: nature_of_employment,
            savings_interest: savings,
          };
          console.log(payload);
          this.RegisterUser(payload);
        } catch (err) {
          this.requestError = true;
          console.log("component print" + err);
        }
      }
    },
    removeNotification(notification) {
      console.log(notification);
      this.remove(notification);
    },
  },
  watch: {
    notifications(notifications) {
      // loop through all notifications and
      // display one at a time
      notifications.forEach((notification) => {
        this.$notify(`${notification.type}`, "Error", notification.message);
        if (notification.type == "error") {
          this.requestError = true;
        }
        // let as = this;
        if (notification.type == "success") {
          this.requestError = false;
        }
        this.removeNotification(notification);
      });
    },
  },
};
</script>
