<template>
  <div class="background-color">
    <!-- to center dashboard content -->
    <v-container fluid>
      <div class="mx-12">
        <div class="">
          <!-- welcome greetings -->
          <calendar class="float-right" elevation="10" />
          <h1 class="welcome-user my-5">Welcome Ayotunde</h1>
        </div>
        <v-row>
          <!-- to show total revenue, item in stock, total commission -->
          <v-col sm="4">
            <card
              width="327px"
              card_digit="899.9k"
              card_title="Total Revenue(₦)"
              card_img="money.svg"
              img_color="round-img-bg-success"
            />
          </v-col>
          <v-col sm="4">
            <card
              width="327px"
              card_digit="1001"
              card_title="Items in Stock"
              card_img="delivery-box.svg"
              img_color="round-img-bg-primary"
              card_sub="-109"
            />
          </v-col>
          <v-col sm="4">
            <card
              width="327px"
              card_digit="67000"
              card_title="Total Commission paid (NGN)"
              card_img="arrow.svg"
              img_color="round-img-bg-secondary"
            />
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <!-- show area-chart -->
          <v-col md="8" class="d-none d-md-block mt-3">
            <bar
              class=""
              bar_class="chart-heading mx-8 py-8 text-capitalize"
              bar_title="revenue(₦)"
              chart=""
            />
          </v-col>

          <v-col md="4">
            <!-- show leaders board summary -->
            <v-row>
              <v-col md="12">
                <leader
                  class=""
                  leader="Leaderboard"
                  sell_text="See all"
                  :listItem="listItem"
                />
              </v-col>

              <v-col md="12">
                <leader
                  leader="Best Selling Items"
                  sell_text="See all"
                  :listItem="listItems"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <!-- donut chart -->
          <v-col md="8" class="d-none d-md-block">
            <donut
              class="py-5"
              bar_class="chart-heading mx-8 pt-8 text-capitalize"
              bar_title="Order Status"
            />
          </v-col>

          <v-col md="4">
            <v-row>
              <v-col md="12">
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

              <v-col md="12">
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

    <router-view />
  </div>
</template>

<script>
// components for dashboard layout
import card from "@/components/dashboard/card.vue";
import bar from "@/components/dashboard/barChart.vue";
import leader from "@/components/dashboard/leader.vue";
import custom from "@/components/dashboard/custom.vue";
import donut from "@/components/dashboard/donut.vue";
import calendar from "@/components/dashboard/calender.vue";

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
    };
  },
};
</script>

<style lang="scss" scoped>
.welcome-user {
  text-align: left;
  font: normal normal bold 30px/37px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}
</style>