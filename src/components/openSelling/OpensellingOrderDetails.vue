<template>
  <div>
    <v-row class="mb-5">
      <v-col class="">
        <div style="width: 300px">
          <!-- back to Inventory -->
          <router-link
            :to="{ name: 'OpensellingOrders' }"
            class="no-decoration"
          >
            <h3 class="d-flex align-center return-btn my-3">
              <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Open Selling
              Orders
            </h3>
          </router-link>
        </div>

        <!-- loader -->
        <div class="text-center pt-10 pb-5" v-if="loading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <!-- loader ends here -->

        <v-row v-else>
           <v-col cols="12" md="6" sm="6" class="d-none d-sm-block">
            <div class="white">
              <img :src="orderDetails.product_image_url" style="width: 100%" />
            </div>
          </v-col>
          <v-col cols="12" md="6" sm="6" style="padding-top: 0px !important">
            <div class="pl-2 pt-0">
              <h3 class="mt-8 mb-3">
                <span class="item-title">Product Details: </span>
              </h3>

              <!-- Order number -->
              <p class="mt-2 mb-3">
                <span class="item-title">Order ID: </span
                ><span class="primary--text">{{ orderDetails.id }}</span>
              </p>

              <!-- product name -->
              <p class="mt-2 mb-3">
                <span class="item-title">Product Name: </span
                ><span class="secondary--text">{{
                  orderDetails.product_name
                }}</span>
              </p>
              <p class="mt-2 mb-3">
                <span class="item-title">Product price: </span
                ><span class="secondary--text"
                  >&#8358;{{ orderDetails.product_price_label }}</span
                >
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

              <hr class="secondary--text" />
              <h3 class="mt-8 mb-3">
                <span class="item-title">Pickup Details: </span>
              </h3>
              <p class="mt-2 mb-3">
                <span class="item-title">Pickup Name: </span
                ><span class="secondary--text">
                  {{ orderDetails.pickup_name }}</span
                >
              </p>
              <p class="mt-2 mb-3">
                <span class="item-title">Pickup phone number: </span
                ><span class="secondary--text">
                  {{ orderDetails.pickup_phone }}</span
                >
              </p>
              <p class="mt-2 mb-3">
                <span class="item-title">Pickup address: </span
                ><span class="secondary--text">{{
                  orderDetails.pickup_location.address
                }}</span>
              </p>
              

              <hr class="secondary--text" />

              <!-- Customer Details -->
              <h3 class="mt-8 mb-3">
                <span class="item-title">Customer Details: </span>
              </h3>
              <p class="mt-2 mb-3">
                <span class="item-title">Name: </span
                ><span class="secondary--text"> {{ orderDetails.customer.name }}</span>
              </p>
              <p class="mt-2 mb-3">
                <span class="item-title">Email: </span
                ><span class="primary--text"> {{ orderDetails.customer.email }}</span>
              </p>
              <p class="mt-2 mb-3">
                <span class="item-title">Phone number: </span
                ><span class="secondary--text"> {{ orderDetails.customer.phone }}</span>
              </p>
              <p class="mt-2 mb-3">
                <span class="item-title">Total amount paid : </span
                ><span class="secondary--text"
                  >&#8358;{{ orderDetails.total_price_label }}</span
                >
              </p>
              <p class="mt-2 mb-5">
                <span class="item-title">Shipping fee: </span
                ><span class="secondary--text"
                  >&#8358;{{ orderDetails.delivery_fee_label }}</span
                >
              </p>

              <hr class="secondary--text" />

              <!-- Delivery address -->
              <h3 class="mt-8 mb-3">
                <span class="item-title">Delivery Details: </span>
              </h3>
              <p class="mt-2 mb-3">
                <span class="item-title">Delivery address: </span
                ><span class="secondary--text">{{
                  orderDetails.delivery_location.address
                }}</span>
              </p>
              <p class="mt-2 mb-3">
                <span class="item-title">Confirm Delivery: </span
                ><span class="secondary--text">{{
                  orderDetails.delivery_confirmed
                }}</span>
              </p>
              <p class="mt-2 mb-3">
                <span class="item-title">Delivery Fee: </span
                ><span class="secondary--text">{{
                  orderDetails.delivery_fee_label
                }}</span>
              </p>
              <p class="mt-2 mb-3">
                <span class="item-title">Delivery Method: </span
                ><span class="secondary--text">{{
                  orderDetails.delivery_method
                }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!--------------------------- Modal for dialog messages ------------------------------>
    <Modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
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
import Modal from "@/components/general/Modal.vue";
import failedImage from "@/assets/img/failed-img.svg";
// import successImage from "@/assets/img/success-img.svg";
export default {
  name: "orderDetails",
  components: { Modal },
  data() {
    return {
      retryLoader: false,
      orderDetails: {
        pickup_location: {},
        customer: {},
      },
      deliveryLocation: {},
      loading: true,
      dialogMessage: "",
      statusImage: null,
      dialog: false,
    };
  },
  created() {
    this.$store
      .dispatch("openOrders/getOrdersDetail", { id: this.$route.params.id })
      .then((response) => {
        this.loading = false;
        console.log(response.data.data)
        this.orderDetails = response.data.data;
        this.customer = response.data.data.customer;
        this.deliveryLocation = response.delivery_location;
      })
      .catch((error) => {
        this.loading = false;
        this.statusImage = failedImage;
        if (error.status == 422 || error.status == 400) {
          this.dialog = true;
          this.dialogMessage = error.data.message;
        }
      });
  },

  methods: {
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