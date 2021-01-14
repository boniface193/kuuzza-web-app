<template>
  <div>
    <p v-show="error" class="error--text mt-3 mb-0">
      <span v-html="errorMessage"></span>
    </p>

    <!-- first form section-->
    <v-form
      class="flex-wrap"
      ref="form1"
      :class="{
        'd-none': present_form != 'form1',
        'd-flex': present_form == 'form1',
      }"
    >
      <!-- Email Adrress-->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="$route.params.email"
        :rules="emailRules"
        type="email"
        label="Email"
        color="primary"
        required
        disabled
      ></v-text-field>

      <!-- First Name -->
      <v-text-field
        class="name-input mr-5 mt-5"
        v-model="first_name"
        :rules="first_nameRules"
        type="name"
        label="First Name"
        color="primary"
        required
        @keyup.enter="$refs.input2.focus"
      ></v-text-field>

      <!-- Last Name -->
      <v-text-field
        class="name-input mr-5 mt-5"
        v-model="last_name"
        :rules="last_nameRules"
        type="name"
        label="Last Name"
        color="primary"
        required
        @keyup.enter="$refs.input4.focus"
        ref="input2"
      ></v-text-field>

      <!-- Phone Number -->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="phone_number"
        :rules="phoneRules"
        label="Phone Number"
        color="primary"
        type="tel"
        required
        ref="input4"
        @keyup.enter="validateForm(1)"
      ></v-text-field>

      <!-- button container -->
      <div class="pa-0 mt-5" style="width: 100%">
        <v-btn
          class="primary px-8 py-5 mb-5"
          @click="validateForm(1)"
          >Next</v-btn
        >
      </div>
    </v-form>

    <!-- third form section -->
    <v-form
      class="flex-wrap"
      ref="form2"
      :class="{
        'd-none': present_form != 'form2',
        'd-flex': present_form == 'form2',
      }"
    >
      <!-- Create password -->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="create_password"
        :rules="create_passwordRules"
        label="Create Password"
        type="password"
        color="primary"
        @keyup.enter="$refs.input10.focus"
        ref="input9"
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
        ref="input10"
        @keyup.enter="validateForm(2)"
      ></v-text-field>

      <!-- button container -->
      <div
        class="pa-0 mt-5 d-flex justify-space-between align-center btn-container"
      >
        <v-btn
          class="primary--text mb-5 mb-0 px-1 py-2"
          style="background: #5064cc26"
          :disabled="loading"
          @click="previousForm(1)"
        >
          Back</v-btn
        >
        <v-btn
          class="primary px-8 py-5 mb-5"
          @click="validateForm(2)"
          :loading="loading"
          :disabled="loading"
          >Complete Sign Up</v-btn
        >
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "signupTeamMember",
  data: function () {
    return {
      loading: false,
      error: false,
      errorMessage: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      create_password: "",
      confirm_password: "",
      present_form: "form1",
      first_nameRules: [
        (v) => !!v || "First Name is required", // verifies first name satisfies the requirement
      ],
      last_nameRules: [
        // verifies last name satisfies the requirement
        (v) => !!v || "last Name is required",
      ],
      emailRules: [
        // verifies email address satisfies the requirement
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneRules: [
        //verifies phone number satisfies the requirement
        (v) => !!v || "Phone Number is required",
      ],
      create_passwordRules: [
        //verifies password satisfies the requirement
        (v) => !!v || "Password is required",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          ) ||
          "Password must contain a minimum of 8 character, at least one uppercase, one lowercase, one number and one special character",
      ],
      confirm_passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v === this.create_password || "Passwords do not match",
      ],
    };
  },
  methods: {
    //   go to next form
    validateForm(formNum) {
      this.$refs[`form${formNum}`].validate();
      if (this.$refs[`form${formNum}`].validate()) {
        if (this.present_form === "form1") {
          this.present_form = "form2";
        } else {
          this.submit();
        }
      }
    },
    // go to previous form
    previousForm(formNum) {
      this.present_form = `form${formNum}`;
    },
    submit() {
      this.loading = true;
      this.$store
        .dispatch("onboarding/inviteTeamMember", {
          first_name: this.first_name,
          last_name: this.last_name,
          phone_number: this.phone_number,
          password: this.create_password,
          confirmation_password: this.confirm_password,
          id: this.$route.params.id,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.message === "Registeration successful.") {
            console.log();
          }
        })
        .catch((error) => {
          this.error = true;
          this.loading = false;
          if (error.response) {
            this.errorMessage = error.response.data.errors.email[0];
          } else {
            this.errorMessage = "No internet Connection!";
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-container {
  width: 60%;
}
@media (max-width: 1100px) {
  .btn-container {
    width: 80%;
  }
}
@media (max-width: 550px) {
  .btn-container {
    width: 100%;
  }
}
</style>