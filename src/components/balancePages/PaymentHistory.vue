<template>
  <div class="py-5">
    <!-- table  -->
    <div v-show="!fetchingData && paymentHistory.data.length !== 0">
      <DataTable
        ref="settlementsTable"
        :headers="paymentHeader"
        :items="paymentHistory.data"
        itemKey="id"
        :itemPerPage="pageDetails.per_page || 15"
        :paginationLength="pageDetails.last_page"
        :page="pageDetails.current_page"
        @itemPerPage="setItemPerPage"
        @onPageChange="setCurentPage"
      />
    </div>
    <div
      class="text-center py-5"
      v-show="paymentHistory.data.length == 0 && !fetchingData"
    >
      <div class="mb-5">
        <img src="@/assets/img/Empty-payments.svg" alt="" />
      </div>
      <h2>No payment history Available!</h2>
    </div>
    <!-- loader -->
    <div v-show="fetchingData" class="text-center py-5">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
    </div>

    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog" width="400">
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
    </Modal>
  </div>
</template>
<script>
import DataTable from "@/components/general/DataTable.vue";
import failedImage from "@/assets/img/failed-img.svg";
import Modal from "@/components/general/Modal.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "PaymentHistory",
  components: {
    DataTable,
    Modal,
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
          value: "account_number",
          width: "400px",
        },
        { text: "Amount", value: "amount", width: "250px", money: true },
        { text: "Payment Status", value: "status", width: "250px" },
        { text: "Time", value: "created_at", width: "250px" },
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
      pageDetails: (state) => state.balance.paymentHistory.meta,
    }),
  },
  methods: {
    getPaymentHistory() {
      let storeId = this.$store.getters["settings/getUserProfile"].store.id;
      this.$store
        .dispatch("balance/getPaymentHistory", {
          storeId: storeId,
        })
        .then(() => (this.fetchingData = false))
        .catch((error) => {
          this.fetchingData = false;
          if (error.status == 422 || error.status == 400) {
            this.statusImage = failedImage;
            this.dialog = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
    // set item per page
    setItemPerPage(params) {
      this.$store.commit("balance/setItemPerPagePaymentHistory", params);
      this.getPaymentHistory();
    },
    // set current page
    setCurentPage(params) {
      this.$store.commit("balance/setPagePaymentHistory", params);
      this.getPaymentHistory();
    },
    reset() {
      this.fetchingData = true;
      this.getPaymentHistory();
    },
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