<template>
  <!-- invite members -->
  <div>
    <div class="invite-body px-4">
      <!-- return button -->
      <router-link :to="{ name: 'teamDetails' }" style="text-decoration: none">
        <h4 class="d-flex align-center return-btn" style="width: 160px">
          <v-icon color="rgba(0, 0, 0, 0.87)">mdi-chevron-left</v-icon>Return to
          Team
        </h4>
      </router-link>

      <v-form ref="form" class="pt-10 pl-2 invite-form">
        <!-- error message -->
        <p class="mb-3 error--text" v-show="showErrorMessage">{{errorMessage}}</p>

        <!-- email field-->
        <div class="mb-5 settings-input">
          <p class="mb-1">Email Address</p>
          <v-text-field
            class="input mt-0"
            v-model="email"
            :rules="emailRules"
            type="email"
            color="primary"
            placeholder="Enter email address"
            required
          >
          </v-text-field>
        </div>

        <!-- assign role -->
        <div class="mb-5 settings-input">
          <p class="mb-1">Assign Role</p>
          <v-select
            class="input mt-0"
            :items="roles"
            v-model="role"
            :rules="roleRules"
            color="primary"
            placeholder="Select role"
            required
            outlined
          >
          </v-select>
        </div>

        <v-btn
          class="primary py-6 px-4"
          @click="submitRepresentative"
          :loading="loading"
          :disabled="loading"
          >Invite new member</v-btn
        >
      </v-form>
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
          <v-img src="@/assets/img/success-img.svg"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/dashboard/Modal.vue";
export default {
  name: "teamInvite",
  components: { Modal },
  data: function () {
    return {
      email: "",
      role: "",
      roles: ["vendor.super-admin", "vendor.admin"],
      emailRules: [
        // verifies email address satisfies the requirement
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      roleRules: [(v) => !!v || "Role is required"],
      dialogMessage: "",
      dialog: false,
      loading: false,
      errorMessage: "",
      showErrorMessage: false
    };
  },
  methods: {
    // invite team member
    submitRepresentative() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
          this.loading = true;
          let getUrl = window.location;
          let baseUrl = getUrl .protocol + "//" + getUrl.host + "/";
        this.$store
          .dispatch("settings/inviteMember", {
            email: this.email,
            role: this.role,
            link: `${baseUrl}signup/team-member/${this.email}`
          })
          .then((response) => {
            if (response.data.message === "Invitation sent successfully.") {
              this.errorMessage = "";
              this.dialog = true;
              this.dialogMessage = `An invite has been sent to ${this.email}`;
              this.$refs.form.reset();
            }
            this.loading = false
          }).catch((error) => {

            if(error.response){
              if(error.response.data.errors.email[0]){
                this.errorMessage= error.response.data.errors.email[0];
              }else {
                this.errorMessage = "Something went wrong, pls try again"
              }
            }else {
              this.errorMessage= "No internet connection!";
            }
            this.showErrorMessage = true
            this.loading = false;
          })
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.return-btn {
  color: #000000;
  .v-icon {
    margin-right: 15px;
  }
}
.invite-form {
  width: 50%;
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
@media (max-width: 950px) {
  .invite-form {
    width: 100%;
  }
}
</style>