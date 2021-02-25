<template>
  <div class="pb-10">
    <div>
      <!-- page title -->
      <div class="d-flex justify-space-between align-center">
        <h1>Inventory</h1>
        <div class="d-flex align-center">
          <router-link :to="{ name: 'inventoryHistory' }" class="mr-4"
            >History</router-link
          >
          <!-- calendar -->
          <calendar @updateDate="setDate" />
        </div>
      </div>
      <div
        class="d-flex justify-space-between align-center mt-8 mb-1 flex-wrap"
      >
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
          <!-- search products-->
          <div class="search-container mr-md-2">
            <searchProducts />
          </div>

          <div class="d-flex align-center flex-wrap justify-space-between mb-2">
            <!-- filter products-->
            <filterProducts class="mr-2" />

            <!-- export products -->
            <exportProducts class="mr-2" />

            <!-- import products -->
            <router-link :to="{ name: 'productList' }">
              <importIcon class="mr-2" toolTipText="Import products" />
            </router-link>

            <!-- add product btn primary-->
            <router-link :to="{ name: 'addProduct' }" class="add-btn-primary">
              <v-btn class="primary py-6 px-4"
                ><span>+</span> Add New Product</v-btn
              >
            </router-link>
            <!-- add product btn primary-->
            <router-link :to="{ name: 'addProduct' }" class="add-btn-secondary">
              <span class="btn">Add New Product</span>
            </router-link>
          </div>
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
        itemKey="id"
        statusKey="is_online"
        :itemPerPage="pageDetails.per_page || 15"
        :paginationLength="pageDetails.last_page"
        :page="pageDetails.current_page"
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
import searchProducts from "@/components/inventory/searchProducts.vue";
import filterProducts from "@/components/inventory/filterProducts.vue";
import selectBtn from "@/components/dashboard/selectBtn.vue";
import calendar from "@/components/dashboard/calender.vue";
//import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
import deleteProductModal from "@/components/inventory/deleteProductModal";
import takeProductOfflineModal from "@/components/inventory/takeProductOfflineModal";
import takeProductOnlineModal from "@/components/inventory/takeProductOnlineModal";
import exportProducts from "@/components/inventory/exportProducts.vue";
import importIcon from "@/components/icons/importIcon.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "inventoryPage",
  components: {
    dataTable,
    modal,
    searchProducts,
    filterProducts,
    exportProducts,
    importIcon,
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
      inBulk: null,
      itemPerPage: 15,
      selectedProduct: "",
      dialog1: false,
      offlineDialog: false,
      offlineDialogBulk: false,
      onlineDialogBulk: false,
      onlineDialog: false,
      deleteDialog: false,
      deleteDialogBulk: false,
      dialogMessage: "",
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
      searchProduct: "inventory/searchProduct",
    }),
    ...mapState({
      pageDetails: (state) => state.inventory.pageDetails,
      tableLoader: (state) => state.inventory.tableLoader,
    }),
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
    setDate(params) {
      this.$store.commit("inventory/setDateRange", {
        startDate: params.startDate.toISOString().split("T")[0],
        endDate: params.endDate.toISOString().split("T")[0],
      });
      this.getfilteredProducts();
    },
    rowSelected(params) {
      this.selectedRow = params;
    },
    // get products from inventory
    getProducts() {
      this.$store.commit("inventory/setTableLoader", true);
      this.$store
        .dispatch("inventory/getProducts")
        .then(() => this.$store.commit("inventory/setTableLoader", false))
        .catch((error) => {
          this.statusImage = failedImage;
          this.dialog1 = true;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet connection!";
          }
          this.$store.commit("inventory/setTableLoader", false);
        });
    },
    // set item per page
    setItemPerPage(params) {
      this.$store.commit("inventory/setItemPerPage", params);
      this.searchProduct === true
        ? this.getSearchProduct()
        : this.getfilteredProducts();
    },
    // set current page
    setCurentPage(params) {
      this.$store.commit("inventory/setPage", params);
      this.searchProducts === true
        ? this.getSearchProduct()
        : this.getfilteredProducts();
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
    // search products
    getSearchProduct() {
      this.$store.dispatch("inventory/searchProducts").catch((error) => {
        this.statusImage = failedImage;
        if (error.response) {
          this.dialogMessage = "Something went wrong, pls try again!";
        } else {
          this.dialogMessage = "No internet Connection!";
        }
        this.dialog1 = true;
      });
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
.search-container {
  width: 350px;
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
.add-btn-secondary {
  display: none;
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
    font-size: 16px !important;
    height: 40px;
    background: #5064cc;
    position: fixed;
    bottom: 40px;
    right: 20px;
    border-radius: 5px;
    color: white;
    font-size: 35px;
    z-index: 5;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  }
}
@media (max-width: 953px) {
  .tool-container {
    width: 100%;
    justify-content: space-between;
  }
}
@media (max-width: 550px) {
  .search-container {
    width: 100%;
  }
  .add-btn-primary {
    display: none;
  }
  .add-btn-secondary {
    display: block;
  }
}
</style>