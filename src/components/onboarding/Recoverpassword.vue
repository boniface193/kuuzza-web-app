<template>
  <div>
    <p class="mt-5 mb-0 error--text" v-show="error">
      {{ errorMessage }}
    </p>
    <!-- form section -->
    <v-form class="d-flex flex-wrap" ref="form">
      <!-- Create password -->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="create_password"
        :rules="create_passwordRules"
        label="Create Password"
        type="password"
        color="primary"
        required
      ></v-text-field>

      <!-- Confirm password-->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="confirm_password"
        :rules="confirm_passwordRules"
        label="Confirm Password"
        type="password"
        color="primary"
        required
      ></v-text-field>

      <!-- button container -->
      <div class="pa-0 mt-5" style="width: 100%">
        <v-btn
          class="primary px-8 py-5 mb-5"
          @click="validate_password"
          :loading="loading"
          :disabled="loading"
          >Submit</v-btn
        >
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "Recoverpassword",
  data: function () {
    return {
      error: false,
      errorMessage: "",
      loading: false,
      create_password: "",
      confirm_password: "",
      create_passwordRules: [
        //verifies password satisfies the requirement
        (v) => !!v || "Password is required",
        (v) =>
          /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\w\W]{8,30}$/.test(v) ||
          "Password must contain a minimum of 8 character and at least one number",
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
        this.recoverPassword();
      }
    },
    //submit password
    recoverPassword() {
      this.loading = true;
      this.$store
        .dispatch("onboarding/recoverPassword", {
          email: this.$route.params.email,
          newPassword: this.create_password,
        })
        .then((response) => {
           this.loading = false;
          if (response.data.status === "success") {
            this.$router.push({
              name: "Signin",
            });
          }
        }).catch(() => {
          this.loading = false;
          this.error = true;
          this.errorMessage = "something went wrong, pls try again"
        })
    },
  },
};
</script>