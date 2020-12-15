<template>
  <div class="mx-lg-12 mx-md-5 mx-sm-5 my-8">
    <!-- page title -->
    <div class="btn-pointer float-right">
      <v-img
        src="../../assets/download.svg"
        width="16"
        height="15"
        class=""
      ></v-img>
    </div>
    <h1 class="heading--text">Leaders Board</h1>

    <div class="settings-container mt-7 white">
      <!-- nav section -->
      <div class="settings-nav px-4 py-auto d-flex">
        <!-- nav link -->
        <router-link
          class="nav-item"
          :class="{ 'nav-item--active': this.$route.name == 'all' }"
          :to="{ name: 'all' }"
          >All</router-link
        >
        <!-- nav link -->
        <router-link
          class="nav-item"
          :class="{
            'nav-item--active': this.$route.name == 'new',
          }"
          :to="{ name: 'new' }"
          >New</router-link
        >
        <!-- nav link -->
        <router-link
          class="nav-item"
          :class="{
            'nav-item--active': this.$route.name == 'returning',
          }"
          :to="{ name: 'returning' }"
          >Returning</router-link
        >
        <v-spacer></v-spacer>

        <searchBar
          class="mt-2"
          placeholder="Search representative"
          @search="getSearchValue"
        />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import searchBar from "@/components/dashboard/searchBar.vue";
export default {
  components: {
    searchBar,
  },
};
</script>

<style lang="scss">
.heading--text {
  font: normal normal bold 30px/37px "Product Sans";
  letter-spacing: 0px;
  color: #2b2b2b;
  opacity: 1;
}
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
.btn-pointer {
  cursor: pointer;
  &:hover {
    background-color: rgb(239, 245, 255);
    padding: 8px;
    
  }
}
</style>