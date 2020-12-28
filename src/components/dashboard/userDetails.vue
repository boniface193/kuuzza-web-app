<template>
  <div>
    <!-- user profile -->
    <v-row class="px-4" v-show="!loader">
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
            v-show="editAdminName && !nameLoader"
            @click="editInfo('admin_name')"
            >Done</span
          >

          <span class="edit-btn" v-show="nameLoader == true">
            <v-progress-circular
              indeterminate
              color="primary"
              :size="20"
            ></v-progress-circular>
          </span>
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
            v-show="editPhoneNum && !phoneNumLoader"
            @click="editInfo('phonenum')"
            >Done</span
          >
          <span class="edit-btn" v-show="phoneNumLoader == true">
            <v-progress-circular
              indeterminate
              color="primary"
              :size="32"
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
  </div>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
import { mapGetters } from "vuex";
export default {
  name: "userDetails",
  components: { modal },
  data: function () {
    return {
      dialog: false,
      dialogMessage: "",
      editAdminName: false,
      editPhoneNum: false,
      phoneNumLoader: false,
      nameLoader: false,
      inputRules: [(v) => !!v || "This field is required"],
    };
  },
  computed: {
    ...mapGetters({
      loader: "settings/loader",
    }),
    computedInfo() {
      // gets the values of user information
      let userInfo = this.$store.getters["settings/getUserProfile"];
      let fullName = userInfo.name;
      let phoneNum = userInfo.phone_number;
      let currentFullName = userInfo.name;
      let currentPhoneNum = userInfo.phone_number;
      let currentEmail = userInfo.email;

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
              this.dialog = true;
            })
            .catch((error) => {
              if (error.response) {
                this.dialogMessage = "";
              } else {
                this.dialogMessage = "No internet connection!";
              }
              this.nameLoader = false;
              this.dialog = true;
            });
        } else {
          this.editAdminName = false;
        }
      }

      // check if the edited input field is the admin phone number
      if (
        input_field === "phonenum" &&
        this.computedInfo.currentPhoneNum !== ""
      ) {
        if (this.computedInfo.currentPhoneNum !== this.computedInfo.phoneNum) {
          this.phoneNumLoader = true;
          this.$store
            .dispatch("settings/editUserProfile", {
              phone_number: this.computedInfo.currentPhoneNum,
            })
            .then(() => {
              this.dialogMessage = "Phone number changed successfully!";
              this.editPhoneNum = false;
              this.phoneNumLoader = false;
              this.dialog = true;
            })
            .catch((error) => {
              if (error.response) {
                this.dialogMessage = error.response.data.errors.phone_number[0];
              } else {
                this.dialogMessage = "No internet connection!";
              }
              this.phoneNumLoader = false;
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
    color: #5064cc;
    background: white;
    padding: 5px 0px 0px 5px;
  }
}
@media (max-width: 950px) {
  .store-width {
    width: 100%;
  }
}
</style>