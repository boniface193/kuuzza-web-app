<template>
  <div class="">
    <v-card elevation="0" class="py-3">
      <div>
        <!-- table  -->
        <dataTable
          class="mr-0"
          :headers="headers"
          :items="items"
          :select="true"
        />
      </div>
    </v-card>
  </div>
</template>

<script>
import dataTable from "@/components/dashboard/dataTable.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    dataTable,
  },
  data() {
    return {
      width: "100%",
      headers: [
        {
          text: "Sellers Name",
          sortable: true,
          value: "name",
          href: true,
          routeName: "seller",
          width: "50%",
        },
        { text: "Total Points", value: "totalOrder", width: "20%" },
        { text: "Total Value of Orders(₦)", value: "totalValue", width: "30%" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      items: "sellers/items",
    }),
  },
};
</script>

<style>
</style>