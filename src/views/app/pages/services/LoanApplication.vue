<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="header" />
        <div class="separator mb-5"></div>
        <p class="lead">Welcome back {{ currentUser.first_name.charAt(0).toUpperCase() + currentUser.first_name.slice(1) }} {{ currentUser.last_name.charAt(0).toUpperCase() + currentUser.last_name.slice(1) }}</p>
        <p v-if="currentUser.account_number == null">Please Complete your profile to get started. <router-link to="/" class="primary"> Click Here </router-link>
        </p>
        <p v-else> Please fill out all the details for your loan application</p>
      </b-colxx>
    </b-row>
    <b-colxx xxs="12" xs="12" md="12" lg="10">
      <b-card class="mb-4" no-body>
        <b-tabs card no-fade>
          <b-tab title="Commodity Loan" active title-item-class="w-30 text-center">
            <commodity-loan :user="currentUser" :guarantors="guarantorsList" />
          </b-tab>
          <b-tab title="Regular & Emmergency Loan" active title-item-class="w-30 text-center">
            <h5 class="mb-4 card-title">Wedding Cake with Flowers Macarons and Blueberries</h5>
            <b-button size="sm" variant="outline-primary">Edit</b-button>
          </b-tab>
          <b-tab title="Car Acquisition Loan" active title-item-class="w-30 text-center">
            <h5 class="mb-4 card-title">Cheesecake with Chocolate Cookies and Cream Biscuits</h5>
            <b-button size="sm" variant="outline-primary">Edit</b-button>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-colxx>
  </div>
</template>
<script>
import CommodityLoan from '@/components/payo/CommodityLoanForm'
import { mapGetters, mapActions, mapState } from 'vuex'
import ash from 'lodash'

export default {

  name: 'loan-application',
  components: {
    CommodityLoan
  },
  data() {
    return {
      header: 'Loan Application Form',
      guarantorsList: []
    };
  },

  computed: {
    ...mapGetters('user', ['currentUser']),
    ...mapGetters('loan', ['potentialGuarantors']),
    ...mapState('notification', ["notifications"]),
  },
  methods: {
    ...mapActions('notification', ["remove"]),
    ...mapActions('loan', ["FetchGuarantors"]),
    interest(amount, interest) {
      if (amount == '' || amount == null) {
        return 0
      } else {
        const interestRate = this.form.interest / 100
        const newInterest = interestRate * amount
        this.yearlyInterest = newInterest * this.form.tenure
        return parseInt(amount) + parseInt(this.yearlyInterest)
      }
    },
    removeNotification(notification) {
      console.log(notification)
      this.remove(notification)
    },
    pushToGurantorsList(guarantor) {
      // console.log(guarantor);
      this.guarantorsList.push({
        'value': guarantor.id,
        'text': ash.startCase(guarantor.first_name) + ' ' + ash.startCase(guarantor.last_name)
      })
    }
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
          let as = this;
          setTimeout(() => as.removeNotification(notifications[i]), 3000)
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
    this.FetchGuarantors()
  }
};

</script>
<style lang="css" scoped>
.mt-12 {
  margin-top: 4rem
}

.mt-8 {
  margin-top: 3rem
}

</style>
