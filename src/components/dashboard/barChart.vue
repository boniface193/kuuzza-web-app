<template>
  <v-card elevation="0" class="py-8 px-5">
    <h1 :class="bar_class">{{ bar_title }}</h1>
    <!-- displays the bar-chart -->
    <apexchart
      class="d-flex justify-center mx-6"
      width="100%"
      type="bar"
      height="337"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script>
export default {
  props: ["bar_class", "bar_title", "chart"],
  data() {
    return {
      series: [
        {
          name: "Total Revenue(N)- 23M",
          data: [230000, 175000, 239000, 160000, 210000, 160000, 180000],
        },
        {
          name: "Settlements(N)- 19M",
          data: [145000, 120000, 160000, 55000, 95000, 90000, 80000],
        },
        {
          name: "Awaiting Settlements(N)- 6M",
          data: [95000, 51000, 70000, 95000, 125000, 95000, 52000],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
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
          categories: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
        },
        colors: ["#5064CC", "#52F1EC", "#44099F"],
      },
    };
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
</style>