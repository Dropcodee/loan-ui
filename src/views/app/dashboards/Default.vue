/* eslint-disable vue/no-unused-components */
<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.default')" />
        <div class="separator mb-5"></div>
        <p class="lead">Welcome back {{ currentUser.first_name.charAt(0).toUpperCase() + currentUser.first_name.slice(1) }} {{ currentUser.last_name.charAt(0).toUpperCase() + currentUser.last_name.slice(1) }}</p>
        <p>Please Complete your profile to get started. <router-link
            to="/"
            class="primary"
          > Click Here </router-link>
        </p>
      </b-colxx>
    </b-row>
     <b-row>
        <b-colxx xl="12" lg="12" md="12">
            <b-row>
                <b-colxx xxs="6" md="3" lg="3" class="mb-4">
                    <icon-card title="Total Savings" value="10,000" />
                </b-colxx>
                <b-colxx xxs="6" md="3" lg="3" class="mb-4">
                    <icon-card title="Total Loans" value="50,000" />
                </b-colxx>
                <b-colxx xxs="6" md="3" lg="3" class="mb-4">
                    <icon-card title="Total Loan Repaid" value="10,000" />
                </b-colxx>
            </b-row>
        </b-colxx>
    </b-row>
    <h2 class="text-left mt-4">Here are some of our services</h2>
    <b-row>
      <b-colxx
        lg="12"
        xl="12"
      >
        <draggable class="col mt-4">
          <b-colxx
            class="mb-4"
            v-for="(service, index) in serviceListing"
            :key="index"
          >
            <list-card-component :service="service">
            </list-card-component>
          </b-colxx>
        </draggable>
      </b-colxx>
      <!-- <b-colxx
        xl="4"
        lg="4"
        class="mb-4 mt-4"
      >
        <b-card
          class="mb-4"
          :title="'Loan Borrowed / Amount Paid'"
        >
          <div
            v-for="(s,index) in profileStatuses"
            :key="index"
            class="mb-4"
          >
            <p class="mb-2">
              {{ s.title }}
              <span class="float-right text-muted">{{s.status}}/{{s.total}}</span>
            </p>
            <b-progress :value="(s.status / s.total) * 100"></b-progress>
          </div>
        </b-card>
        <b-card
          class="mb-4"
          :title="'Your Savings from last 3 months '"
        >
          <div
            v-for="(s,index) in profileStatuses"
            :key="index"
            class="mb-4"
          >
            <p class="mb-2">
              {{ s.title }}
              <span class="float-right text-muted">{{s.status}}/{{s.total}}</span>
            </p>
            <b-progress :value="(s.status / s.total) * 100"></b-progress>
          </div>
        </b-card>
      </b-colxx> -->
    </b-row>
  </div>
</template>
<script>
import GlideComponent from "../../../components/Carousel/GlideComponent";
import ListcardComponent from "@/components/payo/ListcardComponent";

import {
  CalendarView,
  CalendarViewHeader,
  CalendarMathMixin
} from "vue-simple-calendar";

import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../components/Common/VuetablePaginationBootstrap";

import Draggable from "vuedraggable";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import IconCard from "../../../components/Cards/IconCard";
import GradientCard from "../../../components/Cards/GradientCard";
import GradientWithRadialProgressCard from "../../../components/Cards/GradientWithRadialProgressCard";
import SmallLineChartCard from "../../../components/Cards/SmallLineChartCard";

import RadialProgressCard from "../../../components/Cards/RadialProgressCard";
import LineShadowChart from "../../../components/Charts/LineShadow";
import PolarAreaShadowChart from "../../../components/Charts/PolarAreaShadow";
import AreaShadowChart from "../../../components/Charts/AreaShadow";

import RecentOrderItem from "../../../components/Listing/RecentOrderItem";
import LogList from "../../../components/Listing/LogList";
import ListWithUserItem from "../../../components/Listing/ListWithUserItem";
import TwoColumnList from "../../../components/Listing/TwoColumnList";
import TopRatedSlideItem from "../../../components/Listing/TopRatedSlideItem";

import {
  lineChartData,
  polarAreaChartData,
  areaChartData,
  conversionChartData,
  smallChartData1,
  smallChartData2,
  smallChartData3,
  smallChartData4
} from "../../../data/charts";
import logs from "../../../data/logs";
import products from "../../../data/products";
import tickets from "../../../data/tickets";
import profileStatuses from "../../../data/profileStatuses";
import cakes from "../../../data/cakes";
import { apiUrl } from "../../../constants/config";

import { mapGetters } from "vuex";

