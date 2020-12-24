<template>
  <v-card elevation="0">
    <v-container>
      <!-- sumary of the leaders board -->
      <div class="d-flex justify-space-between my-3">
        <h3 class="leader text-truncate mr-2">
          {{ leader }}
        </h3>
        <router-link to="inventory" class="sell-text text-truncate">
          <p>
            {{ sell_text }}
          </p>
        </router-link>
      </div>
      <div v-for="(item, i) in listItem" :key="i">
        <v-row class="text">
          <v-col cols="2" class="text-center">
            {{ i + 1 }}
          </v-col>
          <v-col v-if="item.text" cols="6" class="text-truncate"
            >{{ item.text }}
          </v-col>
          <v-col v-if="item.title" cols="4" class="text-truncate">
            <span class="large-text"> {{ item.title }}</span>
            <div class="mt-2 letter-spacing small-text">
              {{ item.email }}
            </div>
          </v-col>
          <v-col v-if="item.indexOfOrder" cols="3" class="text-truncate">
            <span class="small-text">{{ item.indexOfOrder }}</span>
            <div class="mt-2 letter-spacing large-text">{{ item.number }}</div>
          </v-col>
          <v-col v-if="item.totalSpent" cols="3">
            <span class="small-text">{{ item.totalSpent }}</span>
            <div class="mt-2 letter-spacing large-text">
              ₦{{ item.totalAmountSpent }}
            </div>
          </v-col>
          <v-col v-if="item.count" cols="4">
            {{ item.count }}
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    card_title: String,
    img_color_text: String,
    card_digit: Number,
    img_color: String,
    card_img: String,
    leader: String,
    sell_text: String,
    listItem: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kumbh&family=Montserrat&family=Poppins&family=Roboto&family=Product+Sans&display=swap");

.text {
  font-family: Poppins sans-serif "Product Sans";
  font: normal normal normal 14px/10px Sans-Serif;
  color: #646464;
  opacity: 1;
}

.sell-text {
  text-align: left;
  font-family: Poppins sans-serif "Product Sans";
  font: normal normal bold 17px/7px Sans-Serif;
  letter-spacing: 0px;
  color: #5064cc;
  opacity: 1;
  line-height: 1.2;
  text-decoration: none;
}

.leader {
  text-align: left;
  margin-left: 15px;
  font: normal normal bold 20px/1px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
  line-height: 1.6;
}

.round-img-bg-warning {
  background: #ffc107 0% 0% no-repeat padding-box;
  opacity: 0.15;
  position: absolute;
}

.round-img-bg-warning-text {
  color: #ffc107;
}

.round-img-bg-info {
  background: #52f1ec 0% 0% no-repeat padding-box;
  opacity: 0.15;
  position: absolute;
}

.round-img-bg-info-text {
  color: #52f1ec;
}

.customer-188 {
  text-align: left;
  font: normal normal bold 40px/20px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}

.customer-title {
  text-align: left;
  font: normal normal normal 18px/20px "Product Sans" Light;
  letter-spacing: 0px;
  color: #646464;
  opacity: 0.7;
}

.letter-spacing {
  letter-spacing: 1.5px;
  font-family: "Product Sans" Light;
}

.small-text {
  font: normal normal lighter 11px/20px "Product Sans" Light;
  margin: 15px 0px;
}

.large-text {
  font: normal normal bold 18px/20px "Product Sans";
  margin: 15px 0px;
}

// .Leader {
//   font: normal normal bold 40px/0px "Product Sans";
//   letter-spacing: 0px;
//   color: #2b2b2b;
//   opacity: 1;
// }
</style>