<template>
  <v-card elevation="0">
    <v-container>
      <!-- sumary of the leaders board -->
      <div class="d-flex justify-space-between my-3">
        <h3 class="leader text-sm-body-2">
          {{ leader }}
        </h3>
        <p class="sell-text text-sm-body-2">
          {{ sell_text }}
        </p>
      </div>
      <div v-for="(item, i) in listItem" :key="i">
        <v-row class="text">
          <v-col cols="2">
            {{ i + 1 }}
          </v-col>
          <v-col cols="7" class="text-truncate">
            {{ item.text }}
          </v-col>
          <v-col cols="3">
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
  font: normal normal normal 14px/18px Sans-Serif;
  color: #646464;
  opacity: 1;
}

.sell-text {
  text-align: left;
  font-family: Poppins sans-serif "Product Sans";
  font: normal normal bold 14px/7px Sans-Serif;
  letter-spacing: 0px;
  color: #5064cc;
  opacity: 1;
  line-height: 1.2;
}

.leader {
  text-align: left;
  margin-left: 15px;
  font-family: Poppins sans-serif "Product Sans";
  font: normal normal bold 17px/7px Sans-Serif;
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
  line-height: 1.2;
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
  font: normal normal normal 18px/20px Product Sans Light;
  letter-spacing: 0px;
  color: #646464;
  opacity: 0.7;
}
</style>