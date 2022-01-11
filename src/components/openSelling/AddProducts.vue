<template>
  <div class="open-selling-add-product">
    <div class="open-selling-add-product__content">
      <!-- description -->
      <p class="text-center secondary--text">
        Please provide the following product details
      </p>
      <div v-for="(item, index) in items" :key="index">
        <v-form :ref="`form${index}`">
          <!-- tab-section -->
          <div v-if="currentForm !== index" class="product-tab">
            <h4>
              {{
                item.product_name !== ""
                  ? item.product_name
                  : `Product ${index + 1}`
              }}
            </h4>
            <div class="d-flex">
              <a class="primary--text" @click="() => (currentForm = index)"
                >See details
                <v-icon class="primary--text" style="font-size: 22px"
                  >mdi-chevron-down</v-icon
                >
              </a>
              <!-- delete icon -->
              <img
                class="ml-2"
                @click="deleteForm(index)"
                style="cursor: pointer"
                src="@/assets/icons/trash.svg"
                alt="remove"
              />
            </div>
          </div>

          <div v-show="currentForm === index">
            <div class="d-flex justify-end" v-if="items.length > 1">
              <!-- delete icon -->
              <img
                class="ml-2"
                @click="deleteForm(index)"
                style="cursor: pointer"
                src="@/assets/icons/trash.svg"
                alt="remove"
              />
            </div>
            <!-- product name -->
            <div>
              <label class="mb-1 d-block">Enter product name</label>
              <v-text-field
                v-model="items[index].product_name"
                outlined
                dense
                placeholder="e.g. Segi Zobo"
                type="text"
                :rules="nameRules"
                required
              ></v-text-field>
            </div>
            <!-- product description -->
            <div>
              <label class="mb-1 d-block">Enter product description</label>
              <v-textarea
                v-model="items[index].product_description"
                height="140"
                outlined
                dense
                type="text"
                placeholder="Enter a brief description about your product"
                :rules="nameRules"
                required
              ></v-textarea>
            </div>
            <!-- product image -->
            <div class="mb-1">
              <label class="mb-1 d-block">Upload product image</label>
              <div
                class="d-flex"
                style="min-height: 70px; max-width: 100%; overflow: auto"
              >
                <ImageUploader
                  class="mr-2"
                  @images="setImageUrl($event, index)"
                  v-if="items[index].other_images.length < 5"
                />
                <div
                  style="position: relative"
                  v-for="(image, index2) in item.other_images"
                  :key="index2"
                >
                  <!-- uploaded image -->
                  <img
                    class="uploaded-image mr-2"
                    :src="`${items[index].other_images[index2]}`"
                    width="70"
                    height="60"
                    alt=""
                  />
                  <!-- remove image icon -->
                  <v-icon
                    color="error"
                    size="15"
                    class="remove-image-icon mt-2"
                    @click="removeImgFromUploadedImg(index, index2)"
                    >mdi-close-circle</v-icon
                  >
                </div>
              </div>
              <p
                class="error--text pl-3"
                style="font-size: 12px"
                v-show="items[index].imageError == true"
              >
                At least one image is required
              </p>
            </div>
            <!-- product price -->
            <div>
              <label class="mb-1 d-block"
                >How much are you selling this product?</label
              >
              <v-text-field
                outlined
                dense
                placeholder="e.g. 1000"
                type="number"
                min="0"
                v-model="items[index].product_price"
                :rules="nameRules"
                required
              ></v-text-field>
            </div>
            <!-- product quantity -->
            <div>
              <label for="" class="d-block mb-1">Quantity</label>
              <v-text-field
                outlined
                dense
                :rules="nameRules"
                placeholder="e.g. 10"
                type="number"
                min="1"
                v-model="items[index].total_items"
                required
              ></v-text-field>
            </div>
          </div>
        </v-form>
      </div>
      <!-- add product btn -->
      <a class="primary--text" @click="addNewProductForm()">Add product +</a>
      <!-- btn section -->
      <div class="d-flex justify-end mt-5">
        <!-- cancel btn -->
        <router-link to="/inventory" style="text-decoration: none">
          <v-btn color="primary" outlined>Cancel</v-btn>
        </router-link>
        <!-- continue to checkout btn -->
        <v-btn
          color="primary"
          width="150px"
          class="ml-3"
          @click="validateProducts()"
          >Continue</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import ImageUploader from "@/components/secondary/ImageUploader.vue";
export default {
  name: "AddProducts",
  components: { ImageUploader },
  data: function () {
    return {
      items: [
        {
          product_name: "",
          product_description: "",
          product_price: "",
          total_items: "",
          product_image_url: null,
          other_images: [],
          imageError: false,
        },
      ],
      currentForm: 0,
      nameRules: [
        (v) => !!v || "this field is required", // verifies name satisfies the requirement
      ],
    };
  },
  methods: {
    addNewProductForm() {
      this.items.push({
        product_name: "",
        product_description: "",
        product_price: "",
        total_items: "",
        product_image_url: null,
        other_images: [],
        imageError: false,
      });
      this.currentForm = this.items.length - 1;
    },
    validateProducts() {
      for (let index = 0; index < this.items.length; index++) {
        this.$refs[`form${index}`][0].validate();
        if (!this.$refs[`form${index}`][0].validate()) {
          this.currentForm = index;
          break;
        }
        if (this.items[index].other_images.length === 0) {
          this.items[index].imageError = true;
          this.currentForm = index;
          break;
        }
        if (index === this.items.length - 1) {
          this.emitProducts();
        }
      }
    },
    deleteForm(formIndex) {
      this.items.splice(formIndex, 1);
      this.currentForm -= 1;
    },
    setImageUrl(params, formIndex) {
      this.items[formIndex].other_images.push(params.imageUrl);
      this.items[formIndex].imageError = false;
    },
    removeImgFromUploadedImg(productIndex, imageIndex) {
      this.items[productIndex].other_images.splice(imageIndex, 1);
    },
    emitProducts() {
      const newItems = JSON.parse(JSON.stringify(this.items));
      newItems.forEach((item, index) => {
        newItems[index].product_image_url = item.other_images[0];
        newItems[index].other_images.shift();
        delete newItems[index].imageError;
      });
      this.$emit("productsDetails", newItems);
    },
  },
};
</script>
<style lang="scss" scoped>
.open-selling-add-product {
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .back-btn {
      position: absolute;
      left: 0px;
      top: 0;
      cursor: pointer;
      text-decoration: none;
    }
  }
  &__content {
    max-width: 500px;
    margin: auto;
    padding: 20px 0;
    label {
      font-size: 14px;
    }
    .product-tab {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
      border-radius: 3px;
      height: 50px;
      width: 100%;
      padding: 0px 30px;
      margin-bottom: 25px;
      a {
        cursor: pointer;
      }
    }
    .remove-image-icon {
      position: absolute;
      right: 10px;
      top: -5px;
    }
  }
}
</style>