<template>
  <v-container fluid>
    <div class="mx-lg-12 mx-md-5 mx-sm-5">
      <!-- page title -->
      <div class="d-flex justify-space-between">
        <h1 class="text-sm-h6 text-md-h5 text-lg-h4 text-xl-h3 text-h6 font-weight-bold">Balance</h1>
        <dateFilter />
      </div>
      <div class="settings-container mt-7 white">
        <!-- nav section -->
        <div class="settings-nav px-4 py-auto d-flex">
          <!-- nav link -->
          <router-link
            class="nav-item text-sm-subtitle-1 text-caption"
            :class="{ 'nav-item--active': this.$route.name == 'revenue' }"
            :to="{ name: 'revenue' }"
            >Revenue</router-link
          >
          <!-- nav link -->
          <router-link
            class="nav-item text-sm-subtitle-1 text-caption"
            :class="{
              'nav-item--active': this.$route.name == 'settlements',
            }"
            :to="{ name: 'settlements' }"
            >Settlements</router-link
          >
          <!-- nav link -->
          <router-link
            class="nav-item text-sm-subtitle-1 text-caption"
            :class="{
              'nav-item--active': this.$route.name == 'awaitingSettlements',
            }"
            :to="{ name: 'awaitingSettlements' }"
            >Awaiting Settlements</router-link
          >

          <router-link
            class="nav-item text-sm-subtitle-1 text-caption"
            :class="{
              'nav-item--active': this.$route.name == 'paymentHistory',
            }"
            :to="{ name: 'paymentHistory' }"
            >Payment History</router-link
          >
          <v-spacer></v-spacer>

          <div class="d-flex my-3">
            <basicFilter
              :price="filterParameters.price"
              :category="[]"
              headerName="Filter Balance"
              @filterOption="filterTable"
              @resetFilter="resetFilter"
            />
            <div class="btn-pointer">
              <v-img
                src="../../assets/download.svg"
                class="mr-sm-3 mr-lg-8 ml-sm-3 ml-lg-8 mt-2"
              ></v-img>
            </div>
          </div>
        </div>
        <router-view />
      </div>
    </div>
  </v-container>
</template>

<script>
import dateFilter from "@/components/dashboard/calender.vue";
import basicFilter from "@/components/dashboard/basicFilter.vue";
export default {
  components: {
    dateFilter,
    basicFilter,
  },
  data() {
    return {
      filterParameters: {
        price: true,
      },
    };
  },

  methods: {
    filterTable() {},
    // reset filter
    resetFilter() {
      // this.$store.commit("inventory/resetFilter");
    },
  },
};
</script>

<style lang="scss" scoped>
.settings-container {
  border-radius: 15px;
  .settings-nav {
    border-bottom: 1px solid #f1edec;
    width: 100%;
    max-height: 60px;
    .nav-item {
      padding: 15px 5px;
      text-align: center;
      border-bottom: 3px solid transparent;
      display: inline-block;
      margin: 0px 40px 0px 0px;
      color: #979797;
      margin-bottom: -2px;
      text-decoration: none;
      font: normal normal normal 16px/19px "Product Sans" Light;
      letter-spacing: 0px;
      opacity: 1;
      &--active {
        color: #5064cc;
        border-color: #5064cc;
        font-weight: bold;
        transition-duration: 1s;
        transition-timing-function: linear;
      }
    }
  }
}
@media (max-width: 550px) {
  .settings-container {
    .settings-nav {
      justify-content: space-between !important;
      .nav-item {
        margin: 0px;
        padding: 5px 3px;
      }
      .logout {
        display: none;
      }
    }
  }
}
.btn-pointer {
  cursor: pointer;
}
</style>