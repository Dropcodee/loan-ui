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
import _ from "lodash";

export default {
  name: "savings-monitor",

  components: {
    vuetable: Vuetable,
    VuetablePagination,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
  },

  data() {
    return {
      fields: [
        {
          name: "message",
          sortField: "message",
          title: "Message",
          titleClass: "",
          dataClass: "list-item-heading",
          sortDirection: "desc",
        },
        {
          name: "amount",
          sortField: "amount",
          title: "Amount",
          titleClass: "",
          dataClass: "text-muted",
        },
        {
          name: "created_at",
          sortField: "created_at",
          title: "Date",
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
        {
          name: "Approved",
          sortField: "Approved",
          title: "Admin approval",
          titleClass: "",
          dataClass: "text-muted",
        },
        // interest
        // status
      ],
      perPage: 10,
      data: [],
    };
  },
  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    },
  },

  mounted() {
    api()
      .get("savings")
      .then((response) => {
        const { savings_payment } = response.data.data;
        this.data = savings_payment;
        this.data.forEach((data) => {
          data.amount = "₦" + data.amount;
          data.Approved = data.Approved == false ? "Pending" : "Approved";
        });
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
  },
};
</script>

<style lang="css" scoped>
</style>
