<template>
  <div class="px-3 px-sm-12 pt-7 pb-4">
    <!-- page title -->
    <h1>Settings</h1>

    <div class="settings-container mt-7 white">
      <!-- nav section -->
      <div class="settings-nav px-4 py-0 d-flex">
        <!-- nav link -->
        <a
          class="nav-item"
          :class="{ 'nav-item--active': currentPage == 'store' }"
          @click="currentPage = 'store'"
          >Store</a
        >
        <!-- nav link -->
        <a
          class="nav-item"
          :class="{ 'nav-item--active': currentPage == 'user' }"
          @click="currentPage = 'user'"
          >User</a
        >
        <!-- nav link -->
        <a
          class="nav-item"
          :class="{ 'nav-item--active': currentPage == 'team' }"
          @click="currentPage = 'team'"
          >Team</a
        >
        <!-- nav link -->
        <a
          class="nav-item"
          :class="{ 'nav-item--active': currentPage == 'privacy' }"
          @click="currentPage = 'privacy'"
          >Privacy & Security</a
        >
        <!-- nav link -->
        <a
          class="nav-item logout"
          :class="{ 'nav-item--active': currentPage == 'logout' }"
          @click="currentPage = 'logout'"
          >Log Out</a
        >
      </div>

      <!-- store -->
      <storeDetails v-show="currentPage == 'store'" />

      <!-- user -->
      <userDetails v-show="currentPage == 'user'" />

      <!-- team -->
      <teamDetails v-show="currentPage == 'team'" />

      <!-- privacy and security -->
      <privacyDetails v-show="currentPage == 'privacy'" />

      <!-- logout -->
      <logout v-show="currentPage == 'logout'" />

    </div>
  </div>
</template>
<script>
import storeDetails from "@/components/dashboard/storeDetails";
import userDetails from "@/components/dashboard/userDetails";
import teamDetails from "@/components/dashboard/teamDetails";
import privacyDetails from "@/components/dashboard/privacyDetails";
import logout from "@/components/dashboard/logout";
export default {
  name: "Settings",
  data: function () {
    return {
      currentPage: "store",
    };
  },
  components: {
    storeDetails,
    userDetails,
    teamDetails,
    privacyDetails,
    logout
  },
};
</script>

<style lang="scss">
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
      &--active {
        color: #5064cc;
        border-color: #5064cc;
        font-weight: bold;
      }
    }
  }
  .settings-input {
    position: relative;
    .edit-btn {
      position: absolute;
      bottom: 25px;
      right: 0;
      cursor: pointer;
      color: #5064cc;
      background: white;
      padding: 5px 0px 0px 5px;
    }
  }
  .store-width {
    width: 50%;
  }
}
@media (max-width: 950px) {
  .settings-container {
    .store-width {
      width: 100%;
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