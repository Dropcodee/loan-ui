<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.analytics')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>

    <b-row>
      <b-colxx sm="12" md="6" class="mb-4">
        <b-card class="dashboard-filled-line-chart" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h5 class="d-inline">Loan Statistics</h5>
                <span class="text-muted text-small d-block">{{ $t('dashboards.unique-visitors') }}</span>
              </div>
            </div>
            <b-dropdown
              id="ddown5"
              :text="$t('dashboards.this-week')"
              size="xs"
              variant="outline-primary"
              class="float-right float-none-xs mt-2"
            >
              <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>
              <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>
            </b-dropdown>
          </b-card-body>
          <div class="chart card-body pt-0">
            <area-shadow-chart :data="areaChartData" :height="195" />
          </div>
        </b-card>
      </b-colxx>
      <b-colxx sm="12" md="6" class="mb-4">
        <b-card class="dashboard-filled-line-chart" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h5 class="d-inline">Savings</h5>
                <span class="text-muted text-small d-block">{{ $t('dashboards.per-session') }}</span>
              </div>
            </div>
            <b-dropdown
              id="ddown5"
              :text="$t('dashboards.this-week')"
              size="xs"
              variant="outline-secondary"
              class="float-right float-none-xs mt-2"
            >
              <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>
              <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>
            </b-dropdown>
          </b-card-body>
          <div class="chart card-body pt-0">
            <area-shadow-chart :data="conversionChartData" :height="195" />
          </div>
        </b-card>
      </b-colxx>
    </b-row>

    <b-row>
      <b-colxx style="min-width: 100%" xl="4" lg="6" md="12" class="mb-4">
        <b-card class="mb-4" :title="'Loan Borrowed / Amount Paid'">
          <div v-for="(s,index) in profileStatuses" :key="index" class="mb-4">
            <p class="mb-2">
              {{ s.title }}
              <span class="float-right text-muted">{{s.status}}/{{s.total}}</span>
            </p>
            <b-progress :value="(s.status / s.total) * 100"></b-progress>
          </div>
        </b-card>
      </b-colxx>
      <!-- <b-colxx xl="4" lg="6" md="12" class="mb-4"> -->
      <!-- <b-card class="h-100" :title="$t('dashboards.product-categories')">
          <div class="dashboard-donut-chart">
            <doughnut-shadow-chart :data="doughnutChartData" :height="300" />
          </div>
      </b-card>-->
      <!-- </b-colxx> -->
      <!-- <b-colxx xl="4" lg="12" md="12"> -->
      <!-- <b-row>
          <b-colxx xxs="6" class="mb-4">
            <small-line-chart-card
              class="dashboard-small-chart-analytics"
              label-prefix="$"
              :data="smallChartData1"
            />
          </b-colxx>
          <b-colxx xxs="6" class="mb-4">
            <small-line-chart-card
              class="dashboard-small-chart-analytics"
              label-prefix="$"
              :data="smallChartData2"
            />
          </b-colxx>
          <b-colxx xxs="6" class="mb-4">
            <small-line-chart-card
              class="dashboard-small-chart-analytics"
              label-prefix="$"
              :data="smallChartData3"
            />
          </b-colxx>
          <b-colxx xxs="6" class="mb-4">
            <small-line-chart-card
              class="dashboard-small-chart-analytics"
              label-prefix="$"
              :data="smallChartData4"
            />
          </b-colxx>
      </b-row>-->
      <!-- </b-colxx> -->
    </b-row>
  </div>
</template>

<script>
import AreaShadowChart from "../../../components/Charts/AreaShadow";
// import DoughnutShadowChart from "../../../components/Charts/DoughnutShadow";
// import PolarAreaShadowChart from "../../../components/Charts/PolarAreaShadow";
// import RadarShadowChart from "../../../components/Charts/RadarShadow";
// import LineShadowChart from "../../../components/Charts/LineShadow";

// import SmallLineChartCard from "../../../components/Cards/SmallLineChartCard";
// import RadialProgressCard from "../../../components/Cards/RadialProgressCard";

import Draggable from "vuedraggable";

import {
  areaChartData,
  conversionChartData,
  // doughnutChartData,
  // smallChartData1,
  // smallChartData2,
  // smallChartData3,
  // smallChartData4,
  // polarAreaChartData,
  // radarChartData,
  // lineChartData
} from "../../../data/charts";
import profileStatuses from "../../../data/profileStatuses";

export default {
  components: {
    "area-shadow-chart": AreaShadowChart,
    // "doughnut-shadow-chart": DoughnutShadowChart,
    // "small-line-chart-card": SmallLineChartCard,
    // draggable: Draggable,
    // "radial-progress-card": RadialProgressCard,
    // "polar-area-shadow-chart": PolarAreaShadowChart,
    // "radar-shadow-chart": RadarShadowChart,
    // "line-shadow-chart": LineShadowChart
  },
  data() {
    return {
      areaChartData,
      conversionChartData,
      // doughnutChartData,
      profileStatuses,
      // smallChartData1,
      // smallChartData2,
      // smallChartData3,
      // smallChartData4,
      // polarAreaChartData,
      // radarChartData,
      // lineChartData
    };
  }
};
</script>
