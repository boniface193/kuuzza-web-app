<template>
  <div>
    <v-row class="mb-5">
      <v-col class="col-12 col-md-6 pr-5">
        <div class="d-flex align-center justify-space-between">
          <!-- back to Inventory -->
          <router-link :to="{ name: 'inventoryPage' }" class="no-decoration">
            <h3 class="d-flex align-center return-btn my-3">
              <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Inventory
            </h3>
          </router-link>

          <span class="small-btn" @click="editInventory = true">
            <v-icon class="primary--text">mdi-pencil</v-icon>
          </span>
        </div>

        <div class="pl-2 mt-8">
          <!-- product name -->
          <h2>{{ productDetails.productName }}</h2>

          <!-- product category -->
          <p class="mt-2 mb-7 secondary--text">{{ productDetails.category }}</p>
          <!-- product SKU -->
          <p class="mt-2 mb-3">
            <span class="item-title">SKU: </span
            ><span class="secondary--text">{{ productDetails.sku }}</span>
          </p>
          <!-- product unit price -->
          <p class="mt-2 mb-3">
            <span class="item-title">Unit Price: </span
            ><span class="secondary--text">N{{ productDetails.price }}</span>
          </p>
          <!-- product quantity -->
          <p class="mt-2 mb-3">
            <span class="item-title">Quantity: </span
            ><span class="secondary--text">{{ productDetails.quantity }}</span>
          </p>
          <!-- product commission -->
          <p class="mt-2 mb-3">
            <span class="item-title">Commission per item: </span
            ><span class="secondary--text">{{
              productDetails.commission
            }}</span>
          </p>
          <!-- product description -->
          <p class="mt-8 mb-3">
            <span class="item-title">Product Descriptiom: </span>
          </p>
          <p class="secondary--text">
            {{ productDetails.description }}
          </p>
        </div>
      </v-col>
      <v-col class="col-12 col-md-6 white d-flex align-center text-center">
        <img src="@/assets/img/infinix.png" style="width: 80%; margin: auto" />
      </v-col>
    </v-row>
    <!-- edit inventory modal -->
    <editInventory
      :dialog="editInventory"
      @closeEditInventory="closeEditInventory"
      :productId="$route.params.id"
    />
  </div>
</template>
<script>
import editInventory from "@/components/dashboard/editInventory.vue";
export default {
  name: "productDetails",
  components: { editInventory },
  data: function () {
    return {
      editInventory: false,
    };
  },
  computed: {
    productDetails() {
      return this.$store.getters["inventory/getProductDetails"](
        this.$route.params.id
      );
    },
  },
  methods: {
    closeEditInventory() {
      this.editInventory = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.no-decoration {
  text-decoration: none;
}
.return-btn {
  cursor: pointer;
  color: #2b2b2b;
  .v-icon {
    margin-right: 15px;
  }
}
.item-title {
  font-weight: bold;
}
.small-btn {
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-align: center;
  &:hover {
    background-color: rgb(239, 245, 255);
  }
}
</style>