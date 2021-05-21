<template>
  <div class="px-3 px-sm-12 pt-7 pb-4">
    <!-- page title -->
    <div class="btn-pointer float-right">
      <v-img
        src="../../assets/download.svg"
        width="16"
        height="15"
        class=""
      ></v-img>
    </div>
    <h1>Sellers</h1>

    <div class="settings-container mt-7 white">
      <!-- nav section -->
      <div class="settings-nav px-4 py-auto d-flex">
        <!-- nav link -->
        <router-link
          class="nav-item text-sm-subtitle-1 text-caption"
          :class="{ 'nav-item--active': this.$route.name == 'all' }"
          :to="{ name: 'all' }"
          >All</router-link
        >
        <!-- nav link -->
        <router-link
          class="nav-item text-sm-subtitle-1 text-caption"
          :class="{
            'nav-item--active': this.$route.name == 'new',
          }"
          :to="{ name: 'new' }"
          >New</router-link
        >
        <!-- nav link -->
        <router-link
          class="nav-item text-sm-subtitle-1 text-caption"
          :class="{
            'nav-item--active': this.$route.name == 'returning',
          }"
          :to="{ name: 'returning' }"
          >Returning</router-link
        >
        <v-spacer></v-spacer>

        <SearchBar
          class="mt-2 text-caption text-sm-subtitle-2 text-md-subtitle-1"
          placeholder="Search Sellers"
          @search="getSearchValue"
        />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/general/SearchBar.vue";
export default {
  components: {
    SearchBar,
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