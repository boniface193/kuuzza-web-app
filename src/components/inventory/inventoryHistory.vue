<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <!-- back to Inventory -->
      <router-link :to="{ name: 'inventoryPage' }" class="no-decoration">
        <h3 class="d-flex align-center return-btn my-3">
          <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Inventory History
        </h3>
      </router-link>
      <!-- calendar -->
      <calendar @updateDate="setDate" />
    </div>

    <!-- table  -->
    <div v-show="inventoriesHistory.length > 0 && loader !== true">
      <DataTable
        :action="false"
        :headers="tableHeaders"
        itemKey="product_id"
        :items="inventoriesHistory"
        :itemPerPage="pageDetails.per_page || 15"
        :paginationLength="pageDetails.last_page"
        :page="pageDetails.current_page"
        @itemPerPage="setItemPerPage"
        @onPageChange="setCurentPage"
      />
    </div>

    <!-- no data -->
    <div
      class="text-center pt-16 pb-5"
      v-show="inventoriesHistory.length == 0 && !loader"
    >
      <div class="mb-5">
        <img src="@/assets/img/Empty-inventory.svg" alt="" />
      </div>

      <h2>No history available</h2>
    </div>

    <!-- loader -->
    <div class="text-center pt-10 pb-5" v-show="loader">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!--------------------------- Modal for dialog messages ------------------------------>
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
import calendar from "@/components/dashboard/calender.vue";
import failedImage from "@/assets/img/failed-img.svg";
import Modal from "@/components/general/Modal.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "inventoryHistory",
  components: { DataTable, calendar, Modal },
  data: function () {
    return {
      loader: false,
      statusImage: null,
      dialog: false,
      dialogMessage: "",
      tableHeaders: [
        {
          text: "Product Name",
          value: "name",
          width: "300px",
          href: true,
          routeName: "productDetails",
        },
        { text: "Image", value: "image", image: true, width: "200px" },
        { text: "SKU", value: "sku", width: "200px" },
        { text: "Quantity", value: "quantity", width: "200px" },
        { text: "Status", value: "status", width: "200px" },
        { text: "Time", value: "created_at", width: "250px" },
      ],
    };
  },
  created() {
    this.getInventoryHistory();
  },
  computed: {
    ...mapGetters({
      inventoriesHistory: "inventory/inventoryHistory",
    }),
    ...mapState({
      pageDetails: (state) => state.inventory.inventoryHistoryPageDetails,
    }),
  },
  methods: {
    // set item per page
    setItemPerPage(params) {
      this.$store.commit("inventory/setHistoryItemPerPage", params);
      this.getFilteredInventoryHistory();
    },
    // set current page
    setCurentPage(params) {
      this.loader = true;
      this.$store.commit("inventory/setHistoryPage", params);
      this.getFilteredInventoryHistory();
    },
    // filter base on date
    setDate(params) {
      this.$store.commit("inventory/setHistoryDateRange", {
        startDate: params.startDate.toISOString().split("T")[0],
        endDate: params.endDate.toISOString().split("T")[0],
      });
      this.$store.commit("inventory/setAllowHistoryDateFilter", true);
      // set page back to page 1
      this.$store.commit("inventory/setHistoryPage", 1);

      this.loader = true;
      this.getFilteredInventoryHistory();
    },
    getInventoryHistory() {
      this.loader = true;
      this.$store
        .dispatch("inventory/getInventoryHistory")
        .then(() => (this.loader = false))
        .catch((error) => {
          this.statusImage = failedImage;
          this.loader = false;
          if (error.status == 422 || error.status == 400) {
            this.dialog = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
    getFilteredInventoryHistory() {
      this.$store
        .dispatch("inventory/getFilteredInventoryHistory")
        .then(() => {
          this.loader = false;
        })
        .catch((error) => {
          this.statusImage = failedImage;
          this.loader = false;
          if (error.status == 422 || error.status == 400) {
            this.dialog = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.return-btn {
  cursor: pointer;
  .v-icon {
    margin-right: 15px;
  }
}
.no-decoration {
  text-decoration: none;
  color: #2b2b2b;
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
</style>