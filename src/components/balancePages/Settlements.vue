<template>
  <div class="py-5">
    <!-- table  -->
    <div v-show="!fetchingData && settlements.data.length !== 0">
      <dataTable
        ref="settlementsTable"
        :headers="settlementsHeader"
        :items="settlements.data"
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
      v-show="settlements.data.length == 0 && !fetchingData"
    >
      <p>No Settlements Available!</p>
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
  name: "Settlements",
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
      settlementsHeader: [
        {
          text: "Product Name",
          value: "name",
          href: true,
          routeName: "productDetails",
          width: "400px",
        },
        { text: "Order ID", value: "order_id", width: "300px" },
        { text: "Amount", value: "amount", width: "250px", money: true },
        { text: "Settlement Date", value: "settlement_date", width: "250px" },
      ],
    };
  },
  created() {
    this.fetchingData = true;
    if (this.$store.getters["settings/getUserProfile"].name === "") {
      this.$store.dispatch("settings/getUserProfile").then(() => {
        this.getSettlements();
      });
    } else {
      this.getSettlements();
    }
  },
  computed: {
    ...mapGetters({
      settlements: "balance/settlements",
    }),
    ...mapState({
      pageDetails: (state) => state.settlements.meta,
    }),
  },
  methods: {
    getSettlements() {
      let storeId = this.$store.getters["settings/getUserProfile"].store.id;
      this.$store
        .dispatch("balance/getSettlements", {
          storeId: storeId,
          status: "settled",
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
      this.getSettlements();
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