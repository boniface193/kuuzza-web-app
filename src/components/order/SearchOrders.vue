<template>
  <div>
    <!-- search bar -->
    <SearchBar
      placeholder="Search order"
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
import { mapState } from "vuex";
export default {
  name: "searchOrders",
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
      searchValue: (state) => state.orders.searchValue,
    }),
  },
  methods: {
    // set search value
    setSearchValue(params) {
        this.$store.commit("orders/setSearchValue", params);
        this.$store.commit("orders/setSearchOrder", true);
        this.$store.commit("orders/setPage", 1);
        this.searchOrders();
    },
    // search orders
    searchOrders() {
      if (this.searchValue !== "") {
        this.$store.commit("orders/setSearchOrder", true);
        this.getOrders();
      } else {
        this.$store.commit("orders/setSearchOrder", false);
        this.getOrders();
      }
    },
    // get orders
    getOrders() {
      this.$store.commit("orders/setTableLoader", true);
      this.$store
        .dispatch("orders/searchOrders")
        .then(() => this.$store.commit("orders/setTableLoader", false))
        .catch((error) => {
          this.$store.commit("orders/setTableLoader", false);
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