<template>
  <div>
    <vuetable
      ref="vuetable"
      :api-mode="false"
      :fields="fields"
      :per-page="perPage"
      :data-manager="dataManager"
      pagination-path="pagination"
      @vuetable:pagination-data="onPaginationData"
    ></vuetable>
    <vuetable-pagination-bootstrap ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination-bootstrap>
  </div>
</template>

<script>
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
          name: "title",
          sortField: "title",
          title: "Name",
          titleClass: "",
          dataClass: "list-item-heading"
        },
        {
          name: "sales",
          sortField: "sales",
          title: "Sales",
          titleClass: "",
          dataClass: "text-muted"
        },
        {
          name: "stock",
          sortField: "stock",
          title: "Stock",
          titleClass: "",
          dataClass: "text-muted"
        },
        {
          name: "category",
          sortField: "category",
          title: "Category",
          titleClass: "",
          dataClass: "text-muted"
        }
      ],
      perPage: 5,
      data: []
    };
  },

  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    }
  },

  mounted() {
    axios.get(apiUrl + "/cakes/fordatatable").then(response => {
      this.data = response.data.data;
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