<template>
  <v-container>
    <div class="">
      <v-card elevation="0" class="py-3">
        <div>
          <!-- table  -->
          <dataTable :headers="headers" :items="items" :select="true" />
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import dataTable from "@/components/dashboard/dataTable.vue";
export default {
  components: {
    dataTable,
  },
  data() {
    return {
      headers: [
        {
          text: "Sellers Name",
          sortable: true,
          value: "name",
          width: "50%"
        },
        { text: "Total Orders", value: "totalOrder" },
        { text: "Total Value of Orders(₦)", value: "totalValue" },
      ],

      items: [
        {
          name: "Ayotunde Lanwo",
          totalOrder: 4,
          totalValue: 300000,
          id: "hr01",
        },
        {
          name: "Abdulazeez Abdulazeez",
          totalPoint: 2,
          totalValue: 299999,
          id: "hr02",
        },
      ],
    };
  },
};
</script>

<style>
</style>