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
          :rules="inputRules"
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
        <v-btn class="primary px-8 py-5 mb-5" @click="update_password"
          >Save Changes</v-btn
        >
      </div>
    </v-form>
    <!-- modal for dialog messages -->
    <modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
            >mdi-close</v-icon
          >
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>
  </div>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
export default {
  name: "privacyDetails",
  components: {modal},
  data: function () {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      dialog: false,
      dialogMessage: "",
      value1: String,
      value2: String,
      value3: String,
      inputRules: [(v) => !!v || "Password is required"],
      newPasswordRules: [
        //verifies password satisfies the requirement
        (v) => !!v || "New password is required",
        (v) =>
          /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\w\W]{8,30}$/.test(v) ||
          "Password must contain a minimum of 8 character and at least one number",
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

      if(this.$refs.form.validate()){
        this.dialogMessage = "Password changed successfully!"
        this.dialog = true
      }
    },
  },
};
</script>