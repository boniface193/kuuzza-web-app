<template>
  <v-container fluid>
    <!-- to center dashboard content -->
    <div class="mx-lg-12 mx-md-5 mx-sm-5">
      <!-- welcome greetings -->
      <calendar class="float-right" @updateDate="dateValue" />
      <div
        class="welcome-user text-sm-h6 text-md-h5 text-lg-h4 text-xl-h3 text-h6 font-weight-bold"
      >
        {{ userInfo.name }}!
      </div>
      <v-snackbar v-model="snackbar" top :color="errorColor">
        {{ error }}
      </v-snackbar>
      <div class="pa-2"></div>
      <v-row>
        <!-- to show total revenue, item in stock, total commission -->
        <v-col cols="12" sm="4">
          <v-skeleton-loader type="article" v-if="payment"> </v-skeleton-loader>
          <card
            v-if="!payment"
            :card_digit="totalRevenue"
            card_title="Total Revenue(₦)"
            card_img="money.svg"
            img_color="round-img-bg-success"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-skeleton-loader type="article" v-if="stock"> </v-skeleton-loader>
          <card
            v-if="!stock"
            :card_digit="stockInfo"
            card_title="Items in Stock"
            card_img="delivery-box.svg"
            img_color="round-img-bg-primary"
            :card_sub="sales"
            :changeColor="
              sales.includes('-') ? 'card_sub_error' : 'card_sub_success'
            "
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-skeleton-loader type="article" v-if="payment"> </v-skeleton-loader>
          <card
            v-if="!payment"
            :card_digit="availableBalance"
            card_title="Available Balance (NGN)"
            card_img="arrow.svg"
            img_color="round-img-bg-secondary"
          />
        </v-col>
      </v-row>

      <v-row>
        <!-- show area-chart -->
        <v-col cols="12" class="d-none d-md-block">
          <bar
            class="rounded-lg"
            bar_class="chart-heading text-capitalize"
            bar_title="revenue(₦)"
          />
        </v-col>
      </v-row>

      <v-row>
        <!-- donut chart -->
        <v-col md="8" class="d-none d-md-block">
          <donut
            class="py-5 px-5 my-3"
            bar_class="chart-heading text-capitalize"
            bar_title="Order Status"
          />
        </v-col>

        <v-col md="4">
          <v-row>
            <v-col md="12">
              <leader
                linkToDetails="leaderboard"
                leader="Leaderboard"
                sell_text="See all"
                listItem="listItem"
              />
            </v-col>

            <v-col md="12">
              <v-skeleton-loader type="article" v-if="!bestSelling.data"> </v-skeleton-loader>
              <leader
              v-if="bestSelling.data"
                linkToDetails="bestSeller"
                leader="Best Selling Items"
                sell_text="See all"
              >
                <div v-for="item in bestSelling.data" :key="item.product_id">
                  <v-row class="text">
                    <v-col cols="2" class="text-center">
                      {{ bestSelling.ranks[item.product_id] }}
                    </v-col>
                    <v-col cols="6" class="text-truncate"
                      >{{ item.product_name }}
                    </v-col>
                  </v-row>
                </div>
              </leader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- show leaders board summary -->

      <v-row>
        <v-col class="col-lg-8 col-sm-12 d-none d-sm-block">
          <v-skeleton-loader type="article" v-if="topCust"> </v-skeleton-loader>
          <leader leader="Top Customers" v-if="!topCust">
            <!-- sumary of the leaders board -->
            <!-- Top customer -->
            <div v-for="(item, i) in topCustomer" :key="i">
              <v-row class="text">
                <v-col cols="2" class="text-center">
                  {{ i + 1 }}
                </v-col>
                <v-col cols="4" class="text-truncate">
                  <span class="large-text"> {{ item.name }}</span>
                </v-col>
                <v-col cols="3" class="text-truncate">
                  <span class="small-text">No. of Orders</span>
                  <div class="mt-2 large-text">{{ item.total_order }}</div>
                </v-col>
                <v-col cols="3">
                  <span class="small-text">Total Spent</span>
                  <div class="mt-2 large-text">
                    ₦{{ item.total_order_value }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </leader>
        </v-col>
        <v-col class="col-lg-4 col-sm-12">
          <v-row>
            <v-col cols="12" sm="12">
              <v-skeleton-loader type="article" v-if="customer">
              </v-skeleton-loader>
              <!-- show numbers of customers -->
              <custom
                v-if="!customer"
                :filteredText="filteredCustomer.toString()"
                img_color_text="round-img-bg-warning-text"
                :card_digit="allCustomer.toString()"
                card_title="Customers"
                card_img="mdi-account-supervisor"
                img_color="round-img-bg-warning"
                :colorText="
                  filteredCustomer.toString().includes('-') ||
                  filteredCustomer === 0
                    ? 'card_sub_error'
                    : 'card_sub_success'
                "
              />
            </v-col>

            <v-col cols="12" sm="12">
              <v-skeleton-loader type="article" v-if="seller">
              </v-skeleton-loader>
              <!-- show number of sellers -->
              <custom
                v-if="!seller"
                :filteredText="filteredSeller.toString()"
                img_color_text="round-img-bg-info-text"
                :card_digit="allSeller.toString()"
                card_title="Sellers"
                card_img="mdi-account-supervisor"
                img_color="round-img-bg-info"
                :colorText="
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
      // first leader board summary
      listItem: [
        { text: "Emike Lucy", count: 369 },
        { text: "Ayotunde Lanwo", count: 369 },
        { text: "Ayotunde Lanwo", count: 369 },
      ],
      //error report
      snackbar: false,
      error: "",
      errorColor: "",
      // stock n sale
      stockInfo: "",
      sales: "",
      stock: true,
      // customer
      allCustomer: "",
      filteredCustomer: "",
      customer: true,
      // seller
      allSeller: "",
      filteredSeller: "",
      seller: true,
      // best selling
      ProductRank: "",
      productName: "",
      // total payment
      totalRevenue: "",
      settled: "",
      awaitingSettlement: "",
      availableBalance: "",
      payment: true,
      // top Customer
      topCust: true,
    };
  },

  computed: {
    ...mapGetters({
      bestSelling: "dashboard/bestSellingItem",
      userInfo: "settings/getUserProfile",
      topCustomer: "dashboard/topCustomer",
      bestSeller: "dashboard/bestSelling",
      dashboardCustomer: "dashboard/dashboardCustomer",
      dashboardStock: "dashboard/dashboardStock",
    }),
  },

  async created() {
    // console.log("dashboard - best selling", this.bestSelling);
    this.checkIfUserOnline();
    // endpoint for stock
    if (
      this.dashboardStock.in_stock === undefined ||
      this.dashboardStock.sales === undefined
    ) {
      await this.$store
        .dispatch("dashboard/getStock")
        .then((res) => {
          this.stockInfo = res.in_stock;
          this.sales = res.sales;
          this.stock = false;
        })
        .catch((error) => {
          if (error.status === 401 || error.status === 403) {
            localStorage.removeItem("accessToken");
            window.location.href = "/signin";
          }
        });
    } else {
      this.stockInfo = this.dashboardStock.in_stock;
      this.sales = this.dashboardStock.sales;
      this.stock = false;
    }

    // endpoint for customer
    if (
      this.dashboardCustomer.all_customers === undefined ||
      this.dashboardCustomer.filter_customers === undefined
    ) {
      await this.$store
        .dispatch("dashboard/getCustomer")
        .then((res) => {
          this.allCustomer = res.all_customers;
          this.filteredCustomer = res.filter_customers;
          this.customer = false;
        })
        .catch((error) => {
          if (error.status === 401 || error.status === 403) {
            localStorage.removeItem("accessToken");
            window.location.href = "/signin";
          }
        });
    } else {
      this.allCustomer = this.dashboardCustomer.all_customers;
      this.filteredCustomer = this.dashboardCustomer.filter_customers;
      this.customer = false;
    }

    // endpoint for seller
    if (
      this.bestSeller.all_sellers === undefined ||
      this.bestSeller.filter_sellers === undefined
    ) {
      await this.$store
        .dispatch("dashboard/getSeller")
        .then((res) => {
          this.allSeller = res.all_sellers;
          this.filteredSeller = res.filter_sellers;
          this.seller = false;
        })
        .catch((error) => {
          if (error.status === 401 || error.status === 403) {
            localStorage.removeItem("accessToken");
            window.location.href = "/signin";
          }
        });
    } else {
      this.allSeller = this.bestSeller.all_sellers;
      this.filteredSeller = this.bestSeller.filter_sellers;
      this.seller = false;
    }

    // best seller
    await this.$store.dispatch("dashboard/getBestSelling");

    // topCustomer
    await this.$store.dispatch("dashboard/getTopCustomer").then(() => {
      this.topCust = false;
    });

    // total revenue, payment and available balance
    if (this.userInfo.store.id === "") {
      this.$store.dispatch("settings/getUserProfile").then(() => {
        this.$store
          .dispatch("dashboard/getTotalRevenue", { id: this.userInfo.store.id })
          .then((res) => {
            this.totalRevenue = res.total_revenue;
            this.settled = res.settled;
            this.awaitingSettlement = res.awaiting_settlement;
            this.availableBalance = res.available_balance;
            this.payment = false;
          });
      });
    } else {
      this.$store
        .dispatch("dashboard/getTotalRevenue", { id: this.userInfo.store.id })
        .then((res) => {
          this.totalRevenue = res.total_revenue;
          this.settled = res.settled;
          this.awaitingSettlement = res.awaiting_settlement;
          this.availableBalance = res.available_balance;
          this.payment = false;
        });
    }

    // await this.$store.dispatch("dashboard/getLeaderboard");
  },

  methods: {
    checkIfUserOnline() {
      let ifConnected = window.navigator.onLine;
      if (!ifConnected) {
        this.snackbar = true;
        this.error = "Connection not available";
        this.errorColor = "error";
      }
    },

    dateValue(value) {
      this.$store.commit("dashboard/filterRange", {
        startDate: moment(value.startDate).format("L"),
        endDate: moment(value.endDate).format("L"),
      });
      this.$store.dispatch("dashboard/getStockDateFilter");
      this.$store.dispatch("dashboard/getCustomerFilter");
      this.$store.dispatch("dashboard/getSellerFilter");
      this.$store.dispatch("dashboard/getTotalRevenue", { id: this.userInfo.store.id });
      let singDate = moment(value.startDate).format("L").split("/")
      console.log(singDate[1])
    },
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
</style>