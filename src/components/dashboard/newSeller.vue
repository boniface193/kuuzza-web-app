<template>
  <v-card elevation="0" class="py-3">
    <div>
      <!-- table  -->
      <DataTable :headers="headers" :items="items" :select="true" />
    </div>
  </v-card>
</template>

<script>
import DataTable from "@/components/dashboard/DataTable.vue";
export default {
  components: {
    DataTable,
  },
  data() {
    return {
      headers: [
        {
          text: "Sellers Name",
          sortable: true,
          value: "name",
          width: "50%",
        },
        { text: "Total Orders", value: "totalOrder", width: "20%" },
        { text: "Total Value of Orders(₦)", value: "totalValue", width: "30%" },
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
          totalOrder: 9,
          totalValue: 299999,
          id: "hr02",
        },
        {
          name: "Ayotunde Lanwo",
          totalOrder: 3,
          totalValue: 199999,
          id: "hr03",
        },
      ],
    };
  },
};
</script>

<style>
</style>