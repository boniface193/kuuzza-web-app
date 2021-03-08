<template>
  <div class="px-3 px-sm-12 pt-7 pb-4">
    <!-- page title -->
    <filter-By-Date
      class="float-right text-caption text-sm-subtitle-2 text-md-subtitle-1"
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
        <dataTable :headers="headers" :items="items" itemKey="id" />
      </div>
    </v-card>
  </div>
</template>
<script>
import filterByDate from "@/components/dashboard/calender.vue";
import searchBar from "@/components/dashboard/searchBar.vue";
import dataTable from "@/components/dashboard/dataTable.vue";
export default {
  components: {
    filterByDate,
    searchBar,
    dataTable,
  },

  data() {
    return {
      headers: [
        {
          text: "Rank",
          sortable: true,
          value: "1",
          width: "14%",
        },
        {
          text: "Team Member",
          value: "name",
          href: true,
          routeName: "seller",
          width: "37%",
        },
        { text: "Total Points", value: "totalPoint", width: "20%" },
        { text: "Total Value of Orders(₦)", value: "totalValue", width: "29%" },
      ],

      items: [
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          totalPoint: 4000,
          totalValue: 300000,
          id: "seller01",
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          totalPoint: 4999,
          totalValue: 299999,
          id: "seller02",
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          totalPoint: 3799,
          totalValue: 199999,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          totalPoint: 3999,
          totalValue: 209000,
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          totalPoint: 2999,
          totalValue: 203000,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Super",
          totalPoint: 1999,
          totalValue: 100000,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Super",
          totalPoint: 5000,
          totalValue: 190000,
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          totalPoint: 4999,
          totalValue: 190000,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Super",
          totalPoint: 3999,
          totalValue: 180000,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          totalPoint: 2999,
          totalValue: 200000,
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          totalPoint: 3999,
          totalValue: 14300,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          totalPoint: 2000,
          totalValue: 198000,
        },
      ],
    };
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