export default {
  components: {
    "glide-component": GlideComponent,
    "icon-card": IconCard,
    "gradient-card": GradientCard,
    "line-shadow-chart": LineShadowChart,
    "recent-order-item": RecentOrderItem,
    "polar-area-shadow-chart": PolarAreaShadowChart,
    "area-shadow-chart": AreaShadowChart,
    "log-list": LogList,
    "list-with-user-item": ListWithUserItem,
    "calendar-view": CalendarView,
    "calendar-view-header": CalendarViewHeader,
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "two-column-list": TwoColumnList,
    draggable: Draggable,
    "radial-progress-card": RadialProgressCard,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "v-select": vSelect,
    "small-line-chart-card": SmallLineChartCard,
    "top-rated-slide-item": TopRatedSlideItem,
    "list-card-component": ListcardComponent
  },
  mixins: [CalendarMathMixin],
  data() {
    return {
      glideIconsOption: {
        gap: 5,
        perView: 4,
        type: "carousel",
        breakpoints: {
          320: {
            perView: 1
          },
          576: {
            perView: 2
          },
          1600: {
            perView: 3
          },
          1800: {
            perView: 4
          }
        },
        hideNav: true
      },
      lineChartData,
      products,
      polarAreaChartData,
      logs,
      tickets,
      serviceListing: [
        {
          type: {
            mode: "link",
            location: "/app/pages/services/savings-application"
          },
          title: "Create a savings account",
          description:
            "Create your savings account to enable you for loan applications.",
          buttonText: "Create Acount"
        },
        {
          type: "modal",
          location: [
            {
              title: "Commodity Loan Application",
              link: "commodity-application"
            },
            {
              title: "Credit Loans (Regular or Emmergency Loans)",
              link: "credit-loan"
            },
            { title: "Car Aquizition Loan", link: "car-application" }
          ],
          title: "Apply for loans",
          description:
            "Start applying for loans from as low as 50,000 ranging from staff related loans, land acquisition loans with affordable interest rates. check out our loan application types.",
          buttonText: "Loan Application"
        },
        {
          type: {
            mode: "link",
            location: "/app/pages/monitors/loan-monitor"
          },
          title: "Verified Loan Application",
          description:
            "Checkout all your verified loan application status and progress.",
          buttonText: "View Verified Loans"
        }
      ],
      calendar: {
        showDate: this.thisMonth(1),
        events: [
          {
            id: "e2",
            startDate: this.thisMonth(15),
            title: "Meeting",
            classes: "secondary"
          },
          {
            id: "e3",
            startDate: this.thisMonth(8, 9, 25),
            endDate: this.thisMonth(9, 16, 30),
            title: "Sales",
            classes: "primary"
          },
          {
            id: "e5",
            startDate: this.thisMonth(5),
            endDate: this.thisMonth(12),
            title: "Tax Days",
            classes: "secondary"
          },
          {
            id: "e10",
            startDate: this.thisMonth(27),
            title: "My Birthday!"
          }
        ]
      },
      bestsellers: {
        apiUrl: apiUrl + "/cakes/fordatatable",
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
        ]
      },
      profileStatuses,
      cakes,
      areaChartData,
      conversionChartData,
      selectData: [
        {
          label: "Chocolate",
          value: "chocolate"
        },
        {
          label: "Vanilla",
          value: "vanilla"
        },
        {
          label: "Strawberry",
          value: "strawberry"
        },
        {
          label: "Caramel",
          value: "caramel"
        },
        {
          label: "Cookies and Cream",
          value: "cookiescream"
        },
        {
          label: "Peppermint",
          value: "peppermint"
        }
      ],
      smallChartData1,
      smallChartData2,
      smallChartData3,
      smallChartData4,
      glideTopRatedOption: {
        gap: 5,
        perView: 1,
        type: "carousel",
        peek: {
          before: 0,
          after: 100
        },
        breakpoints: {
          480: {
            perView: 1
          },
          992: {
            perView: 2
          },
          1200: {
            perView: 1
          }
        },
        hideNav: true
      }
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser"])
  },
  methods: {
    refreshButtonClick() {
      console.log("refreshButtonClick");
    },
    thisMonth(d, h, m) {
      const t = new Date();
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },
    onClickDay(d) {
      console.log(`You clicked: ${d.toLocaleDateString()}`);
    },
    onClickEvent(e) {
      console.log(`You clicked: ${e.title}`);
    },
    setShowDate(d) {
      this.calendar.showDate = d;
    },
    onDropDate(event, date) {
      console.log(`You dropped ${event.id} on ${date.toLocaleDateString()}`);

      const eLength = this.dayDiff(event.startDate, date);
      event.originalEvent.startDate = this.addDays(event.startDate, eLength);
      event.originalEvent.endDate = this.addDays(event.endDate, eLength);
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    }
  }
};
</script>
