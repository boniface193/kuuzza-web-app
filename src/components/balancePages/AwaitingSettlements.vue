<template>
  <div class="py-5">
    <!-- table  -->
    <div v-show="!fetchingData && awaitingSettlements.data.length !== 0">
      <DataTable
        ref="settlementsTable"
        :headers="awaitingSettlementsHeader"
        :items="awaitingSettlements.data"
        itemKey="order_id"
        :itemPerPage="pageDetails.per_page || 15"
        :paginationLength="pageDetails.last_page"
        :page="pageDetails.current_page"
        @itemPerPage="setItemPerPage"
        @onPageChange="setCurentPage"
      />
    </div>
    <div
      class="text-center py-5"
      v-show="awaitingSettlements.data.length == 0 && !fetchingData"
    >
      <div class="mb-5">
        <img src="@/assets/img/Empty-payments.svg" alt="" />
      </div>
      <h2>No Awaiting Settlements Available!</h2>
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
import Modal from "@/components/dashboard/Modal.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "AwaitingSettlements",
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
      awaitingSettlementsHeader: [
        {
          text: "Product Name",
          value: "product_name",
          width: "400px",
        },
        {
          text: "Order ID",
          value: "order_id",
          width: "300px",
          href: true,
          routeName: "OrderDetails",
        },
        { text: "Amount", value: "amount", width: "250px", money: true },
        { text: "Due Date", value: "due_date", width: "250px" },
      ],
    };
  },
  created() {
    this.fetchingData = true;
    if (this.$store.getters["settings/getUserProfile"].name === "") {
      this.$store.dispatch("settings/getUserProfile").then(() => {
        this.getAwaitingSettlements();
      });
    } else {
      this.getAwaitingSettlements();
    }
  },
  computed: {
    ...mapGetters({
      awaitingSettlements: "balance/awaitingSettlements",
    }),
    ...mapState({
      pageDetails: (state) => state.balance.awaitingSettlements.meta,
    }),
  },
  methods: {
    getAwaitingSettlements() {
      let storeId = this.$store.getters["settings/getUserProfile"].store.id;
      this.$store
        .dispatch("balance/getSettlements", {
          storeId: storeId,
          status: "pending",
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
    // set item per page
    setItemPerPage(params) {
      this.$store.commit("balance/setItemPerPageAwaitingSettlements", params);
      this.getAwaitingSettlements();
    },
    // set current page
    setCurentPage(params) {
      this.$store.commit("balance/setPageAwaitingSettlements", params);
      this.getAwaitingSettlements();
    },
    reset() {
      this.fetchingData = true;
      this.getAwaitingSettlements();
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