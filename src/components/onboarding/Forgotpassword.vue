<template>
  <div>
    <p v-show="error" class="error--text mt-3 mb-0">
      <span v-html="errorMessage"></span>
    </p>
    <!-- form section-->
    <v-form class="d-flex flex-wrap" ref="form">
      <!-- Email Adrress-->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="email"
        :rules="emailRules"
        type="email"
        label="Email"
        color="primary"
        required
      ></v-text-field>

      <!-- button container -->
      <div class="pa-0 mt-5" style="width: 100%">
        <v-btn
          class="primary px-8 py-5 mb-5"
          @click="validate_email"
          :loading="loading"
          :disabled="loading"
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
      this.loading = true;
      this.$store
        .dispatch("onboarding/forgotPassword", {
          email: this.email,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.status === "success") {
            this.$router.push({
              name: "forgotPasswordVerification",
              params: { email: response.data.email },
            });
          } else if (response.data.status === "noAccount") {
            this.errorMessage = `The account with email address <span class="primary--text">
            ${response.data.email}</span> does not exist`;
            this.error = true;
          }
        })
        .catch(() => {
          this.loading = false;
          this.errorMessage = `Something went wrong pls try again`;
          this.error = true;
        });
    },
  },
};
</script>