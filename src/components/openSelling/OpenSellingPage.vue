<template>
  <div class="open-selling-page px-3 px-sm-12 pt-13 pb-16">
    <div class="open-selling-page__header">
      <!-- go to previous page -->
      <router-link to="/inventory" class="back-btn" v-if="!showCustomerForm">
        <v-icon style="font-size: 25px">mdi-chevron-left</v-icon>
      </router-link>
      <!-- goto add products -->
      <span
        class="back-btn"
        v-if="showCustomerForm"
        @click="() => (showCustomerForm = false)"
      >
        <v-icon style="font-size: 25px">mdi-chevron-left</v-icon>
      </span>
      <!-- title -->
      <h3 v-if="!showCustomerForm">Product Details</h3>
    </div>
    <!-- add product form -->
    <AddProducts
      v-show="!showCustomerForm"
      @productsDetails="setProductDetails"
    />
    <!-- customer form -->
    <CustomerDetailsForm
      v-show="showCustomerForm"
      :loading="loading"
      @customerDetails="submitOpensellingDetails"
    />

    <!-- Response Modal -->
    <ResponseModal
      :dialog="responseDialog"
      :status="statusImage"
      :dialogMessage="dialogMessage"
      @closeDialog="closeResponseModal"
    />
    <!-- link modal -->
    <CustomerLinkModal :url="url" :showUrlModal="showUrlModal"/>
  </div>
</template>
<script>
import CustomerDetailsForm from "./CustomerDetailsForm.vue";
import AddProducts from "./AddProducts.vue";
import ResponseModal from "@/components/secondary/ResponseModal.vue";
import CustomerLinkModal from "@/components/secondary/CustomerLinkModal.vue";
export default {
  name: "OpenSellingPage",
  components: { CustomerDetailsForm, AddProducts, ResponseModal, CustomerLinkModal },
  data: function () {
    return {
      showCustomerForm: false,
      loading: false,
      productDetails: [],
      url: "",
      responseDialog: false,
      statusImage: false,
      dialogMessage: "",
      showUrlModal: false
    };
  },
  methods: {
    setProductDetails(params) {
      this.productDetails = params;
      this.showCustomerForm = true;
    },
    submitOpensellingDetails(params) {
      this.loading = true;
      let data = params;
      data.items = this.productDetails;
      this.$store
        .dispatch("orders/createOpenSelling", data)
        .then((response) => {
          this.loading = false;
          this.url = response.data.data.payment_link;
          this.showUrlModal = true
        })
        .catch((error) => {
          this.loading = false;
          if (error.status === 422 || error.status === 400) {
            this.statusImage = false;
            this.responseDialog = true;
            this.dialogMessage = error.data.mesesage;
          }
        });
    },
    closeResponseModal(){
      this.responseDialog = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.open-selling-page {
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
}
</style>