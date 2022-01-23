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
  name: "InventoryOrders",
  components: {
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
          text: "Order Number",
          value: "id",
          width: "300px",
          href: true,
          routeName: "OrderDetails",
        },
        { text: "Seller", value: "seller_name", width: "300px" },
        { text: "Payment", value: "payment_status_label", width: "200px" },
        {
          text: "Delivery",
          value: "delivery_status_label",
          width: "200px",
        },
        { text: "Time", value: "created_at", width: "200px" }
      ],
    };
  },
  created() {
    this.$store.commit("orders/setTableLoader", true);
    this.getOrders();
  },
  computed: {
    ...mapState({
      orders: (state) => state.orders.orders,
      pageDetails: (state) => state.orders.pageDetails,
      tableLoader: (state) => state.orders.tableLoader,
    }),
  },
  methods: {
    // search orders from the store to the DataTable
    getOrders() {
      this.$store
        .dispatch("orders/getOrders")
        .then(() => {
          this.$store.commit("orders/setTableLoader", false);
        })
        .catch(() => this.$store.commit("orders/setTableLoader", false));
    },
    // filter error response function
    getFilteredOrders() {
      this.$store
        .dispatch("orders/getFilteredOrders")
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
    // search orders
    getSearchOrder() {
      this.$store.dispatch("orders/searchOrders").catch((error) => {
        this.statusImage = failedImage;
        if (error.status == 400) {
          this.dialog = true;
          this.dialogMessage = error.data.message;
        }
      });
    },
  },
};
</script>