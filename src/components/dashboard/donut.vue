<template>
  <!-- donut chart -->
  <v-card elevation="0">
    <h1 :class="bar_class">{{ bar_title }}</h1>
    <v-row>
      <v-col md="10" class="pr-0 text-center">
        <div class="px-10">
          <div
            class="rounded-pill pa-125 round-img-bg-warning my-lg-16 my-md-16 mx-lg-5 mx-xl-67"
          >
            <div
              class="text-center mx-lg-15 mx-xl-25 mx-lg-25 mx-md-13 my-lg-16 my-md-16"
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

@media (min-width: 960px) {
  .mx-lg-25 {
    margin: 64px 125px 64px 125px !important;
  }
}

@media (min-width: 990px) {
  .mx-lg-25 {
    margin: 64px 135px 64px 135px !important;
  }
}

@media (min-width: 1010px) {
  .mx-lg-25 {
    margin: 64px 145px 64px 145px !important;
  }
}

@media (min-width: 1050px) {
  .mx-lg-25 {
    margin: 64px 160px 64px 160px !important;
  }
}

@media (min-width: 1085px) {
  .mx-lg-25 {
    margin: 64px 165px 64px 165px !important;
  }
}

@media (min-width: 1097px) {
  .mx-lg-25 {
    margin: 64px 170px 64px 170px !important;
  }
}

@media (min-width: 1119px) {
  .mx-lg-25 {
    margin: 64px 175px 64px 175px !important;
  }
}

@media (min-width: 1145px) {
  .mx-lg-25 {
    margin: 64px 182px 64px 182px !important;
  }
}

@media (min-width: 1165px) {
  .mx-lg-25 {
    margin: 64px 190px 64px 190px !important;
  }
}

@media (min-width: 1200px) {
  .mx-lg-25 {
    margin: 64px 200px 64px 200px !important;
  }
}

@media (min-width: 1210px) {
  .mx-lg-25 {
    margin: 64px 210px 64px 210px !important;
  }
}

@media (min-width: 1255px) {
  .mx-lg-25 {
    margin: 64px 225px 64px 225px !important;
  }
}

@media (min-width: 1264px) {
  .mx-lg-25 {
    margin: 64px 120px 64px 120px !important;
  }
}

@media (min-width: 1300px) {
  .mx-lg-25 {
    margin: 64px 125px 64px 125px !important;
  }
}

@media (min-width: 1320px) {
  .mx-lg-25 {
    margin: 64px 135px 64px 135px !important;
  }
}

@media (min-width: 1345px) {
  .mx-lg-25 {
    margin: 64px 145px 64px 145px !important;
  }
}

@media (min-width: 1380px) {
  .mx-lg-25 {
    margin: 64px 155px 64px 155px !important;
  }
}

@media (min-width: 1405px) {
  .mx-lg-25 {
    margin: 64px 160px 64px 160px !important;
  }
}

@media (min-width: 1420px) {
  .mx-lg-25 {
    margin: 64px 165px 64px 165px !important;
  }
}

@media (min-width: 1435px) {
  .mx-lg-25 {
    margin: 64px 170px 64px 170px !important;
  }
}

@media (min-width: 1465px) {
  .mx-lg-25 {
    margin: 64px 180px 64px 180px !important;
  }
}

@media (min-width: 1485px) {
  .mx-lg-25 {
    margin: 64px 190px 64px 190px !important;
  }
}

@media (min-width: 1525px) {
  .mx-lg-25 {
    margin: 64px 200px 64px 200px !important;
  }
}

@media (min-width: 1555px) {
  .mx-lg-25 {
    margin: 64px 210px 64px 210px !important;
  }
}

@media (min-width: 1590px) {
  .mx-lg-25 {
    margin: 64px 220px 64px 220px !important;
  }
}

@media (min-width: 1620px) {
  .mx-lg-25 {
    margin: 64px 230px 64px 230px !important;
  }
}

@media (min-width: 1645px) {
  .mx-lg-25 {
    margin: 64px 235px 64px 235px !important;
  }
}

@media (min-width: 1668px) {
  .mx-lg-25 {
    margin: 64px 245px 64px 245px !important;
  }
}

@media (min-width: 1692px) {
  .mx-lg-25 {
    margin: 64px 250px 64px 250px !important;
  }
}

@media (min-width: 1715px) {
  .mx-lg-25 {
    margin: 64px 255px 64px 255px !important;
  }
}

@media (min-width: 1730px) {
  .mx-lg-25 {
    margin: 64px 263px 64px 263px !important;
  }
}

@media (min-width: 1750px) {
  .mx-lg-25 {
    margin: 64px 270px 64px 270px !important;
  }
}

@media (min-width: 1777px) {
  .mx-lg-25 {
    margin: 64px 277px 64px 277px !important;
  }
}

@media (min-width: 1799px) {
  .mx-lg-25 {
    margin: 64px 282px 64px 282px !important;
  }
}
</style>