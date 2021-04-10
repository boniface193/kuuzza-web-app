<template>
  <div class="pb-16">
    <div>
      <!-- page title -->
      <div class="d-flex justify-space-between align-center">
        <h1>Orders</h1>
        <!-- calendar -->
        <calendar @updateDate="dateValue" />
      </div>

      <div class="d-flex justify-sm-end align-center flex-wrap mt-5">
        <!-- search orders-->
        <div class="search-container mr-md-2">
          <SearchOrders />
        </div>

        <div class="d-flex align-center mb-1">
          <!-- filter orders-->
          <FilterOrders class="mr-2" />

          <!-- export orders -->
          <ExportOrders />
        </div>
      </div>

      <!-- table  -->
      <DataTable
        v-show="orders.length > 0 && !tableLoader"
        ref="table"
        :action="false"
        :select="false"
        :headers="tableHeaders"
        :items="orders"
        itemKey="id"
        :itemPerPage="pageDetails.per_page || 15"
        :paginationLength="pageDetails.last_page"
        :page="pageDetails.current_page"
        @itemPerPage="setItemPerPage"
        @onPageChange="setCurentPage"
      />
    </div>

    <!-- no data -->
    <div
      class="text-center pt-10 pb-5"
      v-show="orders.length == 0 && !tableLoader"
    >
      <p class="mb-0 secondary--text" style="font-size: 20px">
        No order available!
      </p>
    </div>

    <!-- loader -->
    <div class="text-center pt-10 pb-5" v-show="tableLoader">
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
import Modal from "@/components/dashboard/Modal.vue";
import DataTable from "@/components/general/DataTable.vue";
import SearchOrders from "@/components/order/SearchOrders.vue";
import FilterOrders from "@/components/order/FilterOrders.vue";
import ExportOrders from "@/components/order/ExportOrders.vue";
import Calendar from "@/components/general/Calendar.vue";
import failedImage from "@/assets/img/failed-img.svg";
import { mapState } from "vuex";
export default {
  name: "orderPage",
  components: {
    SearchOrders,
    FilterOrders,
    ExportOrders,
    Calendar,
    DataTable,
    Modal,
  },
  data: function () {
    return {
      dialog: false,
      dialogMessage: "",
      statusImage: null,
      tableHeaders: [
        {
          text: "Product Name",
          sortable: true,
          value: "product_name",
          width: "300px",
        },
        {
          text: "Order Number",
          value: "id",
          width: "200px",
          href: true,
          routeName: "OrderDetails",
        },
        {
          text: "Unit Price",
          value: "store_price",
          width: "160px",
          money: true,
        },
        {
          text: "Quantity",
          value: "total_items",
          width: "150px",
        },
        {
          text: "Total (₦)",
          value: "store_total_price",
          width: "200px",
        },
        { text: "Seller", value: "seller_name", width: "200px" },
        { text: "Payment", value: "payment_status_label", width: "120px" },
        {
          text: "Delivery",
          value: "delivery_status_label",
          width: "150px",
        },
        { text: "Time", value: "created_at", width: "200px" },
      ],
    };
  },
  created() {
    if (this.$store.getters["orders/orders"].length == 0) {
      this.$store.commit("orders/setTableLoader", true);
      this.getOrders();
    }
  },
  computed: {
    ...mapState({
      orders: (state) => state.orders.orders,
      pageDetails: (state) => state.orders.pageDetails,
      tableLoader: (state) => state.orders.tableLoader,
      searchOrder: (state) => state.orders.searchOrder,
    }),
  },
  methods: {
    // filter by date
    dateValue(params) {
      this.$store.commit("orders/setDateRange", {
        startDate: params.startDate.toISOString().split("T")[0],
        endDate: params.endDate.toISOString().split("T")[0],
      });
      this.$store.commit("orders/setTableLoader", true);
      this.$store.commit("orders/setAllowDateFilter", true);
      // set page back to page 1
      this.$store.commit("orders/setPage", 1);
      this.getFilteredOrders();
    },
    // search orders from the store to the DataTable
    getOrders() {
      this.$store.dispatch("orders/getOrders").then(() => {
        this.$store.commit("orders/setTableLoader", false);
      });
    },
    // filter error response function
    getFilteredOrders() {
      this.$store
        .dispatch("orders/getFilteredOrders")
        .then(() => this.$store.commit("orders/setTableLoader", false))
        .catch((error) => {
          this.$store.commit("orders/setTableLoader", false);
          this.statusImage = failedImage;
          this.dialog = true;
          if (error.response) {
            this.dialogMessage = "Something went wrong, please try again!";
          } else {
            this.dialogMessage = "No internet Connection!";
          }
        });
    },
    // search orders
    getSearchOrder() {
      this.$store.dispatch("orders/searchOrders").catch((error) => {
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
      this.$store.commit("orders/setItemPerPage", params);
      this.searchOrder === true
        ? this.getSearchOrder()
        : this.getFilteredOrders();
    },
    // set current page
    setCurentPage(params) {
      this.$store.commit("orders/setPage", params);
      this.searchOrder === true
        ? this.getSearchOrder()
        : this.getFilteredOrders();
    },
  },
};
</script>
<style lang="scss" scoped>
.search-container {
  width: 350px;
}
@media (max-width: 550px) {
  .search-container {
    width: 100%;
  }
}
</style>