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

        <h4>{{ dialogMessage }}</h4>
      </div>
    </Modal>

    <!------------------------------------ delete products Modal -------------------------------------------->
    <Modal :dialog="deleteDialog" width="400">
      <div class="white pa-3 pb-8 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeDeleteDialog"
            >mdi-close</v-icon
          >
        </div>

        <div class="">
          <p class="mt-5" style="color: black">
            You’re about to delete this product. Are you sure ?
          </p>
          <div class="d-flex mb-6">
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
              class="error elevation-0 text-caption text-lg-body-2 tex"
              @click="deleteProducts"
              :loading="deleteDialogLoader"
              :disabled="deleteDialogLoader"
              >Yes,
              <span class="text-lowercase">
                delete
                {{
                  this.selectedReferences.length == 1 ? "product" : "products"
                }}</span
              >
            </v-btn>
          </div>
          <div class="col-sm-6">
            <v-btn
              block
              class="primary--text light-background elevation-0 text-caption text-lg-body-2"
              @click="closeDeleteDialog"
              :disabled="deleteDialogLoader"
              >No,
              <span class="text-lowercase">
                keep
                {{
                  this.selectedReferences.length == 1 ? "product" : "products"
                }}</span
              ></v-btn
            >
          </div>
        </div>
        <div></div>
      </div>
    </Modal>

    <!------------------------------------ delete products Modal in bulk --------------------------------->
    <Modal :dialog="deleteDialogBulk" width="400">
      <div class="white pa-3 pb-8 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeDeleteDialogBulk"
            >mdi-close</v-icon
          >
        </div>

        <div class="text-center">
          <p class="error--text mt-5">
            You have selected {{ this.selectedReferences.length }}
            {{ this.selectedReferences.length == 1 ? "product" : "products" }}
            <br /><br />
            <span class="secondary--text"
              >You’re about to delete this product. Are you sure ?
              {{
                this.selectedReferences.length == 1 ? "product" : "products"
              }}</span
            >
          </p>
        </div>

        <!-- btns -->
        <div class="row d-flex">
          <div class="col-sm-6 justify-center">
            <v-btn
              block
              class="error elevation-0 text-caption text-lg-body-2"
              @click="deleteProducts()"
              :loading="deleteDialogBulkLoader"
              :disabled="deleteDialogBulkLoader"
              >Yes,
              <span class="text-lowercase">
                delete
                {{
                  this.selectedReferences.length == 1 ? "product" : "products"
                }}</span
              ></v-btn
            >
          </div>
          <div class="col-sm-6 justify-center">
            <v-btn
              block
              class="primary--text light-background elevation-0 text-caption text-lg-body-2"
              @click="closeDeleteDialogBulk"
              :disabled="deleteDialogBulkLoader"
              >No,
              <span class="text-lowercase">
                keep
                {{
                  this.selectedReferences.length == 1 ? "product" : "products"
                }}</span
              ></v-btn
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
  name: "deleteProductModal",
  components: { Modal },
  data: function () {
    return {
      statusImage: null,
      dialog1: false,
      dialogMessage: "",
      deleteDialogBulkLoader: false,
      deleteDialogLoader: false,
    };
  },
  props: ["deleteDialogBulk", "deleteDialog"],
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
    closeDeleteDialog() {
      if (this.deleteDialogLoader === false) {
        this.$emit("closeDeleteDialog");
      }
    },
    // close Modal for deleting products in bulk
    closeDeleteDialogBulk() {
      if (this.deleteDialogBulkLoader === false) {
        this.$emit("closeDeleteDialogBulk");
      }
    },
    // delete products
    deleteProducts() {
      this.deleteDialogBulkLoader = true;
      this.deleteDialogLoader = true;
      this.$store
        .dispatch("inventory/deleteProducts", {
          ids: this.selectedReferences,
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
            (this.selectedReferences.length == 1 ? "product" : "products") +
            ".";
          this.getProducts();
          this.$emit("clearSelectedRow");
        })
        .catch((error) => {
          this.deleteDialogBulkLoader = false;
          this.closeDeleteDialogBulk();
          this.deleteDialogLoader = false;
          this.closeDeleteDialog();
          this.statusImage = failedImage;
          if (error.status == 422 || error.status == 400) {
            this.dialog1 = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
    // get updated products details
    getProducts() {
      this.$store.getters["inventory/searchProduct"] === true
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