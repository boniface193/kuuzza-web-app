<template>
  <v-container>
    <div class="">
      <v-card elevation="0" class="py-3">
        <div>
          <!-- table  -->
          <dataTable :headers="headers" :items="items" />
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
          text: "Rank",
          sortable: true,
          value: "",
        },
        { text: "Team Member", value: "name", href: true },
        { text: "Total Points", value: "totalPoint" },
        { text: "Total Value of Orders(₦)", value: "totalValue" },
      ],

      items: [
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          totalPoint: 4000,
          totalValue: 300000,
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          totalPoint: 4999,
          totalValue: 299999,
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

<style>
</style>