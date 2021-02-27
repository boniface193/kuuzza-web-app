<template>
  <div class="px-3 px-sm-12 pt-7 pb-4" style="zoom: 110%">
    <!-- page title -->
    <h1 class="">Settings</h1>

    <div class="settings-container mt-7 white">
      <!-- nav section -->
      <div class="settings-nav px-4 py-0 d-flex">
        <div class="hide-nav">
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
                this.$route.name == 'editTeamMember',
            }"
            :to="{ name: 'teamDetails' }"
            >Team</router-link
          >
          <!-- nav link -->
          <router-link
            class="nav-item hide-item"
            :class="{
              'nav-item--active':
                this.$route.name == 'AddBankDetails' ||
                this.$route.name == 'WithdrawFund' ||
                this.$route.name == 'EditBankDetails',
            }"
            :to="{ name: 'AddBankDetails' }"
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
            class="nav-item hide-item"
            :class="{ 'nav-item--active': this.$route.name == 'logout' }"
            :to="{ name: 'logout' }"
            >Log Out</router-link
          >
        </div>
        <!-- mobile nav selector -->
        <div class="mobile-nav py-4" style="width: 200px; height: 70px">
          <selectBtn
            :items="[
              'Store',
              'User',
              'Team',
              'Bank Account',
              'Privacy & Security',
            ]"
            :item="this.$route.name"
            @selectedItem="navigateToPage"
          />
        </div>
      </div>

      <router-view />
    </div>
  </div>
</template>
<script>
import selectBtn from "@/components/dashboard/selectBtn.vue";
export default {
  name: "Settings",
  components: { selectBtn },
  methods: {
    navigateToPage(params) {
      let page;
      if (params === "Store") {
        page = "store";
      } else if (params === "User") {
        page = "user";
      } else if (params === "Team") {
        page = "teamDetails";
      } else if (params === "Bank Account") {
        page = "AddBankDetails";
      } else if (params === "Privacy & Security") {
        page = "privacy";
      }
      this.$router.push({
        name: page,
      });
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
  .mobile-nav {
    display: none;
  }
}
@media (max-width: 750px) {
  .settings-container {
    .settings-nav {
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