<template>
  <v-card elevation="0" height="435px">
    <h1 :class="bar_class">{{ bar_title }}</h1>
    <area-chart
      class="pb-10 pr-5 pl-5"
      :data="label"
      :messages="{ empty: 'No data' }"
      :download="true"
    ></area-chart>
  </v-card>
</template>

<script>
export default {
  props: ["bar_class", "bar_title", "chart"],
  data() {
    return {
      label: {
        Sun: 0,
        Mon: 500,
        Tue: 1000,
        Wed: 1300,
        Thur: 1200,
        Fri: 1700,
        Sat: 2500,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.chart-heading {
  text-align: left;
  margin-left: 15px;
  font: normal normal bold 20px/24px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}
</style>