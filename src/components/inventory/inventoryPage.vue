<template>
  <div class="pb-16">
    <div>
      <!-- page title -->
      <div class="d-flex justify-space-between align-center">
        <h1>Inventory</h1>
        <div class="d-flex align-center">
          <router-link :to="{ name: 'inventoryHistory' }" class="mr-4"
            >History</router-link
          >
          <!-- calendar -->
          <calendar @updateDate="setDate" />
        </div>
      </div>

      <!-- toolbars -->
      <div
        class="d-flex justify-space-between align-center mt-8 mb-1 flex-wrap"
      >
        <!-- action btn -->
        <div class="select-item mr-8 mb-2">
          <selectBtn
            bgColor="white"
            borderRadius="8px"
            borderColor="#e2e2e2"
            :items="[
              'Take product offline',
              'Take product online',
              'Delete product',
            ]"
            :item="'Actions'"
            :dropDownMenu="true"
            @selectedItem="setBulkAction"
          />
        </div>

        <div
          class="
            d-flex
            align-center
            flex-wrap
            tool-container
            justify-space-between
          "
        >
          <!-- search products-->
          <div class="search-container mr-md-2">
            <searchProducts />
          </div>

          <div
            class="
              secondary-display
              d-flex
              align-center
              flex-wrap
              justify-space-between
              mb-0 mb-sm-2
            "
          >
            <div class="d-flex align-center">
              <!-- filter products-->
              <filterProducts class="mr-2" />

              <!-- export products -->
              <exportProducts class="mr-2" />

              <!-- import products -->
              <router-link :to="{ name: 'ImportProduct' }">
                <importIcon class="mr-2" toolTipText="Import products" />
              </router-link>
            </div>

            <!-- add product btn secondary-->
            <router-link
              :to="{ name: 'addProduct' }"
              class="add-btn-secondary px-5"
              :disabled="!verifiedStore || !storeApprovalStatus"
              :event="verifiedStore && storeApprovalStatus ? 'click' : ''"
            >
              <span
                class="btn"
                :class="{ disabled: !verifiedStore || !storeApprovalStatus }"
                >Add New Product</span
              >
            </router-link>

            <!-- add product btn primary-->
            <router-link
              :to="{ name: 'addProduct' }"
              class="add-btn-primary"
              :disabled="!verifiedStore || !storeApprovalStatus"
              :event="verifiedStore && storeApprovalStatus ? 'click' : ''"
            >
              <v-btn
                class="primary px-4"
                :disabled="!verifiedStore || !storeApprovalStatus"
                depressed
              >
                Add New Product</v-btn
              >
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div>
      <!-- allow user to see table if verified -->
      <ProductsTable
        ref="productsTable"
        v-show="verifiedStore && storeApprovalStatus"
        class="pb-5"
      />

      <!-- show the user this form if the store is not verified yet -->
      <RequiredInformationPage
        v-show="verifiedStore === false || verifiedPhoneNumber === false"
      />

      <!-- show the user this page if the kyc has been don but not approved -->
      <RequiredInformationPageStatus
        v-show="verifiedStore && verifiedPhoneNumber && !storeApprovalStatus"
      />
    </div>

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
import ProductsTable from "@/components/inventory/ProductsTable.vue";
import searchProducts from "@/components/inventory/searchProducts.vue";
import filterProducts from "@/components/inventory/filterProducts.vue";
import exportProducts from "@/components/inventory/exportProducts.vue";
import selectBtn from "@/components/general/SelectBtn.vue";
import calendar from "@/components/dashboard/calender.vue";
import RequiredInformationPage from "@/components/inventory/RequiredInformationPage.vue";
import failedImage from "@/assets/img/failed-img.svg";
import importIcon from "@/components/icons/importIcon.vue";
import RequiredInformationPageStatus from "@/components/inventory/RequiredInformationPageStatus.vue";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "inventoryPage",
  components: {
    Modal,
    searchProducts,
    filterProducts,
    exportProducts,
    importIcon,
    selectBtn,
    calendar,
    ProductsTable,
    RequiredInformationPage,
    RequiredInformationPageStatus,
  },
  data: function () {
    return {
      items: ["Items in stock", "Items out of stock"],
      item: "Items in stock",
      dialog: false,
      dialogMessage: "",
      statusImage: null,
    };
  },
  created() {
    if (this.$store.getters["inventory/products"].length == 0) {
      this.getProducts();
    }
  },
  computed: {
    ...mapGetters({
      searchProduct: "inventory/searchProduct",
      verifiedStore: "settings/verifiedStore",
      verifiedPhoneNumber: "settings/verifiedPhoneNumber",
      storeApprovalStatus: "settings/storeApprovalStatus",
    }),
  },
  methods: {
    // take bulk action
    setBulkAction(params) {
      this.$refs.productsTable.setBulkAction(params);
    },
    // filter base on date
    setDate(params) {
      this.$store.commit("inventory/setDateRange", {
        startDate: moment(params.startDate).format("L"),
        endDate: moment(params.endDate).format("L"),
      });
      this.$store.commit("inventory/setTableLoader", true);
      this.$store.commit("inventory/setAllowDateFilter", true);
      // set page back to page 1
      this.$store.commit("inventory/setPage", 1);
      this.getfilteredProducts();
    },
    // request for page with the request informations
    getfilteredProducts() {
      this.$store
        .dispatch("inventory/getfilteredProducts")
        .then(() => this.$store.commit("inventory/setTableLoader", false))
        .catch((error) => {
          this.$store.commit("inventory/setTableLoader", false);
          this.statusImage = failedImage;
          if (error.status == 422 || error.status == 400) {
            this.dialog = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
    // get products from inventory
    getProducts() {
      this.$store.commit("inventory/setTableLoader", true);
      this.$store
        .dispatch("inventory/getProducts")
        .then(() => this.$store.commit("inventory/setTableLoader", false))
        .catch((error) => {
          this.statusImage = failedImage;
          this.$store.commit("inventory/setTableLoader", false);
          if (error.status == 422 || error.status == 400) {
            this.dialog = true;
            this.dialogMessage = error.data.message;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.select-item {
  width: 200px;
  height: 42px;
  position: relative;
}
.search-container {
  width: 350px;
}
.v-btn {
  span {
    font-size: 25px;
    margin-right: 7px;
  }
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
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
.add-btn-primary {
  text-decoration: none;
  .v-btn:not(.v-btn--round).v-size--default {
    height: 48px !important;
  }
}
.add-btn-secondary {
  display: none;
  text-decoration: none;
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
    font-size: 16px !important;
    height: 40px;
    background: var(--v-primary-base);
    border-radius: 5px;
    color: white;
    font-size: 35px;
  }
  .disabled {
    background-color: rgba(0, 0, 0, 0.12) !important;
    color: rgba(0, 0, 0, 0.26) !important;
  }
}
@media (max-width: 953px) {
  .tool-container {
    width: 100%;
    justify-content: space-between;
  }
}
@media (max-width: 550px) {
  .search-container {
    width: 100%;
  }
  .secondary-display {
    width: 100%;
  }
  .add-btn-primary {
    display: none;
  }
  .add-btn-secondary {
    display: block;
  }
}
</style>