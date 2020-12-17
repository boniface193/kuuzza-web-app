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
          />
        </div>
      </v-card>
    </div>
  </v-container>
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
          text: "Customer Name",
          sortable: true,
          value: "name",
          href: true,
          routeName: "customerDetail",
          width: "50%",
        },
        { text: "Total Orders", value: "totalOrder" },
        { text: "Total Value of Orders(₦)", value: "totalValue" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      items: "customer/items",
    }),
  },
};
</script>

<style>
</style>