<template>
  <div>
    <p v-show="error" class="error--text mt-3">
      <span v-html="errorMessage"></span>
    </p>
    <!-- form section-->
    <v-form class="flex-wrap" ref="form">
      <!-- Email Adrress-->
      <label for="" class="onboarding-input">Email</label>
      <v-text-field
        class="onboarding-input"
        outlined
        v-model="email"
        :rules="emailRules"
        color="primary"
        required
        @keyup.enter="$refs.input2.focus"
      ></v-text-field>

      <!-- Password -->
      <label for="" class="onboarding-input">Password</label>
      <v-text-field
        class="onboarding-input"
        outlined
        v-model="password"
        :rules="passwordRules"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (showPassword = !showPassword)"
        :type="showPassword ? 'password' : 'text'"
        color="primary"
        required
        ref="input2"
        @keyup.enter="validate_form()"
      ></v-text-field>

      <!-- button container -->
      <div>
        <v-btn
          class="primary text-center"
          @click="validate_form"
          :loading="loading"
          :disabled="loading"
          >Sign In</v-btn
        >

        <!-- create account link -->
        <p class="dont-have-acct">
          Don't have an account?
          <router-link to="/signup" style="text-decoration: none"
            >Create Account</router-link
          >
        </p>

                <!-- forgot password link-->
        <p>
          <router-link
            to="/forgot-password"
            class="forgot-pwd"
            style="text-decoration: none"
            >Forgot password?</router-link
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
      showPassword: true,
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