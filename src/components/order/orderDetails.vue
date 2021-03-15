<template>
  <v-row class="mb-5">
    <v-col class="col-12 col-md-6 pr-3">
      <div style="width: 170px">
        <!-- back to Inventory -->
        <router-link :to="{ name: 'Orders' }" class="no-decoration">
          <h3 class="d-flex align-center return-btn my-3">
            <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Orders
          </h3>
        </router-link>
      </div>

      <div class="pl-2 mt-8">
        <!-- Order number -->
        <h2>Order: <span class="primary--text">{{ orderDetails.id }}</span></h2>

        <!-- product name -->
        <p class="mt-2 mb-3">
          <span class="item-title">Product Name: </span
          ><span class="secondary--text">{{ orderDetails.product_name }}</span>
        </p>
        <!-- product SKU -->
        <p class="mt-2 mb-3">
          <span class="item-title">SKU: </span
          ><span class="secondary--text">{{ orderDetails.product_sku }}</span>
        </p>
        <!-- payment status -->
        <p class="mt-2 mb-3">
          <span class="item-title">Payment Status: </span
          ><span class="secondary--text">{{ orderDetails.payment_status_label }}</span>
        </p>
        <!-- Delivery status -->
        <p class="mt-2 mb-3">
          <span class="item-title">Delivery Status: </span
          ><span class="secondary--text">{{ orderDetails.delivery_status_label }}</span>
        </p>

        <!-- Seller Details -->
        <p class="mt-8 mb-3">
          <span class="item-title">Seller Name: </span>
        </p>
        <p class="secondary--text">
          {{orderDetails.seller_name}}
        </p>

        <!-- Customer Details -->
        <p class="mt-8 mb-3">
          <span class="item-title">Customer Details: </span>
        </p>
        <p class="secondary--text">
          {{orderDetails.customer.name}}<br />{{orderDetails.customer.email}}<br />{{orderDetails.customer.phone}}<br />
        </p>
        <hr class="secondary--text" style="width: 300px" />

        <!-- Delivery address -->
        <p class="mt-8 mb-3">
          <span class="item-title">Delivery Address: </span>
        </p>
        <p class="secondary--text">
            {{orderDetails.delivery_location.address}}
        </p>
      </div>
    </v-col>
    <v-col class="col-12 col-md-6 white d-flex align-center text-center">
      <img src="https://nova-static-assets.s3.eu-west-1.amazonaws.com/images/6048d8df478d7.jpg" style="width: 100%; margin: auto" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "orderDetails",
  data(){
    return {
      orderDetails: {}
    }
  },
  created(){
    this.$store.dispatch("orders/getOrdersDetail", {id: this.$route.params.id}).then(response => {
      this.orderDetails = response
    }).catch((e) => {
      console.log(e)
    })
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