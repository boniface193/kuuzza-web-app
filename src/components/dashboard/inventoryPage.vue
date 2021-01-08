<template>
  <div class="pb-10">
    <!-- page title -->
    <div class="d-flex justify-space-between align-center">
      <h1>Inventory</h1>
      <div class="d-flex align-center">
        <router-link :to="{ name: 'history' }" class="mr-4"
          >History</router-link
        >
        <calendar />
      </div>
    </div>
    <div class="d-flex justify-space-between align-center mt-8 mb-1 flex-wrap">
      <div class="select-item mr-8 mb-2">
        <selectBtn
          :items="['Take product offline', 'Delete product']"
          :item="'Actions'"
          :dropDownMenu="true"
        />
      </div>

      <div
        class="d-flex align-center flex-wrap tool-container justify-space-between"
      >
        <!-- search bar -->
        <searchBar
          placeholder="Search inventory"
          @search="getSearchValue"
          bgColor="white"
          borderColor="#e2e2e2"
          class="mr-2 mb-2 search-bar"
        />
        <div class="d-flex align-center flex-wrap justify-space-between mb-2">
          <!-- filter -->
          <basicFilter
            class="mr-2"
            :price="filterParameters.price"
            :quantity="filterParameters.quantity"
            :category="filterParameters.category"
            :stock="filterParameters.stock"
            headerName="Filter Products"
            @filterOption="filterTable"
            @resetFilter="resetFilter"
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
    <div v-show="products.length > 0">
      <dataTable
        :action="false"
        :actions="actions"
        :select="true"
        :headers="tableHeaders"
        :items="products"
        itemKey="reference"
        :itemPerPage="getItemPerPage.itemPerPage || 15"
        :paginationLength="productsPageDetails.last_page"
        :page="productsPageDetails.current_page"
        @requestedAction="setRequestedAction"
        @selectedRow="rowSelected"
        @itemPerPage="setItemPerPage"
        @onPageChange="setCurentPage"
      />
    </div>

    <!-- no data -->
    <div
      class="text-center pt-10 pb-5"
      v-show="products.length == 0 && !tableLoader"
    >
      <p class="mb-0 secondary--text" style="font-size: 20px">
        No product has been added yet!
      </p>
    </div>
    <!-- loader -->
    <div class="text-center pt-10 pb-5" v-show="tableLoader">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- modal for dialog messages -->
    <modal :dialog="dialog1" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog1 = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img :src="statusImage"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>
  </div>
</template>

