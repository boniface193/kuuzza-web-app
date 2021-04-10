<template>
  <v-container fluid>
    <!-- to center dashboard content -->
    <div class="mx-lg-12 mx-md-5 mx-sm-5 pt-13">
      <!-- welcome greetings -->
      <calendar class="float-right" @updateDate="dateValue" />
      <div
        class="welcome-user text-sm-h6 text-md-h5 text-lg-h4 text-xl-h3 text-h6 font-weight-bold"
      >
        <div class="mb-2">Welcome {{ userInfor.name.split(" ").slice(0, 1).join(" ") }}, </div>
        <!-- <span class="text-h6"
          ><span v-show="userInfor.name">!</span></span
        > -->
      </div>
      <v-snackbar v-model="snackbar" top :color="errorColor">
        {{ error }}
      </v-snackbar>
      <div class="pa-2"></div>
      <v-row>
        <!-------------- to show total revenue ------------------->
        <v-col cols="12" sm="4">
          <v-skeleton-loader
            type="article"
            v-show="!totalRevenue.total_revenue_label"
          >
          </v-skeleton-loader>
          <card
            v-show="totalRevenue.total_revenue_label"
            :card_digit="totalRevenue.total_revenue_label"
            card_title="Total Revenue(₦)"
            card_img="money.svg"
            img_color="round-img-bg-success"
          />
        </v-col>
        <!----------------- to show total revenue ------------------->

        <!------------------- item in stock -------------------------->
        <v-col cols="12" sm="4">
          <v-skeleton-loader type="article" v-show="stock"> </v-skeleton-loader>
          <card
            v-show="!stock"
            :card_digit="instock.in_stock"
            card_title="Items in Stock"
            card_img="delivery-box.svg"
            img_color="round-img-bg-primary"
            :card_sub="instock.sales"
            changeColor="card_sub_error"
            label="( Sold )"
          />
        </v-col>
        <!------------------- item in stock -------------------------->

        <!------------------- Available balance -------------------------->
        <v-col cols="12" sm="4">
          <v-skeleton-loader
            type="article"
            v-show="!totalRevenue.available_balance_label"
          >
          </v-skeleton-loader>
          <card
            v-show="totalRevenue.available_balance_label"
            :card_digit="totalRevenue.available_balance_label"
            card_title="Available Balance (NGN)"
            card_img="arrow.svg"
            img_color="round-img-bg-secondary"
          />
        </v-col>
        <!------------------- Available balance -------------------------->
      </v-row>

      <v-row>
        <!--------------------- show area-chart --------------------------->
        <v-col cols="12" class="d-none d-md-block">
          <bar
            class="rounded-lg"
            bar_class="chart-heading text-capitalize"
            bar_title="revenue(₦)"
          />
        </v-col>
        <!------------------- show area-chart -------------------------->
      </v-row>

      <v-row>
        <!--------------------- donut chart ------------------------------>
        <v-col class="d-none d-md-block" md="8">
          <donut
            class="py-5 px-5"
            bar_class="chart-heading text-capitalize"
            bar_title="Order Status"
          />
        </v-col>
        <!--------------------- donut chart ------------------------------>

        <v-col md="4">
          <!-- <v-row> -->
          <!--------------------- leaderboard ------------------------------>
          <!-- <v-col md="12"> -->
          <v-skeleton-loader type="article" v-show="leader">
          </v-skeleton-loader>
          <leader
            v-show="!leader"
            linkToDetails="leaderboard"
            leader="Leaderboard"
            sell_text="See all"
            listItem="listItem"
          >
            <div v-for="item in leaderboard" :key="item.seller_id" class="text">
              <v-row class="text">
                <v-col cols="2" class="text-center">
                  {{ item.rank }}
                </v-col>
                <v-col cols="8" class="text-truncate">
                  {{ item.seller_name.split(" ").slice(-1).join(" ") }}
                </v-col>
                <v-col cols="2" class="text-truncate">
                  {{ item.total_points }}
                </v-col>
              </v-row>
            </div>
          </leader>
          <!-- </v-col> -->
          <!--------------------- leaderboard ------------------------------>
        </v-col>
      </v-row>

      <v-row>
        <!--------------------- Best Selling ------------------------------>
        <v-col class="col-lg-8 col-sm-12 d-none d-sm-block">
          <v-skeleton-loader type="article" v-show="bestSelling">
          </v-skeleton-loader>
          <leader
            v-show="!bestSelling"
            linkToDetails="bestSeller"
            leader="Best Selling Items"
            sell_text="See all"
          >
            <div v-for="items in bestSeller" :key="items.product_id">
              <v-row class="text">
                <v-col cols="4" class="text-center">
                  {{ items.rank }}
                </v-col>
                <v-col cols="4" class="text-truncate"
                  >{{ items.product_name }}
                </v-col>
                <v-col cols="4" class="text-truncate"
                  >{{ items.quantity }} (Sold)
                </v-col>
              </v-row>
            </div>
          </leader>
        </v-col>
        <!--------------------- Best Selling ------------------------------>
        <v-col class="col-lg-4 col-sm-12 text-center">
          <v-row>
            <!--------------------- customer ------------------------------>
            <v-col cols="12" sm="12" class="pt-0">
              <v-skeleton-loader type="article" v-show="customer">
              </v-skeleton-loader>
              <custom
                v-show="!customer"
                :filteredText="allCustomerToString"
                img_color_text="round-img-bg-warning-text"
                :card_digit="filteredCustomerToString"
                card_title="Customers"
                card_img="mdi-account-supervisor"
                img_color="round-img-bg-warning"
                :colorText="
                  filteredCustomerToString.includes('-') ||
                  filteredCustomerToString === 0
                    ? 'card_sub_error'
                    : 'card_sub_success'
                "
              />
            </v-col>
            <!--------------------- customer ------------------------------>

            <!--------------------- seller ------------------------------>
            <v-col cols="12" sm="12" class="pb-0">
              <v-skeleton-loader type="article" v-show="seller">
              </v-skeleton-loader>
              <custom
                v-show="!seller"
                :filteredText="allSellerToString"
                img_color_text="round-img-bg-info-text"
                :card_digit="filteredSellerToString"
                card_title="Sellers"
                card_img="mdi-account-supervisor"
                img_color="round-img-bg-info"
                :colorText="
                  filteredSellerToString.includes('-') ||
                  filteredSellerToString === 0
                    ? 'card_sub_error'
                    : 'card_sub_success'
                "
              />
            </v-col>
            <!--------------------- seller ------------------------------>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// components for dashboard layout
