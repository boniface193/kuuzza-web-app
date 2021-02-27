<template>
  <div class="py-5">
    <!-- table  -->
    <div v-show="!fetchingData && awaitingSettlements.data.length !== 0">
      <dataTable
        ref="settlementsTable"
        :headers="awaitingSettlementsHeader"
        :items="awaitingSettlements.data"
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
      v-show="awaitingSettlements.data.length == 0 && !fetchingData"
    >
      <p>No Awaiting Settlements Available!</p>
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
import dataTable from "@/components/dashboard/dataTable.vue";
import failedImage from "@/assets/img/failed-img.svg";
import modal from "@/components/dashboard/modal.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "AwaitingSettlements",
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
      awaitingSettlementsHeader: [
        {
          text: "Product Name",
          value: "name",
          href: true,
          routeName: "productDetails",
          width: "400px",
        },
        { text: "Order ID", value: "order_id", width: "300px" },
        { text: "Amount", value: "amount", width: "250px", money: true},
        { text: "Due Date", value: "settlement_date", width: "250px" },
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
      pageDetails: (state) => state.awaitingSettlements.meta,
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
    setItemPerPage() {},
    setCurentPage() {},
     reset(){
      this.fetchingData = true;
      this.getAwaitingSettlements();
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