<script>
import dataTable from "@/components/dashboard/dataTable.vue";
import modal from "@/components/dashboard/modal.vue";
import searchBar from "@/components/dashboard/searchBar.vue";
import basicFilter from "@/components/dashboard/basicFilter.vue";
import selectBtn from "@/components/dashboard/selectBtn.vue";
import calendar from "@/components/dashboard/calender.vue";
//import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
import { mapGetters } from "vuex";
export default {
  name: "inventoryPage",
  components: { dataTable, modal, searchBar, basicFilter, selectBtn, calendar },
  data: function () {
    return {
      items: ["Items in stock", "Items out of stock"],
      item: "Items in stock",
      itemPerPage: 15,
      tableLoader: false,
      dialog1: false,
      dialogMessage: "",
      searchValue: "",
      inventoryName: "",
      selected: "",
      selectedRow: [],
      statusImage: null,
      actions: {
        deleteId: null,
        editId: null,
        selectedId: [],
      },
      filterParameters: {
        price: true,
        quantity: true,
        category: ["Phones & devices", "TV", "Gadgets"],
        stock: true,
      },
      filteringOptions: {
        minPrice: 0,
        maxPrice: 0,
        minCommission: 0,
        maxCommission: 0,
        minQuantity: 0,
        maxQuantity: 0,
        selectedOptions: []
      },
      tableHeaders: [
        {
          text: "Product Name",
          sortable: true,
          value: "name",
          href: true,
          routeName: "productDetails",
          width: "300px",
        },
        { text: "Image", value: "image", image: true, width: "200px" },
        { text: "Category", value: "category", width: "200px" },
        { text: "SKU", value: "sku", width: "200px" },
        { text: "Price", value: "price", width: "160px", money: true },
        { text: "Commission", value: "commission", width: "160px", money: true },
        { text: "Quantity", value: "quantity", width: "100px" },
      ],
    };
  },
  created() {
    if (this.$store.getters["inventory/products"].length == 0) {
      this.tableLoader = true;
      this.$store
        .dispatch("inventory/getProducts", {
          page: 1,
          itemPerPage: 15,
        })
        .then(() => (this.tableLoader = false))
        .catch((error) => {
          this.statusImage = failedImage;
          this.dialog1 = true;
          if(error.response){
            this.dialogMessage = "Something went wrong, pls try again!";
          }else{
            this.dialogMessage = "No internet connection!";
          }
          this.tableLoader = false
          });
    }
  },
  computed: {
    ...mapGetters({
      products: "inventory/products",
      productsPageDetails: "inventory/productsPageDetails"
    }),
    getItemPerPage() {
      return {
        itemPerPage: parseInt(this.productsPageDetails.per_page, 10),
      };
    },
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
    // set item per page
    setItemPerPage(params) {
      this.itemPerPage = params;
      let page = null
      if(this.itemPerPage > this.productsPageDetails.per_page){
        let range = Math.round((this.productsPageDetails.from - 1)/ this.productsPageDetails.per_page);
        if(range < 0.5) {
          page = range + 1
        }else {
          page = range;
          this.$store.commit("inventory/setCurrentPage", page); 
        }
      }else {
        page = Math.round(((this.productsPageDetails.from - 1)/ this.itemPerPage) + 1);
        this.$store.commit("inventory/setCurrentPage", page);
      }
      this.$store.dispatch("inventory/getfilteredProducts", {
        page: page,
        itemPerPage: this.itemPerPage,
        minPrice: this.filteringOptions.minPrice,
        maxPrice: this.filteringOptions.maxPrice,
        minCommission: this.filteringOptions.minCommission,
        maxCommission: this.filteringOptions.maxCommission,
        minQuantity: this.filteringOptions.minQuantity,
        maxQuantity: this.filteringOptions.maxQuantity,
        selectedOptions: this.filteringOptions.selectedOptions,
      }).catch((error) => {
        this.statusImage = failedImage;
        if(error.response){
           this.dialogMessage = "Something went wrong, pls try again!"
        }else{
           this.dialogMessage = "No internet Connection!";
        }
        this.dialog1 = true;
      })
    },
    // set current page
    setCurentPage(params) {
      this.$store.commit("inventory/setCurrentPage", params);
      this.$store.dispatch("inventory/getfilteredProducts", {
        page: params,
        itemPerPage: this.itemPerPage,
        minPrice: this.filteringOptions.minPrice,
        maxPrice: this.filteringOptions.maxPrice,
        minQuantity: this.filteringOptions.minQuantity,
        maxQuantity: this.filteringOptions.maxQuantity,
        selectedOptions: this.filteringOptions.selectedOptions,
      }).catch((error) => {
        this.statusImage = failedImage;
        if(error.response){
           this.dialogMessage = "Something went wrong, pls try again!"
        }else{
           this.dialogMessage = "No internet Connection!";
        }
        this.dialog1 = true;
      })
    },
    // close the dialog that shows up when you want to delete a row
    closeDialog1() {
      this.dialog1 = false;
      this.actions.deleteId = null;
    },
    rowSelected(params) {
      this.selectedRow = params;
    },
    getSearchValue(params) {
      this.searchValue = params;
       this.$store.dispatch("inventory/searchProducts", {
         value: this.searchValue,
       }).then(()=>{})
       .catch((error) => {
        this.statusImage = failedImage;
        if(error.response){
           this.dialogMessage = "Something went wrong, pls try again!"
        }else{
           this.dialogMessage = "No internet Connection!";
        }
        this.dialog1 = true;
      })
    },
    // filterTable
    filterTable(params) {
      // set filtering parameters
      this.filteringOptions.minPrice = params.minPrice,
      this.filteringOptions.maxPrice = params.maxPrice,
      this.filteringOptions.minQuantity = params.minQuantity,
      this.filteringOptions.maxQuantity = params.maxQuantity,
      this.filteringOptions.selectedOptions = params.selectedOptions,

      // trigger filter
      this.$store.dispatch("inventory/getfilteredProducts", {
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        minQuantity: params.minQuantity,
        maxQuantity: params.maxQuantity,
        selectedOptions: params.selectedOptions,
        itemPerPage: this.itemPerPage,
        page: 1
      }).catch((error) => {
        this.statusImage = failedImage;
        if(error.response){
           this.dialogMessage = "Something went wrong, pls try again!"
        }else{
           this.dialogMessage = "No internet Connection!";
        }
        this.dialog1 = true;
      })
    },
    // reset filter
    resetFilter() {
      // reset filter
      this.filteringOptions.minPrice = 0;
      this.filteringOptions.maxPrice = 0;
      this.filteringOptions.minQuantity = 0;
      this.filteringOptions.maxQuantity = 0;
      this.filteringOptions.selectedOptions = [];

      // trigger filter
      this.$store.dispatch("inventory/getfilteredProducts", {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        minQuantity: this.minQuantity,
        maxQuantity: this.maxQuantity,
        selectedOptions: this.selectedOptions,
        itemPerPage: this.itemPerPage,
        page: 1
      }).catch((error) => {
        this.statusImage = failedImage;
        if(error.response){
           this.dialogMessage = "Something went wrong, pls try again!"
        }else{
           this.dialogMessage = "No internet Connection!";
        }
        this.dialog1 = true;
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.select-item {
  width: 200px;
  height: 42px;
  position: relative;
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
  .tool-container {
    width: 100%;
    justify-content: space-between;
  }
}
</style>