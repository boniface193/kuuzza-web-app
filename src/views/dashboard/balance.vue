<template>
  <v-container fluid>
    <div class="mx-lg-12 mx-md-5 mx-sm-5">
      <!-- page title -->

      <h1 class="heading--text">Balance</h1>

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

          <div class="btn-pointer d-flex">
            <v-icon class="primary--text">mdi-sort</v-icon>
            <v-img
              src="../../assets/download.svg"
              width="16"
              height="15"
              class="mx-8 mt-5"
            ></v-img>
          </div>
        </div>
        <router-view />
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  // components: {},
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