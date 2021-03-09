<template>
  <div class="px-3 px-sm-12 pt-7 pb-4">
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
          <searchBar
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
        <dataTable :headers="headers" :items="leaderboard" itemKey="id" />
      </div>
      <!-- card item -->
      <div v-if="isLoading" class="text-center my-8">
        <!-- this image time loader is calculated by the loader to triger the load time -->
        <v-progress-circular
          color="#029B97"
          class="text-center"
          indeterminate
          size="20"
          width="2"
        ></v-progress-circular>
      </div>
      <!-- loader ends here -->
      <p v-if="leaderboard.length === 0" class="text-center mt-8">
        No Item Found
      </p>
    </v-card>
  </div>
</template>
<script>
import filterByDate from "@/components/dashboard/calender.vue";
import searchBar from "@/components/dashboard/searchBar.vue";
import dataTable from "@/components/dashboard/dataTable.vue";
import moment from "moment";
export default {
  components: {
    filterByDate,
    searchBar,
    dataTable,
  },

  data() {
    return {
      leaderboard: [],
      isLoading: true,
      headers: [
        {
          text: "Rank",
          sortable: true,
          value: "",
          width: "14%",
        },
        {
          text: "Team Member",
          value: "seller_name",
          href: true,
          routeName: "seller",
          width: "37%",
        },
        { text: "Total Points", value: "total_points", width: "20%" },
        {
          text: "Total Value of Orders(₦)",
          value: "total_order_value",
          width: "29%",
        },
      ],
    };
  },

  created() {
    this.$store.dispatch("leaderboard/getLeaderboard").then((e) => {
      this.leaderboard = e.data;
      this.isLoading = false;

      e.data.forEach((i) => {
        // let valueName = e.ranks[i.seller_id];
        this.headers[0].value = e.ranks;
        console.log(this.headers[0].value = i) 
        // e.ranks[i.seller_id];
        // this.headers.forEach((e) => {
          console.log(this.headers);
        // });
      });
    });
  },

  methods: {
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
      this.$store.dispatch("leaderboard/searchLeaderboard").then((res) => {
        this.leaderboard = res.data;
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