<template>
  <v-container fluid>
    <div class="mx-lg-12 mx-md-5 mx-sm-5 my-8">
      <!-- page title -->
      <filter-By-Date
        class="float-right text-caption text-sm-subtitle-2 text-md-subtitle-1"
      />
      <h1 class="heading--text">Leaderboard</h1>

      <div class="settings-container mt-7 white">
        <!-- nav section -->
        <div class="settings-nav px-4 py-auto d-flex">
          <!-- nav link -->
          <router-link
            class="nav-item text-sm-subtitle-1 text-caption"
            :class="{ 'nav-item--active': this.$route.name == 'leaderboard' }"
            :to="{ name: 'leaderboard' }"
            >Store</router-link
          >
          <!-- nav link -->
          <router-link
            class="nav-item text-sm-subtitle-1 text-caption"
            :class="{
              'nav-item--active': this.$route.name == 'leaderGlobal',
            }"
            :to="{ name: 'leaderGlobal' }"
            >Nationwide</router-link
          >
          <v-spacer></v-spacer>
          <div>
            <searchBar
              class="mt-2 text-caption text-sm-subtitle-2 text-md-subtitle-1"
              placeholder="Search Leaderboard"
              @search="getSearchValue"
            />
          </div>
        </div>
        <router-view />
      </div>
    </div>
  </v-container>
</template>
<script>
import filterByDate from "@/components/dashboard/calender.vue";
import searchBar from "@/components/dashboard/searchBar.vue";
export default {
  components: {
    filterByDate,
    searchBar,
  },

  data() {
    return {};
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
</style>