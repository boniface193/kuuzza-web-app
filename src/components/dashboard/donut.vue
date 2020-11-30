<template>
  <v-card elevation="0" class="mt-3">
    <h1 :class="bar_class">{{ bar_title }}</h1>
    <v-row>
      <v-col md="10" class="pr-0">
        <div class="d-flex justify-center">
          <div class="rounded-pill pa-125 round-img-bg-warning">
            <span class="donut-text text">250</span>
            <br />
            <span class="donut-sm-text">Orders</span>
          </div>

          <pie-chart
            class="mr-0"
            :donut="true"
            :data="data.dataSet"
            :colors="data.color"
            legend="right"
            width="80%"
          ></pie-chart>
        </div>
      </v-col>
      <!--  -->
      <v-col md="2">
        <div class="pt-24 d-none-md"></div>
        <div v-for="datas in data.dataSet" :key="datas">
          <div>
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
  margin-top: 70px;
  margin-right: 170px;
}

@media only screen and (max-width: 366px) {
  .round-img-bg-warning {
    position: absolute;
    margin-top: 115px;
  }
}

@media only screen and (max-width: 364px) {
  .round-img-bg-warning {
    position: absolute;
    margin-top: 80px;
  }

  div.round-img-bg-warning span.text {
    font-size: 20px;
    font-weight: normal;
  }
}

.donut-text {
  text-align: left;
  font: normal normal bold 40px/48px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}

.donut-sm-text {
  text-align: center;
  margin-left: 10px;
  font: normal normal normal 16px/19px "Product Sans" Light;
  letter-spacing: 0px;
  color: #646464;
  opacity: 0.7;
}

.pa-125 {
  padding: 50px;
}

.pt-24 {
  padding-top: 105px;
}
</style>