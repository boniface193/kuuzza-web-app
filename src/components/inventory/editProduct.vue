<template>
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
      <v-form class="d-flex justify-space-between flex-wrap py-2 px-3">
        <!-- product name -->
        <div class="mb-3 input-field">
          <p class="mb-1">Product Name</p>
          <v-text-field
            class="input mt-0"
            v-model="computedInfo.productName"
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
            :placeholder="computedInfo.category"
            :searchBar="true"
            :items="categories"
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
            v-model="computedInfo.sku"
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
            :quantity="computedInfo.quantity"
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
            v-model="computedInfo.price"
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
            v-model="computedInfo.description"
            placeholder="Enter brief description about product"
          ></v-textarea>
        </div>

        <!-- button container -->
        <div class="d-flex justify-end" style="width: 100%">
          <!-- continue button -->
          <v-btn class="primary px-10 py-6 mb-5" disabled>Update</v-btn>
        </div>
      </v-form>
    </div>
    <!-- loader -->
    <div class="text-center pt-10 pb-5" v-show="pageLoader == true">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>
<script>
//import modal from "@/components/dashboard/modal.vue";
import customSelect from "@/components/dashboard/customSelect.vue";
import customNumberInput from "@/components/dashboard/customNumberInput.vue";
import imageUploader from "@/components/dashboard/imageUploader.vue";
export default {
  name: "editInventory",
  props: ["dialog", "productId"],
  components: { customSelect, customNumberInput, imageUploader },
  data: function () {
    return {
      pageLoader: false,
      productDetails: {},
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
      })
      .catch((error) => {
        this.dialog = true;
        this.pageLoader = false;
        if (error.response) {
          this.dialogMessage = "Sorry, this data does not Exist";
        } else {
          this.dialogMessage = "No internet Connection!";
        }
      });
  },
  computed: {
    computedInfo() {
      // gets the values of user information
      let productName = this.productDetails.name;
      let category = this.productDetails.category;
      let sku = this.productDetails.sku;
      let quantity = this.productDetails.quantity;
      let price = this.productDetails.price;
      let commission = this.productDetails.commission;
      let description = this.productDetails.description;

      let initialProductName = this.productDetails.name;
      let initialCategory = this.productDetails.category;
      let initialSku = this.productDetails.sku;
      let initialQuantity = this.productDetails.quantity;
      let initialPrice = this.productDetails.price;
      let initialCommission = this.productDetails.commission;
      let initialDescription = this.productDetails.description;

      return {
        productName: productName,
        category: (category != undefined) ? "kkk": category,
        sku: sku,
        quantity: quantity,
        price: price,
        commission: commission,
        description: description,
        initialProductName: initialProductName,
        initialCategory: initialCategory,
        initialSku: initialSku,
        initialQuantity: initialQuantity,
        initialPrice: initialPrice,
        initialCommission: initialCommission,
        initialDescription: initialDescription,
      };
    },
  },
  methods: {
    setCategory() {},
    setQuantity(params) {
      this.computedInfo.quantity = params;
      //this.verifyQuantity();
    },
    setImages() {},
    closeModal() {
      this.$emit("closeEditInventory");
      this.resetForm();
    },
    resetForm() {
      this.ProductName = this.computedInfo.initialProductName;
      this.Category = this.computedInfo.initialCategory;
      this.Sku = this.computedInfo.initialSku;
      this.Quantity = this.computedInfo.initialQuantity;
      this.Price = this.computedInfo.initialPrice;
      this.Commission = this.computedInfo.initialCommission;
      this.Description = this.computedInfo.initialDescription;
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
@media (max-width: 750px) {
  .input-field {
    width: 100%;
  }
}
</style>