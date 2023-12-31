<template>
  <!-- donut chart -->
  <v-card elevation="0" class="rounded-lg">
    <h1 :class="bar_class">{{ bar_title }}</h1>

    <v-row>
      <v-col md="10" class="text-center">
        <v-skeleton-loader type="article" v-if="orderStatus">
        </v-skeleton-loader>
        <div class="px-10" v-if="!orderStatus">
          <div
            class="rounded-pill pa-125 round-img-bg-warning my-lg-16 my-md-16 mx-lg-5 mx-xl-67"
          >
            <div
              class="text-center mx-lg-15 mx-xl-25 mx-lg-25 mx-md-13 my-lg-16 my-md-16"
            >
              <span
                class="donut-text text text-md-subtitle-1 text-lg-h4 text"
                >{{ totalOrder }}</span
              >
              <br />
              <span class="donut-sm-text text-lg-subtitle-1 text-md-caption"
                >Orders</span
              >
            </div>
          </div>
          <pie-chart
            :donut="true"
            :data="data"
            :colors="color"
            legend="right"
            width="90%"
            empty="No data"
          ></pie-chart>
        </div>
      </v-col>
      <v-col md="2" class="pl-0">
        <v-skeleton-loader type="article" v-if="orderStatus">
        </v-skeleton-loader>
        <div class="mt-16 pt-10" v-if="!orderStatus">
          <div v-for="datas in data" :key="datas.id">
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
      orderStatus: true,
      totalOrder: 0,
      data: {},
      color: ["#029B97", "#FFA500", "#1C3737", "#00B944"],
    };
  },

  async created() {
    await this.$store.dispatch("orderStatus/getOrderStatus").then((res) => {
      let dataSet = {
        "Awaiting processing": res.awaiting_processing,
        Processing: res.processing,
        Shipped: res.shipped,
        Completed: res.completed,
      };
      this.data = dataSet;
      this.totalOrder =
        res.awaiting_processing + res.processing + res.shipped + res.completed;
      this.orderStatus = false;
    });
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

@supports (-moz-appearance: none) {
  @media (min-width: 1024px) {
    .mx-lg-25 {
      margin: 64px 282px 64px 75px !important;
    }
  }

  @media (min-width: 960px) {
    .mx-lg-25 {
      margin: 64px 125px 64px 60px !important;
    }
  }

  @media (min-width: 990px) {
    .mx-lg-25 {
      margin: 64px 135px 64px 70px !important;
    }
  }

  @media (min-width: 1010px) {
    .mx-lg-25 {
      margin: 64px 145px 64px 75px !important;
    }
  }

  @media (min-width: 1050px) {
    .mx-lg-25 {
      margin: 64px 160px 64px 84px !important;
    }
  }

  @media (min-width: 1080px) {
    .mx-lg-25 {
      margin: 64px 165px 64px 93px !important;
    }
  }

  @media (min-width: 1112px) {
    .mx-lg-25 {
      margin: 64px 170px 64px 100px !important;
    }
  }

  @media (min-width: 1140px) {
    .mx-lg-25 {
      margin: 64px 182px 64px 110px !important;
    }
  }

  @media (min-width: 1186px) {
    .mx-lg-25 {
      margin: 64px 190px 64px 120px !important;
    }
  }

  @media (min-width: 1220px) {
    .mx-lg-25 {
      margin: 64px 200px 64px 130px !important;
    }
  }

  @media (min-width: 1263px) {
    .mx-lg-25 {
      margin: 64px 210px 64px 140px !important;
    }
  }

  @media (min-width: 1264px) {
    .mx-lg-25 {
      margin: 64px 225px 64px 35px !important;
    }
  }

  @media (min-width: 1272px) {
    .mx-lg-25 {
      margin: 64px 120px 64px 40px !important;
    }
  }

  @media (min-width: 1300px) {
    .mx-lg-25 {
      margin: 64px 125px 64px 45px !important;
    }
  }

  @media (min-width: 1320px) {
    .mx-lg-25 {
      margin: 64px 135px 64px 50px !important;
    }
  }

  @media (min-width: 1345px) {
    .mx-lg-25 {
      margin: 64px 145px 64px 60px !important;
    }
  }

  @media (min-width: 1380px) {
    .mx-lg-25 {
      margin: 64px 155px 64px 70px !important;
    }
  }

  @media (min-width: 1405px) {
    .mx-lg-25 {
      margin: 64px 160px 64px 75px !important;
    }
  }

  @media (min-width: 1440px) {
    .mx-lg-25 {
      margin: 64px 170px 64px 80px !important;
    }
  }

  @media (min-width: 1473px) {
    .mx-lg-25 {
      margin: 64px 200px 64px 90px !important;
    }
  }

  @media (min-width: 1512px) {
    .mx-lg-25 {
      margin: 64px 210px 64px 95px !important;
    }
  }

  @media (min-width: 1535px) {
    .mx-lg-25 {
      margin: 64px 220px 64px 100px !important;
    }
  }

  @media (min-width: 1553px) {
    .mx-lg-25 {
      margin: 64px 230px 64px 110px !important;
    }
  }

  @media (min-width: 1585px) {
    .mx-lg-25 {
      margin: 64px 235px 64px 120px !important;
    }
  }

  @media (min-width: 1635px) {
    .mx-lg-25 {
      margin: 64px 235px 64px 130px !important;
    }
  }

  @media (min-width: 1670px) {
    .mx-lg-25 {
      margin: 64px 245px 64px 140px !important;
    }
  }

  @media (min-width: 1720px) {
    .mx-lg-25 {
      margin: 64px 255px 64px 150px !important;
    }
  }

  @media (min-width: 1755px) {
    .mx-lg-25 {
      margin: 64px 270px 64px 160px !important;
    }
  }

  @media (min-width: 1806px) {
    .mx-lg-25 {
      margin: 64px 277px 64px 170px !important;
    }
  }
}
</style>