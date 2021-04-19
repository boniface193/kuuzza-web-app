<template>
  <div class="px-3 px-sm-12 pt-13 pb-4">
    <!-- page title -->
    <filter-By-Date
      class="float-right text-caption text-sm-subtitle-2 text-md-subtitle-1"
      @updateDate="dateValue"
    />
    <h1>Leaderboard</h1>

    <div class="settings-container mt-7 white">
      <!-- nav section -->
      <div class="settings-nav px-4 py-auto d-flex">
        <div>
          <SearchBar
            class="mt-2 text-caption text-sm-subtitle-2 text-md-subtitle-1"
            placeholder="Search Leaderboard"
            @search="getSearchValue"
          />
        </div>
      </div>
    </div>
    <!-- table -->
    <v-card elevation="0" class="py-3">
      <div>
        <!-- table  -->
        <DataTable
          v-show="!isLoading"
          :headers="headers"
          :items="leaderboard"
          itemKey="id"
          :itemPerPage="pageDetails.per_page || 15"
          :paginationLength="pageDetails.last_page"
          :page="pageDetails.current_page"
          @itemPerPage="setItemPerPage"
          @onPageChange="setCurentPage"
        />
      </div>
      <!-- card item -->
      <div v-if="isLoading" class="text-center my-8">
        <!-- this image time loader is calculated by the loader to triger the load time -->
        <v-progress-circular
          color="primary"
          class=""
          indeterminate
        ></v-progress-circular>
      </div>
      <!-- loader ends here -->
      <p class="text-center mt-8">
        {{ errorMsg }}
      </p>
    </v-card>
  </div>
</template>
<script>
import filterByDate from "@/components/dashboard/calender.vue";
import SearchBar from "@/components/general/SearchBar.vue";
import DataTable from "@/components/leaderboard/DataTable.vue";
import moment from "moment";
import { mapState } from "vuex";

export default {
  components: {
    filterByDate,
    SearchBar,
    DataTable,
  },

  data() {
    return {
      leaderboard: [],
      isLoading: true,
      itemPerPage: 15,
      errorMsg: "",
      // show on a larger screen
      headers: [
        {
          text: "Rank",
          sortable: true,
          value: "rank",
          width: "16%",
        },
        {
          text: "Sellers",
          value: "seller_name",
          // href: true,
          // routeName: "seller",
          width: "35%",
          // id: "seller_id"
        },
        { text: "Points", value: "total_points", width: "20%" },
        {
          text: " Orders(₦)",
          value: "total_order_value",
          width: "29%",
        },
      ],
    };
  },

  computed: {
    ...mapState({
      pageDetails: (state) => state.leaderboard.pageDetails,
    }),
  },

  created() {
    // dispatch leaderboard
    this.$store.dispatch("leaderboard/getLeaderboard").then((e) => {
      let leader = e.data;

      this.leaderboard = leader;
      this.isLoading = false;
      if (e.length == 0) {
        this.errorMsg = "No Item Found";
      }
    });
  },

  methods: {
    // set item per page
    setItemPerPage(params) {
      this.$store.commit("inventory/setItemPerPage", params);
      this.getLeaderboard();
    },
    // set current page
    setCurentPage(params) {
      this.$store.commit("inventory/setPage", params);
      this.getLeaderboard();
    },
    getSearchValue(params) {
      this.$store.commit("leaderboard/getSearchValue", params);
      this.$store.commit("leaderboard/setSearchOrder", true);
      this.getLeaderboard();
    },

    dateValue(params) {
      this.$store.commit("leaderboard/filterRange", {
        startDate: moment(params.startDate).format("L"),
        endDate: moment(params.endDate).format("L"),
      });
      this.getLeaderboard();
    },

    getLeaderboard() {
      this.$store.dispatch("leaderboard/searchLeaderboard").then((e) => {
        let leader = e.data;

        this.leaderboard = leader;
        this.isLoading = false;
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