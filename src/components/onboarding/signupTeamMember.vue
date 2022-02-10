<template>
  <div>
    <p v-show="error" class="error--text mt-3 mb-0">
      <span v-html="errorMessage"></span>
    </p>

    <!-- first form section-->
    <v-form
      class="flex-wrap"
      ref="form1"
    >
    
      <!-- Email Adrress-->
      <label for="" class="onboarding-input">Email Address</label>
      <v-text-field
        class="onboarding-input"
        v-model="$route.params.email"
        :rules="emailRules"
        type="email"
        outlined
        color="primary"
        required
        disabled
      ></v-text-field>

<div class="d-flex">
      <!-- First Name -->
      <div class="mr-4 ">
          <label for="" class="name-input">First Name</label>
      <v-text-field
        class="name-input"
        v-model="first_name"
        :rules="first_nameRules"
        type="name"
        outlined
        color="primary"
        required
        @keyup.enter="$refs.input2.focus"
      ></v-text-field>
      </div>

     <div>
       <!-- Last Name -->
      <label for="" class="name-input">Last Name</label>
      <v-text-field
        class="name-input mr-5 mt-5"
        v-model="last_name"
        :rules="last_nameRules"
        type="name"
        outlined
        color="primary"
        required
        @keyup.enter="$refs.input4.focus"
        ref="input2"
      ></v-text-field>
      </div>
</div>

 <!-- Phone Number -->
      <label for="" class="onboarding-input">Phone Number</label>
      <div class="onboarding-input phone-field">
        <span class="primary--text phone-format px-3">+234</span>
        <v-text-field
          v-model="phone_number"
          :rules="phoneRules"
          color="primary"
          class="pt-1"
          outlined
          type="tel"
          required
          ref="input4"
          @keyup.enter="validateForm(1)"
        ></v-text-field>
      </div>

      <!-- button container -->
      <div class="pa-0 ">
        <v-btn class="primary" @click="validateForm(1)"
          >Next</v-btn
        >
      </div>
    </v-form>

    <!-- third form section -->
    <v-form
      class="flex-wrap"
      ref="form2"
    >
      <!-- Create password -->
      <label for="" class="onboarding-input">Create Password</label>
      <v-text-field
        class="onboarding-input"
        v-model="create_password"
        :rules="create_passwordRules"
        outlined
        type="password"
        color="primary"
        @keyup.enter="$refs.input10.focus"
        ref="input9"
        required
      ></v-text-field>

      <!-- Confirm password-->
      <label for="" class="onboarding-input">Confirm Password</label>
      <v-text-field
        class="onboarding-input"
        v-model="confirm_password"
        :rules="confirm_passwordRules"
        outlined
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
          class="primary--text"
          style="background: #5064cc26"
          :disabled="loading"
          @click="previousForm(1)"
        >
          Back</v-btn
        >
        <v-btn
          class="primary"
          @click="validateForm(2)"
          :loading="loading"
          :disabled="loading"
          >Complete Sign Up</v-btn
        >
      </div>
    </v-form>

    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog" width="450">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="cancelModal"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img :src="statusImage"></v-img>
        </div>
        <p class="my-3">You have successfully accepted your invite.</p>

        <v-btn
          class="primary mx-auto"
          :loading="loading2"
          :disabled="loading2"
          v-if="dashboardBtn"
          @click="grantAccess"
          >Go to Dashboard</v-btn
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/general/Modal.vue";
import successImage from "@/assets/img/success-img.svg";
//import failedImage from "@/assets/img/failed-img.svg";
export default {
  name: "signupTeamMember",
  components: { Modal },
  data: function () {
    return {
      dashboardBtn: false,
      statusImage: null,
      dialog: false,
      loading2: false,
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
          /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v) ||
          "Password must contain a minimum of 8 character, at least one uppercase, one lowercase, one number",
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
      const params = new URLSearchParams(window.location.search);
      const userId = params.get("invite_id");
      this.loading = true;
      this.$store
        .dispatch("onboarding/inviteTeamMember", {
          first_name: this.first_name,
          last_name: this.last_name,
          phone_number: this.phone_number,
          password: this.create_password,
          password_confirmation: this.confirm_password,
          invite_id: userId,
        })
        .then(() => {
          this.loading = false;
          this.dialog = true;
          this.statusImage = successImage;
          this.dashboardBtn = true;
        })
        .catch((error) => {
          this.error = true;
          this.loading = false;
          if (error.response) {
            if (error.response.data.errors.email[0]) {
              this.errorMessage = error.response.data.errors.email[0];
            } else if (error.response.data.errors.invite_id[0]) {
              this.errorMessage = error.response.data.errors.invite_id[0];
            } else {
              this.errorMessage = "Something went wrong, pls try again!";
            }
          } else {
            this.errorMessage = "No internet Connection!";
          }
        });
    },
    // close Modal
    cancelModal() {
      this.dialog = false;
      this.denialAccess();
    },
    //allows user to access the dashboard
    grantAccess() {
      this.loading2 = true;
      this.$router.push({ name: "dashboard" });
    },
    // destroy token
    denialAccess() {
      this.$store.commit("onboarding/removeToken");
      this.$router.push({ name: "Signin" });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-container {
  width: 60%;
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
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