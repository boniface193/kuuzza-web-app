<template>
  <div>
    <div>
      <!-- back to Inventory -->
      <router-link :to="{ name: 'inventoryPage' }" class="no-decoration">
        <h3 class="d-flex align-center return-btn my-3" color="#2B2B2B">
          <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Add New Product
        </h3>
      </router-link>
    </div>
    <progressBar :width="progress" class="mt-8 mb-6" />

    <div>
      <!-- form 1 -->
      <v-form class="d-flex justify-space-between flex-wrap">
        <!-- product name-->
        <div class="mb-3 input-field">
          <p class="mb-1">Product Name</p>
          <v-text-field
            class="input mt-0"
            v-model="productName"
            type="name"
            color="primary"
            placeholder="Infinix Hot 100"
            required
            outlined
          >
          </v-text-field>
        </div>

        <!-- select category -->
        <div class="mb-3 input-field">
          <p class="mb-1">Category</p>
          <v-select
            class="input mt-0"
            v-model="category"
            color="primary"
            placeholder="Phone and devices"
            required
            outlined
          >
          </v-select>
        </div>

        <!-- SKU number -->
        <div class="mb-3 input-field remove-appearance">
          <p class="mb-1">SKU Number</p>
          <v-text-field
            class="input mt-0"
            v-model="skuNumber"
            type="number"
            color="primary"
            placeholder="Enter SKU Number"
            required
            outlined
          >
          </v-text-field>
        </div>

        <!-- quantity -->
        <div class="mb-3 input-field">
          <p class="mb-1">Quantity</p>
          <div class="quantity-input">
            <input type="number" class="" placeholder="" />
          </div>
        </div>

        <!-- unit price -->
        <div class="mb-3 input-field">
          <p class="mb-1">Unit Price (N)</p>
          <v-text-field
            class="input mt-0"
            v-model="price"
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
            type="number"
            min="1"
            color="primary"
            placeholder="Enter Amount"
            required
            outlined
          >
          </v-text-field>
        </div>

        <div class="d-flex justify-end" style="width: 100%">
          <v-btn class="primary px-10 py-6 mb-5">Continue</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>
<script>
import progressBar from "@/components/dashboard/progressBar.vue";
export default {
  name: "addProduct",
  data: function () {
    return {
      progress: "30%",
      productName: "",
      category: "",
      skuNumber: "",
      quantity: "",
      price: "",
      commission: "",
    };
  },
  components: { progressBar },
};
</script>
<style lang="scss" scoped>
.return-btn {
  cursor: pointer;
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

.remove-appearance {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/*Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox  */
input[type="number"] {
  -moz-appearance: textfield;
}

.quantity-input {
  width: 105px;
  height: 50px;
  position: relative;
  text-align: center;
  &:before,
  &:after {
    position: absolute;
    right: 0px;
    width: 35px;
    height: 0.9em;
    font-size: 15px;
    pointer-events: none;
    background: #5064CC26;
    font-family: FontAwesome;
    pointer-events: none;
  }
  &:after {
    color: #5064cc;
    content: "\f106";
    border-top-right-radius: 8px;
    height: 25px;
    top: 0;
  }

  &:before {
    color: #5064cc;
    top: 25px;
    height: 25px;
     border-bottom-right-radius: 8px;
    content: "\f107";
    margin-bottom: 5px;
    bottom: -0.5em;
  }
  input {
    border: 1px solid rgba(0, 0, 0, 0.38);
    width: 105px;
    height: 50px;
    border-radius: 8px;
    padding: 0px 12px;
    outline: none;
    &:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }
    &:focus {
      border: 2px solid #5064cc;
    }
  }
}
</style>