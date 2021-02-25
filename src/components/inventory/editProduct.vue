<template>
  <div>
    <div>
      <div style="width: 200px">
        <!-- back to Inventory -->
        <router-link :to="{ name: 'inventoryPage' }" class="no-decoration">
          <h3 class="d-flex align-center return-btn mt-3 mb-6">
            <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Edit Product
          </h3>
        </router-link>
      </div>
      <div v-show="!pageLoader">
        <v-form
          class="d-flex justify-space-between flex-wrap py-2 px-3"
          ref="form"
        >
          <!-- product name -->
          <div class="mb-3 input-field">
            <p class="mb-1">Product Name</p>
            <v-text-field
              class="input mt-0"
              v-model="productDetails.name"
              type="name"
              @keyup="edited = true"
              :rules="inputRules"
              color="primary"
              placeholder="Infinix Hot 100"
              required
              outlined
            >
            </v-text-field>
          </div>

          <!-- select category -->
          <div class="mb-9 input-field">
            <p class="mb-1">Category</p>
            <customSelect
              width="100%"
              height="57px"
              caretColor="#5064cc"
              :placeholder="productDetails.category"
              :searchBar="true"
              :items="categories"
              :item="productDetails.category"
              @selectedItem="setCategory"
            />
            <div v-if="categoryError === true" class="inputError error--text">
              Category is required
            </div>
          </div>

          <!-- SKU number -->
          <div class="mb-3 input-field remove-appearance">
            <p class="mb-1">SKU Number</p>
            <v-text-field
              class="input mt-0"
              v-model="productDetails.sku"
              :rules="inputRules"
              @keyup="edited = true"
              color="primary"
              placeholder="Enter SKU Number"
              required
              outlined
            >
            </v-text-field>
          </div>

          <!-- quantity -->
          <div class="mb-9 input-field">
            <p class="mb-1">Quantity</p>
            <customNumberInput
              width="120px"
              height="57px"
              caretColor="#5064CC"
              :quantity="productDetails.quantity || 0"
              @quantity="setQuantity"
              :inputStatus="quantityError"
            />
            <div v-if="quantityError === true" class="inputError error--text">
              Quantity cannot be less or equal to 0
            </div>
          </div>

          <!-- unit price -->
          <div class="mb-3 input-field">
            <p class="mb-1">Unit Price (N)</p>
            <v-text-field
              class="input mt-0"
              :rules="inputRules"
              v-model="productDetails.price"
              @keyup="edited = true"
              type="number"
              min="1"
              color="primary"
              placeholder="Enter Amount"
              required
              outlined
            >
            </v-text-field>
          </div>

          <!-- image uploader -->
          <div class="mb-9 input-field">
            <p class="mb-1">Upload Product Image</p>
            <imageUploader
              width="100%"
              height="57px"
              caretColor="#5064cc"
              :multiple="false"
              @images="setImageUrl"
            />
            <div v-if="imageError === true" class="inputError error--text">
              An image is required
            </div>
          </div>

          <!-- commission -->
          <!-- <div class="mb-3 input-field">
          <p class="mb-1">Commission (N)</p>
          <v-text-field
            class="input mt-0"
            :rules="priceRules"
            v-model="computedInfo.commission"
            type="number"
            min="1"
            color="primary"
            placeholder="Enter Amount"
            required
            outlined
          >
          </v-text-field>
        </div> -->

          <!-- product description -->
          <div class="mb-3 input-field">
            <p class="mb-1">Product Description</p>
            <v-textarea
              outlined
              name="input-7-4"
              :rules="inputRules"
              @keyup="edited = true"
              v-model="productDetails.description"
              placeholder="Enter brief description about product"
            ></v-textarea>
          </div>

          <!-- button container -->
          <div class="d-flex justify-end" style="width: 100%">
            <!-- continue button -->
            <v-btn
              class="primary px-10 py-6 mb-5"
              :loading="loading"
              :disabled="loading || !edited"
              @click="updateProduct"
              >Update</v-btn
            >
          </div>
        </v-form>
      </div>
      <!-- loader -->
      <div class="text-center pt-10 pb-5" v-show="pageLoader == true">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </div>

    <!-- modal for dialog messages -->
    <modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeModal"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img :src="statusImage"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>
  </div>
