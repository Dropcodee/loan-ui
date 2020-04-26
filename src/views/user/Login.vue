<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side">
          <p class="text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
          <p class="white mb-0">
            Please use your credentials to login.
            <br />If you are not a member, please
            <router-link tag="a" to="/user/register" class="blue">register</router-link>.
          </p>
        </div>
        <div class="form-side">
          <router-link tag="a" to="/">
            <span class="logo-single" />
          </router-link>
          <h6 class="mb-4">{{ $t('user.login-title')}}</h6>
          <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
            <b-form-group label="Phone Number" class="has-float-label mb-4">
              <b-form-input type="text" v-model="form.phone" :class="$v.form.phone.$error ? 'is-invalid' : ''" @blur="$v.form.phone.$touch()" />
              <div v-if="$v.form.phone.$error">
                <span v-if="!$v.form.phone.required" class="error-text">Please enter your registered phone number</span>
                <span v-if="!$v.form.phone.minLength" class="error-text">Phone number must have up to {{ $v.form.phone.$params.minLength.min }} digits e.g 08022334455</span>
                <span v-if="!$v.form.phone.maxLength" class="error-text">Phone number must have maximum of {{ $v.form.phone.$params.maxLength.max }} digits e.g 08022334455</span>
                <span v-if="!$v.form.phone.numeric" class="error-text">Phone number must contain numbers alone.</span>
              </div>
            </b-form-group>
            <b-form-group label="Password" class="has-float-label mb-4">
              <b-form-input type="password" v-model="form.password" :class="$v.form.password.$error ? 'is-invalid' : ''" @blur="$v.form.password.$touch()" />
              <div v-if="$v.form.password.$error">
                <span v-if="!$v.form.password.required" class="error-text">Please enter your password</span>
                <span v-if="!$v.form.password.minLength" class="error-text">Password must have at least {{ $v.form.password.$params.minLength.min }} characters. </span>
              </div>
            </b-form-group>
            <div class="d-flex justify-content-between align-items-center">
              <router-link tag="a" to="/user/forgot-password">{{ $t('user.forgot-password-question')}}</router-link>
              <b-button type="submit" variant="primary" size="lg" :disabled="$v.$anyError || processing" :class="{'btn-multiple-state btn-shadow': true,
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
                <span class="label">Login</span>
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import {
  mapGetters,
  mapActions,
  mapState
} from "vuex";
import { required, minLength, email, maxLength, sameAs, numeric } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form: {
        phone: "09013747651",
        password: "xxxxxx"
      },
      timeout: null,
      requestError: null
    };
  },
  validations: {
    form: {
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
    }
  },
  computed: {
    ...mapGetters('user', ["currentUser", "processing", "loginError"]),
    ...mapState('notification', ["notifications"]),
  },
  methods: {
    ...mapActions('user', ["loginUser"]),
    ...mapActions('notification', ["remove"]),
    removeNotification(notification) {
      console.log(notification)
      this.remove(notification)
    },
    formSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const payload = {
          phone_number: this.form.phone,
          password: this.form.password
        }
        try {
          this.loginUser(payload);
        } catch (err) {
          // console.log(err)
          this.requestError = true
        }
      }
    }
  },
  watch: {
    currentUser(val) {
      if (val && val.uid && val.uid.length > 0) {
        setTimeout(() => {
          this.$router.push("/");
        }, 200);
      }
    },
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
};

</script>
