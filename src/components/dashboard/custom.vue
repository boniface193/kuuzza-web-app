<template>
  <v-card elevation="0" class="px-4 rounded-lg" height="100%">
    <v-row>
      <!-- components to display customer and sellers summary -->
      <v-col md="6">
        <div class="d-flex justify-center mt-3">
          <div :class="img_color" class="rounded-pill pa-7 text-center"></div>
          <div class="mx-2">
            <v-icon size="35" :class="img_color_text" class="mt-2">{{
              card_img
            }}</v-icon>
          </div>
        </div>
      </v-col>
      <v-col md="6">
        <v-row>
          <v-col md="12">
            <div class="customer-188">
              {{ card_digit }}
            </div>
          </v-col>
          <v-col cols="12">
            <div class="customer-title">
              {{ card_title }}
            </div>
          </v-col>
          <v-col cols="12" class="">
            <div class="green_text" :class="colorText">
              {{ filteredText }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    filteredText: String,
    card_title: String,
    img_color_text: String,
    card_digit: String,
    img_color: String,
    card_img: String,
    colorText: String,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kumbh&family=Montserrat&family=Poppins&family=Roboto&family=Product+Sans&display=swap");

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
  font: normal normal bold 50px/61px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}

.customer-title {
  font: normal normal normal 18px/8px "Product Sans" Light;
  letter-spacing: 0px;
  color: #646464;
  opacity: 0.7;
}

.green_text {
  font: normal normal bold 14px/5px "Product Sans";
  letter-spacing: 0px;
  opacity: 1;
}

.card_sub_success {
  color: #00b944;
}

.card_sub_error {
  color: #f70909;
}
</style>