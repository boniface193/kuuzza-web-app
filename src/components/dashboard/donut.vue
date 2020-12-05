<template>
  <!-- donut chart -->
  <v-card elevation="0">
    <h1 :class="bar_class">{{ bar_title }}</h1>
    <v-row>
      <v-col md="10" class="pr-0 text-center">
        <div class="px-10">
          <div
            class="rounded-pill pa-125 round-img-bg-warning my-lg-16 my-md-16 mx-lg-5"
          >
            <div
              class="text-center mx-lg-15 mx-xl-16 mx-md-13 my-lg-16 my-md-16"
            >
              <span class="donut-text text text-md-subtitle-1 text-lg-h4 text"
                >250</span
              >
              <br />
              <span class="donut-sm-text text-lg-subtitle-1 text-md-caption"
                >Orders</span
              >
            </div>
          </div>

          <pie-chart
            class=""
            :donut="true"
            :data="data.dataSet"
            :colors="data.color"
            legend="right"
            width="90%"
          ></pie-chart>
        </div>
      </v-col>
      <!--  -->
      <v-col md="2" class="pl-0">
        <div class="mt-16 pt-10">
          <div v-for="datas in data.dataSet" :key="datas">
            <span :style="{ color: data.color }">{{ datas }}</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["bar_class", "bar_title", "chart"],
  data() {
    return {
      data: {
        dataSet: {
          "Awaiting processing": 64,
          Processing: 60,
          Shipped: 100,
          Completed: 24,
        },
        color: ["#5064CC", "#FFD500", "#52F1EC", "#00B944"],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kumbh&family=Montserrat&family=Poppins&family=Roboto&family=Product+Sans&display=swap");

.chart-heading {
  text-align: left;
  margin-left: 15px;
  font: normal normal bold 20px/24px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}

.round-img-bg-warning {
  position: absolute;
}

.donut-text {
  // text-align: left;
  font: normal normal bold 40px/0px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}

.donut-sm-text {
  font: normal normal normal 16px/0px "Product Sans" Light;
  letter-spacing: 0px;
  color: #646464;
  opacity: 0.7;
}

div#chart-5 {
  margin: auto;
}
</style>