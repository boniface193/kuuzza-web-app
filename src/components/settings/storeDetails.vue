<template>
  <div class="px-4 pt-7 my-2 pb-16">
    <div class="store-width">
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
          v-show="editStoreName && !nameLoader"
          @click="editInfo('storeName')"
          >Done</span
        >
        <!-- loader --> 
        <span class="edit-btn" v-show="nameLoader">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="25"
          ></v-progress-circular>
        </span>

      </div>
      <!-- store location field -->
      <div class="mb-5 settings-input">
        <p class="mb-1 secondary--text">Store Location</p>
        <v-text-field
          class="input mt-0"
          :rules="inputRules"
          type="text"
          color="primary"
          id="autocomplete"
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
          v-show="editStoreLocation && !locationLoader"
          @click="editInfo('storeLocation')"
          >Done</span
        >
        <!-- loader --> 
        <span class="edit-btn" v-show="locationLoader">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="25"
          ></v-progress-circular>
        </span>
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
          v-show="editStoreNum && !phoneNumLoader"
          @click="editInfo('storeNum')"
          >Done</span
        >
        <!-- loader --> 
        <span class="edit-btn" v-show="phoneNumLoader">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="25"
          ></v-progress-circular>
        </span>
      </div>
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
          <v-img :src="statusImage"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>
  </div>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
export default {
  name: "storeDetails",
  components: { modal },
  data: function () {
    return {
      statusImage: null,
      dialog: false,
      dialogMessage: "",
      editStoreNum: false,
      editStoreName: false,
      editStoreLocation: false,
      nameLoader: false,
      locationLoader: false,
      phoneNumLoader: false,
      lat: "",
      lng: "",
      inputRules: [(v) => !!v || "This field is required"],
    };
  },
  mounted() {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(6.5244, 3.3792)
        ),
        componentRestrictions: { country: ["NG"] },
        fields: ["geometry", "name", "formatted_address"],
      }
    );

    this.autocomplete.addListener("place_changed", this.onPlaceChanged);
  },
  computed: {
    computedInfo() {
      // gets user profile informations
      let userProfile = this.$store.getters["settings/getUserProfile"];
      let storeName = userProfile.store.name;
      let storeLocation = userProfile.store.location.address;
      let storeNum = userProfile.store.phone_number;
      let currentStoreName = userProfile.store.name;
      let currentStoreLocation = userProfile.store.location.address;
      let currentStoreNum = userProfile.store.phone_number;

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
    onPlaceChanged() {
      let place = this.autocomplete.getPlace();
      if (!place.geometry) {
        // User did not select a prediction; reset the input field
        //this.validAddress = false;
      } else {
        //Display details about the valid place
        //this.validAddress = true;
        this.computedInfo.currentStoreLocation = place.name + " " + place.formatted_address;
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
      }
    },
    // submits the edited information
    editInfo(input_field) {
      // // check if the edited input field is the store ame
      if (
        input_field === "storeName" &&
        this.computedInfo.currentStoreName != ""
      ) {
        if (
          this.computedInfo.currentStoreName !== this.computedInfo.storeName
        ) {
          this.nameLoader = true;
          this.$store
            .dispatch("settings/editStore", {
              name: this.computedInfo.currentStoreName,
            })
            .then(() => {
              this.dialogMessage = "Store name changed successfully!";
              this.editStoreName = false;
              this.nameLoader = false;
              this.statusImage = successImage;
              this.dialog = true;
            })
            .catch((error) => {
              if (error.response) {
                this.dialogMessage = "";
              } else {
                this.dialogMessage = "No internet connection!";
              }
              this.nameLoader = false;
              this.statusImage = failedImage;
              this.dialog = true;
            });
        } else {
          this.editStoreName = false;
        }
      }

      // check if the edited input field is the store location
      if (
        input_field === "storeLocation" &&
        this.computedInfo.currentStoreLocation != ""
      ) {
        if (
          this.computedInfo.currentStoreLocation !==
          this.computedInfo.storeLocation
        ) {
          this.locationLoader = true;
          this.$store
            .dispatch("settings/editStore", {
               location: {
                address: this.computedInfo.currentStoreLocation,
                lat: this.lat,
                lng: this.lng
              },
            })
            .then(() => {
              this.dialogMessage = "Store location changed successfully!";
              this.editStoreLocation = false;
              this.locationLoader = false;
              this.statusImage = successImage;
              this.dialog = true;
            })
            .catch((error) => {
              if (error.response) {
                this.dialogMessage = "";
              } else {
                this.dialogMessage = "No internet connection!";
              }
              this.locationLoader = false;
              this.statusImage = failedImage;
              this.dialog = true;
            });
        } else {
          this.editStoreLocation = false;
        }
      }

      // check if the edited input field is the admin store phone number
      if (
        input_field === "storeNum" &&
        this.computedInfo.currentStoreNum != ""
      ) {
        if (this.computedInfo.currentStoreNum !== this.computedInfo.storeNum) {
          this.phoneNumLoader = true;
          this.$store
            .dispatch("settings/editStore", {
              phone_number: this.computedInfo.currentStoreNum,
            })
            .then(() => {
              this.dialogMessage = "phone number changed successfully!";
              this.editStoreNum = false;
              this.phoneNumLoader = false;
              this.statusImage = successImage;
              this.dialog = true;
            })
            .catch((error) => {
              if (error.response) {
                this.dialogMessage = error.response.data.errors.phone_number[0];
              } else {
                this.dialogMessage = "No internet connection!";
              }
              this.phoneNumLoader = false;
              this.statusImage = failedImage;
              this.dialog = true;
            });
        } else {
          this.editStoreNum = false;
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
.store-width {
  width: 50%;
}
.settings-input {
  position: relative;
  .edit-btn {
    position: absolute;
    bottom: 25px;
    right: 0;
    cursor: pointer;
    color: var(--v-primary-base);
    background: white;
    padding: 5px 0px 0px 5px;
  }
}
@media (max-width: 950px) {
  .store-width {
    width: 100%;
  }
}
</style>