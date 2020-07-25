<template>
  <div class="table-responsive">
    <vuetable
      ref="vuetable"
      :api-mode="false"
      :fields="fields"
      :per-page="perPage"
      :data-manager="dataManager"
      pagination-path="pagination"
      @vuetable:pagination-data="onPaginationData"
      responsive
    >
      <template slot="custom-actions">
        <div>
          <paystack
            :amount="100 * 100"
            :email="currentUser.email"
            :paystackkey="paystackkey"
            :callback="callback"
            :reference="reference"
            :close="close"
            :embed="false"
            style="background: none; border: 0; padding: 0;"
          >
            <i class="fas fa-money-bill-alt"></i>
            <b-button style="border-radius: 0px" variant="primary" size="md" class="btn-md">Pay</b-button>
          </paystack>
        </div>
      </template>
    </vuetable>
    <vuetable-pagination-bootstrap ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination-bootstrap>
  </div>
</template>

<script>
import api from "@/services/Api";
import paystack from "vue-paystack";
import { mapGetters, mapActions, mapState } from "vuex";
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationBootstrap from "@/components/Common/VuetablePaginationBootstrap";
// import axios from "axios";
import _ from "lodash";

export default {
  name: "app",

  components: {
    paystack,
    vuetable: Vuetable,
    VuetablePagination,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
  },

  data() {
    return {
      paystackkey: "pk_test_706a3aea6696fcb3d8cfd4107621aef869a134f4",
      fields: [
        {
          name: "loan_type",
          sortField: "loan_type",
          title: "Loan Type",
          titleClass: "",
          dataClass: "list-item-heading",
          sortDirection: "desc",
        },
        {
          name: "principal_amount",
          sortField: "principal_amount",
          title: "Amount",
          titleClass: "",
          dataClass: "text-muted",
        },
        {
          name: "interest",
          sortField: "interest",
          title: "Interest",
          titleClass: "",
          dataClass: "text-muted",
        },
        {
          name: "status",
          sortField: "status",
          title: "Status",
          titleClass: "",
          dataClass: "text-muted",
        },
        { name: "__slot:custom-actions", title: "Pay" },
      ],
      perPage: 10,
      data: [],
    };
  },

  computed: {
    ...mapGetters("user", ["currentUser"]),
    ...mapState("notification", ["notifications"]),
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < Math.random() * 100; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    },
  },

  watch: {
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < Math.random() * 100; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    },
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    },
  },

  mounted() {
    api()
      .get("/myloans")
      .then((response) => {
        // console.log(response)
        const { loans } = response.data;
        this.data = loans;
        this.data.forEach((loan) => {
          loan.principal_amount = "₦" + loan.principal_amount;
          loan.interest += "%";
          if (loan.status == 0) {
            loan.status = "Pending";
          } else if (loan.status == 1) {
            loan.status = "Verifying";
          } else if (loan.status == 2) {
            loan.status = "Running";
          } else if (loan.status == 3) {
            loan.status = "Completed";
          } else {
            loan.status = "Failed";
          }
        });
        console.log(this.data);
      });
  },

  methods: {
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      if (this.data.length < 1) return;

      let local = this.data;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      );
      // console.log("pagination:", pagination);
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to),
      };
    },
    removeNotification(notification) {
      this.remove(notification);
    },
    callback: function (response) {
      // let payload = Object.assign(response, {
      //   savings_id: this.getUser.id,
      //   amount: this.getUser.amount,
      //   payment_date: new Date(Date.now()),
      // });
      // console.log(payload);
      // this.createTransaction(payload);
      // // this.reference();
      // setTimeout(() => {
      //   location.reload();
      // }, 3000);
      console.log(response);
    },
    close: function () {
      // console.log("Payment closed");
    },
  },
};
</script>

<style>
.table-responsive th {
  vertical-align: top !important;
}
</style>