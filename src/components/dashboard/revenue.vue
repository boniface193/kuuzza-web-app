<template>
  <v-card elevation="0" class="mx-2 pb-16">
    <div class="body-color py-7">
      <v-row>
        <v-col md="4">
          <div class="d-flex">
            <div class="mx-16 justify-center">
              <p class="text-lg-h6 text-sm-body-2 grey--text">
                Total Revenue(NGN)
              </p>
              <h4 class="text-lg-h4">10,000</h4>
            </div>
          </div>
        </v-col>
        <v-col md="4">
          <div class="d-flex">
            <div class="mx-16 justify-center">
              <p class="text-lg-h6 text-sm-body-2 grey--text">
                Total Settlements(NGN)
              </p>
              <h4 class="text-lg-h4">50,000</h4>
              <router-link :to="{ name: 'WithdrawFund' }" >
                <v-btn class="primary my-3">Withdraw</v-btn>
              </router-link>
            </div>
          </div>
        </v-col>
        <v-col md="4">
          <div class="d-flex">
            <div class="mx-16 justify-center">
              <p class="text-lg-h6 text-sm-body-2 grey--text">
                Awaiting Settlements(NGN)
              </p>
              <h4 class="text-lg-h4">20,202</h4>
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
    return {};
  },
};
</script>

<style lang="scss" scoped>
.body-color {
  background-color: #f9fafe;
}
</style>
