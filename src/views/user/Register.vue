<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10 class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side ">
          <p class=" text-white h2">Become a member of LMU Loan Coperative today.</p>
          <p class="white mb-0"> Please use this form to register. <br />If you are a member, please
            <router-link tag="a" to="/user/login" class="white">login</router-link>.
          </p>
        </div>
        <div class="form-side">
          <router-link tag="a" to="/"><span class="logo-single" /></router-link>
          <h6 class="mb-4">New Membership</h6>
          <b-form @submit.prevent="formSubmit">
            <b-form-group label="First Name" class="has-float-label mb-4">
              <b-form-input type="text" v-model="form.firstname" :class="$v.form.firstname.$error ? 'is-invalid' : ''" @blur="$v.form.firstname.$touch()" />
              <div v-if="$v.form.firstname.$error">
                <span v-if="!$v.form.firstname.required" class="error-text">Please enter your Firstname</span>
              </div>
            </b-form-group>
            <b-form-group label="Last Name" class="has-float-label mb-4">
              <b-form-input type="text" v-model="form.lastname" :class="$v.form.lastname.$error ? 'is-invalid' : ''" @blur="$v.form.lastname.$touch()" />
              <div v-if="$v.form.lastname.$error">
                <span v-if="!$v.form.lastname.required" class="error-text">Please enter your Last Name</span>
              </div>
            </b-form-group>
            <b-form-group label="Your Phone" class="has-float-label mb-4">
              <b-form-input type="text" v-model="form.phone" :class="$v.form.phone.$error ? 'is-invalid' : ''" @blur="$v.form.phone.$touch()" />
              <div v-if="$v.form.phone.$error">
                <span v-if="!$v.form.phone.required" class="error-text">Please enter your current phone number</span>
                <span v-if="!$v.form.phone.minLength" class="error-text">Phone number must have up to {{ $v.form.phone.$params.minLength.min }} digits e.g 08022334455</span>
                <span v-if="!$v.form.phone.maxLength" class="error-text">Phone number must have maximum of {{ $v.form.phone.$params.maxLength.max }} digits e.g 08022334455</span>
                <span v-if="!$v.form.phone.numeric" class="error-text">Phone number must contain numbers alone.</span>
              </div>
            </b-form-group>
            <b-form-group label="Your E-mail" class="has-float-label mb-4">
              <b-form-input type="email" v-model="form.email" :class="$v.form.email.$error ? 'is-invalid' : ''" @blur="$v.form.email.$touch()" />
              <div v-if="$v.form.email.$error">
                <span v-if="!$v.form.email.required" class="error-text">Please enter your E-mail</span>
                <span v-if="!$v.form.email.email" class="error-text">Please enter a valid E-mail</span>
              </div>
            </b-form-group>
            <b-form-group label="Your Password" class="has-float-label mb-4">
              <b-form-input type="password" v-model="form.password" :class="$v.form.password.$error ? 'is-invalid' : ''" @blur="$v.form.password.$touch()" />
              <div v-if="$v.form.password.$error">
                <span v-if="!$v.form.password.required" class="error-text">Please enter your password</span>
                <span v-if="!$v.form.password.minLength" class="error-text">Password must have at least {{ $v.form.password.$params.minLength.min }} characters. </span>
              </div>
            </b-form-group>
            <b-form-group label="Confirm Password" class="has-float-label mb-4">
              <b-form-input type="password" v-model="form.confirmPassword" :class="$v.form.confirmPassword.$error ? 'is-invalid' : ''" @blur="$v.form.confirmPassword.$touch()" />
              <div v-if="$v.form.confirmPassword.$error">
                <span v-if="!$v.form.confirmPassword.sameAsPassword" class="error-text">Passwords must be identical.</span>
              </div>
            </b-form-group>
            <div class="d-flex justify-content-end align-items-center">
              <b-button type="submit" variant="primary" size="lg" :disabled="$v.$anyError || processing" class="btn-shadow" :class="{'btn-multiple-state btn-shadow': true,
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
                <span class="label">Register</span>
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { required, minLength, email, maxLength, sameAs, numeric } from 'vuelidate/lib/validators'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
      requestError: null
    }
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
        email
      },
      phone: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
        numeric
      },
      password: {
        required,
        minLength: minLength(7)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  computed: {
    ...mapGetters('user', ['processing']),
    ...mapState('notification', ["notifications"]),
  },
  methods: {
    ...mapActions('user', ['RegisterUser']),
    ...mapActions('notification', ["remove"]),
    formSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const { firstname, lastname, email, phone, password } = this.form
        try {
          const payload = {
            first_name: firstname,
            last_name: lastname,
            phone_number: phone,
            email,
            password
          }
          this.RegisterUser(payload)
        } catch (err) {
          this.requestError = true
          console.log('component print' + err)
        }
      }
    },
    removeNotification(notification) {
      console.log(notification)
      this.remove(notification)
    },
  },
  watch: {
    notifications(notifications) {
      for (let i in notifications) {
        if (notifications[i].type == 'error') {
          this.$notify("error", "Error Message", notifications[i].message, {
            duration: 3000,
            permanent: false
          });
          this.requestError = true
          let as = this;
          setTimeout(() => as.removeNotification(notifications[i]), 3000)
        } else if (notifications[i].type == 'success') {
          this.$notify("success", "Message", notifications[i].message, {
            duration: 3000,
            permanent: false
          });
        }
      }
    },
  }
}

</script>
