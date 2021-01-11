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
          :items="['Take product offline', 'Delete product']"
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

    <!-- take product offline modal -->
    <modal :dialog="offlineDialog" width="400">
      <div class="white pa-3 pb-8 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeOfflineDialog"
            >mdi-close</v-icon
          >
        </div>

        <div>
          <p class="mt-5" style="color: black">
            Are you sure you want to take this product offline?
          </p>
          <div class="d-flex align-center mb-6">
            <img
              class="mr-3"
              :src="selectedProduct.image"
              alt=""
              style="width: 50px; height: 50px"
            />
            <div>
              <p class="mb-1 secondary--text">{{ selectedProduct.name }}</p>
              <p class="mb-1 secondary--text">SKU: {{ selectedProduct.sku }}</p>
            </div>
          </div>
        </div>

        <!-- btns -->
        <div class="d-flex justify-space-between flex-wrap mx-auto">
          <v-btn
            class="error py-5 mb-3 mb-sm-0 px-7"
            @click="
              () => {
                inBulk = false;
                takeProductsOffline();
              }
            "
            :loading="offlineDialogLoader"
            :disabled="offlineDialogLoader"
            >Yes, take offline</v-btn
          >
          <v-btn
            color="#F6F7FD"
            class="primary--text py-5 px-7"
            @click="closeOfflineDialog"
            :disabled="offlineDialogLoader"
            >No, keep online</v-btn
          >
        </div>
        <div></div>
      </div>
    </modal>

    <!-- take offline in bulk modal -->
    <modal :dialog="offlineDialogBulk" width="400">
      <div class="white pa-3 pb-8 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeOfflineDialogBulk"
            >mdi-close</v-icon
          >
        </div>

        <!-- shows when a product is selected -->
        <div class="text-center">
          <p class="error--text mt-5">
            You have selected {{ this.selectedRow.length }}
            {{ this.selectedRow.length == 1 ? "product" : "products" }}
            <br /><br />
            <span style="color: black"
              >Are you sure you want to take
              {{ this.selectedRow.length == 1 ? "product" : "products" }}
              offline?</span
            >
          </p>
        </div>

        <!-- btns -->
        <div class="d-flex justify-space-between flex-wrap mx-auto">
          <v-btn
            class="error py-5 mb-3 mb-sm-0 px-7"
            @click="
              () => {
                inBulk = true;
                takeProductsOffline();
              }
            "
            :loading="offlineDialogBulkLoader"
            :disabled="offlineDialogBulkLoader"
            >Yes, take offline</v-btn
          >
          <v-btn
            color="#F6F7FD"
            class="primary--text py-5 px-7"
            @click="closeOfflineDialogBulk"
            :disabled="offlineDialogBulkLoader"
            >No, keep online</v-btn
          >
        </div>
        <div></div>
      </div>
    </modal>

    <!-- delete products modal -->
    <modal :dialog="deleteDialog" width="400">
      <div class="white pa-3 pb-8 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeDeleteDialog"
            >mdi-close</v-icon
          >
        </div>

        <div>
          <p class="mt-5" style="color: black">
            Are you sure you want to delete this products?
          </p>
          <div class="d-flex align-center mb-6">
            <img
              class="mr-3"
              :src="selectedProduct.image"
              alt=""
              style="width: 50px; height: 50px"
            />
            <div>
              <p class="mb-1 secondary--text">{{ selectedProduct.name }}</p>
              <p class="mb-1 secondary--text">SKU: {{ selectedProduct.sku }}</p>
            </div>
          </div>
        </div>

        <!-- btns -->
        <div class="d-flex justify-space-between flex-wrap">
          <v-btn
            class="error py-5 mb-3 mb-sm-0"
            @click="
              () => {
                inBulk = false;
                deleteProducts();
              }
            "
            :loading="deleteDialogLoader"
            :disabled="deleteDialogLoader"
            >Yes, delete
            {{ this.selectedRow.length == 1 ? "product" : "products" }}</v-btn
          >
          <v-btn
            color="#F6F7FD"
            class="primary--text py-5"
            @click="closeDeleteDialog"
            :disabled="deleteDialogLoader"
            >No, keep
            {{ this.selectedRow.length == 1 ? "product" : "products" }}</v-btn
          >
        </div>
        <div></div>
      </div>
    </modal>

    <!-- delete products modal in bulk -->
    <modal :dialog="deleteDialogBulk" width="400">
      <div class="white pa-3 pb-8 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeDeleteDialogBulk"
            >mdi-close</v-icon
          >
        </div>

        <div class="text-center">
          <p class="error--text mt-5">
            You have selected {{ this.selectedRow.length }}
            {{ this.selectedRow.length == 1 ? "product" : "products" }}
            <br /><br />
            <span class="secondary--text"
              >Are you sure you want to delete this
              {{ this.selectedRow.length == 1 ? "product" : "products" }}</span
            >
          </p>
        </div>

        <!-- btns -->
        <div class="d-flex justify-space-between flex-wrap">
          <v-btn
            class="error py-5 mb-3 mb-sm-0"
            @click="
              () => {
                inBulk = true;
                deleteProducts();
              }
            "
            :loading="deleteDialogBulkLoader"
            :disabled="deleteDialogBulkLoader"
            >Yes, delete
            {{ this.selectedRow.length == 1 ? "product" : "products" }}</v-btn
          >
          <v-btn
            color="#F6F7FD"
            class="primary--text py-5"
            @click="closeDeleteDialogBulk"
            :disabled="deleteDialogBulkLoader"
            >No, keep
            {{ this.selectedRow.length == 1 ? "product" : "products" }}</v-btn
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
import basicFilter from "@/components/dashboard/basicFilter.vue";
import selectBtn from "@/components/dashboard/selectBtn.vue";
import calendar from "@/components/dashboard/calender.vue";
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
import { mapGetters } from "vuex";
export default {
  name: "inventoryPage",
  components: { dataTable, modal, searchBar, basicFilter, selectBtn, calendar },
  data: function () {
    return {
      items: ["Items in stock", "Items out of stock"],
      item: "Items in stock",
      inBulk: null,
      itemPerPage: 15,
      tableLoader: false,
      selectedProduct: "",
      dialog1: false,
      offlineDialog: false,
      offlineDialogLoader: false,
      offlineDialogBulk: false,
      offlineDialogBulkLoader: false,
      deleteDialog: false,
      deleteDialogLoader: false,
      deleteDialogBulk: false,
      deleteDialogBulkLoader: false,
      dialogMessage: "",
      searchValue: "",
      inventoryName: "",
      selected: "",
      selectedRow: [],
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
      productsPageDetails: "inventory/productsPageDetails",
    }),
    getItemPerPage() {
      return {
        itemPerPage: parseInt(this.productsPageDetails.per_page, 10),
      };
    },
  },
  methods: {
    // get products from inventory
    getProducts() {
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
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet connection!";
          }
          this.tableLoader = false;
        });
    },
    // take bulk action
    setBulkAction(params) {
      if (this.selectedRow.length !== 0) {
        if (params === "Take product offline") {
          this.offlineDialogBulk = true;
        } else if (params === "Delete product") {
          this.deleteDialogBulk = true;
        }
      }
    },
    // set the selected actions paramter and the neccessary calls
    setRequestedAction(params) {
      this.actions = params;
      //checks if edit action is triggered for a member
      if (this.actions.editId !== null) {
        const item = this.products.find(
          (x) => x.reference == `${this.actions.editId}`
        );
        // this.$router.push({
        //   name: "editProduct",
        //   params: {
        //     id: item.reference,
        //   },
        // });
        console.log(item);
      } //checks if delete action is triggered for a member
      else if (this.actions.deleteId !== null) {
        const item = this.products.find(
          (x) => x.reference == `${this.actions.deleteId}`
        );
        this.selectedProduct = item;
        this.deleteDialog = true;
      } //checks if offline action is triggered for a member
      else if (this.actions.offlineId !== null) {
        const item = this.products.find(
          (x) => x.reference == `${this.actions.offlineId}`
        );
        this.selectedProduct = item;

        if (this.actions.itemStatus === true) {
          this.offlineDialog = true;
          console.log(this.actions.itemStatus);
        } else {
          console.log(item);
        }
      }
    },
    // take product oflline
    takeProductsOffline() {
      let value = [];
      if (this.inBulk === true) {
        value = this.selectedRow;
        this.offlineDialogBulkLoader = true;
      } else {
        value.push(this.selectedProduct.reference);
        this.offlineDialogLoader = true;
      }
      this.$store
        .dispatch("inventory/takeProductsOffline", {
          refs: value,
        })
        .then(() => {
          this.statusImage = successImage;
          this.offlineDialogBulkLoader = false;
          this.closeOfflineDialogBulk();
          this.offlineDialogLoader = false;
          this.closeOfflineDialog();
          this.dialog1 = true;
          this.dialogMessage =
            "You have successfully taking " +
            (this.selectedRow.length == 1 ? "product" : "products") +
            " offline.";
          this.getProducts();
          this.$refs.productsTable.clearRow();
        })
        .catch((error) => {
          this.offlineDialogBulkLoader = false;
          this.closeOfflineDialogBulk();
          this.offlineDialogLoader = false;
          this.closeOfflineDialog();
          this.statusImage = failedImage;
          this.dialog1 = true;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet connection!";
          }
        });
    },
    // delete products
    deleteProducts() {
      let value = [];
      if (this.inBulk === true) {
        value = this.selectedRow;
        this.deleteDialogBulkLoader = true;
      } else {
        value.push(this.selectedProduct.reference);
        this.deleteDialogLoader = true;
      }
      this.$store
        .dispatch("inventory/deleteProducts", {
          refs: value,
        })
        .then(() => {
          this.statusImage = successImage;
          this.deleteDialogBulkLoader = false;
          this.closeDeleteDialogBulk();
          this.deleteDialogLoader = false;
          this.closeDeleteDialog();
          this.dialog1 = true;
          this.dialogMessage =
            "You have successfully deleted " +
            (this.selectedRow.length == 1 ? "product" : "products") +
            ".";
          this.getProducts();
          this.$refs.productsTable.clearRow();
        })
        .catch((error) => {
          this.deleteDialogBulkLoader = false;
          this.closeDeleteDialogBulk();
          this.deleteDialogLoader = false;
          this.closeDeleteDialog();
          this.statusImage = failedImage;
          this.dialog1 = true;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet connection!";
          }
        });
    },
    // close modal for taking product offline
    closeOfflineDialog() {
      if (this.offlineDialogLoader === false) {
        this.offlineDialog = false;
        this.selectedProduct = "";
      }
    },
    // close modal for taking products offline in bulk
    closeOfflineDialogBulk() {
      if (this.offlineDialogBulkLoader === false) {
        this.offlineDialogBulk = false;
        this.actions.offlineId = null;
      }
    },
    // close modal for deleting product
    closeDeleteDialog() {
      if (this.deleteDialogLoader === false) {
        this.deleteDialog = false;
        this.selectedProduct = "";
      }
    },
    // close modal for deleting products in bulk
    closeDeleteDialogBulk() {
      if (this.deleteDialogBulkLoader === false) {
        this.deleteDialogBulk = false;
        this.actions.deleteId = null;
      }
    },
    // close the dialog that shows up when you want to delete a row
    closeDialog1() {
      this.dialog1 = false;
    },
    rowSelected(params) {
      this.selectedRow = params;
    },
    // set item per page
    setItemPerPage(params) {
      this.itemPerPage = params;
      let page = null;
      if (this.itemPerPage > this.productsPageDetails.per_page) {
        let range = Math.round(
          (this.productsPageDetails.from - 1) /
            this.productsPageDetails.per_page
        );
        if (range < 0.5) {
          page = range + 1;
        } else {
          page = range;
          this.$store.commit("inventory/setCurrentPage", page);
        }
      } else {
        page = Math.round(
          (this.productsPageDetails.from - 1) / this.itemPerPage + 1
        );
        this.$store.commit("inventory/setCurrentPage", page);
      }
      this.$store
        .dispatch("inventory/getfilteredProducts", {
          page: page,
          itemPerPage: this.itemPerPage,
          minPrice: this.filteringOptions.minPrice,
          maxPrice: this.filteringOptions.maxPrice,
          minCommission: this.filteringOptions.minCommission,
          maxCommission: this.filteringOptions.maxCommission,
          minQuantity: this.filteringOptions.minQuantity,
          maxQuantity: this.filteringOptions.maxQuantity,
          selectedOptions: this.filteringOptions.selectedOptions,
        })
        .catch((error) => {
          this.statusImage = failedImage;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet Connection!";
          }
          this.dialog1 = true;
        });
    },
    // set current page
    setCurentPage(params) {
      this.$store.commit("inventory/setCurrentPage", params);
      this.$store
        .dispatch("inventory/getfilteredProducts", {
          page: params,
          itemPerPage: this.itemPerPage,
          minPrice: this.filteringOptions.minPrice,
          maxPrice: this.filteringOptions.maxPrice,
          minQuantity: this.filteringOptions.minQuantity,
          maxQuantity: this.filteringOptions.maxQuantity,
          selectedOptions: this.filteringOptions.selectedOptions,
        })
        .catch((error) => {
          this.statusImage = failedImage;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet Connection!";
          }
          this.dialog1 = true;
        });
    },
    // search products
    getSearchValue(params) {
      this.searchValue = params;
      this.tableLoader = true;
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
    },
    // filterTable
    filterTable(params) {
      // set filtering parameters
      (this.filteringOptions.minPrice = params.minPrice),
        (this.filteringOptions.maxPrice = params.maxPrice),
        (this.filteringOptions.minQuantity = params.minQuantity),
        (this.filteringOptions.maxQuantity = params.maxQuantity),
        (this.filteringOptions.selectedOptions = params.selectedOptions),
        // trigger filter
        (this.tableLoader = true);
      this.$store
        .dispatch("inventory/getfilteredProducts", {
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          minQuantity: params.minQuantity,
          maxQuantity: params.maxQuantity,
          selectedOptions: params.selectedOptions,
          itemPerPage: this.itemPerPage,
          page: 1,
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