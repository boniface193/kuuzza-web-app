<template>
  <v-row class="mb-5">
    <v-col class="col-12 col-md-6 pr-3">
      <div style="width: 170px">
        <!-- back to Inventory -->
        <router-link :to="{ name: 'inventoryPage' }" class="no-decoration">
          <h3 class="d-flex align-center return-btn my-3">
            <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Inventory
          </h3>
        </router-link>
      </div>

      <div class="pl-2 mt-8">
        <!-- product name -->
        <h2>{{productDetails.productName}}</h2>

        <!-- product category -->
        <p class="mt-2 mb-7 secondary--text">{{productDetails.category}}</p>
        <!-- product SKU -->
        <p class="mt-2 mb-3">
          <span class="item-title">SKU: </span
          ><span class="secondary--text">{{productDetails.sku}}</span>
        </p>
        <!-- product unit price -->
        <p class="mt-2 mb-3">
          <span class="item-title">Unit Price: </span
          ><span class="secondary--text">N{{productDetails.price}}</span>
        </p>
        <!-- product quantity -->
        <p class="mt-2 mb-3">
          <span class="item-title">Quantity: </span
          ><span class="secondary--text">{{productDetails.quantity}}</span>
        </p>
        <!-- product commission -->
        <p class="mt-2 mb-3">
          <span class="item-title">Commission per item: </span
          ><span class="secondary--text">{{productDetails.commission}}</span>
        </p>
        <!-- product description -->
        <p class="mt-8 mb-3">
          <span class="item-title">Product Descriptiom: </span>
        </p>
        <p class="secondary--text">
          Infinix Hot 10, core i5, 128 GB SSD, 8GB, 13", 12 hours battery,
          backlit keyboard, Multi-Touch 1.8GHz dual-core intelcore i5 processor
          with 3MB shared L3 cache (Turbo boost up to 2.9GHz) 8GB of 1,600MHz
          LPDDR3 RAM 128GB PCle-based flash storage 13 inch, 1440 x 900 pixel
          display. Intel HD Graphics 600011ac Wi-Fi (IEEE 802.11a/b/g/n
          compatible); Bluetooth 4.0 Ports: 2 x USB 3; 1 x Thunderbolt 2; 1 x
          SDXC card slot; 1 x 3.5mm headphone jackdual microphones 720p Facetime
          HD camera, full-size backlit keyboard with ambient light sensor, and
          Multi-touch trackpad. 54-watt hour battery Height: 0.3 - 1.7cm (0.11 -
          0.68in) Width: 32.5cm (12.8in) Width: 32.5cm (12.8in) Width: 32.5cm
          (12.8in) Depth: 22.7cm (8.94in)
        </p>
      </div>
    </v-col>
    <v-col class="col-12 col-md-6 white d-flex align-center text-center">
      <img src="@/assets/img/infinix.png" style="width: 80%; margin: auto" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "productDetails",
  computed: {
    productDetails() {
      return this.$store.getters["inventory/getProductDetails"](this.$route.params.id);
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
</style>