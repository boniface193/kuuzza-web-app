<template>
  <div class="px-4 pt-7 my-2 pb-16 store-width">
    <h4 class="mb-7">Change your password</h4>

    <!-- form section -->
    <v-form ref="form">
      <!-- Current password field-->
      <div class="mb-5 settings-input">
        <p class="mb-1 secondary--text">Current Password</p>
        <v-text-field
          class="input mt-0"
          v-model="oldPassword"
          :rules="oldPasswordRules"
          :append-icon="value1 ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (value1 = !value1)"
          :type="value1 ? 'password' : 'text'"
          color="primary"
          placeholder="Enter current password"
          required
        >
        </v-text-field>
      </div>

      <!-- new password field-->
      <div class="mb-5 settings-input">
        <p class="mb-1 secondary--text">New Password</p>
        <v-text-field
          class="input mt-0"
          v-model="newPassword"
          :rules="newPasswordRules"
          :append-icon="value2 ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (value2 = !value2)"
          :type="value2 ? 'password' : 'text'"
          color="primary"
          placeholder="Enter new password"
          required
        >
        </v-text-field>
      </div>

      <!-- confirm new password field-->
      <div class="mb-5 settings-input">
        <p class="mb-1">Confirm Current Password</p>
        <v-text-field
          class="input mt-0"
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          :append-icon="value3 ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (value3 = !value3)"
          :type="value3 ? 'password' : 'text'"
          color="primary"
          placeholder="Re-enter new password"
          required
        >
        </v-text-field>
      </div>

      <!-- button container -->
      <div class="pa-0 mt-5" style="width: 100%">
        <v-btn
          class="primary px-8 mb-5"
          @click="update_password"
          :loading="loading"
          :disabled="loading"
          depressed
          >Save Changes</v-btn
        >
      </div>
    </v-form>
    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img :src="statusImage"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/general/Modal.vue";
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
export default {
  name: "privacyDetails",
  components: { Modal },
  data: function () {
    return {
      loading: false,
      statusImage: null,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      dialog: false,
      dialogMessage: "",
      value1: String,
      value2: String,
      value3: String,
      oldPasswordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          v !== this.newPassword ||
          "old password cannot be the same as new password",
      ],
      newPasswordRules: [
        //verifies password satisfies the requirement
        (v) => !!v || "New password is required",
        (v) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v) ||
          "Password must contain a minimum of 8 character, at least one uppercase, one lowercase, one number",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.newPassword || "Passwords do not match",
      ],
    };
  },
  methods: {
    update_password() {
      this.$refs.form.validate();

      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("settings/resetPassword", {
            old_password: this.oldPassword,
            password: this.newPassword,
            password_confirmation: this.confirmPassword,
          })
          .then(() => {
            this.dialog = true;
            this.loading = false;
            this.statusImage = successImage;
            this.dialogMessage = "Password changed successfully!";
            this.$refs.form.reset();
          })
          .catch((error) => {
            this.dialog = true;
            this.loading = false;
            this.statusImage = failedImage;
            if (error.status == 422) {
              this.dialogMessage = error.data.errors.old_password[0];
            } else if (error.status == 400) {
              this.dialogMessage = error.data.message;
            }
          });
      }
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
.store-width {
  width: 50%;
}
@media (max-width: 950px) {
  .store-width {
    width: 100%;
  }
}
</style>