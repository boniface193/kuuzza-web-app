<template>
  <div class="pb-16">
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

    <!-- no data -->
    <div
      class="text-center pt-16 pb-5"
      v-show="orders.length == 0 && !tableLoader"
    >
      <div class="mb-5">
        <img src="@/assets/img/Empty-orders.svg" alt="" />
      </div>
      <h2>No orders available</h2>
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
import Modal from "@/components/general/Modal.vue";
import DataTable from "@/components/general/DataTable.vue";
import failedImage from "@/assets/img/failed-img.svg";
import { mapState } from "vuex";
export default {
  name: "OpensellingOrders",
  components: { DataTable, Modal },
  data: function () {
    return {
      dialog: false,
      dialogMessage: "",
      statusImage: null,
      tableHeaders: [
        {
          text: "Order Number",
          value: "id",
          width: "300px",
          href: true,
          routeName: "OpensellingOrderDetails",
        },
        { text: "Customer", value: "customer_name", width: "200px" },
        {
          text: "Amount",
          value: "total_product_price_label",
          width: "200px",
          money: true,
        },
        { text: "Payment", value: "payment_status_label", width: "200px" },
        {
          text: "Delivery status",
          value: "delivery_status_label",
          width: "200px",
        },
        { text: "Time", value: "created_at", width: "200px" },
      ],
    };
  },
  created() {
    this.$store.commit("orders/setTableLoader", true);
    this.getOpensellingOrders();
  },
  computed: {
    ...mapState({
      orders: (state) => state.openOrders.orders,
      pageDetails: (state) => state.openOrders.pageDetails,
      tableLoader: (state) => state.orders.tableLoader,
    }),
  },
  methods: {
    // search orders from the store to the DataTable
    getOpensellingOrders() {
      this.$store
        .dispatch("openOrders/getOrders")
        .then(() => {
          this.$store.commit("orders/setTableLoader", false);
        })
        .catch(() => this.$store.commit("orders/setTableLoader", false));
    },
    // filter error response function
    getOpenSellingFilteredOrders() {
      this.$store
        .dispatch("openOrders/getFilteredOrders")
        .then(() => this.$store.commit("orders/setTableLoader", false))
        .catch((error) => {
          this.$store.commit("orders/setTableLoader", false);
          this.statusImage = failedImage;
          if (error.status == 400) {
            this.dialog = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
    // search orders
    getOpensellingSearchOrder() {
      this.$store.dispatch("openOrders/searchOrders").catch((error) => {
        this.statusImage = failedImage;
        if (error.status == 400) {
          this.dialog = true;
          this.dialogMessage = error.data.message;
        }
      });
    },
    // set item per page
    setItemPerPage(params) {
      this.$store.commit("openOrders/setItemPerPage", params);
      this.searchOrder === true
        ? this.getOpensellingSearchOrder()
        : this.getOpenSellingFilteredOrders();
    },
    // set current page
    setCurentPage(params) {
      this.$store.commit("openOrders/setPage", params);
      this.searchOrder === true
        ? this.getOpensellingSearchOrder()
        : this.getOpenSellingFilteredOrders();
    },
  },
};
</script>