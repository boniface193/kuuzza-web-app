<template>
  <div>
    <BasicFilter
      :price="filterParameters.price"
      :payment="filterParameters.payment"
      :delivery="filterParameters.delivery"
      :category="filterParameters.category"
      toolTipText="Filter orders"
      headerName="Filter orders"
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
import { mapState } from "vuex";
export default {
  name: "FilterOrders",
  components: { BasicFilter, Modal },
  data: function () {
    return {
      searchValue: "",
      dialog: false,
      dialogMessage: "",
      statusImage: null,
      filterParameters: {
        price: true,
        payment: true,
        delivery: true,
        category: [],
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
  },
  methods: {
    // get products
    getOrders() {
      this.$store.commit("orders/setSearchOrder", false);
      this.$store.commit("orders/setTableLoader", true);
      this.$store
        .dispatch("orders/getFilteredOrders")
        .then(() => this.$store.commit("orders/setTableLoader", false))
        .catch((error) => {
          this.$store.commit("orders/setTableLoader", false);
          this.statusImage = failedImage;
          this.dialog = true;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet Connection!";
          }
        });
    },
    // filterTable
    filterTable(params) {
      // commit values for filter
      this.$store.commit("orders/setFilter", {
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        selectedOptions: params.selectedOptions,
      });

      // set page back to page 1
      this.$store.commit("orders/setPage", 1);

      // get products
      this.getOrders();
    },
    // reset filter
    resetFilter() {
      // commit values for filter
      this.$store.commit("orders/setFilter", {
        minPrice: 0,
        maxPrice: 0,
        minQuantity: 0,
        maxQuantity: 0,
        selectedOptions: [],
      });

      // set page back to page 1
      this.$store.commit("orders/setPage", 1);

      // get products
      this.getOrders();
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