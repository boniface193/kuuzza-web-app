<template>
  <div class="pb-8">
    <div v-show="!loader">
      <div style="width: 200px">
        <!-- back to Inventory -->
        <router-link :to="{ name: 'inventoryPage' }" class="no-decoration">
          <h3 class="d-flex align-center return-btn my-3">
            <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Add New Product
          </h3>
        </router-link>
      </div>
      <progressBar
        :width="progress"
        height="8px"
        bgColor="#EFEFEF"
        progressColor="#FFA500"
        borderRadius="5px"
        class="mt-8 mb-6"
      />

      <div>
        <!-- form 1 -->
        <v-form
          class="justify-space-between flex-wrap"
          :class="{
            'd-none': productForm !== 'form1',
            'd-flex': productForm == 'form1',
          }"
          ref="form1"
        >
          <!-- product name -->
          <div class="mb-3 input-field">
            <p class="mb-1">Product Name</p>
            <v-text-field
              class="input mt-0"
              v-model="productName"
              type="name"
              :rules="inputRules"
              color="primary"
              placeholder="Infinix Hot 100"
              required
              outlined
            >
            </v-text-field>
          </div>

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
              item="---Select category---"
              :inputStatus="categoryError"
              @selectedItem="setCategory"
            />
            <div v-if="categoryError === true" class="inputError error--text">
              Category is required
            </div>
          </div>

          <!-- SKU number -->
          <div class="mb-3 input-field remove-appearance">
            <p class="mb-1">
              SKU Number <span class="primary--text">(Serial number)</span>
            </p>
            <v-text-field
              class="input mt-0"
              v-model="skuNumber"
              type="text"
              :rules="inputRules"
              color="primary"
              placeholder="Enter SKU Number"
              required
              outlined
            >
            </v-text-field>
          </div>

          <!-- unit price -->
          <div class="mb-3 input-field">
            <p class="mb-1">
              Unit Price (&#8358;)
              <span class="primary--text">(Inclusive of 7.5% VAT)</span>
            </p>
            <v-text-field
              class="input mt-0"
              v-model="price"
              :rules="inputRules"
              type="number"
              min="1"
              color="primary"
              placeholder="Enter Amount"
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
              caretColor="#029B97"
              :quantity="quantity"
              @quantity="setQuantity"
              :inputStatus="quantityError"
            />
            <div v-if="quantityError === true" class="inputError error--text">
              Quantity cannot be less or equal to 0
            </div>
          </div>

          <!-- minimum quantity -->
          <div class="mb-9 input-field">
            <p class="mb-1">
              Minimum Order Quantity
              <span class="primary--text"
                >(minimum quantity a customer can order for this product)</span
              >
            </p>
            <customNumberInput
              width="120px"
              height="57px"
              caretColor="#029B97"
              :minimumNumber="1"
              :quantity="minQuantity"
              @quantity="setMinQuantity"
            />
            <!-- <div v-if="quantityError === true" class="inputError error--text">
              Minimum quantity cannot be less than 1
            </div> -->
          </div>

          <!-- variant container -->
          <div class="mb-9" style="width: 100%">
            <ProductVariant @setVariant="setVariant" ref="variantForm" />
          </div>

          <!-- button container -->
          <div class="d-flex justify-end" style="width: 100%">
            <!-- continue button -->
            <v-btn class="primary px-10 py-6 mb-5" @click="nextForm(1)"
              >Continue</v-btn
            >
          </div>
        </v-form>

        <!-- form 2 -->
        <v-form
          class="justify-space-between flex-wrap"
          :class="{
            'd-none': productForm !== 'form2',
            'd-flex': productForm == 'form2',
          }"
          ref="form2"
        >
          <!-- product description -->
          <div class="mb-3 input-field">
            <p class="mb-1">Product Description</p>
            <v-textarea
              outlined
              name="input-7-4"
              :rules="inputRules"
              v-model="productDescription"
              placeholder="Enter brief description about product"
              @change="setProgress"
            ></v-textarea>
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

          <!-- button container -->
          <div class="d-flex justify-space-between" style="width: 100%">
            <!-- return button -->
            <v-btn
              class="primary--text light-background px-8 py-4 mb-5"
              @click="prevForm(2)"
              >Return</v-btn
            >
            <!-- add product button -->
            <v-btn
              class="primary px-10 py-6 mb-5"
              :loading="loading"
              :disabled="loading"
              @click="submit"
              >Add Product</v-btn
            >
          </div>
        </v-form>
      </div>
    </div>

    <!-- loader -->
    <div class="text-center pt-10 pb-5" v-show="loader">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
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
import progressBar from "@/components/dashboard/progressBar.vue";
import CategorySelector from "@/components/general/CategorySelector.vue";
import customNumberInput from "@/components/dashboard/customNumberInput.vue";
import imageUploader from "@/components/general/imageUploader.vue";
import ProductVariant from "@/components/inventory/ProductVariant.vue";
import modal from "@/components/dashboard/modal.vue";
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
import { mapGetters } from "vuex";
export default {
  name: "addProduct",
  components: {
    progressBar,
    CategorySelector,
    customNumberInput,
    imageUploader,
    modal,
    ProductVariant,
  },
  data: function () {
    return {
      loader: false,
      failedRequest: false,
      dialog: false,
      dialogMessage: "",
      statusImage: null,
      productForm: "form1",
      progress: "30%",
      productName: "",
      category: "",
      skuNumber: "",
      quantity: 0,
      minQuantity: 1,
      price: "",
      totalPrice: 0,
      productDescription: "",
      imageUrl: null,
      loading: false,
      variantDetails: {
        variant: [],
        variantStatus: false,
        formsValidated: false,
      },
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
    if (this.$store.getters["inventory/productCategories"].length == 0) {
      this.loader = true;
      this.getProductCategories();
    }
  },
  computed: {
    ...mapGetters({
      productCategories: "inventory/productCategories",
    }),
  },
  methods: {
    // next form
    nextForm(formNum) {
      this.$refs[`form${formNum}`].validate();
      this.verifyCategory();
      this.verifyQuantity();

      if (
        this.$refs[`form${formNum}`].validate() &&
        this.categoryError === false &&
        this.quantityError === false
      ) {
        if (this.variantDetails.variantStatus === true) {
          this.$refs.variantForm.validateForm();
          if (this.variantDetails.formsValidated === true) {
            this.productForm = `form${formNum + 1}`;
            this.progress = "70%";
            this.setProgress();
          }
        } else {
          this.productForm = `form${formNum + 1}`;
          this.progress = "70%";
          this.setProgress();
        }
      }
    },
    // previous form
    prevForm(formNum) {
      this.productForm = `form${formNum - 1}`;
      this.progress = "30%";
    },
    // verfiy that category is selected
    verifyCategory() {
      if (this.category === "") {
        this.categoryError = true;
      } else {
        this.categoryError = false;
      }
    },
    // verfiy that quantity is not less or equal to 0
    verifyQuantity() {
      if (this.quantity == 0 || this.quantity < 0) {
        this.quantityError = true;
      } else {
        this.quantityError = false;
      }
    },
    // set category value
    setCategory(params) {
      this.category = params;
      this.verifyCategory();
    },
    // set quantity value
    setQuantity(params) {
      this.quantity = params;
      this.verifyQuantity();
    },
    setMinQuantity(params) {
      this.minQuantity = params;
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
      this.verifyImages();
      this.setProgress();
    },
    // set progress
    setProgress() {
      if (this.imageError === false && this.productDescription != "") {
        this.progress = "100%";
      } else {
        this.progress = "70%";
      }
    },
    // setVariant
    setVariant(params) {
      this.variantDetails = params;
    },
    // submit
    submit() {
      this.$refs.form2.validate();
      this.verifyImages();
      if (this.$refs.form2.validate() && this.imageError === false) {
        this.addProduct();
      }
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
          this.loader = false;
        })
        .catch((error) => {
          this.statusImage = failedImage;
          this.dialog2 = true;
          this.loader = false;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet Connection!";
          }
        });
    },
    getProductDetails() {
      let productDetails = {};
      productDetails.name = this.productName;
      productDetails.category = this.category;
      productDetails.sku = this.skuNumber;
      productDetails.quantity = this.quantity;
      productDetails.min_order_quantity = this.minQuantity;
      productDetails.price = this.price;
      productDetails.description = this.productDescription;
      productDetails.image = this.imageUrl;

      if(this.variantDetails.variantStatus === true){ 
        productDetails.variants = []
        this.variantDetails.variant.forEach(item => {
        //item.values = item.values.split(',');
         productDetails.variants.push(item);
        })
      } 

      return productDetails;
    },
    // add products
    addProduct() {
      this.loading = true;
      this.$store
        .dispatch("inventory/addProduct", this.getProductDetails())
        .then(() => {
          this.failedRequest = false;
          this.loading = false;
          this.dialog = true;
          this.statusImage = successImage;
          this.dialogMessage =
            "Product has successfully been added to your inventory.";
          this.$store.dispatch("inventory/getfilteredProducts");
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
    },
    // close modal
    closeModal() {
      this.dialog = false;
      if (this.failedRequest === false) {
        this.$router.push({ name: "inventoryPage" });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.return-btn {
  cursor: pointer;
  color: #2b2b2b;
  .v-icon {
    margin-right: 15px;
  }
}
.no-decoration {
  text-decoration: none;
  color: #2b2b2b;
}
.input-field {
  width: 49%;
}
.v-text-field--outlined {
  border-radius: 8px !important;
}
.inputError {
  line-height: 12px;
  word-break: break-word;
  word-wrap: break-word;
  font-size: 12px;
  margin-top: 8px;
  padding-left: 12px;
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