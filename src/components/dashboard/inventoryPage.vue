<template>
  <div>
    <!-- page title -->
    <div class="d-flex justify-space-between align-center">
      <h1>Inventory</h1>
      <router-link :to="{ name: 'history' }">History</router-link>
    </div>
    <div class="d-flex justify-space-between align-center mt-8 mb-1 flex-wrap">
      <div class="select-item mr-8 mb-2">
        <select v-model="selected">
          <option value="">Actions</option>
          <option value="">Delete items</option>
          <option value="">Take items offline</option>
        </select>
      </div>

      <div class="d-flex align-center flex-wrap tool-container justify-space-between">
        <!-- search bar -->
        <searchBar
          placeholder="Search inventory"
          @search="getSearchValue"
          bgColor="white"
          borderColor=" #e2e2e2"
          class="mr-2 mb-2 search-bar"
        />
        <div class="d-flex align-center flex-wrap justify-space-between mb-2 ">
          <!-- filter -->
          <basicFilter
            class="mr-2"
            :price="filterParameters.price"
            :commission="filterParameters.commission"
            :quantity="filterParameters.quantity"
            :category="filterParameters.category"
            :stock="filterParameters.stock"
            headerName="Filter Products"
          />
          <!-- export btn -->
          <span class="small-btn primary--text mr-2"
            ><img src="@/assets/img/upload2.svg" alt=""
          /></span>
          <!-- import btn -->
          <router-link :to="{ name: 'productList' }">
            <span class="small-btn primary--text mr-2"
              ><img src="@/assets/img/download.svg" alt=""
            /></span>
          </router-link>
          <!-- add product btn -->
          <router-link :to="{ name: 'addProduct' }">
            <v-btn class="primary py-6 px-4"
              ><span>+</span> Add New Product</v-btn
            >
          </router-link>
        </div>
      </div>
    </div>
    <!-- table  -->
    <dataTable
      :action="false"
      :actions="actions"
      :select="true"
      :headers="tableHeaders"
      :items="inventories"
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
import searchBar from "@/components/dashboard/searchBar.vue";
import basicFilter from "@/components/dashboard/basicFilter";
import { mapGetters } from "vuex";
export default {
  name: "inventoryPage",
  components: { dataTable, modal, searchBar, basicFilter },
  data: function () {
    return {
      items: ["Items in stock", "Items out of stock"],
      item: "Items in stock",
      dialog1: false,
      searchValue: "",
      inventoryName: "",
      selected: "",
      selectedRow: [],
      actions: {
        deleteId: null,
        editId: null,
        selectedId: [],
      },
      filterParameters: {
        price: true,
        commission: true,
        quantity: true,
        category: true,
        stock: true,
      },
      tableHeaders: [
        {
          text: "Product Name",
          sortable: true,
          value: "productName",
          href: true,
          routeName: "productDetails",
          width: "300px",
        },
        { text: "Image", value: "image", image: true, width: "200px" },
        { text: "Category", value: "category", width: "200px" },
        { text: "SKU", value: "sku", width: "200px" },
        { text: "Price (N)", value: "price", width: "200px" },
        { text: "Commission (N)", value: "commission", width: "200px" },
        { text: "Quantity", value: "quantity", width: "100px" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      inventories: "inventory/inventories",
    }),
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
    getSearchValue(params) {
      this.searchValue = params;
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
    &:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }
    &:focus {
      border: 2px solid #5064cc;
    }
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
.small-btn {
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-align: center;
  &:hover {
    background-color: rgb(239, 245, 255);
  }
}
@media (max-width: 953px) {
  .tool-container{
    width: 100%;
    justify-content: space-between;
  }
}
</style>