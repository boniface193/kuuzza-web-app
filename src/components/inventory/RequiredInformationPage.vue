<template>
  <div class="mt-10">
    <div v-show="!loader && !verifiedStore">
      <!-- page description -->
      <div>
        <h2 class="text-center mb-0 primary--text" style="font-size: 20px">
          Complete Inventory Setup
        </h2>
      </div>
      <!-- step progress  -->
      <div class="progress-container mx-auto">
        <StepProgress
          :steps="[
            'Business informations',
            'Return & Refund Policy ',
            'Pick up Location',
            'Verification',
          ]"
          :currentStep="currentStep"
          :lineThickness="lineThickness"
          :activeColor="activeColor"
          :activeThickness="activeThickness"
          :passiveThickness="passiveThickness"
          :passiveColor="passiveColor"
          class="mt-5 mb-5"
        />
      </div>

      <div class="form-container mt-8 mt-sm-16 pt-5 mx-auto">
        <!-- Business information form -->
        <v-form ref="form1" v-show="presentForm === 'form1'">
          <!-- account type  -->
          <div class="mb-8">
            <p class="mb-1 question">Select account type</p>
            <div class="select-item">
              <select-btn
                bgColor="transparent"
                borderRadius="5px"
                borderColor="slategrey"
                :items="['business', 'individual']"
                :item="'---Select account type---'"
                :inputStatus="accountErrorStatus"
                errorMsg="select an account type"
                @selectedItem="setAccountType"
              />
            </div>
          </div>
          <!-- show if account type is business -->
          <v-form v-show="accountType === 'business'" ref="businessForm">
            <!-- business name -->
            <div class="mb-2">
              <p class="mb-1 question">Business Name</p>
              <v-text-field
                class="mt-0"
                v-model="businessName"
                type="name"
                :rules="inputRules"
                color="primary"
                placeholder="Business name"
                ref="businessName"
                @keyup.enter="$refs.RCnumber.focus"
                required
                outlined
              >
              </v-text-field>
            </div>

            <!-- RC number -->
            <div class="mb-3">
              <p class="mb-1 question">RC Number</p>
              <v-text-field
                class="mt-0"
                v-model="rcNumber"
                type="text"
                :rules="inputRules"
                color="primary"
                placeholder="RC Number"
                ref="RCnumber"
                @keyup.enter="goNextForm(1)"
                required
                outlined
              >
              </v-text-field>
            </div>
          </v-form>

          <!-- show if account type is individual -->
          <v-form v-show="accountType === 'individual'" ref="individualForm">
            <!-- business name -->
            <div class="mb-8">
              <p class="mb-1 question">Select an ID type</p>
              <div class="select-item">
                <select-btn
                  bgColor="transparent"
                  borderRadius="5px"
                  borderColor="slategrey"
                  :items="[
                    'NIN',
                    'Voter card',
                    'Driver license',
                    'International passport',
                  ]"
                  :item="'---ID type---'"
                  :inputStatus="IDErrorStatus"
                  errorMsg="select an ID type"
                  @selectedItem="setIDtype"
                />
              </div>
            </div>

            <!-- RC number -->
            <div class="mb-3">
              <p class="mb-1 question">ID Number</p>
              <v-text-field
                class="input mt-0"
                v-model="idNumber"
                type="text"
                :rules="inputRules"
                color="primary"
                placeholder="ID Number"
                @keyup.enter="goNextForm(1)"
                required
                outlined
              >
              </v-text-field>
            </div>
            <!-- do not remove -->
            <v-text-field style="display: none"></v-text-field>
          </v-form>

          <!-- select categories -->
          <div class="mb-8">
            <p class="mb-1 question">Select business categories</p>
            <MultipleSelect
              bgColor="transparent"
              borderRadius="5px"
              borderColor="slategrey"
              :items="productCategories"
              :item="'---Select business categories ---'"
              :inputStatus="categoriesErrorStatus"
              errorMsg="At least one category must be selected"
              @selectedItem="setCategories"
            />
          </div>

          <div class="btn-container d-flex justify-end">
            <v-btn class="primary py-6 px-8" @click="goNextForm(1)">
              Next
            </v-btn>
          </div>
        </v-form>

        <!-- return and refund policy -->
        <v-form v-show="presentForm === 'form2'" ref="form2">
          <!-- radio quetsion -->
          <div class="mb-3">
            <p class="mb-1 question">Do you allow returns for your products?</p>
            <v-radio-group
              v-model="allowReturnProducts"
              class="mt-1"
              :rules="radioRules"
              required
            >
              <v-radio
                class="primary--text mb-2"
                label="Yes"
                value="true"
              ></v-radio>
              <v-radio
                class="primary--text mb-1"
                label="No"
                value="false"
              ></v-radio>
            </v-radio-group>
          </div>
          <v-form
            v-show="allowReturnProducts === 'true'"
            ref="allowReturnProductForm"
          >
            <!-- input field question -->
            <div class="mb-3">
              <p class="mb-1 question">
                What qualifies a product for returns? Please state below
              </p>
              <v-textarea
                outlined
                name="input-7-4"
                :rules="inputRules"
                v-model="productQualification"
                placeholder=""
              ></v-textarea>
            </div>
            <!-- radio quetsion -->
            <div class="mb-3">
              <p class="mb-1 question">
                Can a customer replace a product in the event of a return?
              </p>
              <v-radio-group
                v-model="allowReplaceProducts"
                class="mt-1"
                :rules="radioRules"
                required
              >
                <v-radio
                  class="primary--text mb-2"
                  label="Yes"
                  value="Yes"
                ></v-radio>
                <v-radio
                  class="primary--text mb-1"
                  label="No"
                  value="No"
                ></v-radio>
              </v-radio-group>
            </div>
            <!-- max days it takes to accept return of product -->
            <div class="mb-3">
              <p class="max-day-container">
                <span class="question mr-2"
                  >How many days after delivery can a customer return a
                  product?</span
                >
                <span class="d-flex align-center">
                  Maximum of
                  <span style="width: 70px"
                    ><v-text-field
                      class="mx-2"
                      :rules="daysRules"
                      type="number"
                      v-model="maxDays"
                    ></v-text-field
                  ></span>
                  days</span
                >
              </p>
            </div>

            <div class="mb-5">
              <v-checkbox
                v-model="agreeToInccurShippingFee"
                label="Agree to incur the shipping fees associated with returns"
                class="question"
              ></v-checkbox>
            </div>
          </v-form>
          <!-- btn container -->
          <div class="btn-container d-flex justify-space-between">
            <v-btn
              class="primary--text light-background py-6 px-8"
              @click="goPrevForm(2)"
            >
              Back
            </v-btn>
            <v-btn
              class="primary py-6 px-8"
              :disabled="
                !agreeToInccurShippingFee && allowReturnProducts === 'Yes'
              "
              @click="goNextForm(2)"
            >
              Next
            </v-btn>
          </div>
        </v-form>
        <!-- Pick up location -->
        <v-form v-show="presentForm === 'form3'" ref="form3">
          <div class="mb-3">
            <p class="mb-1 question">Select your Pick up Location</p>
            <v-text-field
              class=""
              v-model="pickUpLocation"
              :rules="addressRules"
              type="text"
              color="primary"
              required
              ref="autocomplete"
              id="autocomplete"
              outlined
              @keyup.enter="goNextForm(3)"
            ></v-text-field>
            <!-- do not remove -->
            <v-text-field style="display: none"></v-text-field>
          </div>
          <!-- btn container -->
          <div class="btn-container d-flex justify-space-between">
            <v-btn
              class="primary--text light-background py-6 px-8"
              @click="goPrevForm(3)"
            >
              Back
            </v-btn>
            <v-btn class="primary py-6 px-8" @click="goNextForm(3)">
              Next
            </v-btn>
          </div>
        </v-form>
        <!-- phone number verification  -->
        <v-form v-show="presentForm === 'form4'" ref="form4">
          <!-- Phone Number -->
          <div class="mb-3">
            <p class="mb-1 question">Store Phone Number</p>
            <v-text-field
              class=""
              v-model="phoneNumber"
              :rules="phoneRules"
              color="primary"
              type="tel"
              required
              @keyup.enter="goNextForm(3)"
              outlined
            ></v-text-field>
            <!-- do not remove -->
            <v-text-field style="display: none"></v-text-field>
          </div>

          <!-- btn container -->
          <div class="btn-container d-flex justify-space-between">
            <v-btn
              class="primary--text light-background py-6 px-8"
              :disabled="submitLoader"
              @click="goPrevForm(4)"
            >
              Back
            </v-btn>
            <v-btn
              class="primary py-6 px-8"
              :disabled="submitLoader"
              :loading="submitLoader"
              @click="goNextForm(4)"
            >
              Complete
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>

    <!-- loader -->
    <div class="text-center pt-10 pb-5" v-show="loader">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- modal for dialog messages -->
    <modal :dialog="dialog" width="400">
      <div class="white pa-3 px-5 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
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
              <a style="text-decoration: none" @click="resendOTP">
                <span v-show="!resendOTPLoader">Resend Code</span>
                <v-progress-circular
                  indeterminate
                  color="primary"
                  size="20"
                  class="ml-5"
                  v-show="resendOTPLoader"
                ></v-progress-circular>
              </a>
            </p>
            <v-btn
              class="primary px-16 py-5 mb-5 mx-auto"
              :disabled="otpLoader"
              :loading="otpLoader"
              @click="submitOTP()"
              >Verify</v-btn
            >
          </div>
        </v-form>
      </div>
    </modal>

    <!--------------------------- modal for dialog messages ------------------------------>
    <modal :dialog="dialog2" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog2 = false"
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
import StepProgress from "@/components/general/StepProgress.vue";
import MultipleSelect from "@/components/general/MultipleSelect.vue";
import selectBtn from "@/components/dashboard/selectBtn.vue";
import modal from "@/components/dashboard/modal.vue";
import OtpInput from "@/components/onboarding/verifyInput";
import failedImage from "@/assets/img/failed-img.svg";
import successImage from "@/assets/img/success-img.svg";
import { mapGetters } from "vuex";
export default {
  name: "RequiredInformationPage",
  components: {
    StepProgress,
    "select-btn": selectBtn,
    modal,
    "v-otp-input": OtpInput,
    MultipleSelect,
  },
  data: function () {
    return {
      resendOtpSuccess: false,
      resendOTPLoader: false,
      otpLoader: false,
      verifyOTP: false,
      statusImage: null,
      submitLoader: false,
      dialogMessage: "",
      loader: false,
      dialog: false,
      dialog2: false,
      lineThickness: 4,
      activeThickness: 4,
      passiveThickness: 4,
      activeColor: "#FFA500",
      passiveColor: "#ddd",
      currentStep: 0,
      presentForm: "form1",
      accountType: null,
      businessName: "",
      rcNumber: "",
      idNumber: "",
      IDtype: null,
      businessCategories: [],
      productQualification: "",
      allowReturnProducts: null,
      allowReplaceProducts: "",
      maxDays: "",
      pickUpLocation: "",
      autocomplete: "",
      validAddress: false,
      lat: "",
      lng: "",
      agreeToInccurShippingFee: false,
      phoneNumber: "",
      accountErrorStatus: false,
      categoriesErrorStatus: false,
      IDErrorStatus: false,
      verify: false,
      otp: "",
      otpErrorMessage: "",
      otpError: false,
      inputRules: [(v) => !!v || "This field is required"],
      addressRules: [
        //verifies pick up address satisfies the requirement
        (v) => !!v || "Pick up location is required",
        () => this.validAddress || "Select a valid Address",
      ],
      phoneRules: [
        (v) => !!v || "Phone Number is required",
        (v) => v.length > 10 || "Number should 10 digit or more",
      ],
      daysRules: [(v) => !!v || "Required"],
      radioRules: [(v) => !!v || "Required"],
    };
  },
  created() {
    if (this.$store.getters["inventory/productCategories"].length == 0 && this.$store.getters["settings/verifiedStore"] === false) {
      this.loader = true;
      this.getProductCategories();
    }
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
    ...mapGetters({
      productCategories: "inventory/productCategories",
      verifiedStore: "settings/verifiedStore",
    }),
  },
  methods: {
    // set the account type selected by the user
    setAccountType(params) {
      this.accountType = params;
      this.$refs.businessForm.reset();
      this.$refs.individualForm.reset();
      this.accountErrorStatus = false;
    },
    // verify that the user choosed an account type
    verifyAccountType() {
      if (this.accountType == null) {
        this.accountErrorStatus = true;
      } else {
        this.accountErrorStatus = false;
      }
    },
    // set ID type
    setIDtype(params) {
      this.IDtype = params;
      this.accountErrorStatus = false;
      this.IDErrorStatus = false;
    },
    // set the categories selected
    setCategories(params) {
      this.businessCategories = params;
      this.verifyProductCategories();
    },
    // verify that at least a products was selected
    verifyProductCategories() {
      if (this.businessCategories.length == 0) {
        this.categoriesErrorStatus = true;
      } else {
        this.categoriesErrorStatus = false;
      }
    },
    onPlaceChanged() {
      let place = this.autocomplete.getPlace();
      if (!place.geometry) {
        // User did not select a prediction; reset the input field
        this.validAddress = false;
      } else {
        //Display details about the valid place
        this.validAddress = true;
        this.pickUpLocation = place.name + " " + place.formatted_address;
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
      }
    },
    // goto next form
    goNextForm(formNum) {
      if (formNum == 1) {
        this.verifyProductCategories();
        this.verifyAccountType();
        if (this.accountType === "business") {
          this.$refs.businessForm.validate();
          if (
            this.$refs.businessForm.validate() &&
            this.categoriesErrorStatus === false
          ) {
            this.currentStep = this.currentStep + formNum;
            this.presentForm = "form" + (formNum + 1);
          }
        } else if (
          this.accountType === "individual" &&
          this.categoriesErrorStatus === false
        ) {
          this.$refs.individualForm.validate();
          if (this.IDtype !== null) {
            if (this.$refs.individualForm.validate()) {
              this.currentStep = this.currentStep + 1;
              this.presentForm = "form" + (formNum + 1);
            }
          } else {
            this.IDErrorStatus = true;
          }
        } else if (this.accountType === null) {
          this.accountErrorStatus = true;
        }
      } else if (formNum == 2) {
        this.$refs.form2.validate();
        if (this.allowReturnProducts === "false") {
          this.currentStep = this.currentStep + 1;
          this.presentForm = "form" + (formNum + 1);
        } else if (this.allowReturnProducts === "true") {
          this.$refs.allowReturnProductForm.validate();
          if (this.$refs.allowReturnProductForm.validate()) {
            this.currentStep = this.currentStep + 1;
            this.presentForm = "form" + (formNum + 1);
          }
        }
      } else if (formNum == 3) {
        this.$refs.form3.validate();
        if (this.$refs.form3.validate()) {
          this.currentStep = this.currentStep + 1;
          this.presentForm = "form" + (formNum + 1);
        }
      } else if (formNum == 4) {
        this.$refs.form4.validate();
        if (this.$refs.form4.validate()) {
          this.submitStoreDetails();
        }
      }
    },
    // goto previous form
    goPrevForm(formNum) {
      this.presentForm = "form" + (formNum - 1);
      this.currentStep = this.currentStep - 1;
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
    getInfo() {
      if (this.accountType === "individual") {
        return {
          business_info: {
            account_type: this.accountType,
            id_type: this.IDtype,
            id_number: this.idNumber,
          },
          location: {
            address: this.pickUpLocation,
            lat: this.lat,
            lng: this.lng,
          },
          phone_number: this.phoneNumber,
          refund_policy: {
            return_allowed: this.allowReturnProducts
          },
        };
      } else if (this.accountType === "business") {
        return {
          business_info: {
            account_type: this.accountType,
            business_name: this.businessName,
            rc_number: this.rcNumber,
          },
          location: {
            address: this.pickUpLocation,
            lat: this.lat,
            lng: this.lng,
          },
          phone_number: this.phoneNumber,
          refund_policy: {
            return_allowed: this.allowReturnProducts
          },
        };
      }
    },
    // submit store information
    submitStoreDetails() {
      this.submitLoader = true;
      this.$store
        .dispatch("settings/editStore", this.getInfo())
        .then(() => {
          this.submitLoader = false;
          this.otp.length > 0 ? this.$refs.otpInput1.clearInput() : "";
          this.dialog2 = false;
          this.dialog = true;
          this.otpError = false;
        })
        .catch((error) => {
          this.statusImage = failedImage;
          this.dialog2 = true;
          this.submitLoader = false;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet Connection!";
          }
        });
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
            this.dialog = false;
            this.dialog2 = true;
            this.dialogMessage = "Store setup completed successfully";
            // get lastest profile information
            this.$store.dispatch("settings/getUserProfile").catch((error) => {
              if (error.response) {
                if (error.response.status == 401) {
                  this.$store.commit("onboarding/setTokenAuthorizeStatus");
                }
              }
            });
          })
          .catch((error) => {
            this.loader = false;
            this.otpLoader = false;
            this.otpError = true;
            if (error.response) {
              if (error.response.status == 401) {
                this.$store.commit("onboarding/setTokenAuthorizeStatus", false);
              } else {
                this.otpErrorMessage = error.response.data.errors.otp[0];
              }
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
        })
        .catch((error) => {
          this.errorMessage = true;
          this.resendOTPLoader = false;
          this.otpError = true;
          if (error.response) {
            if (error.response.status == 401) {
              this.$store.commit("onboarding/setTokenAuthorizeStatus", false);
            } else {
              this.otpErrorMessage = error.response.data.message;
            }
          } else {
            this.otpErrorMessage = "No internet Connection!";
          }
        });
    },
    // get products categories
    getProductCategories() {
      this.$store
        .dispatch("inventory/getProductCategories")
        .then((response) => {
          this.$store.commit(
            "inventory/setProductCategories",
            response.data.data
          );
          this.loader = false;
        })
        .catch((error) => {
          this.statusImage = failedImage;
          this.dialog2 = true;
          this.loader = false;
          if (error.response) {
            this.dialogMessage = "Something went wrong, pls try again!";
          } else {
            this.dialogMessage = "No internet Connection!";
          }
        });
    },
  },
};
</script>
<style lang="scss">
.progress-container {
  width: 60%;
}
.form-container {
  width: 50%;
}
.select-item {
  height: 58px;
  position: relative;
}
.question {
  font-weight: 500;
}
.max-day-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
@media (max-width: 850px) {
  .progress-container {
    width: 85%;
  }
  .form-container {
    width: 75%;
  }
}
@media (max-width: 550px) {
  .progress-container {
    width: 90%;
  }
  .form-container {
    width: 90%;
  }
  .max-day-container {
    display: block;
  }
}
</style>