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
        @keyup.enter="$refs.input2.focus"
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
        ref="input2"
        @keyup.enter="validate_password()"
      ></v-text-field>

      <!-- button container -->
      <div class="pa-0 mt-5" style="width: 100%">
        <v-btn
          class="primary px-8 mb-5"
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
          <v-img src="@/assets/img/success-img.svg"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/general/Modal.vue";
export default {
  name: "Recoverpassword",
  components: { Modal },
  data: function () {
    return {
      dialog: false,
      dialogMessage: "",
      error: false,
      errorMessage: "",
      loading: false,
      create_password: "",
      confirm_password: "",
      create_passwordRules: [
        //verifies password satisfies the requirement
        (v) => !!v || "Password is required",
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(
            v
          ) ||
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
        this.recoverPassword();
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
          type: "vendor"
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
          if (error.response) {
            this.errorMessage = "something went wrong, pls try again";
          } else {
            this.errorMessage = "No internet Connection!";
          }
        });
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