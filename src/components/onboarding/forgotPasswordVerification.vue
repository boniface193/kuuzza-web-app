<template>
  <div>
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
          <a style="text-decoration: none">Resend Code</a>
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
  </div>
</template>
<script>
import OtpInput from "@/components/onboarding/verifyInput";
export default {
  name: "forgotPasswordVerification",
  components: {
    "v-otp-input": OtpInput,
  },
  data: function () {
    return {
      loading: false,
      verify: false,
      code: null,
      errorMessage: false,
      message: "",
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
    // submit code
    SubmitCode() {
      if (this.verify) {
        this.loading = true;
        this.$store
          .dispatch("onboarding/verifyForgotPassword", {
            code: this.code,
            email: this.$route.params.email,
          })
          .then((response) => {
            this.loading = false;
            if (response.data.message === "OTP verified successfully.") {
              this.$store.commit("onboarding/accessForgotPasswordVerificationPage", false);
              this.$store.commit("onboarding/accessPasswordRecoveryPage", true);
              this.$router.push({
                name: "Recoverpassword",
                params: { otp: response.data.otp, email: this.$route.params.email},
              });
            }
          })
          .catch((error) => {
            this.loading = false;
            this.errorMessage = true;
            if (error.response) {
              this.message = "OTP is invalid or expired";
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
  },
};
</script>
