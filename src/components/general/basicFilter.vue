<template>
  <div class="basic-filter">
    <!-- filter icon -->
    <div @click="filterActive = !filterActive">
      <filterIcon :toolTipText="toolTipText"/>
    </div>

    <div class="basic-filter-content" v-show="filterActive">
      <div class="header white--text px-4">
        <p class="pa-0 ma-0">
          <v-icon class="mr-3 white--text">mdi-sort</v-icon>{{ headerName }}
        </p>
        <v-icon class="white--text close-filter" @click="filterActive = false"
          >mdi-close</v-icon
        >
      </div>
      <div class="content">
        <!-- Price filter -->
        <div class="filter" ref="priceFilter" v-if="price === true">
          <div
            class="filter-item px-4 py-2 d-flex align-center justify-space-between"
            @click="toggleFilterItem('priceFilter')"
          >
            Price (&#8358;)
            <span><v-icon class="primary--text">mdi-chevron-right</v-icon></span>
          </div>
          <div class="py-2 px-4">
            <multipleRange
              :minNum="numberRange.minNum"
              :maxNum="numberRange.maxNum"
              @minMaxNumber="setPriceRange"
              ref="priceRange"
            />
          </div>
        </div>
        <!-- commission filter -->
        <div class="filter" ref="commissionFilter" v-if="commission === true">
          <div
            class="filter-item px-4 py-2 d-flex align-center justify-space-between"
            @click="toggleFilterItem('commissionFilter')"
          >
            Commission (&#8358;)
            <span><v-icon class="primary--text">mdi-chevron-right</v-icon></span>
          </div>
          <div class="py-2 px-4">
            <multipleRange
              :minNum="numberRange.minNum"
              :maxNum="numberRange.maxNum"
              @minMaxNumber="setCommissionRange"
              ref="commissionRange"
            />
          </div>
        </div>
        <!-- Quantity filter -->
        <div class="filter" ref="quantityFilter" v-if="quantity === true">
          <div
            class="filter-item px-4 py-2 d-flex align-center justify-space-between"
            @click="toggleFilterItem('quantityFilter')"
          >
            Quantity
            <span><v-icon class="primary--text">mdi-chevron-right</v-icon></span>
          </div>
          <div class="py-2 px-4">
            <multipleRange
              :minNum="numberRange.minNum"
              :maxNum="numberRange.maxNum"
              @minMaxNumber="setQuantityRange"
              ref="quantityRange"
            />
          </div>
        </div>
        <!-- category filter -->
        <div class="filter" ref="categoryFilter" v-if="category.length > 0">
          <div
            class="filter-item px-4 py-2 d-flex align-center justify-space-between"
            @click="toggleFilterItem('categoryFilter')"
          >
            Category
            <span><v-icon class="primary--text">mdi-chevron-right</v-icon></span>
          </div>
          <div class="py-2 px-4">
            <v-checkbox
              v-for="(item, index) in category"
              :key="index"
              v-model="categories"
              :value="item.name"
              :label="item.name"
              class="my-0 py-0"
            ></v-checkbox>
          </div>
        </div>
        <!-- stock filter -->
        <div class="filter" ref="stockFilter" v-if="stock === true">
          <div
            class="filter-item px-4 py-2 d-flex align-center justify-space-between"
            @click="toggleFilterItem('stockFilter')"
          >
            Stock
            <span><v-icon class="primary--text">mdi-chevron-right</v-icon></span>
          </div>
          <div class="py-2 px-4">
            <v-checkbox
              value="inStock"
              v-model="selected"
              label="Items in Stock"
              class="my-0 py-0"
            ></v-checkbox>
            <v-checkbox
              value="outOfStock"
              v-model="selected"
              label="Items out of stock"
              class="my-0 py-0"
            ></v-checkbox>
          </div>
        </div>
        <!-- payment filter -->
        <div class="filter" ref="paymentFilter" v-if="payment === true">
          <div
            class="filter-item px-4 py-2 d-flex align-center justify-space-between"
            @click="toggleFilterItem('paymentFilter')"
          >
            Payment
            <span><v-icon class="primary--text">mdi-chevron-right</v-icon></span>
          </div>
          <div class="py-2 px-4">
            <v-checkbox
              value="paid"
              v-model="selected"
              label="Paid"
              class="my-0 py-0"
            ></v-checkbox>
            <v-checkbox
              value="not paid"
              v-model="selected"
              label="Not Paid"
              class="my-0 py-0"
            ></v-checkbox>
          </div>
        </div>
        <!-- delivery filter -->
        <div class="filter" ref="deliveryFilter" v-if="delivery === true">
          <div
            class="filter-item px-4 py-2 d-flex align-center justify-space-between"
            @click="toggleFilterItem('deliveryFilter')"
          >
            Delivery
            <span><v-icon class="primary--text">mdi-chevron-right</v-icon></span>
          </div>
          <div class="py-2 px-4">
            <v-checkbox
              value="delivered"
              v-model="selected"
              label="Delivered"
              class="my-0 py-0"
            ></v-checkbox>
            <v-checkbox
              value="not delivered"
              v-model="selected"
              label="Not Delivered"
              class="my-0 py-0"
            ></v-checkbox>
          </div>
        </div>
        <div class="d-flex justify-end px-4 mb-2 mt-2">
          <!-- reset filter btn -->
          <v-btn
            class="px-4 py-2 mr-2 primary--text light-background"
            @click="resetFilter"
            depressed
            >Reset</v-btn
          >
          <!-- apply filter btn -->
          <v-btn class="primary px-4 py-2" @click="filterItems" depressed>Apply</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import multipleRange from "@/components/general/multipleRange";
import filterIcon from "@/components/icons/filterIcon.vue";
export default {
  name: "basicFilter",
  components: {
    multipleRange,
    filterIcon
  },
  props: [
    "headerName",
    "price",
    "commission",
    "quantity",
    "category",
    "stock",
    "payment",
    "delivery",
    "toolTipText"
  ],
  data: function () {
    return {
      selected: [],
      categories: [],
      filterActive: false,
      minPrice: 0,
      maxPrice: 0,
      minCommission: 0,
      maxCommission: 0,
      minQuantity: 0,
      maxQuantity: 0,
    };
  },
  computed: {
    numberRange() {
      return {
        maxNum: 1000000000,
        minNum: 0,
      };
    },
  },
  methods: {
    setPriceRange(params) {
      this.minPrice = params.minNum;
      this.maxPrice = params.maxNum;
    },
    setCommissionRange(params) {
      this.minCommission = params.minNum;
      this.maxCommission = params.maxNum;
    },
    setQuantityRange(params) {
      this.minQuantity = params.minNum;
      this.maxQuantity = params.maxNum;
    },
    toggleFilterItem(refName) {
      this.$refs[`${refName}`].classList.toggle("filter--active");
    },
    filterItems() {
      this.$emit("filterOption", {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        minCommission: this.minCommission,
        maxCommission: this.maxCommission,
        minQuantity: this.minQuantity,
        maxQuantity: this.maxQuantity,
        selectedOptions: this.selected,
        categories: this.categories
      });
      this.filterActive = false;
    },
    resetFilter() {
      this.$emit("resetFilter");
      this.filterActive = false;
      this.$refs.priceRange.resetRange();
      //this.$refs.commissionRange.resetRange();
      this.$refs.quantityRange.resetRange();
      this.selected = [];
      this.categories = [];
    },
  },
};
</script>
<style lang="scss" scoped>
.basic-filter {
  width: 30px;
  position: relative;
  .sort-btn {
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
  .sort-btn-active {
    background-color: rgb(239, 245, 255);
  }
  .basic-filter-content {
    width: 300px;
    border-radius: 8px;
    position: absolute;
    z-index: 5;
    box-shadow: 0px 10px 30px #6e6e6e29;
    right: 0px;
    margin-top: 10px;
    .header {
      height: 40px;
      background: var(--v-primary-base);
      width: 100%;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .close-filter {
        cursor: pointer;
      }
    }
    .content {
      background: #ffffff;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      max-height: 500px;
      overflow-y: auto;
      overflow-x: hidden;
      .filter {
        border-bottom: 1px solid #e2e2e2;
        position: relative;
        overflow-y: hidden;
        height: 40px;
        transition: 0.5s ease;
        &-item {
          cursor: pointer;
          &:hover {
            background: #f9f9f9;
          }
          &:last-child {
            border: none !important;
          }
          span {
            transition: 0.5s ease;
          }
        }
        &--active {
          height: auto;
          .filter-item {
            span {
              transform: rotate(90deg);
            }
          }
        }
      }
    }
  }
}
@media (max-width: 900px) {
  .basic-filter {
    .basic-filter-content {
      width: 300px;
      left: 0;
      right: 0;
      margin: 10px auto;
    }
  }
}
</style>