</template>
<script>
//import modal from "@/components/dashboard/modal.vue";
import customSelect from "@/components/dashboard/customSelect.vue";
import customNumberInput from "@/components/dashboard/customNumberInput.vue";
import imageUploader from "@/components/dashboard/imageUploader.vue";
import modal from "@/components/dashboard/modal.vue";
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
export default {
  name: "editInventory",
  components: { customSelect, customNumberInput, imageUploader, modal },
  data: function () {
    return {
      productDetails: {},
      imageUrl: null,
      failedRequest: false,
      initialProductDetails: {},
      dialog: false,
      statusImage: null,
      dialogMessage: "",
      pageLoader: false,
      loading: false,
      edited: false,
      categories: [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "phone and device",
        "clothe",
      ],
      inputRules: [(v) => !!v || "This field is required"],
      priceRules: [
        (v) => !!v || "This field is required",
        (v) =>
          parseInt(v, 10) <= parseInt(this.price, 10) ||
          "Commission can not be greater than price",
      ],
      quantityError: false,
      categoryError: false,
      imageError: false,
    };
  },
  created() {
    this.pageLoader = true;
    this.$store
      .dispatch("inventory/getProductDetail", {
        id: this.$route.params.id,
      })
      .then((response) => {
        this.pageLoader = false;
        this.productDetails = response.data.data;
        this.productDetails.quantity = response.data.data.quantity;
        this.productDetails.category = response.data.data.category;
        this.imageUrl = response.data.image;
        this.initialProductDetails = response.data.data;
      })
      .catch((error) => {
        this.dialog = true;
        this.pageLoader = false;
        this.successImage = failedImage;
        if (error.response) {
          this.dialogMessage = "Sorry, this data does not Exist";
        } else {
          this.dialogMessage = "No internet Connection!";
        }
      });
  },
  methods: {
    setCategory(params) {
      this.productDetails.category = params;
      this.edited = true;
      this.verifyCategory();
    },
    setQuantity(params) {
      this.productDetails.quantity = params;
      this.edited = true;
      this.verifyQuantity();
    },
    // verfiy that category is selected
    verifyCategory() {
      if (this.productDetails.category === "") {
        this.categoryError = true;
      } else {
        this.categoryError = false;
      }
    },
    // verfiy that quantity is not less or equal to 0
    verifyQuantity() {
      if (
        this.productDetails.quantity == 0 ||
        this.productDetails.quantity < 0
      ) {
        this.quantityError = true;
      } else {
        this.quantityError = false;
      }
    },
    verifyImages() {
      if (this.imageUrl !== null) {
        this.imageError = false;
      } else {
        this.imageError = true;
        this.$refs.imageUploader.setError();
      }
    },
    // set image url
    setImageUrl(params) {
      this.imageUrl = params.imageUrl;
      this.edited = true;
      this.verifyImages();
    },

    updateProduct() {
      this.verifyCategory();
      this.verifyQuantity();
      this.verifyImages();
      if (
        this.edited === true &&
        this.$refs.form.validate() &&
        this.quantityError === false &&
        this.categoryError === false &&
        this.imageError === false

      ) {
        this.loading = true;
        this.$store
          .dispatch("inventory/updateProduct", {
            name: this.productDetails.name,
            category: this.productDetails.category,
            sku: this.productDetails.skuNumber,
            quantity: this.productDetails.quantity,
            price: this.productDetails.price,
            description: this.productDetails.description,
            image: this.imageUrl,
            ref: this.$route.params.id,
          })
          .then(() => {
            this.failedRequest = false;
            this.loading = false;
            this.dialog = true;
            this.statusImage = successImage;
            this.dialogMessage = "You have successfully updated this product.";
            this.$store.getters["inventory/searchProduct"] === true
              ? this.$store.dispatch("inventory/getfilteredProducts")
              : this.$store.dispatch("inventory/searchProducts");
          })
          .catch((error) => {
            this.failedRequest = true;
            this.loading = false;
            this.dialog = true;
            this.statusImage = failedImage;
            if (error.response) {
              this.dialogMessage = error.response.message;
            } else {
              this.dialogMessage = "No internet connection!";
            }
          });
      }
    },
    // close modal
    closeModal() {
      this.dialog = false;
      location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
.input-field {
  width: 49%;
}
.close-btn {
  cursor: pointer;
}
.v-text-field--outlined {
  border-radius: 8px !important;
}
.no-decoration {
  text-decoration: none;
  color: #2b2b2b;
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
@media (max-width: 750px) {
  .input-field {
    width: 100%;
  }
}
</style>