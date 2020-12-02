<template>
  <!-- card shows individual revenue, items in stocks, total commission -->
  <v-card :width="width" height="230px" elevation="0" class="pt-5" rounded="">
    <div class="d-flex justify-center">
      <div :class="img_color" class="rounded-pill pa-7"></div>
      <img
        :src="require(`../../assets/layout/${card_img}`)"
        width="18.94px"
        class="mx-2 mt-4"
      />
    </div>
    <v-container>
      <h3 class="card-digit text-sm-subtitle-1 text-md-h4 text-lg-h3">
        {{ card_digit }}
      </h3>
      <h6 class="card-title">{{ card_title }}</h6>
      <p class="card_sub">{{ card_sub }}</p>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: [
    "width",
    "card_img",
    "card_digit",
    "card_title",
    "img_color",
    "card_sub",
  ],
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kumbh&family=Montserrat&family=Poppins&family=Roboto&family=Product+Sans&display=swap");

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

.card-digit {
  margin-top: 40px;
  text-align: center;
  font: normal normal bold 50px/61px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}

.card-title {
  text-align: center;
  font: normal normal normal 18px/22px "Poppins" Light;
  letter-spacing: 0px;
  color: #646464;
  opacity: 0.7;
}

.card_sub {
  text-align: center;
  margin-top: 10px;
  font: normal normal bold 14px/17px "Product Sans";
  letter-spacing: 0px;
  color: #f70909;
  opacity: 1;
}
</style>