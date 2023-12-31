<template>
  <div>
    <p class="mt-5 error--text" v-show="error">
      {{ errorMessage }}
    </p>
    <!-- form section -->
    <v-form class="d-flex flex-wrap" ref="form">
      <!-- Create password -->
      <label for="" class="onboarding-input">Create Password</label>
      <v-text-field
        class="onboarding-input"
        v-model="create_password"
        :rules="create_passwordRules"
        outlined
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (showPassword = !showPassword)"
        :type="showPassword ? 'password' : 'text'"
        color="primary"
        required
        @keyup.enter="$refs.input2.focus"
      ></v-text-field>

      <!-- Confirm password-->
      <label for="" class="onboarding-input">Confirm Password</label>
      <v-text-field
        class="onboarding-input"
        v-model="confirm_password"
        :rules="confirm_passwordRules"
        outlined
        :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (showConfirmPassword = !showConfirmPassword)"
        :type="showConfirmPassword ? 'password' : 'text'"
        color="primary"
        required
        ref="input2"
        @keyup.enter="validate_password()"
      ></v-text-field>

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
          @click="validate_password"
          :loading="loading"
          :disabled="loading"
          >Submit</v-btn
        >
      </div>
    </v-form>

    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon
            class="error--text close-btn"
            @click="
              () => {
                this.dialog = false;
                this.$router.push({
                  name: 'Signin',
                });
              }
            "
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img src="@/assets/images/success-img.svg"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/secondary/Modal.vue";
import InvisibleRecaptcha from "@/components/secondary/InvisibleRecaptcha.vue";
export default {
  name: "Recoverpassword",
  components: { Modal, InvisibleRecaptcha },
  data: function () {
    return {
      sitekey: `${process.env.VUE_APP_GOOGLE_RECAPTCHA_SITE_MAP}`,
      recaptchaToken: null,
      dialog: false,
      dialogMessage: "",
      error: false,
      errorMessage: "",
      loading: false,
      create_password: "",
      confirm_password: "",
      showPassword: true,
      showConfirmPassword: true,
      create_passwordRules: [
        //verifies password satisfies the requirement
        (v) => !!v || "Password is required",
        (v) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v) ||
          "Password must contain a minimum of 8 character, at least one uppercase, one lowercase, one number",
      ],
      confirm_passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v === this.create_password || "Passwords do not match",
      ],
    };
  },
  methods: {
    //validates form
    validate_password() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.$refs.invisibleRecaptcha1.execute();
      }
    },
    //submit password
    recoverPassword() {
      this.loading = true;
      this.$store
        .dispatch("onboarding/recoverPassword", {
          email: this.$route.params.email,
          password: this.create_password,
          password_confirmation: this.confirm_password,
          otp: this.$route.params.otp,
          type: "vendor",
          recaptcha: this.recaptchaToken,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.message === "Password reset successful.") {
            this.dialogMessage = "You have successfully changed your password";
            this.dialog = true;
            this.otp = null;
            setTimeout(() => {
              this.$router.push({
                name: "Signin",
              });
            }, 3000);
          }
        })
        .catch((error) => {
          this.loading = false;
          this.error = true;
          if (error.status == 422) {
            this.errorMessage = error.data.errors.email[0];
          } else if (error.status == 400) {
            this.errorMessage = error.data.message;
          } else if (error.status == 404) {
            this.errorMessage = "404 not found";
          } else if (error.status == 500) {
            this.errorMessage = "Something went wrong, please try again";
          } else if (!navigator.onLine) {
            this.errorMessage = "No internet connection!";
          }
        });
    },
    recaptchaCallback(token) {
      this.recaptchaToken = token;
      this.recoverPassword();
    },
    resetCaptcha() {
      this.$refs.invisibleRecaptcha1.reset();
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