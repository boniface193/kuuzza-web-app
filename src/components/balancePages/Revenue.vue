<template>
  <div class="px-1 py-2">
    <div class="px-3 py-5 body-color">
      <v-row>
        <!-- Total Revenue column -->
        <v-col class="col-12 col-sm-6 col-md-3">
          <div class="text-center">
            <p class="text-lg-h6 text-sm-body-2 grey--text">
              Total Revenue(NGN)
            </p>
            <h1 class="text-lg-h4">
              <span v-show="!fetchingData">{{
                revenueDetails.total_revenue
              }}</span>
              <span v-show="fetchingData">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  class="mx-auto"
                ></v-progress-circular>
              </span>
            </h1>
          </div>
        </v-col>
        <!-- Available Balance column -->
        <v-col class="col-12 col-sm-6 col-md-3">
          <div class="text-center">
            <p class="text-lg-h6 text-sm-body-2 grey--text">
              Available Balance(NGN)
            </p>
            <h1 class="text-lg-h4">
              <span v-show="!fetchingData">{{
                revenueDetails.available_balance
              }}</span>
              <span v-show="fetchingData">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  class="mx-auto"
                ></v-progress-circular>
              </span>
            </h1>
            <!-- link to withdrawal page -->
            <router-link :to="{ name: 'WithdrawFund' }">
              <v-btn class="primary px-5 py-5 my-5 mx-auto">Withdraw funds</v-btn>
            </router-link>
          </div>
        </v-col>
        <!-- Total settlements column -->
        <v-col class="col-12 col-sm-6 col-md-3">
          <div class="text-center">
            <p class="text-lg-h6 text-sm-body-2 grey--text">
              Total Settlements(NGN)
            </p>
            <h1 class="text-lg-h4">
              <span v-show="!fetchingData">{{ revenueDetails.settled }}</span>
              <span v-show="fetchingData">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  class="mx-auto"
                ></v-progress-circular>
              </span>
            </h1>
          </div>
        </v-col>
        <!-- Awaiting settlements column -->
        <v-col class="col-12 col-sm-6 col-md-3">
          <div class="text-center">
            <p class="text-lg-h6 text-sm-body-2 grey--text">
              Awaiting Settlements(NGN)
            </p>
            <h1 class="text-lg-h4">
              <span v-show="!fetchingData">{{
                revenueDetails.awaiting_settlement
              }}</span>
              <span v-show="fetchingData">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  class="mx-auto"
                ></v-progress-circular>
              </span>
            </h1>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- modal for dialog messages -->
    <modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
            >mdi-close</v-icon
          >
        </div>
        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img :src="statusImage"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>
  </div>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
import failedImage from "@/assets/img/failed-img.svg";
import { mapGetters } from "vuex";
export default {
  name: "Revenue",
  components: { modal },
  data: function () {
    return {
      fetchingData: false,
      revenueDetails: {},
      dialog: false,
      dialogMessage: "",
      statusImage: null,
    };
  },
  created() {
    this.fetchingData = true;
    if (this.$store.getters["settings/getUserProfile"].name === "") {
      this.$store.dispatch("settings/getUserProfile").then(() => {
        this.getRevenueDetails();
      });
    } else {
      this.getRevenueDetails();
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "settings/getUserProfile",
    }),
  },
  methods: {
    // fetch revenue details
    getRevenueDetails() {
      this.$store
        .dispatch("balance/getRevenueDetails", {
          storeId: this.userInfo.store.id,
        })
        .then((response) => {
          this.revenueDetails = response.data.data;
          this.fetchingData = false;
        })
        .catch((error) => {
          this.dialog = true;
          this.fetchingData = false;
          this.statusImage = failedImage;
          if (error.response) {
            this.dialogMessage = error.response.data.message;
          } else {
            this.dialogMessage = "No internet Connection!";
          }
        });
    },
    reset() {
      this.fetchingData = true;
      this.getRevenueDetails();
    },
  },
};
</script>
<style lang="scss" scoped>
.body-color {
  background: #f9fafe !important;
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
</style>