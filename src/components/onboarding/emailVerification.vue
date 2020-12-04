<template>
  <div>
    <p class="mt-5 mb-0">
      Kindly enter the code sent to
      <span style="font-weight: bold">ayotundelanwo@gmail.com</span>
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
        Please Enter the 5 digits code sent to your email adddress
      </p>
      
      <!-- button container -->
      <div class="pa-0 mt-10" style="width: 100%">
        <p>
          Didn't receive the code?
          <a style="text-decoration: none">Resend Code</a>
        </p>
        <v-btn class="primary px-8 py-5 mb-5" @click="SubmitCode()"
          >Verify</v-btn
        >
      </div>
    </v-form>
  </div>
</template>
<script>
import OtpInput from "@/components/dashboard/verifyInput";
export default {
  name: "emailVerification",
  components: {
    "v-otp-input": OtpInput,
  },
  data: function () {
    return {
      verify: false,
      code: null,
      errorMessage: false,
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
        this.$router.push({ name: 'Signin' });
      } else {
        this.errorMessage = true;
      }
    },
  },
};
</script>
