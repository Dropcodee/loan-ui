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
    ></vuetable>
    <vuetable-pagination-bootstrap ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination-bootstrap>
  </div>
</template>

<script>
import api from "@/services/Api";
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationBootstrap from "@/components/Common/VuetablePaginationBootstrap";
// import axios from "axios";
import _ from "lodash";

export default {
  name: "app",

  components: {
    vuetable: Vuetable,
    VuetablePagination,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap
  },

  data() {
    return {
      fields: [
        {
          name: "loan_type",
          sortField: "loan_type",
          title: "Loan Type",
          titleClass: "",
          dataClass: "list-item-heading",
          sortDirection: "desc"
        },
        // {
        //   name: "loan_purpose",
        //   sortField: "loan_purpose",
        //   title: "Loan Purpose",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "credit_loan_type",
        //   sortField: "credit_loan_type",
        //   title: "Credit Loan Type",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "commodity_nature",
        //   sortField: "commodity_nature",
        //   title: "Commodity Nature",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "guarantor_verify_link",
        //   sortField: "guarantor_verify_link",
        //   title: "Guarantor Verify Link",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "principal_amount_words",
        //   sortField: "principal_amount_words",
        //   title: "Principal Amount in Words",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "asset_brand",
        //   sortField: "asset_brand",
        //   title: "Asset Brand",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "target_loan",
        //   sortField: "target_loan",
        //   title: "Target Loan",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "monthly_thrift_contribution",
        //   sortField: "monthly_thrift_contribution",
        //   title: "Monthly Thrift Contribution",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "monthly_regular_loan_repay",
        //   sortField: "monthly_regular_loan_repay",
        //   title: "Monthly Regular Loan Repay",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "monthly_emergency_loan_repay",
        //   sortField: "monthly_emergency_loan_repay",
        //   title: "Monthly Emergency Loan Repay",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "quick_loan_repay",
        //   sortField: "quick_loan_repay",
        //   title: "Quick Loan Repay",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        // {
        //   name: "method_of_repayment",
        //   sortField: "method_of_repayment",
        //   title: "Method of Repayment",
        //   titleClass: "",
        //   dataClass: "list-item-heading"
        // },
        {
          name: "principal_amount",
          sortField: "principal_amount",
          title: "Amount",
          titleClass: "",
          dataClass: "text-muted"
        },
        {
          name: "interest",
          sortField: "interest",
          title: "Interest",
          titleClass: "",
          dataClass: "text-muted"
        },
        {
          name: "status",
          sortField: "status",
          title: "Status",
          titleClass: "",
          dataClass: "text-muted"
        }
        // interest
        // status
      ],
      perPage: 10,
      data: []
    };
  },

  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    }
  },

  mounted() {
    api()
      .get("/myloans")
      .then(response => {
        // console.log(response)
        const { loans } = response.data;
        this.data = loans;
        this.data.forEach(loan => {
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
        data: _.slice(local, from, to)
      };
    }
  }
};
</script>

<style>
.table-responsive th {
  vertical-align: top !important;
}
</style>