<template>
  <v-container fluid>
    <div class="mx-lg-12 mx-md-5 mx-sm-5 my-8">
      <!-- page title -->
      <div class="d-flex justify-space-between">
        <router-link
          to="/dashboard"
          style="text-decoration: none; color: #2b2b2b"
        >
          <h2
            class="float-left text-sm-body-1 text-md-h6 text-lg-h5 text-xl-h3 text-body-1 font-weight-bold"
          >
            <v-icon class="mb-1 mr-3" size="35">mdi-chevron-left</v-icon> Best
            Selling Items
          </h2>
        </router-link>
        <!-- <dateFilter @updateDate="dateValue" /> -->
      </div>
      <div>
        <div
          v-if="isLoading"
          style="position: absolute; margin: 15% 50%; text-align: center"
        >
          <!-- this image time loader is calculated by the loader to triger the load time -->
          <v-progress-circular
            color="primary"
            class=""
            indeterminate
          ></v-progress-circular>
        </div>
        <!-- table  -->
        <DataTable
          v-if="!isLoading"
          :headers="headers"
          :items="bestSeller"
          :itemPerPage="pageDetails.per_page || 15"
          :paginationLength="pageDetails.last_page"
          :page="pageDetails.current_page"
          @itemPerPage="setItemPerPage"
          @onPageChange="setCurentPage"
          itemKey="id"
        />
      </div>
      <p class="text-center mt-8">{{ msg }}</p>
    </div>
    <router-view />
  </v-container>
</template>
<script>
import DataTable from "@/components/general/DataTable.vue";
// import dateFilter from "@/components/dashboard/calender.vue";
import { mapState } from "vuex";
export default {
  components: {
    // dateFilter,
    DataTable,
  },
  data() {
    return {
      isLoading: true,
      bestSeller: [],
      msg: "",
      headers: [
        {
          text: "Rank",
          sortable: true,
          value: "rank",
          width: "25%",
        },
        {
          text: "Product Name",
          value: "product_name",
          // href: true,
          // routeName: "seller",
          width: "25%",
          id: "product_id",
        },
        { text: "Total Quantity Sold", value: "quantity", width: "25%" },
        {
          text: "Total Value of Orders(₦)",
          value: "total_store_value",
          width: "25%",
        },
      ],
    };
  },

  computed: {
    ...mapState({
      pageDetails: (state) => state.bestSellingDashboard.pageDetails,
    }),
  },

  created() {
    // best selling
    this.$store.dispatch("bestSellingDashboard/getBestSelling").then((e) => {
      if (e.data.length < 1) {
        this.msg = "No Item Found";
      }
      let seller = e.data;
      let Rank = e.ranks;

      this.bestSeller = seller;
      this.sellerRank = Rank;
      this.isLoading = false;
    });
  },

  methods: {
    // filter by date
    // dateValue(params) {
    //  this.$store.commit("bestSellingDashboard/filterRange", {
    //     startDate: params.startDate.toISOString().split("T")[0],
    //     endDate: params.endDate.toISOString().split("T")[0],
    //   });
    //   // this.$store.commit("bestSellingDashboard/setTableLoader", true);
    //   // this.$store.commit("bestSellingDashboard/setAllowDateFilter", true);
    //   // set page back to page 1
    //   this.$store.commit("bestSellingDashboard/setPage", 1);
    //   // this.getFilteredOrders();
    // },
    // set item per page
    setItemPerPage(params) {
      this.$store.commit("bestSellingDashboard/setItemPerPage", params);
      // this.searchProduct === true
      //   ? this.getSearchProduct()
      //   : this.getfilteredProducts();
    },

    // set current page
    setCurentPage(params) {
      this.$store.commit("bestSellingDashboard/setPage", params);
      // this.searchProducts === true
      //   ? this.getSearchProduct()
      //   : this.getfilteredProducts();
    },
  },
};
</script>