import card from "@/components/dashboard/card.vue";
import bar from "@/components/dashboard/barChart.vue";
import leader from "@/components/dashboard/leader.vue";
import custom from "@/components/dashboard/custom.vue";
import donut from "@/components/dashboard/donut.vue";
import calendar from "@/components/dashboard/calender.vue";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  components: {
    card,
    bar,
    leader,
    custom,
    donut,
    calendar,
  },

  data() {
    return {
      // get user profile
      userInfo: "",
      //error report
      snackbar: false,
      error: "",
      errorColor: "",
      // loader
      stock: true,
      leader: true,
      bestSelling: true,
      topCust: true,
      // convert customers values to string
      allCustomerToString: "",
      filteredCustomerToString: "",
      customer: true,
      // convert sellers values to string
      allSellerToString: "",
      filteredSellerToString: "",
      seller: true,
      // leaderboard
      leaderboard: [],
      leaderRank: {},
      // best selling
      bestSeller: [],
      sellerRank: {},
    };
  },

  computed: {
    ...mapGetters({
      userInfor: "settings/getUserProfile",
      totalRevenue: "totalRevenue/revenue",
      instock: "instockDashboard/stockItem",
      topCustomer: "topCustomer/topCustomer",
    }),
  },

  created() {
    // check if the user is connected
    this.checkIfUserOnline();

    // dispatch user information
    this.$store.dispatch("settings/getUserProfile");
    // dispatch instock
    this.$store.dispatch("instockDashboard/getStock").then(() => {
      this.stock = false;
    });
    // dispatch leaderboard
    this.$store.dispatch("leaderboard/getLeaderboard").then((e) => {
      let leader = e.data;

      this.leaderboard = leader.slice(0, 4);
      this.leader = false;
    });
    // best selling
    this.$store.dispatch("bestSellingDashboard/getBestSelling").then((e) => {
      let seller = e.data;
      let Rank = e.ranks;

      this.bestSeller = seller.slice(0, 3);
      this.sellerRank = Rank;
      this.bestSelling = false;
    });
    // Top customer
    this.$store.dispatch("topCustomer/getTopCustomer").then(() => {
      this.topCust = false;
    });
    // customer
    this.$store.dispatch("customerDashboard/getCustomer").then((res) => {
      let filtered = res.all_customers;
      let all = res.filter_customers;

      this.filteredCustomerToString = filtered.toString();
      this.allCustomerToString = all.toString();
      this.customer = false;
    });
    // seller
    this.$store.dispatch("sellerDashboard/getSeller").then((res) => {
      let filtered = res.all_sellers;
      let all = res.filter_sellers;

      this.filteredSellerToString = filtered.toString();
      this.allSellerToString = all.toString();
      this.seller = false;
    });
  },

  methods: {
    /********* check if there is network ***********/
    checkIfUserOnline() {
      let ifConnected = window.navigator.onLine;
      if (!ifConnected) {
        this.snackbar = true;
        this.error = "Connection not available";
        this.errorColor = "error";
      }
    },
    /********* check if there is network ***********/

    /********* date filter ***********/
    dateValue(value) {
      /********* total Revenue ***********/
      this.$store.commit("totalRevenue/filterRange", {
        startDate: moment(value.startDate).format("L"),
        endDate: moment(value.endDate).format("L"),
      });
      /********* dispatch total revenue for date filter ***********/
      this.$store.dispatch("settings/getUserProfile").then((res) => {
        this.userInfo = res.data.data.store.id;
        this.$store.dispatch("totalRevenue/getTotalRevenue", {
          id: this.userInfo,
        });
      });

      /********* instock ***********/
      this.$store.commit("instockDashboard/filterRange", {
        startDate: moment(value.startDate).format("L"),
        endDate: moment(value.endDate).format("L"),
      });
      /********* dispatch instock for date filter ***********/
      this.$store.dispatch("instockDashboard/getStockDateFilter").then(() => {
        this.stock = false;
      });

      /********* leaderboard ***********/
      this.$store.commit("leaderboard/filterRange", {
        startDate: moment(value.startDate).format("L"),
        endDate: moment(value.endDate).format("L"),
      });
      /********* dispatch instock for date filter ***********/
      this.$store.dispatch("leaderboard/searchLeaderboard").then((e) => {
        let leader = e.data;

        this.leaderboard = leader.slice(0, 7);
        this.leader = false;
      });

      /********* best selling ***********/
      this.$store.commit("bestSellingDashboard/filterRange", {
        startDate: moment(value.startDate).format("L"),
        endDate: moment(value.endDate).format("L"),
      });
      /********* dispatch best selling for date filter ***********/
      this.$store.dispatch("bestSellingDashboard/getSellerFilter").then((e) => {
        let seller = e.data;
        let Rank = e.ranks;

        this.bestSeller = seller.slice(0, 7);
        this.sellerRank = Rank;
        this.bestSelling = false;
      });

      /********* top customer ***********/
      this.$store.commit("topCustomer/filterRange", {
        startDate: moment(value.startDate).format("L"),
        endDate: moment(value.endDate).format("L"),
      });
      /********* dispatch top customer for date filter ***********/
      this.$store.dispatch("topCustomer/getFilterTopCustomer").then(() => {
        this.topCust = false;
      });

      /********* customer ***********/
      this.$store.commit("customerDashboard/filterRange", {
        startDate: moment(value.startDate).format("L"),
        endDate: moment(value.endDate).format("L"),
      });
      /********* dispatch customer for date filter ***********/
      this.$store
        .dispatch("customerDashboard/getCustomerFilter")
        .then((res) => {
          let filtered = res.filter_customers;
          let all = res.all_customers;

          this.filteredCustomerToString = filtered.toString();
          this.allCustomerToString = all.toString();
          this.customer = false;
        });

      /********* seller ***********/
      this.$store.commit("sellerDashboard/filterRange", {
        startDate: moment(value.startDate).format("L"),
        endDate: moment(value.endDate).format("L"),
      });
      /********* dispatch seller for date filter ***********/
      this.$store.dispatch("sellerDashboard/getSellerFilter").then((res) => {
        let filtered = res.filter_sellers;
        let all = res.all_sellers;

        this.filteredSellerToString = filtered.toString();
        this.allSellerToString = all.toString();
        this.seller = false;
      });
    },
    /********* date filter ***********/
  },
};
</script>

<style lang="scss" scoped>
.welcome-user {
  text-align: left;
  font: normal normal bold 25px/25px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}
.large-text {
  font: normal normal bold 18px/18px "Product Sans";
  text-align: left;
  letter-spacing: 0px;
  color: #646464;
  opacity: 1;
}
.small-text {
  font: normal normal lighter 14px/17px "Product Sans" Light;
  text-align: left;
  letter-spacing: 0px;
  color: #505050;
  opacity: 1;
}
.text {
  font-family: Poppins sans-serif "Product Sans";
  font: normal normal normal 14px/9px Sans-Serif;
  color: #646464;
  opacity: 1;
}
</style>