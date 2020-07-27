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
      <template slot="custom-actions" slot-scope="props">
        <div>
          <i class="fas fa-money-bill-alt"></i>
          <b-button
            v-b-modal.modalbasic
            style="border-radius: 0px"
            variant="primary"
            size="md"
            class="btn-md"
            @click="setId(props.rowData)"
          >Click to pay</b-button>
        </div>
      </template>
    </vuetable>
    <vuetable-pagination-bootstrap ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination-bootstrap>
    <b-modal id="modalbasic" ref="modalbasic" size="lg" title="Payment Form">
      <h6>Input the amount you wish to pay</h6>
      <b-row>
        <b-colxx sm="12">
          <b-form-group label="Amount" class="has-float-label mb-4">
            <b-form-input
              type="text"
              v-model="amount"
              :class="$v.amount.$error ? 'is-invalid' : ''"
              @blur="$v.amount.$touch()"
            />
            <div v-if="$v.amount.$error">
              <span v-if="!$v.amount.required" class="error-text">Please input the amount</span>
              <span v-if="!$v.amount.numeric" class="error-text">Amount must contain numbers only</span>
            </div>
          </b-form-group>
        </b-colxx>
      </b-row>
      <paystack
        :amount="amount * 100"
        :email="currentUser.email"
        :paystackkey="paystackkey"
        :callback="callback"
        :reference="reference"
        :close="close"
        :embed="false"
        style="background: none; border: 0; padding: 0;"
      >
        <b-button
          v-b-modal.modalbasic
          style="border-radius: 0px"
          variant="primary"
          size="md"
          class="btn-md"
        >Deposit</b-button>
      </paystack>

      <template slot="modal-footer">
        <!-- <b-button variant="primary" type="submit">I Agree</b-button> -->
        <b-button variant="secondary" @click="hideModal('modalbasic')">Cancel</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import api from "@/services/Api";
import paystack from "vue-paystack";
import { mapGetters, mapActions, mapState } from "vuex";
import {
  required,
  maxLength,
  numeric,
  minLength,
} from "vuelidate/lib/validators";
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationBootstrap from "@/components/Common/VuetablePaginationBootstrap";
import moment from "moment";

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
      loan_selected: "",
      amount: "",
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
          name: "repayments.repayment_amount",
          sortField: "repayment_amount",
          title: "Repayment Amount",
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
        { name: "__slot:custom-actions", title: "" },
      ],
      perPage: 10,
      data: [],
    };
  },
  validations: {
    amount: {
      required,
      numeric,
    },
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
    notifications: {
      handler: function (notifications) {
        for (let i in notifications) {
          if (notifications[i].type == "error") {
            this.$notify("error", "Error Message", notifications[i].message, {
              duration: 3000,
              permanent: false,
            });
            this.requestError = true;
            setTimeout(() => this.removeNotification(notifications[i]), 5000);
          } else if (notifications[i].type == "success") {
            this.$notify("success", "Message", notifications[i].message, {
              duration: 3000,
              permanent: false,
            });
            this.requestError = false;
            setTimeout(() => this.removeNotification(notifications[i]), 3000);
          }
        }
      },
    },
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
          loan.repayments.repayment_amount =
            "₦" + loan.repayments.repayment_amount;

          loan.interest += "%";
          if (loan.status == 0) {
            loan.status = "Pending";
          } else if (loan.status == 1) {
            loan.status = "Verifying";
          } else if (loan.status == 2) {
            loan.status = "Running";
          } else if (loan.status == 3) {
            loan.status = "Failed";
          } else {
            loan.status = "Failed";
          }
        });
        console.log(this.data);
      });
  },

  methods: {
    ...mapActions("loan", ["loanRepayment"]),
    setId(payload) {
      this.loan_selected = payload.id;
      console.log(this.loan_selected);
    },
    moment: function () {
      return moment();
    },
    hideModal(refname) {
      this.$refs[refname].hide();

      if (refname === "modalnestedinline") {
        this.$refs["modalnested"].show();
      }
    },
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
      let payload = Object.assign(response, {
        loan_id: this.loan_selected,
        amount: this.amount,
        payment_date: moment(new Date(Date.now())).format("YYYY-MM-DD"),
      });
      console.log(payload);
      this.loanRepayment(payload);
      // this.reference();
      setTimeout(() => {
        // location.reload();
      }, 3000);
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