<template>
  <div class="px-4 pt-7 my-2 pb-16 store-width">
    <!-- store name field -->
    <div class="mb-5 settings-input">
      <p class="mb-1 secondary--text">Store Name</p>
      <v-text-field
        class="input mt-0"
        :rules="inputRules"
        type="name"
        color="primary"
        v-model="computedInfo.currentStoreName"
        :disabled="editStoreName == false"
        required
      >
      </v-text-field>

      <!-- edit btn -->
      <span
        class="edit-btn"
        v-show="editStoreName == false"
        @click="editStoreName = true"
        >Edit</span
      >
      <!-- done btn -->
      <span
        class="edit-btn"
        v-show="editStoreName == true"
        @click="submitEditInfo('storeName')"
        >Done</span
      >
    </div>
    <!-- store location field -->
    <div class="mb-5 settings-input">
      <p class="mb-1 secondary--text">Store Location</p>
      <v-text-field
        class="input mt-0"
        :rules="inputRules"
        type="text"
        color="primary"
        v-model="computedInfo.currentStoreLocation"
        :disabled="editStoreLocation == false"
        required
      >
      </v-text-field>

      <!-- edit btn -->
      <span
        class="edit-btn"
        v-show="editStoreLocation == false"
        @click="editStoreLocation = true"
        >Edit</span
      >
      <!-- done btn -->
      <span
        class="edit-btn"
        v-show="editStoreLocation == true"
        @click="submitEditInfo('storeLocation')"
        >Done</span
      >
    </div>
    <!-- phone number field -->
    <div class="mb-5 settings-input">
      <p class="mb-1 secondary--text">Phone Number</p>
      <v-text-field
        class="input mt-0"
        :rules="inputRules"
        type="tel"
        color="primary"
        v-model="computedInfo.currentStoreNum"
        :disabled="editStoreNum == false"
        required
      >
      </v-text-field>

      <!-- edit btn -->
      <span
        class="edit-btn"
        v-show="editStoreNum == false"
        @click="editStoreNum = true"
        >Edit</span
      >
      <!-- done btn -->
      <span
        class="edit-btn"
        v-show="editStoreNum == true"
        @click="submitEditInfo('storeNum')"
        >Done</span
      >
    </div>

    <!-- modal for dialog messages -->
    <modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img src="@/assets/img/success-img.svg"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>
  </div>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
export default {
  name: "storeDetails",
  components: { modal },
  data: function () {
    return {
      dialog: false,
      dialogMessage: "",
      editStoreNum: false,
      editStoreName: false,
      editStoreLocation: false,
      inputRules: [(v) => !!v || "This field is required"],
    };
  },
  computed: {
    computedInfo() {
      // gets the values of user information
      //let user_info = this.$store.getters["admin/user_info"];
      let storeName = "Mariam super store";
      let storeLocation = "Ikeja Lagos Nigeria";
      let storeNum = "null";
      let currentStoreName = "Mariam super store";
      let currentStoreLocation = "Ikeja Lagos Nigeria";
      let currentStoreNum = "null";

      return {
        storeName: storeName,
        storeLocation: storeLocation,
        storeNum: storeNum,
        currentStoreName: currentStoreName,
        currentStoreLocation: currentStoreLocation,
        currentStoreNum: currentStoreNum,
      };
    },
  },
  methods: {
    // submits the edited information
    submitEditInfo(input_field) {

      if (
        input_field === "storeName" &&
        this.computedInfo.currentStoreName != ""
      ) {
        this.editStoreName = false;
        if (
          this.computedInfo.currentStoreName !== this.computedInfo.storeName
        ) {
          this.dialogMessage = "Store name changed successfully!";
          this.dialog = true;
        }
      }

      if (
        input_field === "storeLocation" &&
        this.computedInfo.currentStoreLocation != ""
      ) {
        this.editStoreLocation = false;
        if (
          this.computedInfo.currentStoreLocation !==
          this.computedInfo.storeLocation
        ) {
          this.dialogMessage = "Store location changed successfully!";
          this.dialog = true;
        }
      }

      if (
        input_field === "storeNum" &&
        this.computedInfo.currentStoreNum != ""
      ) {
        this.editStoreNum = false;
        if (this.computedInfo.currentStoreNum !== this.computedInfo.storeNum) {
          this.dialogMessage = "phone number changed successfully!";
          this.dialog = true;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.close-btn {
  cursor: pointer;
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
</style>