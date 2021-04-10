<template>
  <v-card elevation="0" class="py-3">
    <div>
      <!-- table  -->
      <DataTable
        class="mr-0"
        :headers="headers"
        :items="items"
        :select="true"
        itemKey="id"
      />
    </div>
  </v-card>
</template>

<script>
import DataTable from "@/components/dashboard/DataTable.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    DataTable,
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
        { text: "Total Orders", value: "totalOrder", width: "20%" },
        { text: "Total Value of Orders(₦)", value: "totalValue", width: "30%" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      items: "customer/returningCustomerList",
    }),
  },
};
</script>

<style>
</style>