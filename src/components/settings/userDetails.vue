<template>
  <div>
    <!-- user profile -->
    <v-row class="px-4" v-show="!loader">
      <v-col class="col-12 col-md-5 pt-9 text-center">
        <h3>Your Profile</h3>
        <div class="profile-img my-5">
          <v-img src="@/assets/img/user-profile.svg"></v-img>
        </div>
        <h4>{{ userInfo.name }}</h4>
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
          <!-- edit btn -->
          <span
            class="edit-btn"
            v-show="editAdminName == false"
            @click="editAdminName = true"
            >Edit</span
          >
          <!-- done btn -->
          <span
            class="edit-btn"
            v-show="editAdminName && !nameLoader"
            @click="editInfo('admin_name')"
            >Done</span
          >
          <!-- loader -->
          <span class="edit-btn" v-show="nameLoader == true">
            <v-progress-circular
              indeterminate
              color="primary"
              :size="20"
            ></v-progress-circular>
          </span>
        </div>

        <!-- phone number field -->
        <div class="mb-5 settings-input phone-field">
          <span class="primary--text phone-format">+234</span>
          <p class="mb-1 secondary--text">Phone Number</p>
          <v-text-field
            class="input mt-0"
            :rules="phoneRules"
            v-model="computedInfo.currentPhoneNum"
            type="tel"
            color="primary"
            :disabled="editPhoneNum == false"
            required
          >
          </v-text-field>
          <!-- edit btn -->
          <span
            class="edit-btn"
            v-show="editPhoneNum == false"
            @click="editPhoneNum = true"
            >Edit</span
          >
          <!-- done btn -->
          <span
            class="edit-btn"
            v-show="editPhoneNum && !phoneNumLoader"
            @click="editInfo('phonenum')"
            >Done</span
          >
          <!-- loader -->
          <span class="edit-btn" v-show="phoneNumLoader == true">
            <v-progress-circular
              indeterminate
              color="primary"
              :size="20"
            ></v-progress-circular>
          </span>
        </div>

        <!-- email field -->
        <div class="mb-5 settings-input">
          <p class="mb-1 secondary--text">Email</p>
          <v-text-field
            class="input mt-0"
            :rules="inputRules"
            type="email"
            color="primary"
            v-model="computedInfo.currentEmail"
            disabled
            required
          >
          </v-text-field>
        </div>
      </v-col>
    </v-row>

    <!-- loader -->
    <div class="loader-body text-center pt-10" v-show="loader">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

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
import Modal from "@/components/dashboard/Modal.vue";
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
import { mapGetters } from "vuex";
export default {
  name: "userDetails",
  components: { Modal },
  data: function () {
    return {
      statusImage: null,
      dialog: false,
      dialogMessage: "",
      editAdminName: false,
      editPhoneNum: false,
      phoneNumLoader: false,
      nameLoader: false,
      inputRules: [(v) => !!v || "This field is required"],
      phoneRules: [
        //verifies phone number satisfies the requirement
        (v) => !!v || "This field is required",
        (v) => v.substring(0, 1) != 0 || "Phone number cannot begin with 0",
        (v) => v.length > 9 || "Number should 10 digits or more",
        (v) => v.length <= 11 || "Maximum 11 digits or more",
      ],
    };
  },
  computed: {
    ...mapGetters({
      loader: "settings/loader",
      userInfo: "settings/getUserProfile",
    }),
    computedInfo() {
      // gets the values of user information
      let fullName = this.userInfo.name;
      let phoneNum = this.userInfo.phone_number.substring(4);
      let currentFullName = this.userInfo.name;
      let currentPhoneNum = this.userInfo.phone_number.substring(4);
      let currentEmail = this.userInfo.email;

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
    editInfo(input_field) {
      // check if the edit input field is the admin name
      if (
        input_field === "admin_name" &&
        this.computedInfo.currentFullName !== ""
      ) {
        if (this.computedInfo.currentFullName !== this.computedInfo.fullName) {
          this.nameLoader = true;
          this.$store
            .dispatch("settings/editUserProfile", {
              name: this.computedInfo.currentFullName,
            })
            .then(() => {
              this.dialogMessage = "Name changed successfully!";
              this.editAdminName = false;
              this.nameLoader = false;
              this.statusImage = successImage;
              this.dialog = true;
            })
            .catch((error) => {
              if (error.response) {
                this.dialogMessage = "";
              } else {
                this.dialogMessage = "No internet connection!";
              }
              this.nameLoader = false;
              this.statusImage = failedImage;
              this.dialog = true;
            });
        } else {
          this.editAdminName = false;
        }
      }

      // check if the edited input field is the admin phone number
      if (
        input_field === "phonenum" &&
        this.computedInfo.currentPhoneNum.length > 9 &&
        this.computedInfo.currentPhoneNum.length <= 11 &&
        this.computedInfo.currentPhoneNum.substring(0, 1) != "0"
      ) {
        if (this.computedInfo.currentPhoneNum !== this.computedInfo.phoneNum) {
          this.phoneNumLoader = true;
          this.$store
            .dispatch("settings/editUserProfile", {
              phone_number:
                this.computedInfo.currentPhoneNum.substring(0, 1) == "0"
                  ? "+234" + this.computedInfo.currentPhoneNum.substring(1)
                  : "+234" + this.computedInfo.currentPhoneNum,
            })
            .then(() => {
              this.dialogMessage = "Phone number changed successfully!";
              this.editPhoneNum = false;
              this.phoneNumLoader = false;
              this.statusImage = successImage;
              this.dialog = true;
            })
            .catch((error) => {
              if (error.response) {
                this.dialogMessage = error.response.data.errors.phone_number[0];
              } else {
                this.dialogMessage = "No internet connection!";
              }
              this.phoneNumLoader = false;
              this.statusImage = failedImage;
              this.dialog = true;
            });
        } else {
          this.editPhoneNum = false;
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
.store-width {
  width: 50%;
}
.settings-input {
  position: relative;
  .edit-btn {
    position: absolute;
    bottom: 25px;
    right: 0;
    cursor: pointer;
    color: var(--v-primary-base);
    background: white;
    padding: 5px 0px 0px 5px;
  }
}
.phone-format {
  position: absolute;
  margin-top: 44px;
  left: 0px;
}
@media (max-width: 950px) {
  .store-width {
    width: 100%;
  }
}
</style>
<style lang="scss">
.phone-field
  > .v-text-field
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot {
  padding-left: 40px;
}
.phone-field > .v-input .v-label {
  padding-left: 40px;
}
.phone-field > .v-text-field .v-label--active {
  padding-left: 0px;
}
</style>