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
          width: "300px"
        },
        { text: "Image", value: "image", image: true, width: "200px" },
        { text: "SKU", value: "sku", width: "200px" },
        { text: "Quantity", value: "quantity", width: "100px" },
        { text: "Status", value: "status", width: "150px"},
        { text: "Time", value: "time", width: "200px" },
        { text: "Sales Representative", value:"salesRepresentative", width: "250px"}
      ],
      tableItems: [
        {
          productName: "Apple MacBook 2013 Pro Core i5",
          image: "@assets/img/laptop.png",
          sku: "0000000000",
          quantity: 30,
          status: "Added",
          time: "031220 8:05am",
          salesRepresentative: "-", 
          id: "kjkwde98",
        },
        {
          productName: "Apple MacBook 2013 Pro Core i5",
          image: "@assets/img/laptop.png",
          sku: "0000000000",
          quantity: 2,
          status: "Sold",
          time: "031120 8:05am",
          salesRepresentative: "Abdulazeez", 
          id: "kjk78hj98",
        },
        {
          productName: "Apple MacBook 2013 Pro Core i5",
          image: "@assets/img/laptop.png",
          sku: "0000000230",
          quantity: 30,
          status: "Added",
          time: "031220 8:05am",
          salesRepresentative: "-", 
          id: "ggyu278",
        },
        {
          productName: "Apple MacBook 2013 Pro Core i5",
          image: "@assets/img/laptop.png",
          sku: "0000000000",
          quantity: 30,
          status: "Added",
          time: "031220 8:05am",
          salesRepresentative: "-", 
          id: "87hjsa",
        },
        {
          productName: "Apple MacBook 2013 Pro Core i5",
          image: "@assets/img/laptop.png",
          sku: "0000000000",
          quantity: 1,
          status: "Sold",
          time: "031220 9:05am",
          salesRepresentative: "Ayotunde Lanwo", 
          id: "yuu223",
        },
      ],
    };
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