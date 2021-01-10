<template>
  <div class="px-3 px-sm-12 pt-7 pb-4" style="zoom: 110%">
    <!-- page title -->
    <h1 class="text-sm-h6 text-md-h5 text-lg-h4 text-xl-h3 text-h6 font-weight-bold">Settings</h1>

    <div class="settings-container mt-7 white">
      <!-- nav section -->
      <div class="settings-nav px-4 py-0 d-flex">
        <!-- nav link -->
        <router-link
          class="nav-item"
          :class="{ 'nav-item--active': this.$route.name == 'store' }"
          :to="{ name: 'store' }"
          >Store</router-link
        >
        <!-- nav link -->
        <router-link
          class="nav-item"
          :class="{ 'nav-item--active': this.$route.name == 'user' }"
          :to="{ name: 'user' }"
          >User</router-link
        >
        <!-- nav link -->
        <router-link
          class="nav-item"
          :class="{
            'nav-item--active':
              this.$route.name == 'teamDetails' ||
              this.$route.name == 'teamInvite' ||
              this.$route.name == 'editTeamMember'
          }"
          :to="{ name: 'teamDetails' }"
          >Team</router-link
        >
        <!-- nav link -->
        <router-link
          class="nav-item"
          :class="{ 'nav-item--active': this.$route.name == 'bankAccounts' }"
          :to="{ name: 'bankAccounts' }"
          >Bank Accounts</router-link
        >
        <!-- nav link -->
        <router-link
          class="nav-item"
          :class="{ 'nav-item--active': this.$route.name == 'privacy' }"
          :to="{ name: 'privacy' }"
          >Privacy & Security</router-link
        >
        <!-- nav link -->
        <router-link
          class="nav-item logout"
          :class="{ 'nav-item--active': this.$route.name == 'logout' }"
          :to="{ name: 'logout' }"
          >Log Out</router-link
        >
      </div>

      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "Settings",
  created() {
    this.$store.dispatch("settings/getUserProfile");
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
      border-bottom: 3px solid transparent;
      display: inline-block;
      margin: 0px 40px 0px 0px;
      color: #979797;
      margin-bottom: -2px;
      text-decoration: none;
      &--active {
        color: #5064cc;
        border-color: #5064cc;
        font-weight: bold;
      }
    }
  }
}
@media (max-width: 750px) {
  .settings-container {
    .settings-nav {
      .nav-item {
        margin: 0px 15px 0px 0px;
        padding: 7px 3px;
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
</style>