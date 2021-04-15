<template>
  <!-- main page for layout and dashboard -->
  <div style="height: 100%">
    <div class="bg-color">
      <Layout />
      <v-main>
        <router-view />
      </v-main>
    </div>
    <!--------------------------- Authentication Modal ------------------------------>
    <Modal :dialog="!tokenAuthorize" width="400">
      <div class="white pa-3 pb-3 text-center">
        <div class="nova-logo d-flex align-center justify-center mx-auto my-5">
          <img src="@/assets/img/primary-logo.png" />
        </div>
        <h3 class="pb-0">Token Expired!</h3>

        <!-- error messages -->
        <p v-show="error" class="error--text mt-3 mb-0">
          <span v-html="errorMessage"></span>
        </p>

        <!-- form section-->
        <v-form ref="form">
          <!-- Email Adrress-->
          <v-text-field
            class="onboarding-input mt-5"
            v-model="email"
            :rules="emailRules"
            type="email"
            label="Email"
            color="primary"
            required
            @keyup.enter="$refs.input2.focus"
          ></v-text-field>

          <!-- Password -->
          <v-text-field
            class="onboarding-input mt-5"
            v-model="password"
            :rules="passwordRules"
            type="password"
            label="Password"
            color="primary"
            required
            ref="input2"
            @keyup.enter="validate_form()"
          ></v-text-field>

          <!-- button container -->
          <div class="pa-0 mt-0" style="width: 100%">
            <v-btn
              class="primary px-16 py-6 mb-5 mx-auto"
              @click="validate_form"
              :loading="loading"
              :disabled="loading"
              >Sign In</v-btn
            >
          </div>
        </v-form>
      </div>
    </Modal>
  </div>
</template>

<script>
import Layout from "@/components/layout/Layout.vue";
import Modal from "@/components/general/Modal.vue";
import { mapState } from "vuex";
export default {
  components: {
    Layout,
    Modal,
  },
  data: function () {
    return {
      errorMessage: "",
      error: false,
      loading: false,
      email: "",
      password: "",
      emailRules: [
        // verifies email address satisfies the requirement
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        // verifies password satisfies the requirement
        (v) => !!v || "Password is required",
      ],
    };
  },
  computed: {
    ...mapState({
      tokenAuthorize: (state) => state.onboarding.tokenAuthorize,
    }),
  },
  methods: {
    //validates form
    validate_form() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.signin();
      }
    },
    //Sign in
    signin() {
      this.loading = true;
      this.$store
        .dispatch("onboarding/signIn", {
          email: this.email,
          password: this.password,
          type: "vendor",
        })
        .then((response) => {
          if (response.data.message === "Login successful.") {
            this.$store.commit("onboarding/setTokenAuthorizeStatus", true);
            this.loading = false;
          }
        })
        .catch((error) => {
          this.error = true;
          this.loading = false;
          if (error.response) {
            this.errorMessage = `Incorrect email address or password`;
          } else {
            this.errorMessage = "No internet Connection!";
          }
        });
    },
  },
};
</script>

<style lang="scss">
.bg-color {
  background: #f9fafe 0% 0% no-repeat padding-box;
  opacity: 1;
  height: 100%;
  zoom: 80%;
}
.nova-logo {
  width: 120px;
  img {
    width: 100%;
  }
}
</style>