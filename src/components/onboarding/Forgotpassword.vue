<template>
  <div>
    <p v-show="error" class="error--text mt-3">
      <span v-html="errorMessage"></span>
    </p>
    <!-- form section-->
    <v-form class="flex-wrap" ref="form">
      <!-- Email Adrress-->
      <label for="" class="onboarding-input">Email Address</label>
      <v-text-field
        class="onboarding-input"
        v-model="email"
        :rules="emailRules"
        type="email"
        outlined
        color="primary"
        required
        @keyup.enter="validate_email()"
      ></v-text-field>
      <v-text-field style="display: none"></v-text-field>

      <!-- This is in the component you want to have the reCAPTCHA -->
      <InvisibleRecaptcha
        ref="invisibleRecaptcha1"
        :sitekey="sitekey"
        :elementId="'invisibleRecaptcha1'"
        :badgePosition="'left'"
        :showBadgeMobile="false"
        :showBadgeDesktop="true"
        @recaptchaCallback="recaptchaCallback"
      ></InvisibleRecaptcha>

      <!-- button container -->
      <div>
        <v-btn
          class="primary"
          @click="validate_email"
          :loading="loading"
          :disabled="loading"
          width="150px"
          >Reset Password</v-btn
        >
      </div>
    </v-form>
  </div>
</template>
<script>
import InvisibleRecaptcha from "@/components/secondary/InvisibleRecaptcha.vue";
export default {
  name: "Forgotpassword",
  components: { InvisibleRecaptcha },
  data: function () {
    return {
      sitekey: `${process.env.VUE_APP_GOOGLE_RECAPTCHA_SITE_MAP}`,
      recaptchaToken: null,
      error: false,
      errorMessage: "",
      loading: false,
      email: "",
      emailRules: [
        // verifies email address satisfies the requirement
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    //validates form
    validate_email() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.$refs.invisibleRecaptcha1.execute();
      }
    },
    //submit email
    submit_email() {
      const emailAddress = this.email;
      this.loading = true;
      this.$store
        .dispatch("onboarding/forgotPassword", {
          email: this.email,
          type: "vendor",
          recaptcha: this.recaptchaToken,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.message === "An OTP has been sent to your email.") {
            this.$router.push({
              name: "ForgotPasswordVerification",
              params: { email: emailAddress },
            });
          }
        })
        .catch((error) => {
          this.error = true;
          this.loading = false;
          if (error.status == 422) {
            this.errorMessage = `This Account does not Exist`;
          } else if (error.status == 400) {
            this.errorMessage = error.data.message;
          } else if (error.status == 404) {
            this.message = "404 not found";
          } else if (error.status == 500) {
            this.message = "Something went wrong, please try again";
          } else if (!navigator.onLine) {
            this.message = "No internet connection!";
          }
        });
    },
    recaptchaCallback(token) {
      this.recaptchaToken = token;
      this.submit_email();
    },
    resetCaptcha() {
      this.$refs.invisibleRecaptcha1.reset();
    },
  },
};
</script>