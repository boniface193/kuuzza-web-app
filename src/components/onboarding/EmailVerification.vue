<template>
  <div>
    <v-alert type="success" v-show="resendOtpSuccess"
      >OPT has been sent successfully!</v-alert
    >
    <p class="mt-5 mb-0">
      Kindly enter the code sent to
      <span style="font-weight: bold">{{ $route.params.email }}</span>
    </p>
    <v-form>
      <div class="mt-10 mb-2">
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
      <p class="error--text" v-show="errorMessage == true">
        {{ message }}
      </p>

      <!-- button container -->
      <div class="pa-0 mt-10" style="width: 100%">
        <p>
          Didn't receive the code?
          <a style="text-decoration: none">
            <span v-show="!resendOTPLoader && !showOTPTimer" @click="resendOTP"
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
          class="primary"
          @click="SubmitCode()"
          :loading="loading"
          :disabled="loading"
          >Verify</v-btn
        >
      </div>
    </v-form>

    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog" width="450">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="cancelModal"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img src="@/assets/img/success-img.svg"></v-img>
        </div>
        <h3>Account Verified!</h3>
        <p class="my-3">You have successfully verified your Account.</p>

        <v-btn
          class="primary mx-auto px-8"
          :loading="loading2"
          :disabled="loading2"
          v-if="dashboardBtn"
          @click="grantAccess"
          >Go to Dashboard</v-btn
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import OtpInput from "@/components/general/verifyInput";
import Modal from "@/components/general/Modal.vue";
export default {
  name: "emailVerification",
  components: {
    "v-otp-input": OtpInput,
    Modal,
  },
  created() {
    this.setOTPTimer();
  },
  data: function () {
    return {
      dialog: false,
      loading: false,
      loading2: false,
      verify: false,
      code: null,
      errorMessage: false,
      message: "",
      resendOtpSuccess: false,
      dashboardBtn: true,
      resendOTPLoader: false,
      showOTPTimer: true,
      timer: 60,
    };
  },
  methods: {
    // check if code changes
    handleOnChange(value) {
      this.code = value;
      if (this.code.length != 5) {
        this.verify = false;
      }
    },
    // checks if code is complete
    handleOnComplete(value) {
      this.verify = true;
      this.code = value;
      this.errorMessage = false;
    },
    // submit OTP
    SubmitCode() {
      if (this.verify) {
        this.loading = true;
        this.$store
          .dispatch("onboarding/verifyEmail", {
            otp: this.code,
            email: this.$route.params.email,
            type: "vendor",
          })
          .then((response) => {
            this.loading = false;
            if (response.data.message === "Email verified successfully.") {
              if (
                localStorage.getItem("clientID") &&
                localStorage.getItem("refreshToken")
              ) {
                this.dialog = true;
              } else {
                this.dashboardBtn = false;
                this.dialog = true;
              }
            }
          })
          .catch((error) => {
            this.loading = false;
            this.errorMessage = true;
            if (error.status == 422) {
              this.message = error.data.errors.otp[0];
            } else if (error.status == 400) {
              this.message = error.data.message;
            } else if (error.status == 404) {
              this.message = "404 not found";
            } else if (error.status == 500) {
              this.message = "Something went wrong, please try again";
            } else if (!navigator.onLine) {
              this.message = "No internet connection!";
            }
          });
      } else {
        this.errorMessage = true;
        this.message =
          "Please Enter the 5 digits code sent to your email adddress";
      }
    },
    // resend OTP
    resendOTP() {
      this.resendOTPLoader = true;
      this.$store
        .dispatch("onboarding/resendEmailOTP", {
          email: this.$route.params.email,
          type: "vendor",
        })
        .then((response) => {
          if (response.data.message === "An OTP has been sent to your email.") {
            this.resendOtpSuccess = true;
            this.resendOTPLoader = false;
            setTimeout(() => {
              this.resendOtpSuccess = false;
            }, 3000);
            this.setOTPTimer();
          }
        })
        .catch((error) => {
          this.errorMessage = true;
          this.resendOTPLoader = false;
          if (error.status == 422) {
            this.message = error.data.errors.email[0];
          } else if (error.status == 400) {
            this.message = error.data.message;
          } else if (error.status == 404) {
            this.message = "404 not found";
          } else if (error.status == 500) {
            this.message = "Something went wrong, please try again";
          } else if (!navigator.onLine) {
            this.message = "No internet connection!";
          }
        });
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
    // close Modal
    cancelModal() {
      this.dialog = false;
      this.denialAccess();
    },
    //allows user to access the dashboard
    grantAccess() {
      this.$router.push({ name: "dashboard" });
    },
    // destroy token
    denialAccess() {
      this.$store.commit("onboarding/removeClientID");
      this.$store.commit("onboarding/removeRefreshToken");
      this.$store.commit("onboarding/setAccessToken", null);
      this.dialog = false;
      this.$router.push({
        name: "Signin",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
</style>