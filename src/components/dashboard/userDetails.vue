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
          :rules="inputRules"
          type="name"
          color="primary"
          value="Ayotunde lanwo"
          :disabled="edit_admin_name == false"
          required
        >
        </v-text-field>
        <span
          class="edit-btn"
          v-show="edit_admin_name == false"
          @click="edit_admin_name = true"
          >Edit</span
        >
        <span class="edit-btn" v-show="edit_admin_name == true" @click="submit_edited_info('admin_name')">Done</span>
      </div>

      <!-- phone number field -->
      <div class="mb-5 settings-input">
        <p class="mb-1 secondary--text">Phone Number</p>
        <v-text-field
          class="input mt-0"
          :rules="inputRules"
          type="tel"
          color="primary"
          value="09013277832"
          :disabled="edit_phonenum == false"
          required
        >
        </v-text-field>
        <span
          class="edit-btn"
          v-show="edit_phonenum == false"
          @click="edit_phonenum = true"
          >Edit</span
        >
        <span class="edit-btn" v-show="edit_phonenum == true" @click="submit_edited_info('phonenum')">Done</span>
      </div>

      <!-- email field -->
      <div class="mb-5 settings-input">
        <p class="mb-1 secondary--text">Email</p>
        <v-text-field
          class="input mt-0"
          :rules="inputRules"
          type="name"
          color="primary"
          value="abdulazeez@brandmobile.net"
          disabled
          required
        >
        </v-text-field>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "userDetails",
  data: function () {
    return {
      edit_admin_name: false,
      edit_phonenum: false,
      inputRules: [(v) => !!v || "This field is required"],
    };
  },
  methods: {
    submit_edited_info(input_field) {
      if (input_field === "admin_name") {
        this.edit_admin_name = false
      }
      if (input_field === "phonenum") {
        this.edit_phonenum = false
      }
    }
  }
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
</style>