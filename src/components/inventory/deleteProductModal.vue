<template>
  <div>
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

    <!------------------------------------ delete products modal -------------------------------------------->
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
            @click="deleteProducts"
            :loading="deleteDialogLoader"
            :disabled="deleteDialogLoader"
            >Yes, delete
            {{
              this.selectedReferences.length == 1 ? "product" : "products"
            }}</v-btn
          >
          <v-btn
            color="#F6F7FD"
            class="primary--text py-5"
            @click="closeDeleteDialog"
            :disabled="deleteDialogLoader"
            >No, keep
            {{
              this.selectedReferences.length == 1 ? "product" : "products"
            }}</v-btn
          >
        </div>
        <div></div>
      </div>
    </modal>

    <!------------------------------------ delete products modal in bulk --------------------------------->
    <modal :dialog="deleteDialogBulk" width="400">
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
              >Are you sure you want to delete this
              {{  
                this.selectedReferences.length == 1 ? "product" : "products"
              }}</span
            >
          </p>
        </div>

        <!-- btns -->
        <div class="d-flex justify-space-between flex-wrap">
          <v-btn
            class="error py-5 mb-3 mb-sm-0"
            @click="deleteProducts()"
            :loading="deleteDialogBulkLoader"
            :disabled="deleteDialogBulkLoader"
            >Yes, delete
            {{
              this.selectedReferences.length == 1 ? "product" : "products"
            }}</v-btn
          >
          <v-btn
            color="#F6F7FD"
            class="primary--text py-5"
            @click="closeDeleteDialogBulk"
            :disabled="deleteDialogBulkLoader"
            >No, keep
            {{
              this.selectedReferences.length == 1 ? "product" : "products"
            }}</v-btn
          >
        </div>
        <div></div>
      </div>
    </modal>
  </div>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
import { mapState, mapGetters } from "vuex";
export default {
  name: "deleteProductModal",
  components: { modal },
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
        item = this.products.find(
          (x) => x.id == this.selectedReferences[0]
        );
      } else {
        item = {}
      }
      
      return {
        name: item.name ? item.name : null,
        sku: item.sku ? item.sku : null,
        image: item.image ? item.image : null,
      };
    },
  },
  methods: {
    // close modal for deleting product
    closeDeleteDialog() {
      if (this.deleteDialogLoader === false) {
        this.$emit("closeDeleteDialog");
      }
    },
    // close modal for deleting products in bulk
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
          refs: this.selectedReferences,
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
            this.getfilteredProducts();
            this.$emit("clearSelectedRow");
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