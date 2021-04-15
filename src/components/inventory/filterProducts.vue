<template>
  <div>
    <BasicFilter
      :price="filterParameters.price"
      :quantity="filterParameters.quantity"
      :category="productCategories"
      :stock="filterParameters.stock"
      toolTipText="Filter products"
      headerName="Filter Products"
      @filterOption="filterTable"
      @resetFilter="resetFilter"
    />

    <!--------------------------- Modal for dialog messages ------------------------------>
    <Modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img :src="statusImage"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </Modal>
  </div>
</template>
<script>
import BasicFilter from "@/components/general/BasicFilter.vue";
import Modal from "@/components/general/Modal.vue";
import failedImage from "@/assets/img/failed-img.svg";
import { mapState, mapGetters } from "vuex";
export default {
  name: "filterProducts",
  components: { BasicFilter, Modal },
  data: function () {
    return {
      searchValue: "",
      dialog: false,
      dialogMessage: "",
      statusImage: null,
      filterParameters: {
        price: true,
        quantity: true,
        stock: true,
      },
      filteringOptions: {
        minPrice: 0,
        maxPrice: 0,
        minQuantity: 0,
        maxQuantity: 0,
        selectedOptions: [],
      },
    };
  },
  computed: {
    ...mapState({
      tableLoader: (state) => state.inventory.tableLoader,
    }),
    ...mapGetters({
      verifiedStore: "settings/verifiedStore",
      productCategories: "inventory/productCategories",
    }),
  },
  methods: {
    // get products
    getProducts() {
      this.$store.commit("inventory/setSearchProduct", false);
      this.$store.commit("inventory/setTableLoader", true);
      this.$store
        .dispatch("inventory/getfilteredProducts")
        .then(() => this.$store.commit("inventory/setTableLoader", false))
        .catch((error) => {
          this.$store.commit("inventory/setTableLoader", false);
          this.statusImage = failedImage;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet Connection!";
          }
          this.dialog = true;
        });
    },
    // filterTable
    filterTable(params) {
      if (this.verifiedStore === true) {
        // commit values for filter
        this.$store.commit("inventory/setFilter", {
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          minQuantity: params.minQuantity,
          maxQuantity: params.maxQuantity,
          selectedOptions: params.selectedOptions,
          categories: params.categories
        });

        // set page back to page 1
        this.$store.commit("inventory/setPage", 1);

        // get products
        this.getProducts();
      }
    },
    // reset filter
    resetFilter() {
      if (this.verifiedStore === true) {
        // commit values for filter
        this.$store.commit("inventory/setFilter", {
          minPrice: 0,
          maxPrice: 0,
          minQuantity: 0,
          maxQuantity: 0,
          selectedOptions: [],
          categories: []
        });

        // set page back to page 1
        this.$store.commit("inventory/setPage", 1);

        // get products
        this.getProducts();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
</style>