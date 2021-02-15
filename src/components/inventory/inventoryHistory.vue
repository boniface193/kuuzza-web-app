<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <!-- back to Inventory -->
      <router-link :to="{ name: 'inventoryPage' }" class="no-decoration">
        <h3 class="d-flex align-center return-btn my-3">
          <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Inventory History
        </h3>
      </router-link>
      <calendar />
    </div>

    <!-- table  -->
    <div v-show="loader !== true">
    <dataTable
      :action="false"
      :actions="actions"
      :select="true"
      :headers="tableHeaders"
      :items="inventoriesHistory"
      @selectedRow="rowSelected"
    />
    </div>

    <!-- loader -->
    <div class="text-center pt-10 pb-5" v-show="loader">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>
<script>
import dataTable from "@/components/dashboard/dataTable.vue";
import calendar from "@/components/dashboard/calender.vue";
import { mapGetters } from "vuex";
export default {
  name: "inventoryHistory",
  components: { dataTable, calendar },
  data: function () {
    return {
      loader: false,
      selectedRow: [],
      actions: {
        deleteId: null,
        editId: null,
        selectedId: [],
      },
      tableHeaders: [
        {
          text: "Product Name",
          sortable: true,
          value: "name",
          width: "300px",
        },
        { text: "Image", value: "image", image: true, width: "150px" },
        { text: "SKU", value: "sku", width: "200px" },
        { text: "Quantity", value: "quantity", width: "100px" },
        { text: "Status", value: "status", width: "150px" },
        { text: "Time", value: "time", width: "200px" },
        {
          text: "Sales Representative",
          value: "salesRepresentative",
          width: "250px",
        },
      ],
    };
  },
  created() {
    this.getInventoryHistory();
  },
  computed: {
    ...mapGetters({
      inventoriesHistory: "inventory/inventoryHistory",
    }),
  },
  methods: {
    rowSelected() {},
    getInventoryHistory() {
      this.loader = true;
      this.$store
        .dispatch("inventory/getInventoryHistory")
        .then(() => (this.loader = false))
        .catch(() => (this.loader = false));
    },
  },
};
</script>
<style lang="scss" scoped>
.return-btn {
  cursor: pointer;
  .v-icon {
    margin-right: 15px;
  }
}
.no-decoration {
  text-decoration: none;
  color: #2b2b2b;
}
</style>