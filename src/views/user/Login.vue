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
              <b-form-input type="text" v-model="form.phone" />
            </b-form-group>
            <b-form-group label="Password" class="has-float-label mb-4">
              <b-form-input type="password" v-model="form.password" />
            </b-form-group>
            <div class="d-flex justify-content-between align-items-center">
              <router-link tag="a" to="/user/forgot-password">{{ $t('user.forgot-password-question')}}</router-link>
              <b-button type="submit" variant="primary" size="lg" :disabled="processing" :class="{'btn-multiple-state btn-shadow': true,
                    'show-spinner': processing,
                    'show-success': !processing && loginError===false,
                    'show-fail': !processing && loginError }">
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
import {
  validationMixin
} from "vuelidate";
const {
  required,
  maxLength,
  minLength,
  email
} = require("vuelidate/lib/validators");

export default {
  data() {
    return {
      form: {
        phone: "09013747651",
        password: "xxxxxx"
      },
      timeout: null,
      notification: null,
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
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
      const payload = {
        phone_number: this.form.phone,
        password: this.form.password
      }
      try {
        this.loginUser(payload);
      } catch (err) {
        console.log(err)
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
    loginError(val) {
      if (val != null) {
        this.$notify("error", "Login Error", val, {
          duration: 3000,
          permanent: false
        });

      }
    }
  }
};

</script>
