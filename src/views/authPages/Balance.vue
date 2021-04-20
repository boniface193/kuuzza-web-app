<template>
  <div class="px-3 px-sm-12 pt-12 pb-4" style="zoom: 110%">
    <div class="d-flex align-center justify-space-between">
      <!-- page title -->
      <h1 class="">Earnings</h1>
      <!-- calendar -->
      <calendar @updateDate="setDate" />
    </div>

    <div class="balance-container mt-7 white">
      <!-- nav section -->
      <div class="balance-nav px-4 py-0 d-flex">
        <div class="hide-nav">
          <!-- nav link -->
          <router-link
            class="nav-item"
            :class="{ 'nav-item--active': this.$route.name == 'Revenue' }"
            :to="{ name: 'Revenue' }"
            >Revenue</router-link
          >
          <!-- nav link -->
          <router-link
            class="nav-item"
            :class="{ 'nav-item--active': this.$route.name == 'Settlements' }"
            :to="{ name: 'Settlements' }"
            >Settlements</router-link
          >
          <!-- nav link -->
          <router-link
            class="nav-item"
            :class="{
              'nav-item--active': this.$route.name == 'AwaitingSettlements',
            }"
            :to="{ name: 'AwaitingSettlements' }"
            >Awaiting Settlements</router-link
          >
          <!-- nav link -->
          <router-link
            class="nav-item"
            :class="{
              'nav-item--active': this.$route.name == 'PaymentHistory',
            }"
            :to="{ name: 'PaymentHistory' }"
            >Payment History</router-link
          >
        </div>
        <!-- mobile nav selector -->
        <div class="py-4 mobile-nav" style="width: 220px; height: 70px">
          <selectBtn
            bgColor="white"
            borderRadius="8px"
            borderColor="#e2e2e2"
            :items="[
              'Revenue',
              'Settlements',
              'Awaiting Settlements',
              'Payment History',
            ]"
            :item="this.$route.name"
            @selectedItem="navigateToPage"
          />
        </div>
      </div>
      <!-- sub pages view-->
      <router-view ref="views" />
    </div>
  </div>
</template>
<script>
import selectBtn from "@/components/general/SelectBtn.vue";
import calendar from "@/components/dashboard/calender.vue";
import moment from "moment";
export default {
  name: "Balance",
  components: { selectBtn, calendar },
  methods: {
    navigateToPage(params) {
      let page;
      if (params === "Revenue") {
        page = "Revenue";
      } else if (params === "Settlements") {
        page = "Settlements";
      } else if (params === "Awaiting Settlements") {
        page = "AwaitingSettlements";
      } else if (params === "Payment History") {
        page = "PaymentHistory";
      }
      this.$router.push({
        name: page,
      });
    },
    setDate(params) {
      this.$store.commit("balance/setDateRange", {
        startDate: moment(params.startDate).format("L"),
        endDate: moment(params.endDate).format("L"),
      });
      this.$refs.views.reset();
    },
  },
};
</script>
<style lang="scss" scoped>
.balance-container {
  border-radius: 15px;
  .balance-nav {
    border-bottom: 1px solid #f1edec;
    width: 100%;
    max-height: 60px;
    .nav-item {
      padding: 15px 5px;
      border-bottom: 3px solid transparent;
      display: inline-block;
      margin: 0px 40px 0px 0px;
      color: #979797;
      margin-bottom: -2px;
      text-decoration: none;
      &--active {
        color: var(--v-primary-base);
        border-color: var(--v-primary-base);
        font-weight: bold;
      }
    }
  }
  .mobile-nav {
    display: none;
  }
}
@media (max-width: 750px) {
  .balance-container {
    .balance-nav {
      max-height: 75px;
    }
    .hide-nav {
      display: none;
    }
    .mobile-nav {
      display: block;
    }
  }
}
</style>