<template>
  <div class="order-details" id="order-details">
    <div style="width: 170px" class="mb-3">
      <!-- back to orders -->
      <router-link :to="{ name: 'Orders' }" style="text-decoration: none">
        <h3 class="d-flex align-center secondary--text my-3">
          <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Orders
        </h3>
      </router-link>
    </div>

    <div v-show="!pageLoader">
      <div class="d-flex mb-3">
        <p class="mb-0">
          Order ID: <span class="primary--text">{{ orderDetails.id }}</span>
        </p>
        <p class="ml-2 secondary--text mb-0">
          {{ orderDetails.items.length }}
          {{ orderDetails.items.length > 1 ? "items" : "item" }}
        </p>
      </div>
      <div class="order-details__content">
        <div class="order-details__content__image-view">
          <div class="order-details__content__image-view__multiple">
            <div class="items-container" ref="items_container">
              <div
                class="order-details__content__image-view__multiple__item"
                v-for="(item, index) in orderDetails.items"
                :class="{ active: activeImageIndex == index }"
                :key="index"
                @click="setinViewProduct(index)"
              >
                <img :src="item.product_image_url" alt="" />
              </div>
            </div>
            <div
              class="
                order-details__content__image-view__multiple__up-btn
                scroll-btn
              "
              @click="scrollUp()"
            >
              <v-icon class="primary--text" style="font-size: 20px"
                >mdi-arrow-up</v-icon
              >
            </div>
            <div
              class="
                order-details__content__image-view__multiple__down-btn
                scroll-btn
              "
              @click="scrollDown()"
            >
              <v-icon class="primary--text" style="font-size: 20px"
                >mdi-arrow-down</v-icon
              >
            </div>
          </div>
          <!-- this view shows only on mobile -->
          <div class="order-details__content__image-view__multiple--mobile">
            <div class="items-container" ref="items_container__mobile">
              <div
                class="
                  order-details__content__image-view__multiple--mobile__item
                "
                :class="{ active: activeImageIndex == index }"
                v-for="(item, index) in orderDetails.items"
                @click="setinViewProduct(index)"
                :key="index"
              >
                <img :src="item.product_image_url" alt="" />
              </div>
            </div>
            <div
              class="
                order-details__content__image-view__multiple--mobile__left-btn
                scroll-btn
              "
              @click="scrollLeft()"
            >
              <v-icon class="primary--text" style="font-size: 20px"
                >mdi-arrow-left</v-icon
              >
            </div>
            <div
              class="
                order-details__content__image-view__multiple--mobile__right-btn
                scroll-btn
              "
              @click="scrollRight()"
            >
              <v-icon class="primary--text" style="font-size: 20px"
                >mdi-arrow-right</v-icon
              >
            </div>
          </div>

          <div class="order-details__content__image-view__single">
            <img :src="inViewProduct.product_image_url" alt="" />
          </div>
        </div>
        <!-- product details section -->
        <div class="order-details__content__text-view">
          <!-- product name -->
          <h2 class="mb-3">
            {{ inViewProduct.product_name }}
            <router-link
              :to="{
                name: 'productDetails',
                params: { id: `${inViewProduct.product_id}` },
              }"
              style="text-decoration: none"
              class="primary--text"
              >({{ inViewProduct.product_id }} )</router-link
            >
          </h2>
          <!-- product sku -->          
          <h3 class="mb-2">SKU: {{ inViewProduct.product_sku }}</h3>
          <!-- store price -->
          <h3 class="mb-2">
            Store price:
            <span class="primary--text"
              >&#8358;{{ inViewProduct.product_store_price }}</span
            >
          </h3>
          <!-- order quantity -->
          <h3 class="mb-2">Order quantity: {{ inViewProduct.quantity }}</h3>

          <!-- <h3>Description</h3>
          <p class="secondary--text small-font-size">
            {{ inViewProduct.product.description }}
          </p> -->

          <div
            v-if="
              inViewProduct.variants.length > 0 &&
              inViewProduct.variants.length != null
            "
          >
            <h3>Variants</h3>
            <p
              class="secondary--text small-font-size mb-1"
              v-for="(variant, index) in inViewProduct.variants"
              :key="index"
            >
              {{ variant.name }}: {{ variant.value }}
            </p>
          </div>

          <hr class="secondary--text my-3" />

          <!-- payment status -->
          <h3 class="mb-3">
            Payment Status:
            <span class="secondary--text">{{
              orderDetails.payment_status_label
            }}</span>
          </h3>

          <!-- Delivery status -->
          <h3 class="mb-3">
            Delivery Status:
            <span class="secondary--text">{{
              inViewProduct.delivery_status
            }}</span>
          </h3>

          <!-- Delivery address -->
          <h3>Delivery Address</h3>
          <p class="secondary--text">
            {{ orderDetails.delivery_location.address }}
          </p>

          <h3>Shipping and returns</h3>
          <p v-if="inViewProduct.return_window > 0" class="secondary--text">
            Returns are allowed within {{ inViewProduct.return_window }}
            {{ inViewProduct.return_window > 1 ? "days" : "day" }}
          </p>
          <p v-else class="secondary--text">
            Returns are not allowed for this product
          </p>
        </div>
      </div>
    </div>

    <!-- loader -->
    <div class="text-center pt-10 pb-5" v-show="pageLoader == true">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>
