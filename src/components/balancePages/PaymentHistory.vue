<template>
  <div class="py-5">
    <div>
      <dataTable
        ref="settlementsTable"
        :headers="settlementsHeader"
        :items="settlements"
        itemKey="id"
        :itemPerPage="15"
        :paginationLength="1"
        :page="1"
        @itemPerPage="setItemPerPage"
        @onPageChange="setCurentPage"
      />
    </div>
  </div>
</template>
<script>
import dataTable from "@/components/dashboard/dataTable.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Settlements",
  components: {
      dataTable
  },
  data: function () {
    return {
        settlementsHeader: [
        {
          text: "Bank Details",
          value: "name",
          width: "400px",
        },
        { text: "Amount", value: "amount", width: "250px", money: true},
        { text: "Payment Status", value: "status", width: "250px"},
        { text: "Time", value: "time", width: "250px" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      settlements: "balance/settlements",
    }),
     ...mapState({
      pageDetails: (state) => state.settlements.pageDetails,
     })
  },
  methods: {
    setItemPerPage() {},
    setCurentPage() {},
  },
};
</script>