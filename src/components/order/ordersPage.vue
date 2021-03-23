<template>
  <div>
    <div class="">
      <!-- page title -->
      <div class="d-flex justify-space-between align-center">
        <h1
          class="text-sm-h6 text-md-h5 text-lg-h4 text-xl-h3 text-h6 font-weight-bold"
        >
          Orders
        </h1>
        <!-- calendar -->
        <calendar @updateDate="dateValue" />
      </div>

      <div class="d-flex align-center mt-8 mb-1 flex-wrap offset-lg-9">
        <!-- search bar -->
        <div class="">
          <searchBar
            placeholder="Search orders"
            @search="getSearchValue"
            bgColor="white"
            borderColor="#e2e2e2"
            class="mr-2 mb-5 mb-sm-0"
          />
        </div>
        <!-- filter -->
        <basicFilter
          class="mr-2 mb-5 mb-sm-0"
          :price="filterParameters.price"
          :payment="filterParameters.payment"
          :delivery="filterParameters.delivery"
          :category="[]"
          headerName="Filter Orders"
          @filterOption="filterTable"
          @resetFilter="resetFilter"
        />
        <!-- export btn -->
        <span
          @click="exportOrder"
          class="small-btn primary--text mr-2 mb-5 mb-sm-0"
          ><img src="@/assets/img/upload2.svg" alt=""
        /></span>
      </div>
    </div>
    <!-- this is the loader visible to the user -->

    <div
      v-if="isLoading"
      style="position: absolute; margin: 15% 50%; text-align: center"
    >
      <!-- this image time loader is calculated by the loader to triger the load time -->
      <v-progress-circular
        color="primary"
        class=""
        indeterminate
      ></v-progress-circular>
    </div>
    <!-- loader ends here -->
    <!-- table  -->
    <dataTable
      v-show="orders.length > 0"
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
      @selectedRow="rowSelected"
    />
    <p class="text-center mt-8">{{errorMsg}}</p>
    <!--------------------------- modal for dialog messages ------------------------------>
    <modal :dialog="isAlert" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="isAlert = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img
            :src="alertColor"
            width="30%"
            height="30%"
            style="margin: 0px 35%"
          ></v-img>
        </div>

        <h4>{{ errorMsg }}</h4>
      </div>
    </modal>
  </div>
</template>
<script>
import searchBar from "@/components/dashboard/searchBar.vue";
import dataTable from "@/components/dashboard/dataTable.vue";
import basicFilter from "@/components/dashboard/basicFilter.vue";
import calendar from "@/components/dashboard/calender.vue";
import { mapGetters, mapState } from "vuex";
import modal from "@/components/dashboard/modal.vue";
import failedImage from "@/assets/img/failed-img.svg";
import successImage from "@/assets/img/success-img.svg";
export default {
  name: "ordersPage",
  components: { searchBar, dataTable, basicFilter, calendar, modal },
  data: function () {
    return {
      isLoading: true,
      alertColor: null,
      errorMsg: "",
      isAlert: false,
      itemPerPage: 15,
      filterParameters: {
        price: true,
        payment: true,
        delivery: true,
      },
      selectedRow: [],
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
          width: "200px",
        },
        {
          text: "Total (₦)",
          value: "total_price_label",
          width: "200px",
        },
          { text: "Seller", value: "seller_name", width: "200px" },
        { text: "Time", value: "created_at", width: "200px" },
        { text: "Payment", value: "payment_status_label", width: "150px" },
        { text: "Delivery", value: "delivery_status_label", width: "170px" },
      ],
    };
  },
  computed: {
    // to populate items on the table
    ...mapGetters({
      orders: "orders/orders",
      searchOrder: "orders/searchOrder",
    }),
    ...mapState({
      searchValue: (state) => state.orders.searchValue,
      pageDetails: (state) => state.orders.pageDetails,
    }),
  },
  created() {
    this.$store.dispatch("orders/getOrders").then((res) => {
      this.isLoading = false;
      if (res.length == 0) {
        this.errorMsg = "No Item Found"
      }
    });
    this.$store.dispatch("orders/filterGetOrders");
  },
  methods: {
    // filter by date
    dateValue(params) {
      this.$store.commit("orders/filterRange", {
        startDate: params.startDate.toISOString().split("T")[0],
        endDate: params.endDate.toISOString().split("T")[0],
      });
      this.filterGetOrders();
    },
    // export order
    exportOrder() {
      this.isAlert = true;
      this.errorMsg = "Exporting Product...";
      this.alertColor = "success";
      this.$store
        .dispatch("orders/exportOrder")
        .then(() => {
          this.alertColor = successImage;
          this.errorMsg =
            "Orders successfully exported, An email would be sent to you shortly!";
        })
        .catch((error) => {
          if (error.response) {
            this.errorMsg = "Something went wrong, pls try again!";
            this.alertColor = failedImage;
          } else {
            this.errorMsg = "No internet Connection!";
            this.alertColor = failedImage;
          }
        });
    },
    // filter error response function
    filterGetOrders() {
      this.$store.dispatch("orders/filterGetOrders").catch((e) => {
        if (e.response.status === 422) {
          this.isAlert = true;
          this.alertColor = failedImage;
          this.errorMsg = e.response.data;
        }
      });
    },
    // search the datatable items
    getSearchValue(params) {
      this.$store.commit("orders/getSearchValue", params);
      this.$store.commit("orders/setSearchOrder", true);
      this.$store.dispatch("orders/searchOrders").then(() => {
        this.isLoading = false;
      });
    },
    // returns searched values to the table
    ordersPage() {
      if (this.searchValue !== "") {
        this.$store.commit("orders/setSearchOrder", true);
        this.getOrders();
      } else {
        this.$store.commit("inventory/setSearchOrder", false);
        this.getOrders();
      }
    },
    // search orders from the store to the datatable
    getOrders() {
      this.$store.dispatch("orders/searchOrders").then(() => {
        this.isLoading = false;
      });
    },
    // this method is to check selected row, but it have been set to false on the datatable, you can change it to true to use it
    rowSelected(params) {
      this.selectedRow = params;
    },
    // set item per page
    setItemPerPage(params) {
      this.$store.commit("orders/setItemPerPage", params);
      this.searchOrder === true ? this.getOrders() : this.filterGetOrders();
    },
    // set current page
    setCurentPage(params) {
      this.$store.commit("orders/setPage", params);
      this.searchOrders === true ? this.getOrders() : this.filterGetOrders();
    },
    // filter function
    filterTable(params) {
      this.$store.commit("orders/filterOrders", {
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        selectedOptions: params.selectedOptions,
      });
      this.filterGetOrders();
    },

    // reset the filter and it will affect the table
    resetFilter() {
      this.$store.commit("orders/filterOrders", {
        minPrice: 0,
        maxPrice: 0,
        selectedOptions: [],
      });
      this.filterGetOrders();
    },
  },
};
</script>
<style lang="scss" scoped>
.small-btn {
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-align: center;
  &:hover {
    background-color: rgb(239, 245, 255);
  }
}
</style>