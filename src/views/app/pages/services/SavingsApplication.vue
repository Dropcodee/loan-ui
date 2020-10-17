<<<<<<< HEAD
<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="header" />
        <div class="separator mb-5"></div>
        <p class="lead">Welcome back {{ currentUser.first_name.charAt(0).toUpperCase() + currentUser.first_name.slice(1) }} {{ currentUser.last_name.charAt(0).toUpperCase() + currentUser.last_name.slice(1) }}</p>
        <p v-if="currentUser.account_number == null">
          Please Complete your profile to get started.
          <router-link :to="{name: 'Settings'}" class="primary">Click Here</router-link>
        </p>
        <p v-else>Please fill out all the details for your loan application</p>
      </b-colxx>
    </b-row>
    <SavingsForm
      :guarantors="guarantorsList"
      :user="currentUser"
      :requestError="requestError"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { required, maxLength, numeric } from "vuelidate/lib/validators";
import SavingsForm from "@/components/payo/SavingsForm";
import ash from "lodash";
import moment from "moment";

export default {
  name: "car-aquisition",
  components: {
    SavingsForm
  },

  data() {
    return {
      header: "Car Aquistion Form",
      timeout: null,
      guarantorsList: [],
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
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("loan", ["potentialGuarantors", "processing"]),
    ...mapState("notification", ["notifications"])
  },
  methods: {
    ...mapActions("notification", ["remove"]),
    ...mapActions("loan", ["FetchGuarantors"]),
    removeNotification(notification) {
      // console.log(notification);
      this.remove(notification);
    },
    pushToGurantorsList(guarantor) {
      // console.log(guarantor);
      this.guarantorsList.push({
        value: guarantor.id,
        name:
          ash.startCase(guarantor.first_name) +
          " " +
          ash.startCase(guarantor.last_name)
      });
    }
  },
  watch: {
    notifications: {
      handler: function(notifications) {
        for (let i in notifications) {
          if (notifications[i].type == "error") {
            this.$notify("error", "Error Message", notifications[i].message, {
              duration: 3000,
              permanent: false
            });
            this.requestError = true;
            setTimeout(() => this.removeNotification(notifications[i]), 5000);
          } else if (notifications[i].type == "success") {
            this.$notify("success", "Message", notifications[i].message, {
              duration: 3000,
              permanent: false
            });
            this.requestError = false;
            setTimeout(() => this.removeNotification(notifications[i]), 3000);
          }
        }
      }
    },
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
=======
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
    <SavingsForm :guarantors="guarantorsList" :user="currentUser" :requestError="requestError" />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { required, maxLength, numeric } from "vuelidate/lib/validators";
import SavingsForm from "@/components/payo/SavingsForm";
import ash from "lodash";
import moment from "moment";

export default {
  name: "car-aquisition",
  components: {
    SavingsForm
  },

  data() {
    return {
      header: "Car Aquistion Form",
      timeout: null,
      guarantorsList: [],
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
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("loan", ["potentialGuarantors", "processing"]),
    ...mapState("notification", ["notifications"])
  },
  methods: {
    ...mapActions("notification", ["remove"]),
    ...mapActions("loan", ["FetchGuarantors"]),
    removeNotification(notification) {
      // console.log(notification);
      this.remove(notification);
    },
    pushToGurantorsList(guarantor) {
      // console.log(guarantor);
      this.guarantorsList.push({
        value: guarantor.id,
        name:
          ash.startCase(guarantor.first_name) +
          " " +
          ash.startCase(guarantor.last_name)
      });
    }
  },
  watch: {
    notifications: {
      handler: function(notifications) {
        for (let i in notifications) {
          if (notifications[i].type == "error") {
            this.$notify("error", "Error Message", notifications[i].message, {
              duration: 3000,
              permanent: false
            });
            this.requestError = true;
            setTimeout(() => this.removeNotification(notifications[i]), 5000);
          } else if (notifications[i].type == "success") {
            this.$notify("success", "Message", notifications[i].message, {
              duration: 3000,
              permanent: false
            });
            this.requestError = false;
            setTimeout(() => this.removeNotification(notifications[i]), 3000);
          }
        }
      }
    },
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
>>>>>>> 532d5da3b4c7361c2c96c529546f4420530df234
