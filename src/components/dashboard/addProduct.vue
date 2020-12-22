<template>
  <div>
    <div style="width: 200px">
      <!-- back to Inventory -->
      <router-link :to="{ name: 'inventoryPage' }" class="no-decoration">
        <h3 class="d-flex align-center return-btn my-3">
          <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Add New Product
        </h3>
      </router-link>
    </div>
    <progressBar :width="progress" class="mt-8 mb-6" />

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

        <!-- select category -->
        <div class="mb-9 input-field">
          <p class="mb-1">Category</p>
          <customSelect
            width="100%"
            height="57px"
            caretColor="#5064cc"
            placeholder="Select Category"
            :searchBar="true"
            :items="categories"
            :inputStatus="categoryError"
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
            v-model="skuNumber"
            type="number"
            :rules="inputRules"
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
            :quantity="0"
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

        <!-- commission -->
        <div class="mb-3 input-field">
          <p class="mb-1">Commission (N)</p>
          <v-text-field
            class="input mt-0"
            v-model="commission"
            :rules="priceRules"
            type="number"
            min="1"
            color="primary"
            placeholder="Enter Amount"
            required
            outlined
          >
          </v-text-field>
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
          ></v-textarea>
        </div>

        <!-- image uploader -->
        <div class="mb-9 input-field">
          <p class="mb-1">Upload Product Image</p>
          <imageUploader
            itemHolder="Select image"
            width="100%"
            height="57px"
            caretColor="#5064cc"
            @images="setImages"
          />
          <div v-if="imageError === true" class="inputError error--text">
            At Least one image is required
          </div>
        </div>

        <!-- button container -->
        <div class="d-flex justify-space-between" style="width: 100%">
          <!-- return button -->
          <v-btn
            class="primary--text px-8 py-4 mb-5"
            style="background: #5064cc26"
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
</template>
<script>
import progressBar from "@/components/dashboard/progressBar.vue";
import customSelect from "@/components/dashboard/customSelect.vue";
import customNumberInput from "@/components/dashboard/customNumberInput.vue";
import imageUploader from "@/components/dashboard/imageUploader.vue";
export default {
  name: "addProduct",
  components: { progressBar, customSelect, customNumberInput, imageUploader },
  data: function () {
    return {
      productForm: "form1",
      progress: "30%",
      productName: "",
      category: "",
      skuNumber: "",
      quantity: 0,
      price: "",
      commission: "",
      productDescription: "",
      images: null,
      loading: false,
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
  methods: {
    // next form
    nextForm(formNum) {
      this.$refs[`form${formNum}`].validate();
      this.verifyCategory();
      this.verifyQuantity();

      if (
        this.$refs[`form${formNum}`].validate() &&
        this.category !== "" &&
        this.quantity !== 0
      ) {
        this.productForm = `form${formNum + 1}`;
        this.progress = "70%";
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
      if (this.quantity === 0 || this.quantity < 0) {
        this.quantityError = true;
      } else {
        this.quantityError = false;
      }
    },
    // verify that an image is selected
    verifyImages() {
      if (this.images === null || this.images.length === 0) {
        this.imageError = true;
      } else {
        this.imageError = false;
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
    // set images
    setImages(params) {
      this.images = params;
      console.log(this.images);
      this.verifyImages();
    },
    // submit 
    submit() {
      
    },
    // add products
    addProduct() {
      this.loading = true;
      this.$store.dispatch("inventory/addProduct", {
        productName: this.productName,
        category: this.category,
        skuNumber: this.skuNumber,
        quantity: this.quantity,
        price: this.price,
        commission: this.commission,
        productDescription: this.productDescription,
        images: this.images,
      }).then((response) => {
        this.loading = false
        if(response.status == "success"){
            alert("successfully added product")
        }
      })
    }
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
@media (max-width: 750px) {
  .input-field {
    width: 100%;
  }
}
</style>