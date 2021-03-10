<template>
  <div>
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
import deleteProductModal from "@/components/inventory/deleteProductModal";
import takeProductOfflineModal from "@/components/inventory/takeProductOfflineModal";
import takeProductOnlineModal from "@/components/inventory/takeProductOnlineModal";
import failedImage from "@/assets/img/failed-img.svg";
import { mapGetters, mapState } from "vuex";
export default {
  name: "ProductsTable",
  components: {
    dataTable,
    deleteProductModal,
    takeProductOfflineModal,
    takeProductOnlineModal,
  },
  data: function () {
    return {
      offlineDialog: false,
      offlineDialogBulk: false,
      onlineDialogBulk: false,
      onlineDialog: false,
      deleteDialog: false,
      deleteDialogBulk: false,
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
  computed: {
    ...mapGetters({
      products: "inventory/products",
    }),
    ...mapState({
      pageDetails: (state) => state.inventory.pageDetails,
      tableLoader: (state) => state.inventory.tableLoader,
    }),
  },
  methods: {
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
    rowSelected(params) {
      this.selectedRow = params;
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