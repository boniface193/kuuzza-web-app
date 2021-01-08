<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <!-- page title -->
      <h1>Orders</h1>

      <div class="d-flex align-center flex-wrap">
        <!-- search bar -->
        <searchBar
          placeholder="Search orders"
          @search="getSearchValue"
          bgColor="white"
          borderColor="#e2e2e2"
          class="mr-2 mb-5 mb-sm-0"
        />
        <!-- filter -->
        <basicFilter
          class="mr-2 mb-5 mb-sm-0"
          :price="filterParameters.price"
          :commission="filterParameters.commission"
          :payment="filterParameters.payment"
          :delivery="filterParameters.delivery"
          :category="[]"
          headerName="Filter Orders"
          @filterOption="filterTable"
          @resetFilter="resetFilter"
        />
        <!-- export btn -->
        <span class="small-btn primary--text mr-2 mb-5 mb-sm-0"
          ><img src="@/assets/img/upload2.svg" alt=""
        /></span>

        <!-- calendar -->
         <calendar />
      </div>
    </div>

    <!-- table  -->
    <dataTable
      :action="false"
      :select="true"
      :headers="tableHeaders"
      :items="orders"
      itemKey="id"
      @selectedRow="rowSelected"
    />
  </div>
</template>
<script>
import searchBar from "@/components/dashboard/searchBar.vue";
import dataTable from "@/components/dashboard/dataTable.vue";
import basicFilter from "@/components/dashboard/basicFilter.vue";
import calendar from "@/components/dashboard/calender.vue";
import { mapGetters } from "vuex";
export default {
  name: "ordersPage",
  components: { searchBar, dataTable, basicFilter, calendar },
  data: function () {
    return {
      searchValue: "",
      filterParameters: {
        price: true,
        commission: true,
        payment: true,
        delivery: true,
      },
      selectedRow: [],
      tableHeaders: [
        {
          text: "Product Name",
          sortable: true,
          value: "productName",
          href: false,
          width: "300px",
        },
        {
          text: "Order Number",
          value: "orderNumber",
          width: "200px",
          href: true,
          routeName: "OrderDetails",
        },
        { text: "Price", value: "price", width: "160px", money: true },
        { text: "Commission", value: "commission", width: "160px", money: true },
        { text: "Seller", value: "seller", width: "200px", href: true },
        { text: "Customer", value: "customer", width: "200px", href: true },
        { text: "Time", value: "time", width: "200px" },
        { text: "Payment", value: "payment", width: "150px" },
        { text: "Delivery", value: "delivery", width: "170px" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      orders: "orders/orders",
    }),
  },
  methods: {
    getSearchValue(params) {
      this.searchValue = params;
    },
    rowSelected(params) {
      this.selectedRow = params;
      //console.log(this.selectedRow)
    },
    filterTable(params) {
      this.$store.commit("orders/filterOrders", {
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        minCommission: params.minCommission,
        maxCommission: params.maxCommission,
        selectedOptions: params.selectedOptions
      });
    },
    resetFilter() {
      this.$store.commit("orders/resetFilter")
    }
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