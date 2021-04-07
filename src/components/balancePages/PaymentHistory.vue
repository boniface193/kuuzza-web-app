<template>
  <div class="py-5">
    <!-- table  -->
    <div v-show="!fetchingData && paymentHistory.data.length !== 0">
      <dataTable
        ref="settlementsTable"
        :headers="paymentHeader"
        :items="paymentHistory.data"
        itemKey="id"
        :itemPerPage="15"
        :paginationLength="1"
        :page="1"
        @itemPerPage="setItemPerPage"
        @onPageChange="setCurentPage"
      />
    </div>
    <div
      class="text-center py-5"
      v-show="paymentHistory.data.length == 0 && !fetchingData"
    >
      <p>No payment history Available!</p>
    </div>
    <!-- loader -->
    <div v-show="fetchingData" class="text-center py-5">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
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
import dataTable from "@/components/general/dataTable.vue";
import failedImage from "@/assets/img/failed-img.svg";
import modal from "@/components/dashboard/modal.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "PaymentHistory",
  components: {
    dataTable,
    modal,
  },
  data: function () {
    return {
      fetchingData: false,
      dialog: false,
      dialogMessage: "",
      statusImage: null,
      paymentHeader: [
        {
          text: "Bank Details",
          value: "name",
          width: "400px",
        },
        { text: "Amount", value: "amount", width: "250px", money: true},
        { text: "Payment Status", value: "status", width: "250px"},
        { text: "Time", value: "time", width: "250px" },
      ],
    };
  },
  created() {
    this.fetchingData = true;
    if (this.$store.getters["settings/getUserProfile"].name === "") {
      this.$store.dispatch("settings/getUserProfile").then(() => {
        this.getPaymentHistory();
      });
    } else {
      this.getPaymentHistory();
    }
  },
  computed: {
    ...mapGetters({
      paymentHistory: "balance/paymentHistory",
    }),
    ...mapState({
      pageDetails: (state) => state.awaitingSettlements.meta,
    }),
  },
  methods: {
    getPaymentHistory() {
      let storeId = this.$store.getters["settings/getUserProfile"].store.id;
      this.$store
        .dispatch("balance/getPaymentHistory", {
          storeId: storeId
        })
        .then(() => (this.fetchingData = false))
        .catch((error) => {
          this.fetchingData = false;
          this.statusImage = failedImage;
          this.dialog = true;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet Connection!";
          }
        });
    },
    setItemPerPage() {},
    setCurentPage() {},
     reset(){
      this.fetchingData = true;
      this.getPaymentHistory();
    }
  },
};
</script>
<style lang="scss" scoped>
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
</style>