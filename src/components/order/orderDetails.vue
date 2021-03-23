<template>
  <v-row class="mb-5">
    <v-col class="">
      <div style="width: 170px">
        <!-- back to Inventory -->
        <router-link :to="{ name: 'Orders' }" class="no-decoration">
          <h3 class="d-flex align-center return-btn my-3">
            <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Orders
          </h3>
        </router-link>
      </div>

      <div
        v-show="orderDetailsDelay"
        style="position: absolute; margin: 15% 50%; text-align: center"
      >
        <!-- this image time loader is calculated by the loader to triger the load time -->
        <v-progress-circular
          color="primary"
          class=""
          indeterminate
        ></v-progress-circular>
      </div>
      <!-- loader ends here -->
      <v-row>
        <v-col cols="12" md="6" sm="6" style="padding-top:0px !important">
          <div class="pl-2 pt-0" v-show="!orderDetailsDelay">
            <!-- Order number -->
            <h2>
              Order: <span class="primary--text">{{ orderDetails.id }}</span>
            </h2>

            <!-- product name -->
            <p class="mt-2 mb-3">
              <span class="item-title">Product Name: </span
              ><span class="secondary--text">{{
                orderDetails.product_name
              }}</span>
            </p>
            <!-- product SKU -->
            <p class="mt-2 mb-3">
              <span class="item-title">SKU: </span
              ><span class="secondary--text">{{
                orderDetails.product_sku
              }}</span>
            </p>
            <!-- payment status -->
            <p class="mt-2 mb-3">
              <span class="item-title">Payment Status: </span
              ><span class="secondary--text">{{
                orderDetails.payment_status_label
              }}</span>
            </p>
            <!-- Delivery status -->
            <p class="mt-2 mb-3">
              <span class="item-title">Delivery Status: </span
              ><span class="secondary--text">{{
                orderDetails.delivery_status_label
              }}</span>
            </p>

            <!-- Seller Details -->
            <!-- <p class="mt-8 mb-3">
              <span class="item-title">Seller Name: </span>
            </p>
            <p class="secondary--text">
              {{ orderDetails.seller_name }}
            </p> -->

            <!-- Customer Details -->
            <!-- <p class="mt-8 mb-3">
              <span class="item-title">Customer Details: </span>
            </p>
            <p class="secondary--text">
              {{ customer.name }}<br />{{ customer.email }}<br />{{
                customer.phone
              }}<br />
            </p> -->

            <!-- Product Variant -->
            <p class="mt-8 mb-3">
              <span class="item-title">Variant: </span>
            </p>
            <p class="secondary--text">variant goes here</p>

            <hr class="secondary--text" style="width: 300px" />

            <!-- Delivery address -->
            <p class="mt-8 mb-3">
              <span class="item-title">Delivery Address: </span>
            </p>
            <p class="secondary--text">
              {{ deliveryLocation.address }}
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="6" sm="6" class="d-none d-sm-block">
          <div v-show="!orderDetailsDelay" class="white">
            <img :src="orderDetails.product_image_url" style="width: 100%" />
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "orderDetails",
  data() {
    return {
      orderDetails: {},
      customer: {},
      deliveryLocation: {},
      orderDetailsDelay: true,
    };
  },
  async created() {
    await this.$store
      .dispatch("orders/getOrdersDetail", { id: this.$route.params.id })
      .then((e) => {
        this.orderDetailsDelay = false;
        this.orderDetails = e;
        this.customer = e.customer;
        this.deliveryLocation = e.delivery_location;
      });
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