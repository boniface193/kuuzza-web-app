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
      <div class="mb-5 settings-input phone-field">
        <span class="primary--text phone-format">+234</span>
        <p class="mb-1 secondary--text">Phone Number</p>
        <v-text-field
          class="input mt-0"
          :rules="phoneRules"
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

    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog2" width="400">
      <div class="white pa-3 px-5 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog2 = false"
            >mdi-close</v-icon
          >
        </div>
        <!-- otp resend alert -->
        <v-alert type="success" v-show="resendOtpSuccess"
          >An OPT has been sent successfully!</v-alert
        >
        <div class="text-center mb-5 mt-5">
          <h3>Verify your phone Number</h3>
        </div>
        <p class="mt-5 mb-5">
          An OTP has been sent to your mobile number for verification
        </p>
        <v-form>
          <div class="mt-0 mb-2">
            <v-otp-input
              ref="otpInput1"
              separator=""
              :num-inputs="5"
              :should-auto-focus="true"
              input-type="number"
              @on-complete="handleOnComplete"
              @on-change="handleOnChange"
            />
          </div>

          <!-- error message -->
          <p
            class="error--text"
            style="font-size: 14px"
            v-show="otpError == true"
          >
            {{ otpErrorMessage }}
          </p>

          <!-- button container -->
          <div class="pa-0 mt-5" style="width: 100%">
            <p>
              Didn't receive the code?
              <a style="text-decoration: none">
                <span
                  v-show="!resendOTPLoader && !showOTPTimer"
                  @click="resendOTP"
                  >Resend Code</span
                >
                <v-progress-circular
                  indeterminate
                  color="primary"
                  size="20"
                  class="ml-5"
                  v-show="resendOTPLoader"
                ></v-progress-circular>
                <span class="primary--text" v-show="showOTPTimer"
                  >You can resend OTP in
                  <span class="error--text"
                    >{{ timer }}{{ timer > 1 ? "secs" : "sec" }}</span
                  ></span
                >
              </a>
            </p>
            <v-btn
              class="primary px-16 mb-5 mx-auto"
              :disabled="otpLoader"
              :loading="otpLoader"
              @click="submitOTP()"
              >Verify</v-btn
            >
          </div>
        </v-form>
      </div>
    </Modal>

    <!-- Modal for dialog messages -->
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
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
import OtpInput from "@/components/general/verifyInput";
export default {
  name: "storeDetails",
  components: { Modal, "v-otp-input": OtpInput },
  data: function () {
    return {
      dialog2: false,
      otp: "",
      otpErrorMessage: "",
      otpError: false,
      resendOtpSuccess: false,
      resendOTPLoader: false,
      otpLoader: false,
      verifyOTP: false,
      statusImage: null,
      dialog: false,
      dialogMessage: "",
      editStoreNum: false,
      editStoreName: false,
      editStoreLocation: false,
      nameLoader: false,
      locationLoader: false,
      phoneNumLoader: false,
      showOTPTimer: true,
      timer: 60,
      lat: "",
      lng: "",
      inputRules: [(v) => !!v || "This field is required"],
      phoneRules: [
        //verifies phone number satisfies the requirement
        (v) => !!v || "This field is required",
        (v) => v.substring(0, 1) != 0 || "Phone number cannot begin with 0",
        (v) => v.length > 9 || "Number should 10 digits or more",
        (v) => v.length <= 11 || "Maximum 11 digits or more",
      ],
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
      let storeNum = userProfile.store.phone_number.substring(4);
      let currentStoreName = userProfile.store.name;
      let currentStoreLocation = userProfile.store.location.address;
      let currentStoreNum = userProfile.store.phone_number.substring(4);

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
        this.computedInfo.currentStoreLocation =
          place.name + " " + place.formatted_address;
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
                lng: this.lng,
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
        this.computedInfo.currentStoreNum.length > 9 &&
        this.computedInfo.currentStoreNum.length <= 11 &&
        this.computedInfo.currentStoreNum.substring(0, 1) != "0"
      ) {
        if (this.computedInfo.currentStoreNum !== this.computedInfo.storeNum) {
          this.phoneNumLoader = true;
          this.$store
            .dispatch("settings/editStore", {
              phone_number:
                this.computedInfo.currentStoreNum.substring(0, 1) == "0"
                  ? "+234" + this.computedInfo.currentStoreNum.substring(1)
                  : "+234" + this.computedInfo.currentStoreNum,
            })
            .then(() => {
              // this.dialogMessage = "phone number changed successfully!";
              this.editStoreNum = false;
              this.phoneNumLoader = false;
              // this.statusImage = successImage;
              this.dialog2 = true;
              this.timer = 60;
              this.setOTPTimer();
              this.$store.dispatch("settings/getUserProfile");
            })
            .catch((error) => {
              this.phoneNumLoader = false;
              this.statusImage = failedImage;
              if (error.response) {
                this.dialog = true;
                this.dialogMessage = error.response.data.errors.phone_number[0];
              } else {
                this.dialog = true;
                this.dialogMessage = "No internet connection!";
              }
            });
        } else {
          this.editStoreNum = false;
        }
      }
    },
    // check if code changes
    handleOnChange(value) {
      this.otp = value;
      if (this.otp.length != 5) {
        this.verifyOTP = false;
      }
    },
    // checks if code is complete
    handleOnComplete(value) {
      this.verifyOTP = true;
      this.otp = value;
      this.otpError = false;
    },
    confirmOrder() {
      this.otp.length > 0 ? this.$refs.otpInput1.clearInput() : "";
      this.dialog2 = true;
    },
    setOTPTimer() {
      this.showOTPTimer = true;
      let counter = setInterval(() => {
        if (this.timer === 1) {
          clearInterval(counter);
          this.showOTPTimer = false;
          this.timer = 60;
        } else {
          this.timer -= 1;
        }
      }, 1000);
    },
    // verify phone number
    submitOTP() {
      if (this.verifyOTP) {
        this.otpLoader = true;
        this.otpError = false;
        this.$store
          .dispatch("settings/verifyPhoneNumber", {
            otp: this.otp,
          })
          .then(() => {
            this.otpLoader = false;
            this.statusImage = successImage;
            this.dialog2 = false;
            this.dialog = true;
            this.dialogMessage =
              "Phone number was changed and verified successfully!";
            this.$store.dispatch("settings/getUserProfile");
          })
          .catch((error) => {
            this.otpLoader = false;
            this.otpError = true;
            if (error.response) {
              this.otpErrorMessage = error.response.data.errors.otp[0];
            } else {
              this.otpErrorMessage = "No internet Connection!";
            }
          });
      } else {
        this.otpError = true;
        this.otpErrorMessage =
          "Please Enter the 5 digits code sent to your phone number";
      }
    },
    // resend OTP
    resendOTP() {
      this.resendOTPLoader = true;
      this.$store
        .dispatch("settings/resendPhoneNumberOTP", {})
        .then(() => {
          this.resendOtpSuccess = true;
          this.resendOTPLoader = false;
          setTimeout(() => {
            this.resendOtpSuccess = false;
          }, 3000);
          this.setOTPTimer();
        })
        .catch((error) => {
          this.errorMessage = true;
          this.resendOTPLoader = false;
          this.otpError = true;
          if (error.response) {
            this.otpErrorMessage = error.response.data.message;
          } else {
            this.otpErrorMessage = "No internet Connection!";
          }
        });
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
.phone-format {
  position: absolute;
  margin-top: 44px;
  left: 0px;
}
@media (max-width: 950px) {
  .store-width {
    width: 100%;
  }
}
</style>
<style lang="scss">
.phone-field
  > .v-text-field
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot {
  padding-left: 40px;
}
.phone-field > .v-input .v-label {
  padding-left: 40px;
}
</style>