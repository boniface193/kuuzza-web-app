<template>
  <div class="px-4">
    <div class="withdraw-container">
      <div>
        <div class="d-flex align-center">
          <div class="profile-image">
            <img src="@/assets/img/user-profile.svg" alt="" />
          </div>
          <h4>{{ userInfo.name }}</h4>
        </div>
        <div class="account-details-container">
          <div class="d-flex justify-space-between align-center my-5">
            <p class="secondary--text mb-0">Your balance:</p>
            <h3 v-show="!fetchingBalance">
              &#8358;{{ revenueDetails.available_balance }}
            </h3>
            <span v-show="fetchingBalance">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </span>
          </div>
          <div class="d-flex justify-space-between align-baseline my-5">
            <p class="secondary--text mb-0">To:</p>
            <div class="text-right">
              <h3>{{ this.accountDetails.data.name }}</h3>
              <h5>{{ this.accountDetails.data.number }}</h5>
              <h5>{{ this.accountDetails.data.bank_name }}</h5>
            </div>
          </div>
          <!-- <div class="d-flex justify-space-between align-baseline my-5 mb-10">
            <p class="secondary--text mb-0">Charges:</p>
            <h5>&#8358;100</h5>
          </div> -->
          <!-- withdrwa btn -->
          <v-btn class="primary mt-5" @click="openConfirmationDialog()"
            >Withdraw</v-btn
          >
          <!-- change account btn -->
          <router-link
            :to="{ name: 'EditBankDetails' }"
            style="text-decoration: none"
          >
            <v-btn class="mt-5 primary--text" style="background: #f3f5ff"
              >Change account number
            </v-btn>
          </router-link>
        </div>
      </div>
    </div>

    <!-- confirmation modal -->
    <modal :dialog="confirmationDialog" width="400">
      <div class="white pa-3 px-5 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon
            class="error--text close-btn"
            @click="confirmationDialog = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="text-left confirmation-dialog">
          <!-- message -->
          <p class="mt-5">
            You are about to withdraw
            &#8358;{{ revenueDetails.available_balance_label }} to your bank account
          </p>
          <!-- acount details -->
          <h5>
            <span>Account name: </span
            ><span class="secondary--text">{{
              this.accountDetails.data.name
            }}</span>
          </h5>
          <h5>
            <span>Account number: </span
            ><span class="secondary--text">{{
              this.accountDetails.data.number
            }}</span>
          </h5>
          <h5>
            <span>Bank name: </span
            ><span class="secondary--text">{{
              this.accountDetails.data.bank_name
            }}</span>
          </h5>

          <!-- withdraw btn -->
          <v-btn
            class="primary mt-5 mx-auto"
            :disabled="withdrawLoader"
            :loading="withdrawLoader"
            @click="withdrawFunds()"
            >Continue</v-btn
          >
        </div>
      </div>
    </modal>

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
import { mapGetters } from "vuex";
import failedImage from "@/assets/img/failed-img.svg";
import successImage from "@/assets/img/success-img.svg";
import modal from "@/components/dashboard/modal.vue";
export default {
  name: "WithdrawFund",
  components: { modal },
  props: ["accountDetails"],
  data: function () {
    return {
      pageLoader: false,
      withdrawLoader: false,
      dialogMessage: "",
      dialog: false,
      statusImage: null,
      fetchingBalance: false,
      revenueDetails: {},
      confirmationDialog: false,
    };
  },
  created() {
    this.fetchingBalance = true;
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
    getAccountDetails() {
      return {
        accountDetails: this.accountDetails,
      };
    },
  },
  methods: {
    openConfirmationDialog() {
      this.confirmationDialog = true;
    },
    withdrawFunds() {
      this.withdrawLoader = true;
      this.$store
        .dispatch("balance/withdrawFunds")
        .then(() => {
          this.withdrawLoader = false;
          this.confirmationDialog = false;
          this.dialog = true;
          this.statusImage = successImage;
          this.dialogMessage =
            "Your request have been received successfully, your account would be credited within 24hrs";
        })
        .catch((error) => {
          this.withdrawLoader = false;
          this.confirmationDialog = false;
          this.dialog = true;
          this.statusImage = failedImage;
          if (error.response) {
            this.dialogMessage = error.response.data.message;
          } else {
            this.dialogMessage = "No internet Connection!";
          }
        });
    },
    // fetch revenue details
    getRevenueDetails() {
      this.$store
        .dispatch("balance/getRevenueDetails", {
          storeId: this.userInfo.store.id,
        })
        .then((response) => {
          this.revenueDetails = response.data.data;
          this.fetchingBalance = false;
        })
        .catch((error) => {
          this.dialog = true;
          this.fetchingBalance = false;
          this.statusImage = failedImage;
          if (error.response) {
            this.dialogMessage = error.response.data.message;
          } else {
            this.dialogMessage = "No internet Connection!";
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.withdraw-container {
  width: 50%;
}
.back-btn {
  position: absolute;
  left: 0px;
  top: 0;
}
.profile-image {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}
.account-details-container {
  width: 500px;
  .v-btn:not(.v-btn--round).v-size--default {
    height: 45px;
    min-width: 100%;
    padding: 0 16px;
    border-radius: 12px;
  }
}
.confirmation-dialog {
  .v-btn:not(.v-btn--round).v-size--default {
    height: 45px;
    min-width: 80%;
    padding: 0 16px;
    border-radius: 12px;
  }
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
@media (max-width: 950px) {
  .withdraw-container {
    width: 100%;
  }
}
@media (max-width: 550px) {
  .account-details-container {
    width: 100%;
  }
}
</style>