<template>
  <v-container>
    <div class="">
      <v-card elevation="0" class="py-3">
        <div>
          <!-- table  -->
          <dataTable
            class="mr-0"
            :headers="headers"
            :items="items"
            :select="true"
            width="100%"
          />
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
        },
        { text: "Total Points", value: "totalOrder" },
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

          totalOrder: 4,
          totalValue: 299999,
          id: "hr02",
        },
        {
          name: "Ayotunde Lanwo",

          totalOrder: 3,
          totalValue: 199999,
          id: "hr03",
        },
        {
          name: "Ayotunde Lanwo",

          totalOrder: 3,
          totalValue: 209000,
          id: "hr04",
        },
        {
          name: "Abdulazeez Abdulazeez",

          totalOrder: 2,
          totalValue: 203000,
          id: "hr05",
        },
        {
          name: "Ayotunde Lanwo",

          totalOrder: 6,
          totalValue: 100000,
          id: "hr06",
        },
        {
          name: "Ayotunde Lanwo",

          totalOrder: 5,
          totalValue: 190000,
          id: "hr07",
        },
        {
          name: "Abdulazeez Abdulazeez",

          totalOrder: 7,
          totalValue: 190000,
          id: "hr08",
        },
        {
          name: "Ayotunde Lanwo",

          totalOrder: 3,
          totalValue: 180000,
          id: "hr09",
        },
        {
          name: "Ayotunde Lanwo",

          totalOrder: 2,
          totalValue: 200000,
          id: "hr10",
        },
        {
          name: "Abdulazeez Abdulazeez",

          totalOrder: 3,
          totalValue: 14300,
          id: "hr11",
        },
        {
          name: "Ayotunde Lanwo",

          totalOrder: 2,
          totalValue: 198000,
          id: "hr12",
        },
      ],
    };
  },
};
</script>

<style>
</style>