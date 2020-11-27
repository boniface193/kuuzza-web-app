<template>
  <div>Sign In</div>
</template>

<script>
export default {
  name: "Signup",
  data: () => ({
    email: "",
    password: "",
    emailRules: [
      // verifies email address satisfies the requirement
      (v) => !!v || "E-mail is required",
    ],
    passwordRules: [
      // verifies password satisfies the requirement
      (v) => !!v || "Password is required",
    ],
  }),
  methods: {
    validate_form() {
      //validates form
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.signin();
      }
    },
    signin() {
      // Sign in
      this.$store.commit("onboarding/user_info", [this.email, this.password]);
      this.$store.dispatch("onboarding/signin");
    },
  },
};
</script>

