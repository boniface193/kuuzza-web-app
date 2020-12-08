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
        },
        { text: "Team Member", value: "name" },
        { text: "Total Points", value: "status" },
        { text: "Total Value of Orders(₦)", value: "status" },
      ],

      items: [
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          status: 4000,
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          status: 4999,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          status: 3799,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          status: 3999,
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          status: 2999,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Super",
          status: 1999,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Super",
          status: 5000,
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          status: 4999,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Super",
          status: 3999,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          status: 2999,
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          status: 3999,
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          status: 2000,
        },
      ],
    };
  },
};
</script>

<style>
</style>