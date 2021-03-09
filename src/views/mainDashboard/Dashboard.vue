<template>
  <v-container fluid>
    <!-- to center dashboard content -->
    <div class="mx-lg-12 mx-md-5 mx-sm-5">
      <!-- welcome greetings -->
      <calendar class="float-right" @updateDate="dateValue" />
      <div
        class="welcome-user text-sm-h6 text-md-h5 text-lg-h4 text-xl-h3 text-h6 font-weight-bold"
      >
        <div class="mb-2">Welcome,</div>
        <span class="text-h6"
          >{{ userInfor.name }} <span v-show="userInfor.name">!</span></span
        >
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
            class="py-5 px-5 my-3"
            bar_class="chart-heading text-capitalize"
            bar_title="Order Status"
          />
        </v-col>
        <!--------------------- donut chart ------------------------------>


        <v-col md="4">
          <v-row>
            <!--------------------- leaderboard ------------------------------>
            <v-col md="12">
              <v-skeleton-loader type="article" v-show="leader">
              </v-skeleton-loader>
              <leader
              v-show="!leader"
                linkToDetails="leaderboard"
                leader="Leaderboard"
                sell_text="See all"
                listItem="listItem"
              >
                <div v-for="item in leaderboard.data" :key="item.seller_id" class="text">
                  <v-row class="text">
                    <v-col cols="2" class="text-center"> {{leaderboard.ranks[item.seller_id]}} </v-col>
                    <v-col cols="8" class="text-truncate">
                       {{item.seller_name}}
                    </v-col>
                    <v-col cols="2" class="text-truncate">
                      {{item.total_points}}
                    </v-col>
                  </v-row>
                </div>
              
              </leader>
            </v-col>
            <!--------------------- leaderboard ------------------------------>

            <!--------------------- Best Selling ------------------------------>
            <v-col md="12">
              <v-skeleton-loader type="article" v-show="bestSelling">
              </v-skeleton-loader>
              <leader
              v-show="!bestSelling"
                linkToDetails="bestSeller"
                leader="Best Selling Items"
                sell_text="See all"
              >
                <div v-for="items in bestSeller.data" :key="items.product_id">
                  <v-row class="text">
                    <v-col cols="2" class="text-center"> {{bestSeller.ranks[items.product_id]}} </v-col>
                    <v-col cols="6" class="text-truncate">{{items.product_name}} </v-col>
                  </v-row>
                </div>
              </leader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!--------------------- Best Selling ------------------------------>

      <v-row>
      <!--------------------- Top customer ------------------------------>
        <v-col class="col-lg-8 col-sm-12 d-none d-sm-block">
          <!-- <v-skeleton-loader type="article"> </v-skeleton-loader> -->
          <leader leader="Top Customers">
            <div v-for="(items, index) in topCustomer" :key="items.id"> 
              <v-row class="text">
                <v-col cols="2" class="text-center"> {{index + 1}} </v-col>
                <v-col cols="4" class="text-truncate">
                  <span class="large-text"> {{items.name}}</span>
                </v-col>
                <v-col cols="3" class="text-truncate">
                  <span class="small-text">No. of Orders</span>
                  <div class="mt-2 large-text">{{items.total_order}}</div>
                </v-col>
                <v-col cols="3">
                  <span class="small-text">Total Spent</span>
                  <div class="mt-2 large-text">₦{{items.total_order_value}}</div>
                </v-col>
              </v-row>
            </div>
          </leader>
        </v-col>
        <!--------------------- Top customer ------------------------------>
        <v-col class="col-lg-4 col-sm-12">
          <v-row>
            <v-col cols="12" sm="12">
              <!-- <v-skeleton-loader type="article">
              </v-skeleton-loader> -->
              <!-- show numbers of customers -->
              <custom
                filteredText="filteredCustomer.toString()"
                img_color_text="round-img-bg-warning-text"
                card_digit="allCustomer.toString()"
                card_title="Customers"
                card_img="mdi-account-supervisor"
                img_color="round-img-bg-warning"
                colorText="
                  filteredCustomer.toString().includes('-') ||
                  filteredCustomer === 0
                    ? 'card_sub_error'
                    : 'card_sub_success'
                "
              />
            </v-col>

            <v-col cols="12" sm="12">
              <!-- <v-skeleton-loader type="article">
              </v-skeleton-loader> -->
              <!-- show number of sellers -->
              <custom
                filteredText="filteredSeller.toString()"
                img_color_text="round-img-bg-info-text"
                card_digit="allSeller.toString()"
                card_title="Sellers"
                card_img="mdi-account-supervisor"
                img_color="round-img-bg-info"
                colorText="
                  filteredSeller.toString().includes('-') ||
                  filteredSeller === 0
                    ? 'card_sub_error'
                    : 'card_sub_success'
                "
              />
            </v-col>
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
    };
  },

  computed: {
    ...mapGetters({
      userInfor: "settings/getUserProfile",
      totalRevenue: "totalRevenue/revenue",
      instock: "instockDashboard/stockItem",
      leaderboard: "leaderboard/leaderboard",
      bestSeller: "bestSellingDashboard/bestSelling",
      topCustomer: "topCustomer/topCustomer"
    }),
  },

  created() {
    console.log("topCustomer ", this.topCustomer);
    this.checkIfUserOnline();

    // endpoint for customer
    // if (
    //   this.dashboardCustomer.all_customers === undefined ||
    //   this.dashboardCustomer.filter_customers === undefined
    // ) {
    //   this.$store
    //     .dispatch("dashboard/getCustomer")
    //     .then((res) => {
    //       this.allCustomer = res.all_customers;
    //       this.filteredCustomer = res.filter_customers;
    //       this.customer = false;
    //     })
    // } else {
    //   this.allCustomer = this.dashboardCustomer.all_customers;
    //   this.filteredCustomer = this.dashboardCustomer.filter_customers;
    //   this.customer = false;
    // }

    // endpoint for seller
    // if (
    //   this.bestSeller.all_sellers === undefined ||
    //   this.bestSeller.filter_sellers === undefined
    // ) {
    //   this.$store
    //     .dispatch("dashboard/getSeller")
    //     .then((res) => {
    //       this.allSeller = res.all_sellers;
    //       this.filteredSeller = res.filter_sellers;
    //       this.seller = false;
    //     })
    // } else {
    //   this.allSeller = this.bestSeller.all_sellers;
    //   this.filteredSeller = this.bestSeller.filter_sellers;
    //   this.seller = false;
    // }

    // dispatch user information
    this.$store.dispatch("settings/getUserProfile");
    // dispatch instock
    this.$store.dispatch("instockDashboard/getStock").then(() => {
      this.stock = false
    });
    // dispatch leaderboard
    this.$store.dispatch("leaderboard/getLeaderboard").then(() => {
      this.leader = false
    })
    this.$store.dispatch("bestSellingDashboard/getBestSelling").then(() => {
      this.bestSelling = false
    })
    // Top customer
    this.$store.dispatch("topCustomer/getTopCustomer")

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
        this.stock = false
      });

     /********* instock ***********/
      this.$store.commit("leaderboard/filterRange", {
        startDate: moment(value.startDate).format("L"),
        endDate: moment(value.endDate).format("L"),
      });
      /********* dispatch instock for date filter ***********/
      this.$store.dispatch("leaderboard/searchLeaderboard").then(() => {
        this.leader = false
      });

     /********* best selling ***********/
      this.$store.commit("bestSellingDashboard/filterRange", {
        startDate: moment(value.startDate).format("L"),
        endDate: moment(value.endDate).format("L"),
      });
      /********* dispatch best selling for date filter ***********/
      this.$store.dispatch("bestSellingDashboard/getSellerFilter").then((e) => {
        this.bestSelling = false
        console.log(e)
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