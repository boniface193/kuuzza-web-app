/* eslint-disable no-self-assign */
<template>
  <div class="pb-16">
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
          <v-row>
            <v-col sm="6" cols="">
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
              </div>

              <!-- minimum quantity -->
              <div class="mb-9 input-field">
                <p class="mb-1">
                  Minimum Order Quantity
                  <span class="primary--text"
                    >(minimum quantity a customer can order for this
                    product)</span
                  >
                </p>
                <customNumberInput
                  width="120px"
                  height="57px"
                  caretColor="#029B97"
                  :minimumNumber="1"
                  :quantity="productDetails.min_order_quantity || 0"
                  @quantity="setMinQuantity"
                />
                <div
                  v-if="minQuantityError === true"
                  class="inputError error--text"
                >
                  Minimum order quantity cannot be greater than quantity
                </div>
              </div>

              <!-- image uploader -->
              <div class="mb-9 input-field">
                <p class="mb-1">Upload Product Image</p>
                <v-row>
                  <v-col class="pr-0" sm="9">
                    <imageUploader
                      width=""
                      height="57px"
                      caretColor="#029B97"
                      :multiple="false"
                      @images="setImageUrl"
                    />
                  </v-col>
                  <v-col sm="3">
                    <img
                      class=""
                      :src="imageUrl == null ? productDetails.image : imageUrl"
                      width="120px"
                  /></v-col>
                </v-row>
                <div v-if="imageError === true" class="inputError error--text">
                  An image is required
                </div>

                <div
                  class=""
                  v-for="(image, index) in productDetails.other_images"
                  :key="index"
                >
                  <v-row>
                    <v-col sm="9" cols="9">
                      <imageUploader
                        :model="image"
                        width="100%"
                        height="57px"
                        caretColor="#5064cc"
                        :multiple="false"
                        class="mt-3"
                        @images="setOtherImageUrl($event, index)"
                      />
                    </v-col>
                    <v-col sm="2" cols="2" class="text-center">
                      <img
                        width="100px"
                        :src="productDetails.other_images[index]"
                      />
                    </v-col>
                    <v-col sm="1" cols="21">
                      <v-icon
                        @click="removeImageFromOtherImages(index)"
                        class="mt-6"
                        color="error"
                        style="cursor: pointer"
                        >mdi-trash-can-outline</v-icon
                      >
                    </v-col>
                  </v-row>
                </div>
                <v-btn
                  dark
                  :disabled="this.productDetails.other_images.length >= 5"
                  color="warning"
                  class="elevation-0 mt-3"
                  @click="increaseOtherImages()"
                  >Additional Image</v-btn
                >
              </div>
            </v-col>
            <v-col sm="6" cols="">
              <!-- select category  -->
              <div class="mb-9 input-field">
                <p class="mb-1">Category</p>
                <CategorySelector
                  width="100%"
                  height="57px"
                  caretColor="#029B97"
                  placeholder="Select Category"
                  :searchBar="true"
                  :items="productCategories"
                  :item="productCategory.category"
                  :inputStatus="categoryError"
                  @selectedItem="setCategory"
                />
                <div
                  v-if="categoryError === true"
                  class="inputError error--text"
                >
                  Category is required
                </div>
              </div>

              <!-- quantity -->
              <div class="mb-9 input-field">
                <p class="mb-1">Quantity</p>
                <customNumberInput
                  width="120px"
                  height="57px"
                  caretColor="#029B97"
                  :quantity="productDetails.quantity || 0"
                  @quantity="setQuantity"
                  :inputStatus="quantityError"
                />
                <div
                  v-if="quantityError === true"
                  class="inputError error--text"
                >
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

              <!-- profit -->
          <div class="mb-3 input-field" v-if="userInfo.is_fmcg">
            <p class="mb-1">Agency/seller Profit (&#8358;)</p>
            <v-text-field
              class="input mt-0"
              v-model="productDetails.profit"
              :rules="profitRules"
              type="number"
              color="primary"
              placeholder="Enter profit"
              required
              outlined
            >
            </v-text-field>
          </div>

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

              <div class="input-field">
                <p class="mb-1">Transport Method</p>

                <v-select
                  :items="carriage"
                  item-text="text"
                  :label="productDetails.vehicle_type"
                  outlined
                  class="pa-0"
                  :rules="inputRules"
                  @change="selectedCarriage"
                >
                  <template v-slot:selection="{ item }">
                    <span class="mr-4">{{ item.text }}</span>
                    <v-icon>{{ item.icon }}</v-icon>
                  </template>

                  <template v-slot:item="{ item }">
                    <span class="mr-4">{{ item.text }}</span>
                    <v-icon>{{ item.icon }}</v-icon>
                  </template>
                </v-select>
              </div>
            </v-col>
          </v-row>

          <!-- variant container -->
          <div class="mb-9" style="width: 100%">
            <ProductVariant
              @setVariant="setVariant"
              :variants="productDetails.variants"
              ref="variantForm"
            />
          </div>

          <!-- button container -->
          <div class="d-flex justify-end" style="width: 100%">
            <!-- continue button -->
            <v-btn
              class="primary px-10 mb-5"
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

    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog" width="400">
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
    </Modal>
  </div>
</template>
<script>
import customNumberInput from "@/components/general/customNumberInput.vue";
import imageUploader from "@/components/general/imageUploader.vue";
import CategorySelector from "@/components/general/CategorySelector.vue";
import Modal from "@/components/general/Modal.vue";
import ProductVariant from "@/components/inventory/ProductVariant.vue";
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
import { mapGetters } from "vuex";
export default {
  name: "editInventory",
  components: {
    CategorySelector,
    customNumberInput,
    imageUploader,
    Modal,
    ProductVariant,
  },
  data: function () {
    return {
      carriage: [
        { icon: "mdi-bicycle-basket", text: "BIKE" },
        { icon: "mdi-car", text: "CAR" },
        { icon: "mdi-truck", text: "TRUCK" },
      ],
      selectedTransportMethod: "",
      showEditImage: null,
      showEditOtherImage: null,
      increaseImageField: [],
      additionalImages: [],
      getAdditionalImages: [],
      otherImagesUrl: [],
      productDetails: {
        category: "",
        quantity: 0,
        min_order_quantity: 0,
        variants: null,
        other_images: [],
      },
      variantDetails: {
        variants: [],
        variantStatus: false,
        formsValidated: true,
      },
      imageUrl: null,
      failedRequest: false,
      initialProductDetails: {},
      dialog: false,
      statusImage: null,
      dialogMessage: "",
      pageLoader: false,
      loading: false,
      edited: false,
      quantityError: false,
      categoryError: false,
      imageError: false,
      minQuantityError: false,
      inputRules: [(v) => !!v || "This field is required"],
      priceRules: [
        (v) => !!v || "This field is required",
        (v) =>
          parseInt(v, 10) <= parseInt(this.price, 10) ||
          "Commission can not be greater than price",
      ],
      profitRules: [
        (v) => !!v || "This field is required",
        (v) =>
          parseInt(v, 10) <= parseInt(this.productDetails.price, 10) ||
          "profit should not be greater than product price",
      ],
    };
  },
  created() {
    this.pageLoader = true;
    this.$store
      .dispatch("inventory/getProductDetail", {
        id: this.$route.params.id,
      })
      .then((response) => {
        this.productDetails = response.data.data;
        this.imageUrl = response.data.image;
        this.initialProductDetails = response.data.data;
        // get product categories if not available
        if (this.$store.getters["inventory/productCategories"].length == 0) {
          this.getProductCategories();
        } else {
          this.pageLoader = false;
        }
      })
      .catch((error) => {
        this.dialog = true;
        this.pageLoader = false;
        this.statusImage = failedImage;
        if (error.status == 422 || error.status == 400) {
          this.dialogMessage = error.data.message;
        }
      });
  },
  watch: {
    productDetails: function () {
      this.variantDetails = {
        variants: this.productDetails.variants,
        variantStatus: this.productDetails.variants == null ? false : true,
      };
      // eslint-disable-next-line no-self-assign
      this.productDetails.other_images = this.productDetails.other_images;
    },
  },
  computed: {
    ...mapGetters({
      productCategories: "inventory/productCategories",
      userInfo: "settings/getUserProfile",
    }),
    productCategory() {
      return {
        category: this.productDetails.category || "",
      };
    },
  },
  methods: {
    selectedCarriage(params) {
      this.selectedTransportMethod = params;
      this.edited = true;
    },
    setCategory(params) {
      this.productDetails.category_id = params;
      this.edited = true;
      this.verifyCategory();
    },
    setQuantity(params) {
      this.productDetails.quantity = params;
      this.edited = true;
      this.verifyQuantity();
    },
    setMinQuantity(params) {
      this.productDetails.min_order_quantity = params;
      this.edited = true;
      this.verifyMinQuantity();
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
    // verify that minimum order quantity satisfy its condition
    verifyMinQuantity() {
      if (
        this.productDetails.min_order_quantity > this.productDetails.quantity
      ) {
        this.minQuantityError = true;
      } else {
        this.minQuantityError = false;
      }
    },
    // verify an image was selected
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
    setOtherImageUrl(params, index) {
      this.productDetails.other_images[index] = params.imageUrl;
      this.edited = true;
    },
    increaseOtherImages() {
      this.productDetails.other_images.push("");
    },
    // delete image field
    removeImageFromOtherImages(index) {
      this.productDetails.other_images.splice(index, 1);
      this.edited = true;
    },
    // setVariant
    setVariant(params) {
      this.variantDetails = params;
      this.edited = true;
    },
    // get the list of product category
    getProductCategories() {
      this.$store
        .dispatch("inventory/getProductCategories")
        .then((response) => {
          this.$store.commit(
            "inventory/setProductCategories",
            response.data.data
          );
          this.pageLoader = false;
        })
        .catch((error) => {
          this.statusImage = failedImage;
          this.pageLoader = false;
          if (error.status == 422 || error.status == 400) {
            this.dialog2 = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
    // update products after passing certain condition
    updateProduct() {
      this.verifyCategory();
      this.verifyQuantity();
      this.verifyImages();
      this.verifyMinQuantity();
      if (
        this.edited === true &&
        this.$refs.form.validate() &&
        this.quantityError === false &&
        this.categoryError === false &&
        this.imageError === false &&
        this.minQuantityError === false
      ) {
        if (this.variantDetails.variantStatus === true) {
          this.$refs.variantForm.validateForm();
          if (this.variantDetails.formsValidated === true) {
            this.sendUpdatedProduct();
          }
        } else {
          this.sendUpdatedProduct();
        }
      }
    },
    // send the updated product details
    sendUpdatedProduct() {
      this.loading = true;
      this.$store
        .dispatch("inventory/updateProduct", this.getProductDetails())
        .then(() => {
          this.failedRequest = false;
          this.loading = false;
          this.dialog = true;
          this.statusImage = successImage;
          this.dialogMessage = "You have successfully updated this product.";
          this.$store.getters["inventory/searchProduct"] === true
            ? this.$store.dispatch("inventory/getfilteredProducts")
            : this.$store.dispatch("inventory/searchProducts");
          this.edited = false;
        })
        .catch((error) => {
          this.failedRequest = true;
          this.loading = false;
          this.statusImage = failedImage;
          if (error.status == 422 || error.status == 400) {
            this.dialog = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
    getProductDetails() {
      let productDetails = {};
      productDetails.name = this.productDetails.name;
      productDetails.category_id = this.productDetails.category_id;
      productDetails.sku = this.productDetails.sku;
      productDetails.quantity = this.productDetails.quantity;
      productDetails.min_order_quantity =
        this.productDetails.min_order_quantity;
      productDetails.price = this.productDetails.price;
      productDetails.description = this.productDetails.description;
      productDetails.image = this.imageUrl;
      productDetails.vehicle_type = this.selectedTransportMethod;
      productDetails.other_images = this.productDetails.other_images;
      productDetails.ref = this.$route.params.id;

      if (this.variantDetails.variantStatus === true) {
        productDetails.variants = [];
        this.variantDetails.variants.forEach((item) => {
          productDetails.variants.push(item);
        });
      }
      if (this.userInfo.is_fmcg == true) {
        productDetails.profit = this.productDetails.profit;
      }
      return productDetails;
    },
    // close Modal
    closeModal() {
      this.dialog = false;
      if (this.dialogMessage == "The given data was invalid.") {
        window.location.reload();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.input-field {
  width: 100%;
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