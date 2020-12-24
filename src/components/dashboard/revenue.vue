<template>
  <v-card elevation="0" class="mx-2 pb-16">
    <div class="body-color py-7">
      <v-row>
        <v-col md="4" v-for="sellers in sellerModels" :key="sellers.name">
          <div class="d-flex">
            <div class="mx-16 justify-center">
              <p class="text-lg-h6 text-sm-body-2 grey--text">
                {{ sellers.title }}
              </p>
              <h4 class="text-lg-h4">{{ sellers.amount }}</h4>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      sellerModels: [
        {
          title: "Total Revenue(NGN)",
          amount: "10000",
        },
        {
          title: "Total Settlements(NGN)",
          amount: "50000",
        },
        {
          title: "Awaiting Settlements(NGN)",
          amount: "50000",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.body-color {
  background-color: #f9fafe;
}
</style>