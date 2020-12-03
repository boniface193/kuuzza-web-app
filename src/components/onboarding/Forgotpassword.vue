<template>
  <div>
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
        <v-btn class="primary px-8 py-5 mb-5" @click="validate_email"
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
      email: "",
      emailRules: [
        // verifies email address satisfies the requirement
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    validate_email() {
      //validates form
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.submit_email();
        this.$router.push({ name: 'forgotPasswordVerification' })
      }
    },
    submit_email() {
      //submit email
      console.log(this.email);
    },
  },
};
</script>