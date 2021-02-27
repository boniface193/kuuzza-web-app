<template>
  <v-container fluid>
    <!-- to center dashboard content -->
    <div class="px-3 px-sm-12 pt-7 pb-4">
      <!-- welcome greetings -->
      <calendar class="float-right" @updateDate="dateValue" />
      <h1
        class=""
      >
        Welcome!
      </h1>
      <div class="pa-2"></div>
      <v-row>
        <!-- to show total revenue, item in stock, total commission -->
        <v-col cols="12" sm="4">
          <card
            card_digit="899.9k"
            card_title="Total Revenue(₦)"
            card_img="money.svg"
            img_color="round-img-bg-success"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <card
            card_digit="1001"
            card_title="Items in Stock"
            card_img="delivery-box.svg"
            img_color="round-img-bg-primary"
            card_sub="-109"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <card
            card_digit="67000"
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
                :listItem="listItem"
              />
            </v-col>

            <v-col md="12">
              <leader
                linkToDetails="bestSeller"
                leader="Best Selling Items"
                sell_text="See all"
                :listItem="listItems"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- show leaders board summary -->

      <v-row>
        <v-col class="col-lg-8 col-sm-12 d-none d-sm-block">
          <leader
            class="my-3"
            leader="Top Customers"
            :listItem="topCustomerList"
          />
        </v-col>
        <v-col class="col-lg-4 col-sm-12">
          <v-row>
            <v-col cols="12" sm="12">
              <!-- show numbers of customers -->
              <custom
                green_text="+23"
                img_color_text="round-img-bg-warning-text"
                card_digit="188"
                card_title="Customers"
                card_img="mdi-account-supervisor"
                img_color="round-img-bg-warning"
              />
            </v-col>

            <v-col cols="12" sm="12">
              <!-- show number of sellers -->
              <custom
                green_text="+7"
                img_color_text="round-img-bg-info-text"
                card_digit="76"
                card_title="Sellers"
                card_img="mdi-account-supervisor"
                img_color="round-img-bg-info"
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
      // second leaders board summary
      listItems: [
        { text: "Samsung Galaxy A10 28" },
        { text: "Infinix Hot 1" },
        { text: "Gionee X9" },
      ],
      // Top customer's list
      topCustomerList: [
        {
          title: "Emike Lucy",
          indexOfOrder: "No. of Orders",
          number: 10,
          totalSpent: "Total Spent",
          totalAmountSpent: "1,000,000",
        },
        {
          title: "Emike Lucy",
          indexOfOrder: "No. of Orders",
          number: 15,
          totalSpent: "Total Spent",
          totalAmountSpent: "1,000,000",
        },
        {
          title: "Emike Lucy",
          indexOfOrder: "No. of Orders",
          number: 22,
          totalSpent: "Total Spent",
          totalAmountSpent: "1,000,000",
        },
      ],
    };
  },

  methods: {
    dateValue(value) {
      const startDate = moment(value.startDate).format();
      const endDate = moment(value.endDate).format();
      console.log(startDate);
      console.log(endDate);
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
</style>