<template>
  <!-- user profile -->
  <v-row class="px-4">
    <v-col class="col-12 col-md-5 pt-9 text-center">
      <h3>Your Profile</h3>
      <div class="profile-img my-5">
        <v-img src="@/assets/img/user-profile.svg"></v-img>
      </div>
      <h4>Ayotunde Lanwo</h4>
      <p class="secondary--text">Store Manager</p>
      <a class="primary--text" style="text-decoration: underline"
        >Change profile picture</a
      >
    </v-col>

    <!-- user credential section -->
    <v-col
      class="col-12 col-md-7 pl-md-7 pr-md-10 pt-9 pb-16 px-4"
      style="border-left: 1px solid #f1edec"
    >
      <!-- full name field -->
      <div class="mb-5 settings-input">
        <p class="mb-1 secondary--text">Full Name</p>
        <v-text-field
          class="input mt-0"
          v-model="computedInfo.currentFullName"
          :rules="inputRules"
          type="name"
          color="primary"
          :disabled="editAdminName == false"
          required
        >
        </v-text-field>
        <span
          class="edit-btn"
          v-show="editAdminName == false"
          @click="editAdminName = true"
          >Edit</span
        >
        <span
          class="edit-btn"
          v-show="editAdminName == true"
          @click="submitEditedInfo('admin_name')"
          >Done</span
        >
      </div>

      <!-- phone number field -->
      <div class="mb-5 settings-input">
        <p class="mb-1 secondary--text">Phone Number</p>
        <v-text-field
          class="input mt-0"
          :rules="inputRules"
          v-model="computedInfo.currentPhoneNum"
          type="tel"
          color="primary"
          :disabled="editPhoneNum == false"
          required
        >
        </v-text-field>
        <span
          class="edit-btn"
          v-show="editPhoneNum == false"
          @click="editPhoneNum = true"
          >Edit</span
        >
        <span
          class="edit-btn"
          v-show="editPhoneNum == true"
          @click="submitEditedInfo('phonenum')"
          >Done</span
        >
      </div>

      <!-- email field -->
      <div class="mb-5 settings-input">
        <p class="mb-1 secondary--text">Email</p>
        <v-text-field
          class="input mt-0"
          :rules="inputRules"
          type="name"
          color="primary"
          v-model="computedInfo.currentEmail"
          disabled
          required
        >
        </v-text-field>
      </div>
    </v-col>
    <!-- modal for dialog messages -->
    <modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img src="@/assets/img/success-img.svg"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>
  </v-row>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
export default {
  name: "userDetails",
  components: { modal },
  data: function () {
    return {
      dialog: false,
      dialogMessage: "",
      editAdminName: false,
      editPhoneNum: false,
      inputRules: [(v) => !!v || "This field is required"],
    };
  },
  computed: {
    computedInfo() {
      // gets the values of user information
      //let user_info = this.$store.getters["admin/user_info"];
      let fullName = "Ayotunde lanwo";
      let phoneNum = "09087651234";
      let currentFullName = "Ayotunde lanwo";
      let currentPhoneNum = "09087651234";
      let currentEmail = "abdulazeez@brandmobile.net";

      return {
        fullName: fullName,
        phoneNum: phoneNum,
        currentFullName: currentFullName,
        currentPhoneNum: currentPhoneNum,
        currentEmail: currentEmail,
      };
    },
  },
  methods: {
    // submits the edited information
    submitEditedInfo(input_field) {
      if (
        input_field === "admin_name" &&
        this.computedInfo.currentFullName !== ""
      ) {
        this.editAdminName = false;

        if (
          this.computedInfo.currentFullName !== this.computedInfo.fullName
        ) {
          this.dialogMessage = "Name changed successfully!";
          this.dialog = true;
        }
      }

      if (
        input_field === "phonenum" &&
        this.computedInfo.currentPhoneNum !== ""
      ) {
        this.editPhoneNum = false;
        if (
          this.computedInfo.currentPhoneNum !== this.computedInfo.phoneNum
        ) {
          this.dialogMessage = "Phone number changed successfully!";
          this.dialog = true;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .v-image {
    width: 100%;
    height: 100%;
  }
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
</style>