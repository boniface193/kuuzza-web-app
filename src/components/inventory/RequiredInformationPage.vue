<template>
  <div class="mt-10">
    <div v-show="!loader && verifiedStore == false">
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
            <div class="mb-3 RC-field" style="position: relative">
              <p class="mb-1 question">RC Number</p>
              <span class="primary--text phone-format">RC</span>
              <v-text-field
                class="mt-0"
                v-model="rcNumber"
                type="text"
                :rules="rcNumberRules"
                color="primary"
                placeholder="Number"
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
            <v-btn class="primary px-8" @click="goNextForm(1)"> Next </v-btn>
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
                  value="true"
                ></v-radio>
                <v-radio
                  class="primary--text mb-1"
                  label="No"
                  value="false"
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
            <div class="d-flex align-center mb-5">
              <v-checkbox
                v-model="agreeToInccurShippingFee"
                class="mr-1"
              ></v-checkbox>
              <p class="mb-0" style="">
                I agree to Kuuzza
                <a
                  style="text-decoration: none"
                  href="https://kuuzza.com/return-refund-policy"
                  target="_blank"
                  class="primary--text"
                >
                  Return, Refund and Shipping Policy</a
                >
              </p>
            </div>
          </v-form>
          <!-- btn container -->
          <div class="btn-container d-flex justify-space-between">
            <v-btn
              class="primary--text light-background px-8"
              @click="goPrevForm(2)"
            >
              Back
            </v-btn>
            <v-btn
              class="primary px-8"
              :disabled="
                !agreeToInccurShippingFee && allowReturnProducts === 'true'
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
              class="primary--text light-background px-8"
              @click="goPrevForm(3)"
            >
              Back
            </v-btn>
            <v-btn class="primary px-8" @click="goNextForm(3)"> Next </v-btn>
          </div>
        </v-form>
        <!-- phone number verification  -->
        <v-form v-show="presentForm === 'form4'" ref="form4">
          <!-- Phone Number -->
          <div class="mb-3 phone-field" style="position: relative">
            <p class="mb-1 question">Store Phone Number</p>
            <span class="primary--text phone-format">+234</span>
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
          <div class="d-flex align-center mb-5">
            <v-checkbox v-model="agreetwilo" class="mr-1"></v-checkbox>
            <p class="mb-0" style="">
              By continuing you will receive a one-time verification code to
              your phone number by SMS. Message and data rates may apply.
            </p>
          </div>

          <!-- btn container -->
          <div class="btn-container d-flex justify-space-between">
            <v-btn
              class="primary--text light-background px-8"
              :disabled="submitLoader"
              @click="goPrevForm(4)"
            >
              Back
            </v-btn>
            <v-btn
              class="primary px-8"
              :disabled="submitLoader || agreetwilo"
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

    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog" width="400">
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
                  <span class="error--text">{{ timer }}.00</span></span
                >
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
    </Modal>

    <!--------------------------- Modal for dialog messages ------------------------------>
    <Modal :dialog="dialog2" width="400">
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
    </Modal>
  </div>
