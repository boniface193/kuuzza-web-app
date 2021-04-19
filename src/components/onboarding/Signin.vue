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
        @keyup.enter="$refs.input2.focus"
      ></v-text-field>

      <!-- Password -->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="password"
        :rules="passwordRules"
        type="password"
        label="Password"
        color="primary"
        required
        ref="input2"
        @keyup.enter="validate_form()"
      ></v-text-field>

      <!-- button container -->
      <div class="pa-0 mt-5" style="width: 100%">
        <v-btn
          class="primary px-8 mb-5 text-center"
          @click="validate_form"
          :loading="loading"
          :disabled="loading"
          >Sign In</v-btn
        >

        <!-- forgot password link-->
        <p style="font-size: 14px">
          or
          <router-link
            to="/forgot-password"
            class="error--text"
            style="text-decoration: none"
            >Forgot password?</router-link
          >
        </p>

        <!-- create account link -->
        <p>
          Don't have an account?
          <router-link to="/signup" style="text-decoration: none"
            >Create Account</router-link
          >
        </p>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "Signin",
  data: function () {
    return {
      errorMessage: "",
      error: false,
      loading: false,
      email: "",
      password: "",
      emailRules: [
        // verifies email address satisfies the requirement
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        // verifies password satisfies the requirement
        (v) => !!v || "Password is required",
      ],
    };
  },
  methods: {
    //validates form
    validate_form() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.signin();
      }
    },
    //Sign in
    signin() {
      this.loading = true;
      this.$store
        .dispatch("onboarding/signIn", {
          email: this.email,
          password: this.password,
          type: "vendor",
        })
        .then((response) => {
          if (response.data.message === "Login successful.") {
            this.$router.push({ name: "dashboard" });
          }
        })
        .catch((error) => {
          this.error = true;
          this.loading = false;

          if (error.status == 422) {
            this.errorMessage = `Incorrect email address or password`;
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
  },
};
</script>
<style lang="scss" scoped>
</style>