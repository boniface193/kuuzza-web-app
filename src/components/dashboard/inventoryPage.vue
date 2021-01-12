<template>
  <div class="pb-10">
    <!-- page title -->
    <div class="d-flex justify-space-between align-center">
      <h1>Inventory</h1>
      <div class="d-flex align-center">
        <router-link :to="{ name: 'inventoryHistory' }" class="mr-4"
          >History</router-link
        >
        <calendar />
      </div>
    </div>
    <div class="d-flex justify-space-between align-center mt-8 mb-1 flex-wrap">
      <div class="select-item mr-8 mb-2">
        <selectBtn
          :items="[
            'Take product offline',
            'Take product online',
            'Delete product',
          ]"
          :item="'Actions'"
          :dropDownMenu="true"
          @selectedItem="setBulkAction"
        />
      </div>

      <div
        class="d-flex align-center flex-wrap tool-container justify-space-between"
      >
        <!-- search bar -->
        <searchBar
          placeholder="Search inventory"
          @search="setSearchValue"
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
    <div v-show="products.length > 0 && tableLoader !== true">
      <dataTable
        ref="productsTable"
        :actions="actions"
        :action="true"
        :select="true"
        :headers="tableHeaders"
        :items="products"
        itemKey="reference"
        statusKey="is_online"
        :itemPerPage="getItemPerPage.itemPerPage || 15"
        :paginationLength="
          searchProduct == true
            ? searchPageDetails.last_page
            : pageDetails.last_page
        "
        :page="
          searchProduct == true
            ? searchPageDetails.current_page
            : pageDetails.current_page
        "
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

    <!--------------------------- modal for dialog messages ------------------------------>
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

    <!-- delete product modal component -->
    <deleteProductModal
      :deleteDialogBulk="deleteDialogBulk"
      :deleteDialog="deleteDialog"
      @closeDeleteDialog="closeDeleteDialog"
      @closeDeleteDialogBulk="closeDeleteDialogBulk"
      @clearSelectedRow="clearSelectedRow"
    />

    <!-- take product offline modal component -->
    <takeProductOfflineModal
      :offlineDialogBulk="offlineDialogBulk"
      :offlineDialog="offlineDialog"
      @closeOfflineDialog="closeOfflineDialog"
      @closeOfflineDialogBulk="closeOfflineDialogBulk"
      @clearSelectedRow="clearSelectedRow"
    />

    <!-- take product online modal component -->
    <takeProductOnlineModal
      :onlineDialogBulk="onlineDialogBulk"
      :onlineDialog="onlineDialog"
      @closeOnlineDialog="closeOnlineDialog"
      @closeOnlineDialogBulk="closeOnlineDialogBulk"
      @clearSelectedRow="clearSelectedRow"
    />
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
import deleteProductModal from "@/components/inventory/deleteProductModal";
import takeProductOfflineModal from "@/components/inventory/takeProductOfflineModal";
import takeProductOnlineModal from "@/components/inventory/takeProductOnlineModal";
import { mapGetters, mapState } from "vuex";
export default {
  name: "inventoryPage",
  components: {
    dataTable,
    modal,
    searchBar,
    basicFilter,
    selectBtn,
    calendar,
    deleteProductModal,
    takeProductOfflineModal,
    takeProductOnlineModal,
  },
  data: function () {
    return {
      items: ["Items in stock", "Items out of stock"],
      item: "Items in stock",
      searchProduct: false,
      inBulk: null,
      itemPerPage: 15,
      tableLoader: false,
      selectedProduct: "",
      dialog1: false,
      offlineDialog: false,
      offlineDialogBulk: false,
      onlineDialogBulk: false,
      onlineDialog: false,
      deleteDialog: false,
      deleteDialogBulk: false,
      dialogMessage: "",
      searchValue: "",
      inventoryName: "",
      selected: "",
      selectedRow: [],
      selectedReferences: [],
      statusImage: null,
      actions: {
        deleteId: null,
        editId: null,
        offlineId: null,
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
        selectedOptions: [],
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
        { text: "Image", value: "image", image: true, width: "150px" },
        { text: "Category", value: "category", width: "200px" },
        { text: "SKU", value: "sku", width: "200px" },
        { text: "Price", value: "price", width: "160px", money: true },
        { text: "Quantity", value: "quantity", width: "100px" },
      ],
    };
  },
  created() {
    if (this.$store.getters["inventory/products"].length == 0) {
      this.getProducts();
    }
  },
  computed: {
    ...mapGetters({
      products: "inventory/products",
    }),
    ...mapState({
      pageDetails: (state) =>
        state.inventory.filteredProductsDetails.pageDetails,
      searchPageDetails: (state) =>
        state.inventory.searchProductsDetails.pageDetails,
    }),
    getItemPerPage() {
      return {
        itemPerPage: parseInt(this.pageDetails.per_page, 10),
      };
    },
  },
  methods: {
    // take bulk action
    setBulkAction(params) {
      if (this.selectedRow.length !== 0) {
        this.selectedReferences = this.selectedRow;
        this.$store.commit(
          "inventory/setSelectedReferences",
          this.selectedReferences
        );
        if (params === "Take product offline") {
          this.offlineDialogBulk = true;
        } else if (params === "Take product online") {
          this.onlineDialogBulk = true;
        } else if (params === "Delete product") {
          this.deleteDialogBulk = true;
        }
      }
    },
    clearSelectedRow() {
      this.$refs.productsTable.clearRow();
    },
    // set the selected actions paramter and the neccessary calls
    setRequestedAction(params) {
      this.actions = params;
      //checks if edit action is triggered for a member
      if (this.actions.editId !== null) {
        this.$router.push({
          name: "editProduct",
          params: {
            id: this.actions.editId,
          },
        });
      } //checks if delete action is triggered for a member
      else if (this.actions.deleteId !== null) {
        this.selectedReferences = [];
        this.selectedReferences.push(this.actions.deleteId);
        this.$store.commit(
          "inventory/setSelectedReferences",
          this.selectedReferences
        );
        this.deleteDialog = true;
      } //checks if offline action is triggered for a member
      else if (this.actions.offlineId !== null) {
        this.selectedReferences = [];
        this.selectedReferences.push(this.actions.offlineId);
        this.$store.commit(
          "inventory/setSelectedReferences",
          this.selectedReferences
        );
        if (this.actions.itemStatus === true) {
          this.offlineDialog = true;
        } else {
          this.onlineDialog = true;
        }
      }
    },
    // close modal for taking product offline
    closeOfflineDialog() {
      this.offlineDialog = false;
      this.actions.offlineId = null;
      this.selectedReferences = [];
      this.$store.commit(
        "inventory/setSelectedReferences",
        this.selectedReferences
      );
    },
    // close modal for taking products offline in bulk
    closeOfflineDialogBulk() {
      this.offlineDialogBulk = false;
      this.selectedReferences = [];
      this.$store.commit(
        "inventory/setSelectedReferences",
        this.selectedReferences
      );
    },
    // close modal for taking product online
    closeOnlineDialog() {
      this.onlineDialog = false;
      this.actions.offlineId = null;
      this.selectedReferences = [];
      this.$store.commit(
        "inventory/setSelectedReferences",
        this.selectedReferences
      );
    },
    // close modal for taking products online in bulk
    closeOnlineDialogBulk() {
      this.onlineDialogBulk = false;
      this.selectedReferences = [];
      this.$store.commit(
        "inventory/setSelectedReferences",
        this.selectedReferences
      );
    },
    // close modal for deleting product
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.actions.deleteId = null;
      this.selectedReferences = [];
      this.$store.commit(
        "inventory/setSelectedReferences",
        this.selectedReferences
      );
    },
    // close modal for deleting products in bulk
    closeDeleteDialogBulk() {
      this.deleteDialogBulk = false;
      this.selectedReferences = [];
      this.$store.commit(
        "inventory/setSelectedReferences",
        this.selectedReferences
      );
    },
    // close the dialog that shows up when you want to delete a row
    closeDialog1() {
      this.dialog1 = false;
    },
    rowSelected(params) {
      this.selectedRow = params;
    },
    // get products from inventory
    getProducts() {
      this.tableLoader = true;
      this.$store
        .dispatch("inventory/getProducts")
        .then(() => (this.tableLoader = false))
        .catch((error) => {
          this.statusImage = failedImage;
          this.dialog1 = true;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet connection!";
          }
          this.tableLoader = false;
        });
    },
    // set item per page
    setItemPerPage(params) {
      this.itemPerPage = params;
      let page = null;
      if (this.searchProduct === true) {
        if (this.itemPerPage > this.searchPageDetails.per_page) {
          let range = Math.round(
            (this.searchPageDetails.from - 1) / this.searchPageDetails.per_page
          );
          if (range < 0.5) {
            page = range + 1;
            this.$store.commit(
              "inventory/setSearchItemPerPage",
              this.itemPerPage
            );
            this.$store.commit("inventory/setSearchCurrentPage", page);
          } else {
            page = range;
            this.$store.commit(
              "inventory/setSearchItemPerPage",
              this.itemPerPage
            );
            this.$store.commit("inventory/setSearchCurrentPage", page);
          }
        } else {
          page = Math.round(
            (this.searchPageDetails.from - 1) / this.itemPerPage + 1
          );
          this.$store.commit(
            "inventory/setSearchItemPerPage",
            this.itemPerPage
          );
          this.$store.commit("inventory/setSearchCurrentPage", page);
        }
        this.getSearchValue();
      } else {
        if (this.itemPerPage > this.pageDetails.per_page) {
          let range = Math.round(
            (this.pageDetails.from - 1) / this.pageDetails.per_page
          );
          if (range < 0.5) {
            page = range + 1;
            this.$store.commit(
              "inventory/setFilteredItemPerPage",
              this.itemPerPage
            );
            this.$store.commit("inventory/setFilteredCurrentPage", page);
          } else {
            page = range;
            this.$store.commit(
              "inventory/setFilteredItemPerPage",
              this.itemPerPage
            );
            this.$store.commit("inventory/setFilteredCurrentPage", page);
          }
        } else {
          page = Math.round((this.pageDetails.from - 1) / this.itemPerPage + 1);
          this.$store.commit(
            "inventory/setFilteredItemPerPage",
            this.itemPerPage
          );
          this.$store.commit("inventory/setFilteredCurrentPage", page);
        }
        this.getfilteredProducts();
      }
    },
    // set current page
    setCurentPage(params) {
      if (this.searchProduct === true) {
        this.$store.commit("inventory/setSearchCurrentPage", params);
        this.getSearchValue();
      } else {
        this.$store.commit("inventory/setFilteredCurrentPage", params);
        this.getfilteredProducts();
      }
    },
    // request for page with the request informations
    getfilteredProducts() {
      this.$store.dispatch("inventory/getfilteredProducts").catch((error) => {
        this.statusImage = failedImage;
        if (error.response) {
          this.dialogMessage = "Something went wrong, pls try again!";
        } else {
          this.dialogMessage = "No internet Connection!";
        }
        this.dialog1 = true;
      });
    },
    // set search value
    setSearchValue(params) {
      this.searchValue = params;
      this.searchProduct = true;
      this.$store.commit("inventory/setSearchCurrentPage", 1);
      this.getSearchValue();
    },
    // search products
    getSearchValue() {
      this.tableLoader = true;
      if (this.searchValue !== "") {
        this.$store
          .dispatch("inventory/searchProducts", {
            value: this.searchValue,
          })
          .then(() => (this.tableLoader = false))
          .catch((error) => {
            this.tableLoader = false;
            this.statusImage = failedImage;
            if (error.response) {
              this.dialogMessage = "Something went wrong, pls try again!";
            } else {
              this.dialogMessage = "No internet Connection!";
            }
            this.dialog1 = true;
          });
      } else {
        this.getProducts();
        this.searchProduct = false;
      }
    },
    // filterTable
    filterTable(params) {
      // set filtering parameters
      (this.filteringOptions.minPrice = params.minPrice),
        (this.filteringOptions.maxPrice = params.maxPrice),
        (this.filteringOptions.minQuantity = params.minQuantity),
        (this.filteringOptions.maxQuantity = params.maxQuantity),
        (this.filteringOptions.selectedOptions = params.selectedOptions),
        // commit values for filter
        this.$store.commit("inventory/setFilter", {
          minPrice: this.filteringOptions.minPrice,
          maxPrice: this.filteringOptions.maxPrice,
          minQuantity: this.filteringOptions.minQuantity,
          maxQuantity: this.filteringOptions.maxQuantity,
          selectedOptions: this.filteringOptions.selectedOptions,
        });
      this.$store.commit("inventory/setFilteredCurrentPage", 1);

      let route = (this.searchProduct !== true) ? "inventory/getfilteredProducts" : "inventory/searchProducts"

      // make request the filtered products
      this.tableLoader = true;
      this.$store
        .dispatch(`${route}`, {
          value: this.searchValue,
        })
        .then(() => (this.tableLoader = false))
        .catch((error) => {
          this.tableLoader = false;
          this.statusImage = failedImage;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet Connection!";
          }
          this.dialog1 = true;
        });
    },
    // reset filter
    resetFilter() {
      // reset filter
      this.filteringOptions.minPrice = 0;
      this.filteringOptions.maxPrice = 0;
      this.filteringOptions.minQuantity = 0;
      this.filteringOptions.maxQuantity = 0;
      this.filteringOptions.selectedOptions = [];

      // commit values for filter
      this.$store.commit("inventory/setFilter", {
        minPrice: this.filteringOptions.minPrice,
        maxPrice: this.filteringOptions.maxPrice,
        minQuantity: this.filteringOptions.minQuantity,
        maxQuantity: this.filteringOptions.maxQuantity,
        selectedOptions: this.filteringOptions.selectedOptions,
      });

      // trigger filter
      this.getProducts();
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
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
@media (max-width: 953px) {
  .tool-container {
    width: 100%;
    justify-content: space-between;
  }
}
</style>