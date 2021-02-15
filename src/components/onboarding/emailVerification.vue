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
          <a style="text-decoration: none" @click="resendOTP">Resend Code</a>
        </p>
        <v-btn
          class="primary px-8 py-5 mb-5"
          @click="SubmitCode()"
          :loading="loading"
          :disabled="loading"
          >Verify</v-btn
        >
      </div>
    </v-form>

    <!-- modal for dialog messages -->
    <modal :dialog="dialog" width="450">
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
          class="primary mx-auto py-5 px-8"
          :loading="loading2"
          :disabled="loading2"
          v-if="dashboardBtn"
          @click="grantAccess"
          >Go to Dashboard</v-btn
        >
      </div>
    </modal>
  </div>
</template>
<script>
import OtpInput from "@/components/onboarding/verifyInput";
import modal from "@/components/dashboard/modal.vue";
export default {
  name: "emailVerification",
  components: {
    "v-otp-input": OtpInput,
    modal,
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
            type: "vendor"
          })
          .then((response) => {
            this.loading = false;
            if (response.data.message === "Email verified successfully.") {

              if(localStorage.getItem("accessToken")){
                 this.dialog = true;
              }else {
                this.dashboardBtn = false
                this.dialog = true;
              }
            } 
          })
          .catch((error) => {
            this.loading = false;
            this.errorMessage = true;
            if (error.response) {
              this.message = error.response.data.errors.otp[0];
            } else {
              this.message = "Something went wrong, Please try again";
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
      this.$store
        .dispatch("onboarding/resendEmailOTP", {
          email: this.$route.params.email,
        })
        .then((response) => {
          if (response.data.message === "An OTP has been sent to your email.") {
            this.resendOtpSuccess = true;
            setTimeout(() => {
              this.resendOtpSuccess = false;
            }, 3000);
          } 
        })
        .catch((error) => {
          this.errorMessage = true;
          if(error.response) {
             this.message = error.response.errors.email[0];
          }else {
            this.message = "No internet Connection!";
          }
        });
    },
    // close modal
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
      this.$store.commit("onboarding/setToken", null);
      localStorage.removeItem('accessToken')
      this.$router.push({ name: "Signin" });
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