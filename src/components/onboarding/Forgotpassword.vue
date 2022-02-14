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
export default {
  name: "Forgotpassword",
  data: function () {
    return {
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
        this.submit_email();
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
  },
};
</script>