<template>
  <div>
    <!-- modal -->
    <modal :dialog="dialog" width="800">
      <div class="white pa-3 pb-10 dialog">
        <div class="d-flex justify-space-between align-center pl-3 mb-4">
          <h2 class="primary--text">Edit Inventory</h2>
          <v-icon class="error--text close-btn" @click="closeModal"
            >mdi-close</v-icon
          >
        </div>

        <div>
          <v-form class="d-flex justify-space-between flex-wrap py-2 px-3">
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
                type="number"
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

            <!-- commission -->
            <div class="mb-3 input-field">
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
            </div>

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
            <div class="d-flex justify-end" style="width: 100%">
              <!-- continue button -->
              <v-btn class="primary px-10 py-6 mb-5" disabled>Update</v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
import customSelect from "@/components/dashboard/customSelect.vue";
import customNumberInput from "@/components/dashboard/customNumberInput.vue";
import imageUploader from "@/components/dashboard/imageUploader.vue";
export default {
  name: "editInventory",
  props: ["dialog", "productId"],
  components: { modal, customSelect, customNumberInput, imageUploader },
  data: function() {
    return {
      productName: "hjbjhb",
      category: this.computedInfo.category,
      sku: this.computedInfo.sku,
      quantity: this.computedInfo.quantity,
      price: this.computedInfo.price,
      commission: this.computedInfo.commission,
      description: this.computedInfo.description,
      categories: [],
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
  computed: {
    computedInfo() {
      // gets the values of user information
      let productDetails = this.$store.getters["inventory/getProductDetails"](
        this.productId
      );
      let productName = productDetails.productName;
      let category = productDetails.category;
      let sku = productDetails.sku;
      let quantity = productDetails.quantity;
      let price = productDetails.price;
      let commission = productDetails.commission;
      let description = productDetails.description;

      let initialProductName = productDetails.productName;
      let initialCategory = productDetails.category;
      let initialSku = productDetails.sku;
      let initialQuantity = productDetails.quantity;
      let initialPrice = productDetails.price;
      let initialCommission = productDetails.commission;
      let initialDescription = productDetails.description;

      return {
        productName: productName,
        category: category,
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
    }
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
       this.ProductName = this.computedInfo.initialProductName 
       this.Category = this.computedInfo.initialCategory 
       this.Sku = this.computedInfo.initialSku 
       this.Quantity = this.computedInfo.initialQuantity 
       this.Price = this.computedInfo.initialPrice 
       this.Commission = this.computedInfo.initialCommission 
       this.Description = this.computedInfo.initialDescription 
    }
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
</style>