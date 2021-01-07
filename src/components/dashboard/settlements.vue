<template>
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
          text: "Status",
          sortable: true,
          value: "name",
          width: "25%",
        },
        { text: "Amount (NGN)", value: "totalOrder", width: "25%" },
        {
          text: "Description",
          value: "totalValue",
          width: "25%",
          href: true,
          routeName: "customerDetail",
        },
        { text: "Date Settled", value: "totalValue", width: "25%" },
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