<template>
  <v-container fluid>
    <div class="mx-lg-12 mx-md-5 mx-sm-5 my-8">
      <!-- page title -->
      <div class="d-flex justify-space-between">
        <h1 class="heading--text">Best Seller</h1>
        <dateFilter />
      </div>
        <div>
          <!-- table  -->
          <dataTable :headers="headers" :items="items" 
          :select="true"/>
        </div>
    </div>
  </v-container>
</template>
<script>
import dataTable from "@/components/dashboard/dataTable.vue";
import dateFilter from "@/components/dashboard/calender.vue"
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
          width: "14%",
        },
        {
          text: "Product Name",
          value: "name",
          href: true,
          routeName: "seller",
          width: "37%",
        },
        { text: "Total Quantity Sold", value: "totalPoint", width: "20%" },
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

