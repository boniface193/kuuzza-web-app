<template>
  <div class="pb-16">
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
              <!-- <span class="primary--text">(Inclusive of 7.5% VAT)</span> -->
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

          <!-- profit -->
          <div class="mb-3 input-field" v-if="userInfo.is_fmcg">
            <p class="mb-1">Agency/seller Profit (&#8358;)</p>
            <v-text-field
              class="input mt-0"
              v-model="agencySellerProfit"
              :rules="profitRules"
              type="number"
              color="primary"
              placeholder="Enter profit"
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
            <div
              v-if="minQuantityError === true"
              class="inputError error--text"
            >
              Minimum order quantity cannot be greater than quantity
            </div>
          </div>

          <!-- variant container -->
          <div class="mb-9" style="width: 100%">
            <ProductVariant @setVariant="setVariant" ref="variantForm" />
          </div>

          <!-- button container -->
          <div class="d-flex justify-end" style="width: 100%">
            <!-- continue button -->
            <v-btn class="primary px-10 mb-5" @click="nextForm(1)" depressed
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

          <div class="input-field">
            <p class="mb-1">Transport Method</p>

            <v-select
              :items="carriage"
              item-text="text"
              label="Select Carriage"
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

          <!-- image uploader -->
          <div class="mb-9 input-field">
            <p class="mb-1">Upload Product Image</p>
            <imageUploader
              width="100%"
              height="57px"
              caretColor="#029B97"
              :multiple="false"
              @images="setImageUrl"
            />
            <div v-if="imageError === true" class="inputError error--text">
              An image is required
            </div>
            <div class="" v-for="(n, index) in otherImagesUrl" :key="index">
              <v-icon
                @click="removeImageFromOtherImages(index)"
                class="float-right my-3"
                color="error"
                style="cursor: pointer"
                >mdi-trash-can-outline</v-icon
              >
              <imageUploader
                width="100%"
                height="57px"
                caretColor="#029B97"
                :multiple="false"
                class="mt-3 mr-8"
                @images="setOtherImageUrl($event, index)"
              />
            </div>
            <v-btn
              :disabled="otherImagesUrl.length >= 5"
              dark
              color="warning"
              class="elevation-0 float-right mt-3"
              @click="increaseOtherImages()"
              >Additional Image</v-btn
            >
          </div>

          <!-- button container -->
          <div class="d-flex justify-space-between" style="width: 100%">
            <!-- return button -->
            <v-btn
              class="primary--text light-background px-8 mb-5"
              @click="prevForm(2)"
              >Return</v-btn
            >
            <!-- add product button -->
            <v-btn
              class="primary px-10 mb-5"
              :loading="loading"
              :disabled="loading"
              @click="submit"
              depressed
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
import progressBar from "@/components/general/progressBar.vue";
import CategorySelector from "@/components/general/CategorySelector.vue";
import customNumberInput from "@/components/general/customNumberInput.vue";
import imageUploader from "@/components/general/imageUploader.vue";
import ProductVariant from "@/components/inventory/ProductVariant.vue";
import Modal from "@/components/general/Modal.vue";
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
      disabled: false,
      increaseImageField: [],
      otherImagesUrl: [],
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
      agencySellerProfit: "",
      variantDetails: {
        variants: [],
        variantStatus: false,
        formsValidated: false,
      },
      inputRules: [(v) => !!v || "This field is required"],
      priceRules: [(v) => !!v || "This field is required"],
      profitRules: [
        (v) => !!v || "This field is required",
        (v) =>
          parseInt(v, 10) <= parseInt(this.price, 10) ||
          "profit should not be greater than product price",
      ],
      quantityError: false,
      categoryError: false,
      imageError: false,
      minQuantityError: false,
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
      userInfo: "settings/getUserProfile",
    }),
  },
  methods: {
    selectedCarriage(params) {
      this.selectedTransportMethod = params;
    },
    // next form
    nextForm(formNum) {
      this.$refs[`form${formNum}`].validate();
      this.verifyCategory();
      this.verifyQuantity();
      this.verifyMinQuantity();

      if (
        this.$refs[`form${formNum}`].validate() &&
        this.categoryError === false &&
        this.quantityError === false &&
        this.minQuantityError === false
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
    verifyMinQuantity() {
      if (this.minQuantity > this.quantity) {
        this.minQuantityError = true;
      } else {
        this.minQuantityError = false;
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
    // set minimum order quantity
    setMinQuantity(params) {
      this.minQuantity = params;
      this.verifyMinQuantity();
    },
    // verify an image was selected
    verifyImages() {
      if (this.imageUrl !== null) {
        this.imageError = false;
      } else {
        this.imageError = true;
        // this.$refs.imageUploader.setError();
      }
    },
    // set image url
    setImageUrl(params) {
      this.imageUrl = params.imageUrl;
      this.verifyImages();
      this.setProgress();
    },
    setOtherImageUrl(params, index) {
      this.otherImagesUrl[index] = params.imageUrl;
    },
    increaseOtherImages() {
      this.otherImagesUrl.push("");
    },
    // delete image field
    removeImageFromOtherImages(index) {
      this.otherImagesUrl.splice(index, 1);
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
          this.loader = false;
          if (error.status == 422 || error.status == 400) {
            this.dialog2 = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
    getProductDetails() {
      let productDetails = {};
      productDetails.name = this.productName;
      productDetails.category_id = this.category;
      productDetails.sku = this.skuNumber;
      productDetails.quantity = this.quantity;
      productDetails.min_order_quantity = this.minQuantity;
      productDetails.price = this.price;
      productDetails.description = this.productDescription;
      productDetails.image = this.imageUrl;
      productDetails.vehicle_type = this.selectedTransportMethod;
      productDetails.other_images = this.otherImagesUrl;
      if (this.variantDetails.variantStatus === true) {
        productDetails.variants = [];
        this.variantDetails.variants.forEach((item) => {
          productDetails.variants.push(item);
        });
      }
      if (this.userInfo.userInfo.is_fmcg === true) {
        productDetails.profit = this.profit
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
          if (error.status == 422 || error.status == 400) {
            this.dialogMessage = error.data.message;
          }
        });
    },
    // close Modal
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