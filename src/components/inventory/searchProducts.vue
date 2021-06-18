<template>
  <div>
    <!-- search bar -->
    <SearchBar
      placeholder="Search inventory"
      @search="setSearchValue"
      bgColor="white"
      borderColor="#e2e2e2"
      class="mr-2 mb-2 search-bar"
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
import SearchBar from "@/components/general/SearchBar.vue";
import Modal from "@/components/general/Modal.vue";
import failedImage from "@/assets/img/failed-img.svg";
import { mapGetters, mapState } from "vuex";
export default {
  name: "searchProducts",
  components: { SearchBar, Modal },
  data: function () {
    return {
      dialog: false,
      dialogMessage: "",
      statusImage: null,
    };
  },
  computed: {
    ...mapState({
      searchValue: (state) => state.inventory.searchValue,
    }),
    ...mapGetters({
      verifiedStore: "settings/verifiedStore",
      storeApprovalStatus: "settings/storeApprovalStatus",
    }),
  },
  methods: {
    // set search value
    setSearchValue(params) {
      if (this.verifiedStore && this.storeApprovalStatus) {
        this.$store.commit("inventory/setSearchValue", params);
        this.$store.commit("inventory/setSearchProduct", true);
        this.$store.commit("inventory/setPage", 1);
        this.searchProducts();
      }
    },
    // search products
    searchProducts() {
      if (this.searchValue !== "") {
        this.$store.commit("inventory/setSearchProduct", true);
        this.getProducts();
      } else {
        this.$store.commit("inventory/setSearchProduct", false);
        this.getProducts();
      }
    },
    // get products
    getProducts() {
      this.$store.commit("inventory/setTableLoader", true);
      this.$store
        .dispatch("inventory/searchProducts")
        .then(() => this.$store.commit("inventory/setTableLoader", false))
        .catch((error) => {
          this.$store.commit("inventory/setTableLoader", false);
          this.statusImage = failedImage;
          if (error.status == 422 || error.status == 400) {
            this.dialog = true;
            this.dialogMessage = error.data.message;
          }
        });
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