<template>
  <v-card elevation="0" class="pt-10">
    <h1 :class="bar_class">{{ bar_title }}</h1>
    <!-- displays the bar-chart -->
    <v-container>
      <apexchart
        width="100%"
        type="bar"
        height="337"
        :options="reformBarChart.chartOptions"
        :series="getAllRevenue.series"
      ></apexchart>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  props: ["bar_class", "bar_title", "chart"],
  data() {
    return {
      userInfo: {},
    };
  },

  computed: {
    ...mapGetters({
      revenue: "totalRevenue/revenue",
      dateXaxis: "totalRevenue/getDate",
    }),

    getAllRevenue() {
      let totalRevenue = this.revenue.total_revenue;
      let awaiting = this.revenue.awaiting_settlement;
      let settled = this.revenue.settled;

      return {
        series: [
          {
            name: "Total Revenue(N)",
            data: [parseInt(totalRevenue, 10)],
          },
          {
            name: "Awaiting Settlements(N)",
            data: [parseInt(awaiting, 10)],
          },
          {
            name: "Settlements",
            data: [parseInt(settled, 10)],
          },
        ],
      };
    },

    reformBarChart() {
      let startDate = this.dateXaxis.startDate;
      let endDate = this.dateXaxis.endDate;
      let bothDate =
        moment(startDate).calendar() + " - " + moment(endDate).calendar();
      return {
        chartOptions: {
          chart: {
            type: "bar",
            height: 350,
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              endingShape: "flat",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: false,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: [bothDate],
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: "top",
          },
          colors: ["#029B97", "#FFA500", "#1C3737"],
        },
      };
    },
  },

  created() {
    this.$store.dispatch("settings/getUserProfile").then((res) => {
      this.userInfo = res.data.data.store.id;
      this.$store.dispatch("totalRevenue/getTotalRevenue", {
        id: this.userInfo,
      });
    });

    this.getAllRevenue.series.forEach((i) => {
      console.log(i);
    });
  },
};
</script>

<style lang="scss" scoped>
// area-chart heading design
.chart-heading {
  text-align: left;
  margin-left: 15px;
  font: normal normal bold 20px/1px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}
.apexcharts-toolbar {
  /* position: absolute; */
  z-index: 11;
  max-width: 176px;
  text-align: right;
  border-radius: 3px;
  padding: 0px 6px 2px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>