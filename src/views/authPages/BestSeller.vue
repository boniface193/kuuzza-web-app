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
        <!-- table  -->
        <dataTable
          :headers="headers"
          :items="items"
          :select="true"
          itemKey="id"
        />
      </div>
    </div>
    <router-view />
  </v-container>
</template>
<script>
import dataTable from "@/components/dashboard/dataTable.vue";
import dateFilter from "@/components/dashboard/calender.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    dateFilter,
    dataTable,
  },
  data() {
    return {
      headers: [
        {
          text: "Rank",
          sortable: true,
          value: "1",
          width: "25%",
        },
        {
          text: "Product Name",
          value: "name",
          href: true,
          routeName: "seller",
          width: "25%",
        },
        { text: "Total Quantity Sold", value: "totalPoint", width: "25%" },
        { text: "Total Value of Orders(₦)", value: "totalValue", width: "25%" },
      ],

      items: [
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          totalPoint: 4000,
          totalValue: 300000,
          id: "seller01",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({ bestSelling: "dashboard/bestSellingItem" }),
  },
};
</script>

