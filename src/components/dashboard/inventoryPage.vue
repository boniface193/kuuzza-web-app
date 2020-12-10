<template>
  <div>
    <!-- page title -->
    <div class="d-flex justify-space-between align-center">
      <h1>Inventory</h1>
      <router-link :to="{ name: 'history' }">History</router-link>
    </div>
    <div class="d-flex justify-space-between align-center mt-8 mb-3">
      <div class="select-item">
        <select v-model="selected">
          <option value="">Items in stock</option>
          <option value="">Items out of stock</option>
        </select>
      </div>

      <div class="d-flex align-center flex-wrap">
        <v-icon class="primary--text mr-2 mb-5 mb-sm-0">mdi-upload</v-icon>
        <v-icon class="primary--text mr-2 mb-5 mb-sm-0">mdi-sort</v-icon>
        <router-link :to="{ name: 'addProduct' }">
          <v-btn class="primary py-6 px-4"
            ><span>+</span> Add New Product</v-btn
          >
        </router-link>
      </div>
    </div>
    <!-- table  -->
    <dataTable
      :action="false"
      :actions="actions"
      :select="true"
      :headers="tableHeaders"
      :items="tableItems"
      @requestedAction="setRequestedAction"
      @selectedRow="rowSelected"
    />

    <!-- modal -->
    <modal :dialog="dialog1" width="470">
      <div class="white pa-3 pb-10 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeDialog1"
            >mdi-close</v-icon
          >
        </div>

        <p>Are you sure you want to delete this team member?</p>

        <div class="d-flex align-center">
          <div>
            <v-img
              class=""
              style="
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
              "
              src="@/assets/img/user-profile.svg"
            >
            </v-img>
          </div>
          <p class="grey--text title mb-0">{{ inventoryName }}</p>
        </div>
        <p class="mt-5">All associated data will also be deleted!</p>
        <p class="error--text">Are you sure? There is no undo.</p>

        <!-- btns -->
        <div class="d-flex justify-space-between flex-wrap">
          <v-btn class="error py-5 mb-3 mb-sm-0">Yes, delete this member</v-btn>
          <v-btn
            color="#F6F7FD"
            class="primary--text py-5"
            @click="closeDialog1"
            >No, keep this member</v-btn
          >
        </div>
        <div></div>
      </div>
    </modal>
  </div>
</template>

<script>
import dataTable from "@/components/dashboard/dataTable.vue";
import modal from "@/components/dashboard/modal.vue";
export default {
  name: "inventoryPage",
  components: { dataTable, modal },
  data: function () {
    return {
      items: ["Items in stock", "Items out of stock"],
      item: "Items in stock",
      dialog1: false,
      inventoryName: "",
      selected: "",
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
          href: true,
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
    setRequestedAction(params) {
      this.actions = params;
      if (this.actions.editId !== null) {
        const item = this.tableItems.find(
          (x) => x.id === `${this.actions.editId}`
        );
        this.dialog1 = true;
        this.inventoryName = item.name;
      } else if (this.actions.deleteId !== null) {
        const item = this.tableItems.find(
          (x) => x.id === `${this.actions.deleteId}`
        );
        this.dialog1 = true;
        this.inventoryName = item.name;
      }
    },
    // close the dialog that shows up when you want to delete a row
    closeDialog1() {
      this.dialog1 = false;
      this.actions.deleteId = null;
    },
    rowSelected(params) {
      this.selectedRow = params;
      //console.log(this.selectedRow)
    },
  },
};
</script>
<style lang="scss" scoped>
.select-item {
  width: 170px;
  position: relative;
  select {
    width: 170px;
    height: 40px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: 1px solid #7070704d;
    border-radius: 5px;
    padding: 0px 12px;
    background: #ffffff;
    option {
      color: #5064cc;
      &:hover {
        background-color: #5064cc26 !important;
      }
    }
  }
  &::before {
    content: "\f107";
    font-family: FontAwesome;
    font-size: 22px;
    display: block;
    color: #5064cc; /*change in this line color*/
    position: absolute;
    right: 12px;
    top: calc(16% - 2px);
    pointer-events: none;
  }
}
.v-btn {
  span {
    font-size: 25px;
    margin-right: 7px;
  }
}
</style>