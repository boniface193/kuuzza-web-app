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
      :items="tableItems"
      @selectedRow="rowSelected"
    />
  </div>
</template>
<script>
import dataTable from "@/components/dashboard/dataTable.vue";
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
        },
        { text: "Image", value: "image", image: true },
        { text: "Category", value: "category" },
        { text: "SKU", value: "sku" },
        { text: "Price(N)", value: "price" },
        { text: "Commission(N)", value: "commission" },
        { text: "Quantity", value: "quantity" },
      ],
      tableItems: [
        {
          productName: "Apple MacBook 2013 Pro Core i5",
          image: "@assets/img/laptop.png",
          category: "Phones & devices",
          sku: "0000000000",
          price: "250000",
          commission: "1000",
          quantity: 30,
          id: "kjkwde98",
        },
        {
          productName: "Apple MacBook 2013 Pro Core i5",
          image: "@assets/img/laptop.png",
          category: "Phones & devices",
          sku: "0000000000",
          price: "250000",
          commission: "1000",
          quantity: 30,
          id: "njwa872",
        },
        {
          productName: "Apple MacBook 2013 Pro Core i5",
          image: "@assets/img/laptop.png",
          category: "Phones & devices",
          sku: "0000000000",
          price: "250000",
          commission: "1000",
          quantity: 15,
          id: "wswawa0",
        },
        {
          productName: "Apple MacBook 2013 Pro Core i5",
          image: "@assets/img/laptop.png",
          category: "Phones & devices",
          sku: "0000000000",
          price: "250000",
          commission: "1000",
          quantity: 10,
          id: "hjbwahyaw7",
        },
      ],
    };
  },
  methods: {
    rowSelected() {
        
    }  
  }
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