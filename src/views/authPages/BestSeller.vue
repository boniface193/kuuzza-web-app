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
        <dateFilter />
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
        <dataTable
          v-if="!isLoading"
          :headers="headers"
          :items="bestSeller"
          itemKey="id"
        />
      </div>
      <p class="text-center mt-8">{{msg}}</p>
    </div>
    <router-view />
  </v-container>
</template>
<script>
import dataTable from "@/components/dashboard/dataTable.vue";
import dateFilter from "@/components/dashboard/calender.vue";
export default {
  components: {
    dateFilter,
    dataTable,
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
          value: "",
          width: "25%",
        },
        {
          text: "Product Name",
          value: "product_name",
          // href: true,
          // routeName: "seller",
          width: "25%",
          id: "product_id"
        },
        { text: "Total Quantity Sold", value: "quantity", width: "25%" },
        {
          text: "Total Value of Orders(₦)",
          value: "total_order_value",
          width: "25%",
        },
      ],
    };
  },

  created() {
    // best selling
    this.$store.dispatch("bestSellingDashboard/getBestSelling").then((e) => {
      if(e.data.length < 1) {
        this.msg = "No Item Found"
      }
      let seller = e.data
      let Rank = e.ranks

      this.bestSeller = seller;
      this.sellerRank = Rank
      this.isLoading = false;
    });   
  },
};
</script>