<script>
export default {
  name: "CheckoutDetails",
  data: function () {
    return {
      pageLoader: false,
      initialScrollViewDown: 0,
      initialScrollViewUp: 0,
      inViewProduct: { variants: [] },
      activeImageIndex: 0,
      orderDetails: {
        items: [{ variants: [] }],
        delivery_location: {},
      },
    };
  },
  created() {
    this.pageLoader = true;
    this.$store
      .dispatch("orders/getOrdersDetail", { id: this.$route.params.id })
      .then((response) => {
        this.orderDetails = response.data.data;
        this.setinViewProduct(0);
        this.pageLoader = false;
      })
      .catch(() => (this.pageLoader = false));
  },
  methods: {
    setinViewProduct(index) {
      this.inViewProduct = this.orderDetails.items[index];
      this.activeImageIndex = index;
    },
    scrollDown() {
      this.$refs.items_container.scrollBy(0, 150);
    },
    scrollUp() {
      this.$refs.items_container.scrollBy(0, -150);
    },
    scrollRight() {
      this.$refs.items_container__mobile.scrollBy(150, 0);
    },
    scrollLeft() {
      this.$refs.items_container__mobile.scrollBy(-150, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.order-details {
  &__content {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 150px;
    &__image-view {
      width: 50%;
      padding-right: 25px;
      position: sticky;
      top: 110px;
      height: 350px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      &__multiple {
        &--mobile {
          display: none;
        }
        width: 23%;
        overflow: auto;
        position: relative;
        overflow: initial;
        height: 100%;
        .items-container {
          overflow: auto;
          max-height: 100%;
          scroll-behavior: smooth;
          background: white;
          &::-webkit-scrollbar {
            display: none;
          }
        }
        &__item {
          height: 100px;
          width: 100%;
          margin-bottom: 10px;
          border: 1px solid rgba(43, 43, 43, 0.1);
          cursor: pointer;
          &.active {
            border: 2px solid var(--v-primary-base);
          }
          img {
            height: 100%;
            width: 100%;
          }
        }
        .scroll-btn {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--v-primary-base);
          background: white;
          box-shadow: 0px 0.632653px 2.53061px rgba(0, 0, 0, 0.25);
          border-radius: 50%;
          z-index: 2;
          position: absolute;
          cursor: pointer;
          left: 0;
          right: 0;
          margin: auto;
        }
        &__up-btn {
          top: -15px;
        }
        &__down-btn {
          bottom: -15px;
        }
      }
      &__single {
        width: 73%;
        height: 100%;
        background: white;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    &__text-view {
      width: 50%;
      padding-left: 25px;
    }
  }
}
.small-font-size {
  font-size: 14px;
}
@media (max-width: 959px) {
  .order-details {
    &__content {
      &__image-view {
        width: 100%;
        position: relative;
        height: auto;
        top: auto;
        padding-right: 0px;
      }
      &__text-view {
        width: 100%;
        margin-top: 30px;
        padding-left: 0px;
      }
    }
  }
}
@media (max-width: 550px) {
  .order-details {
    &__content {
      &__image-view {
        &__multiple {
          display: none;
          &--mobile {
            display: flex;
            width: 100%;
            height: 100px;
            overflow: auto;
            position: relative;
            overflow: initial;
            .items-container {
              overflow: auto;
              max-width: 100%;
              scroll-behavior: smooth;
              display: flex;
              background: white;
              &::-webkit-scrollbar {
                display: none;
              }
            }
            &__item {
              height: 100px;
              min-width: 100px;
              margin-right: 10px;
              border: 1px solid rgba(43, 43, 43, 0.1);
              cursor: pointer;
              .active {
                border: 2px solid var(--v-primary-base);
              }
              img {
                height: 100%;
                width: 100%;
              }
            }
            .scroll-btn {
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--v-primary-base);
              background: white;
              box-shadow: 0px 0.632653px 2.53061px rgba(0, 0, 0, 0.25);
              border-radius: 50%;
              z-index: 2;
              position: absolute;
              cursor: pointer;
              top: 0;
              bottom: 0;
              margin: auto;
            }
            &__left-btn {
              left: -15px;
            }
            &__right-btn {
              right: -15px;
            }
          }
        }
        &__single {
          width: 100%;
          height: 350px;
        }
      }
    }
  }
}
</style>