</template>
<script>
import StepProgress from "@/components/general/StepProgress.vue";
import MultipleSelect from "@/components/general/MultipleSelect.vue";
import selectBtn from "@/components/general/SelectBtn.vue";
import Modal from "@/components/general/Modal.vue";
import OtpInput from "@/components/general/verifyInput";
import failedImage from "@/assets/img/failed-img.svg";
import successImage from "@/assets/img/success-img.svg";
import { mapGetters } from "vuex";
export default {
  name: "RequiredInformationPage",
  components: {
    StepProgress,
    "select-btn": selectBtn,
    Modal,
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
      agreetwilo: false,
      phoneNumber: "",
      accountErrorStatus: false,
      categoriesErrorStatus: false,
      IDErrorStatus: false,
      verify: false,
      otp: "",
      otpErrorMessage: "",
      otpError: false,
      showOTPTimer: true,
      timer: 60,
      inputRules: [(v) => !!v || "This field is required"],
      addressRules: [
        //verifies pick up address satisfies the requirement
        (v) => !!v || "Pick up location is required",
        () => this.validAddress || "Select a valid Address",
      ],
      phoneRules: [
        //verifies phone number satisfies the requirement
        (v) => !!v || "This field is required",
        (v) => v.substring(0, 1) != 0 || "Phone number cannot begin with 0",
        (v) => v.length > 9 || "Number should be 10 digits",
        (v) => v.length < 11 || "Maximum of 10 digits is allowed",
      ],
      rcNumberRules: [
        (v) => !!v || "This field is required",
        (v) =>
          (v.length >= 5 && v.length <= 9) || "RC Number format is invalid",
      ],
      daysRules: [
        (v) => !!v || "Required",
        (v) => v >= 3 || "a minimum of 3 day is required",
        (v) => v <= 14 || "a maximum of 14 day is required",
      ],
      radioRules: [(v) => !!v || "Required"],
    };
  },
  created() {
    if (this.$store.getters["inventory/productCategories"].length == 0) {
      this.loader = true;
      this.getProductCategories();
    }

    if (
      this.$store.getters["settings/getUserProfile"].store
        .phone_number_verified == false &&
      this.$store.getters["settings/getUserProfile"].store.setup_is_complete !==
        false
    ) {
      this.otp.length > 0 ? this.$refs.otpInput1.clearInput() : "";
      this.dialog = true;
      this.otpError = false;
      this.timer = 60;
      this.setOTPTimer();
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
      // this.$refs.businessForm.reset();
      //this.$refs.individualForm.reset();
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
    // set otp timer
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
    // get store info in the structure format
    getInfo() {
      let storeDetails = {};
      storeDetails.business_info = {};
      storeDetails.location = {};
      storeDetails.refund_policy = {};
      storeDetails.business_info.account_type = this.accountType;
      storeDetails.location.address = this.pickUpLocation;
      storeDetails.location.lat = this.lat;
      storeDetails.location.lng = this.lng;
      storeDetails.phone_number =
        this.phoneNumber.substring(0, 1) == "0"
          ? "+234" + this.phoneNumber.substring(1)
          : "+234" + this.phoneNumber;
      storeDetails.refund_policy.return_allowed = this.allowReturnProducts;
      if (this.allowReturnProducts == "true") {
        storeDetails.refund_policy.return_precondition =
          this.productQualification;
        storeDetails.refund_policy.product_replacable_on_return =
          this.allowReplaceProducts;
        storeDetails.refund_policy.return_window = this.maxDays;
      }
      if (this.accountType === "individual") {
        storeDetails.business_info.id_type = this.IDtype;
        storeDetails.business_info.id_number = this.idNumber;
      } else if (this.accountType === "business") {
        storeDetails.business_info.business_name = this.businessName;
        storeDetails.business_info.rc_number = this.rcNumber;
      }

      return storeDetails;
    },
    // submit store information
    submitStoreDetails() {
      this.submitLoader = true;
      this.$store
        .dispatch("settings/editStore", this.getInfo())
        .then((response) => {
          this.submitLoader = false;
          if (response.data.data.store.phone_number_verified) {
            this.statusImage = successImage;
            this.dialog2 = true;
            this.dialogMessage = "Store setup completed successfully";
          } else {
            this.otp.length > 0 ? this.$refs.otpInput1.clearInput() : "";
            this.dialog2 = false;
            this.dialog = true;
            this.otpError = false;
            this.timer = 60;
            this.setOTPTimer();
          }
        })
        .catch((error) => {
          this.submitLoader = false;
          if (error.response.status == (400 || 422)) {
            this.statusImage = failedImage;
            this.dialog2 = true;
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
            this.$store.dispatch("settings/getUserProfile");
          })
          .catch((error) => {
            this.loader = false;
            this.otpLoader = false;
            this.otpError = true;
            if (error.status == 422) {
              this.otpErrorMessage = error.data.errors.otp[0];
            } else if (error.status == 400) {
              this.otpErrorMessage = error.data.message;
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
          if (error.status == 422 || error.status == 400) {
            this.otpErrorMessage = error.data.message;
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
.phone-format {
  position: absolute;
  margin-top: 15px;
  left: 10px;
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
<style lang="scss">
.phone-field
  > .v-text-field
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot {
  padding-left: 40px;
}
.RC-field
  > .v-text-field
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot {
  padding-left: 20px;
}
.phone-field > .v-input .v-label {
  padding-left: 40px;
}
.phone-field > .v-text-field .v-label--active {
  padding-left: 0px;
}
</style>