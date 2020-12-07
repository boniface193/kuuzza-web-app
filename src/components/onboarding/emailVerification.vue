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
        <h3>Email Verified!</h3>
        <p class="my-3">You have successfully verified your email address.</p>

        <v-btn
          class="primary mx-auto py-5 px-8"
          :loading="loading2"
          :disabled="loading2"
          @click="signIn"
          >Go to Dashboard</v-btn
        >
      </div>
    </modal>
  </div>
</template>
<script>
import OtpInput from "@/components/dashboard/verifyInput";
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
          .dispatch("onboarding/verifyEmail", {
            code: this.code,
            email: this.$route.params.email,
          })
          .then((response) => {
            this.loading = false;
            if (response.data.status === "success") {
              this.dialog = true;
            } else if (response.data.status === "incorrectCode") {
              this.errorMessage = true;
              this.message = "Incorrect verification code";
            }
          })
          .catch(() => {
            this.errorMessage = true;
            this.message = "Something went wrong, Please try again";
          });
      } else {
        this.errorMessage = true;
        this.message =
          "Please Enter the 5 digits code sent to your email adddress";
      }
    },
    cancelModal() {
      this.dialog = false;
      this.$router.push({
        name: "Signin",
      });
    },
    //Sign in
    signIn() {
      this.loading2 = true;
      this.$store
        .dispatch("onboarding/signIn", {
          email: this.$route.params.email,
          password: this.$route.params.password,
        })
        .then((response) => {
          this.loading2 = false;
          if (response.data.status === "success") {
            this.$router.push({ name: "dashboard" });
          } else if (response.data.status === "incorrectDetails") {
            this.$router.push({ name: "Signin" });
          }
        })
        .catch(() => {
          this.loading2 = false;
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