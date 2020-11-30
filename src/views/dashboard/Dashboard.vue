<template>
  <div class="background-color">
    <v-container>
      <div class="mx-12">
        <h1 class="welcome-user my-8">Welcome Ayotunde</h1>
        <v-row>
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
              card_title="Total Commission paid (NGN))"
              card_img="arrow.svg"
              img_color="round-img-bg-secondary"
            />
          </v-col>
        </v-row>
        <bar />
      </div>
    </v-container>

    <router-view />
  </div>
</template>

<script>
import card from "@/components/dashboard/card.vue";
import bar from "@/components/dashboard/barChart.vue";

export default {
  components: {
    card,
    bar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.welcome-user {
  text-align: left;
  font: normal normal bold 30px/37px Product Sans;
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}

// .round-img-bg {
//   background: #00c508 0% 0% no-repeat padding-box;
//   opacity: 0.15;
//   position: absolute;
// }
</style>