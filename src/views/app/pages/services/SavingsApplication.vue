<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="header" />
        <div class="separator mb-5"></div>
        <p class="lead">Welcome back {{ currentUser.first_name.charAt(0).toUpperCase() + currentUser.first_name.slice(1) }} {{ currentUser.last_name.charAt(0).toUpperCase() + currentUser.last_name.slice(1) }}</p>
        <p v-if="currentUser.account_number == null">Please Complete your profile to get started. <router-link
            to="/"
            class="primary"
          > Click Here </router-link>
        </p>
        <p v-else> Please fill out all the details for your loan application</p>
      </b-colxx>
    </b-row>
    <savings-form
      :user="currentUser"
      :requestError='requestError'
    />
  </div>
</template>

<script>
import SavingsForm from "@/components/payo/SavingsForm";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "loan-application",
  components: { SavingsForm },
  data() {
    return {
      header: "Savings Application Form",
      guarantorsList: [],
      requestError: null
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
    ...mapState("notification", ["notifications"])
  },
  methods: {
    ...mapActions("notification", ["remove"])
  },
  watch: {
    notifications(notifications) {
      for (let i in notifications) {
        if (notifications[i].type == "error") {
          this.$notify("error", "Error Message", notifications[i].message, {
            duration: 3000,
            permanent: false
          });
          this.requestError = true;
          let as = this;
          setTimeout(() => as.removeNotification(notifications[i]), 3000);
        } else if (notifications[i].type == "success") {
          this.$notify("success", "Message", notifications[i].message, {
            duration: 3000,
            permanent: false
          });
          let as = this;
          this.requestError = false;
          setTimeout(() => as.removeNotification(notifications[i]), 3000);
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
