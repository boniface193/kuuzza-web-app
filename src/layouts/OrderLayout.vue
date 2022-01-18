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
    </div>
    <!-- tabs for order types -->
    <div class="order-type-tabs">
      <router-link
        :to="{ name: 'Orders' }"
        class="order-type-tabs__tab"
        :class="{ active: $route.name === 'Orders' }"
        >Inventory orders</router-link
      >
      <router-link
        :to="{ name: 'OpensellingOrders' }"
        class="order-type-tabs__tab"
        :class="{ active: $route.name === 'OpensellingOrders' }"
        >Open selling orders</router-link
      >
    </div>

    <!-- loader -->
    <div class="text-center pt-10 pb-5" v-if="tableLoader">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import SearchOrders from "@/components/order/SearchOrders.vue";
import FilterOrders from "@/components/order/FilterOrders.vue";
import ExportOrders from "@/components/order/ExportOrders.vue";
import Calendar from "@/components/general/Calendar.vue";
import moment from "moment";
export default {
  name: "orderPage",
  components: {
    SearchOrders,
    FilterOrders,
    ExportOrders,
    Calendar,
  },
  data: function () {
    return {};
  },
  computed: {
    ...mapState({
      tableLoader: (state) => state.orders.tableLoader,
    }),
    getOrderType() {
      return {
        orderType: this.$route.name === "Orders" ? "orders" : "openOrders",
      };
    },
  },
  methods: {
    // filter by date
    dateValue(params) {
      this.$store.commit(`${this.getOrderType.orderType}/setDateRange`, {
        startDate: moment(params.startDate).format("L"),
        endDate: moment(params.endDate).format("L"),
      });
      this.$store.commit("orders/setTableLoader", true);
      this.$store.commit(
        `${this.getOrderType.orderType}/setAllowDateFilter`,
        true
      );
      // set page back to page 1
      this.$store.commit(`${this.getOrderType.orderType}/setPage`, 1);
      this.getFilteredOrders();
    },
    // filter error response function
    getFilteredOrders() {
      this.$store
        .dispatch(`${this.getOrderType.orderType}/getFilteredOrders`)
        .then(() => this.$store.commit("orders/setTableLoader", false))
        .catch(() => this.$store.commit("orders/setTableLoader", false));
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
.order-type-tabs {
  max-width: 600px;
  display: flex;
  margin: 20px auto;
  &__tab {
    width: 50%;
    border-radius: 50px;
    padding: 10px 10px;
    border: 1px solid #ddd;
    text-align: center;
    color: var(--v-secondary-base);
    text-decoration: none;
    &.active {
      background: var(--v-primary-base);
      color: #fff;
      border-color: var(--v-primary-base);
    }
  }
}
</style>
