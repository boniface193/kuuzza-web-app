<template>
  <v-container>
    <div class="mx-lg-12 mx-md-5 mx-sm-5">
      <v-img
        src="../../assets/download.svg"
        width="16"
        height="15"
        class="float-right"
      ></v-img>
      <v-spacer></v-spacer>
      <router-link to="/seller" style="text-decoration: none; color: #2b2b2b">
        <h4 class="float-left">
          <v-icon class="mb-1 mr-3">mdi-chevron-left</v-icon> Sellers
        </h4>
      </router-link>

      <div class="pa-2"></div>
      <div class="my-8">
        <div class="float-right">
          <v-select
            :items="item"
            flat
            solo
            append-icon="mdi-chevron-down"
            dense
          >
          </v-select>
        </div>
        <h1 class="heading--text">Emeka Mbakwe</h1>
      </div>

      <v-card color="white" elevation="0" class="py-2 rounded-lg mb-6">
        <v-row>
          <v-col md="4" v-for="sellers in sellerModels" :key="sellers.name">
            <div class="d-flex">
              <div class="d-flex justify-center mx-8">
                <div
                  :class="sellers.bg_color"
                  class="rounded-pill pa-7 text-center"
                ></div>
                <div class="mx-4">
                  <img
                    :src="sellers.img"
                    width="18.94px"
                    height="25px"
                    class="ml-percent mt-4"
                  />
                </div>
              </div>
              <div class="">
                <p class="subtitles mb-0">{{ sellers.title }}</p>
                <h4 class="headings">{{ sellers.amount }}</h4>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <v-row>
        <v-col md="8">
          <v-card class="px-3" width="600px" elevation="0">
            <v-row>
              <v-col class="d-flex">
                <v-img
                  src="../../assets/img/laptop.png"
                  class="grey lighten-3"
                  width="180px"
                ></v-img>
              </v-col>
              <v-col>
                <h4 class="sellerscard">Order 100000</h4>
                <h4
                  v-for="items in productItems"
                  :key="items.id"
                  class="sellerscard"
                >
                  {{ items.productName }}:
                  <span class="sellersCard" v-if="items.href"
                    ><router-link to="/customers">{{
                      items.brands
                    }}</router-link></span
                  >
                  <span class="sellersCard" v-else>{{ items.brands }}</span>
                </h4></v-col
              >
            </v-row>
          </v-card>

          <v-card class="px-3 my-4" width="600px" elevation="0">
            <v-row>
              <v-col class="d-flex">
                <v-img
                  src="../../assets/img/laptop.png"
                  class="grey lighten-3"
                  width="180px"
                ></v-img>
              </v-col>
              <v-col>
                <h4 class="sellerscard">Order 100000</h4>
                <h4
                  v-for="items in productItems"
                  :key="items.id"
                  class="sellerscard"
                >
                  {{ items.productName }}:
                  <span class="sellersCard" v-if="items.href"
                    ><router-link to="/customers">{{
                      items.brands
                    }}</router-link></span
                  >
                  <span class="sellersCard" v-else>{{ items.brands }}</span>
                </h4></v-col
              >
            </v-row>
          </v-card>
        </v-col>

        <v-col md="4" class="d-flex justify-end">
          <v-card class="py-2" width="350px" elevation="0">
            <div class="px-5">
              <div class="my-5">
                <p class="editSeller float-right">Edit</p>
                <h4 class="sellerscard">Seller Overview</h4>
              </div>
              <p
                v-for="sellersInfo in sellersOverview"
                :key="sellersInfo.id"
                class="sellersInfo mb-1"
              >
                <span>
                  {{ sellersInfo }}
                </span>
              </p>
            </div>
            <div class="hr"></div>
            <div class="px-5">
              <div class="my-5">
                <p class="editSeller float-right">Change</p>
                <h4 class="sellerscard">Address</h4>
              </div>

              <p class="w-25 pb-12">
                129 Ademola Adetokunbo Crescent Wuse 2 FCT Abuja 900288 Nigeria
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    item: [
      { text: "All Orders" },
      { text: "Processed" },
      { text: "Shipped" },
      { text: "Delivered" },
    ],

    sellerModels: [
      {
        img: require("../../assets/layout/delivery-box.svg"),
        bg_color: " round-img-bg-primary",
        title: "Total Items Sold",
        amount: "100000",
      },
      {
        img: require("../../assets/layout/money.svg"),
        bg_color: " round-img-bg-success",
        title: "Total Commission Earned(NGN)",
        amount: "20000",
      },
      {
        img: require("../../assets/layout/arrow.svg"),
        bg_color: "round-img-bg-secondary",
        title: "Value of Sales Closed",
        amount: "100000",
      },
    ],

    productItems: [
      { productName: "Product", brands: "Infinix Hot 1" },
      { productName: "Customer", brands: "Emeka Mba", href: true },
      { productName: "Quantity", brands: "1" },
      { productName: "Order time", brands: "10 Sep 2020 at 12:07pm" },
      { productName: "Amount paid", brands: "₦10000.00" },
      { productName: "Commission", brands: "₦5000.00" },
      { productName: "Status", brands: "Delivered" },
    ],

    sellersOverview: [
      "Emeka Mba",
      "emeka.mba@gmail.com",
      "0810000000000",
      "Male",
      "Ranking 4th",
    ],
  }),
};
</script>

<style lang="scss" scoped>
.round-img-bg-success {
  background: #00c508 0% 0% no-repeat padding-box;
  opacity: 0.15;
  position: absolute;
}

.round-img-bg-primary {
  background: #5064cc 0% 0% no-repeat padding-box;
  opacity: 0.15;
  position: absolute;
}

.round-img-bg-secondary {
  background: #44099f 0% 0% no-repeat padding-box;
  opacity: 0.15;
  position: absolute;
}

.subtitles {
  font: normal normal normal 14px/17px "Product Sans";
  letter-spacing: 0px;
  color: #979797;
  opacity: 1;
}

.headings {
  font: normal normal bold 20px/24px;
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}

.sellerscard {
  text-align: left;
  font: normal normal bold 16px/19px;
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}

.sellersCard {
  text-align: left;
  font: normal normal normal 14px/17px "Product Sans";
  letter-spacing: 0px;
  color: #979797;
  opacity: 1;
}

.editSeller {
  text-align: right;
  font: normal normal normal 16px/19px "Product Sans" Light;
  letter-spacing: 0px;
  color: #5064cc;
  opacity: 1;
}

.sellersInfo {
  text-align: left;
  font: normal normal lighter 16px/24px "Product Sans" Light;
  letter-spacing: 0px;
  color: #979797;
  opacity: 1;
}

.hr {
  border: solid 1px rgba(181, 181, 181, 0.118);
}

.w-25 {
  width: 80%;
}
</style>