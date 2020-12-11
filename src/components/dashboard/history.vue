<template>
  <div>
    <div>
      <!-- back to Inventory -->
      <router-link :to="{ name: 'inventoryPage' }" class="no-decoration">
        <h3 class="d-flex align-center return-btn my-3">
          <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Inventory History
        </h3>
      </router-link>
    </div>

    <!-- table  -->
    <dataTable
      :action="false"
      :actions="actions"
      :select="true"
      :headers="tableHeaders"
      :items="inventoriesHistory"
      @selectedRow="rowSelected"
    />
  </div>
</template>
<script>
import dataTable from "@/components/dashboard/dataTable.vue";
import {mapGetters} from "vuex";
export default {
  name: "history",
  components: { dataTable },
  data: function () {
    return {
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
          value: "productName",
          width: "300px"
        },
        { text: "Image", value: "image", image: true, width: "200px" },
        { text: "SKU", value: "sku", width: "200px" },
        { text: "Quantity", value: "quantity", width: "100px" },
        { text: "Status", value: "status", width: "150px"},
        { text: "Time", value: "time", width: "200px" },
        { text: "Sales Representative", value:"salesRepresentative", width: "250px"}
      ],
    };
  },
  computed: {
    ...mapGetters({
      inventoriesHistory: "inventory/inventoriesHistory",
    }),
  },
  methods: {
    rowSelected() {},
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