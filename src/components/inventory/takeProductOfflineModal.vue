<template>
  <div>
    <!--------------------------- Modal for dialog messages ------------------------------>
    <Modal :dialog="dialog1" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog1 = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img :src="statusImage"></v-img>
        </div>

        <h4 v-html="dialogMessage"></h4>

        <p v-html="requestedStatistic"></p>
      </div>
    </Modal>

    <!---------------------------- take product offline Modal ----------------------------->
    <Modal :dialog="offlineDialog" width="400">
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
        <div class="row d-flex">
          <div class="col-sm-6 justify-center">
            <v-btn
              block
              class="error elevation-0 text-caption text-lg-body-2"
              @click="takeProductsOffline()"
              :loading="offlineDialogLoader"
              :disabled="offlineDialogLoader"
              >Yes, take offline</v-btn
            >
          </div>
          <div class="col-sm-6 justify-center">
            <v-btn
              block
              class="primary--text light-background elevation-0 text-caption text-lg-body-2"
              @click="closeOfflineDialog"
              :disabled="offlineDialogLoader"
              >No, keep online</v-btn
            >
          </div>
        </div>
        <div></div>
      </div>
    </Modal>

    <!------------------------------- take product offline in bulk Modal ------------------------------>
    <Modal :dialog="offlineDialogBulk" width="400">
      <div class="white pa-3 pb-8 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeOfflineDialogBulk"
            >mdi-close</v-icon
          >
        </div>

        <!-- shows when a product is selected -->
        <div class="text-center">
          <p class="error--text mt-5">
            You have selected {{ this.selectedReferences.length }}
            {{ this.selectedReferences.length == 1 ? "product" : "products" }}
            <br /><br />
            <span style="color: black"
              >Are you sure you want to take
              {{ this.selectedReferences.length == 1 ? "product" : "products" }}
              offline?</span
            >
          </p>
        </div>

        <!-- btns -->
        <div class="row d-flex">
          <div class="col-sm-6 justify-center">
            <v-btn
              block
              class="error elevation-0 text-caption text-lg-body-2"
              @click="takeProductsOffline()"
              :loading="offlineDialogBulkLoader"
              :disabled="offlineDialogBulkLoader"
              >Yes, take offline</v-btn
            >
          </div>
          <div class="col-sm-6 justify-center">
            <v-btn
              block
              class="primary--text elevation-0 text-caption text-lg-body-2"
              @click="closeOfflineDialogBulk"
              :disabled="offlineDialogBulkLoader"
              >No, keep online</v-btn
            >
          </div>
        </div>
        <div></div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/general/Modal.vue";
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
import { mapState, mapGetters } from "vuex";
export default {
  name: "takeProductOfflineModal",
  components: { Modal },
  props: ["offlineDialogBulk", "offlineDialog"],
  data: function () {
    return {
      statusImage: null,
      dialog1: false,
      dialogMessage: "",
      offlineDialogLoader: false,
      offlineDialogBulkLoader: false,
      requestedStatistic: "",
    };
  },
  computed: {
    ...mapState({
      selectedReferences: (state) => state.inventory.selectedReferences,
    }),
    ...mapGetters({
      products: "inventory/products",
    }),
    selectedProduct() {
      let item;
      if (this.selectedReferences.length !== 0) {
        item = this.products.find((x) => x.id == this.selectedReferences[0]);
      } else {
        item = {};
      }

      return {
        name: item.name ? item.name : null,
        sku: item.sku ? item.sku : null,
        image: item.image ? item.image : null,
      };
    },
  },
  methods: {
    // close Modal for deleting product
    closeOfflineDialog() {
      if (this.offlineDialogLoader === false) {
        this.$emit("closeOfflineDialog");
      }
    },
    // close Modal for deleting products in bulk
    closeOfflineDialogBulk() {
      if (this.offlineDialogBulkLoader === false) {
        this.$emit("closeOfflineDialogBulk");
      }
    },
    // take product oflline
    takeProductsOffline() {
      this.offlineDialogBulkLoader = true;
      this.offlineDialogLoader = true;
      this.$store
        .dispatch("inventory/takeProductsOffline", {
          ids: this.selectedReferences,
        })
        .then((response) => {
          this.statusImage = successImage;
          this.offlineDialogBulkLoader = false;
          this.closeOfflineDialogBulk();
          this.offlineDialogLoader = false;
          this.closeOfflineDialog();
          this.dialog1 = true;
          this.dialogMessage =
            "You have successfully taking " +
            (response.data.meta.total == 1 ? "product" : "products") +
            " offline.";
          this.requestedStatistic = `<span class="secondary--text">Total: ${response.data.meta.total} </span>
            <span class="primary--text">Successful: ${response.data.meta.successful} </span> 
            <span class="error--text">Failed: ${response.data.meta.failed}</span>`;
          this.getProducts();
          this.$emit("clearSelectedRow");
        })
        .catch((error) => {
          this.offlineDialogBulkLoader = false;
          this.closeOfflineDialogBulk();
          this.offlineDialogLoader = false;
          this.closeOfflineDialog();
          this.statusImage = failedImage;
          this.requestedStatistic = "";
          if (error.status == 422 || error.status == 400) {
            this.dialog1 = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
    // get updated products details
    getProducts() {
      this.$store.getters["inventory/searchProduct"] == false
        ? this.$store.dispatch("inventory/getfilteredProducts")
        : this.$store.dispatch("inventory/searchProducts");
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