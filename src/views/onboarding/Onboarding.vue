<template>
  <div class="custom-container">
    <!-- this is the loader visible to the user -->
    <div v-if="isLoading">
      <!-- this image time loader is calculated by the loader to triger the load time -->
      <v-img
        src="@/assets/img/Image2.svg"
        width="5px"
        height="5px"
        @load="onLoad"
      ></v-img>
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <!-- loader ends here -->
    <v-main v-else>
      <v-row class="justify-center">
        <v-col class="pt-15 col-8 col-md-8 ">
          <!-- app logo -->
          <router-link to="/" class="">
            <div class="kuuzza-logo">
              <img src="@/assets/img/primary-logo.png" alt="" />
            </div>
          </router-link>

          <!-- display this introductory message if the condition is meet -->
          <h1
            class="mb-0"
            v-show="
              (present_form == 'form1' || present_form == 'form3' || present_form == 'form2') && 
              (this.$route.name == 'Signup' ||
                this.$route.name == 'fmcgSignup' ||
                this.$route.name == 'signupTeamMember')
            "
          >
            Welcome!
          </h1>

          <!-- display this introductory message if the condition is meet -->
          <h1 class="mt-5 mb-0" v-show="this.$route.name == 'Signin'">
            Welcome back!
          </h1>

          <!-- display this introductory message if the condition is meet -->
          <h1 class="mt-5 mb-0" v-show="this.$route.name == 'RecoverPassword'">
            Recover password!
          </h1>

          <!-- display this introductory message if the condition is meet -->
          <h1
            class="mt-5 mb-0"
            v-show="
              this.$route.name == 'ForgotPassword' ||
              this.$route.name == 'ForgotPasswordVerification'
            "
          >
            Forgot password!
          </h1>

          <!-- display this introductory message if the condition is meet -->
          <h1
            class="mt-5 mb-0"
            v-show="this.$route.name == 'EmailVerification'"
          >
            Verify your email address
          </h1>

          <!-- display this message if the condition is meet -->
          <p
            class="mb-0"
            v-show="
              (present_form == 'form1' || present_form == 'form2') &&
              (this.$route.name == 'Signin' ||
                this.$route.name == 'Signup' ||
                'fmcgSignup')
            "
          >
            Tap into our decentralised sales force and watch your business
            scale!
          </p>

          <!-- route view for pages (signup, signin, recoverpassowrd)-->
          <router-view class="top-space"/>
        </v-col>

        <!-- banner -->
        <v-col class="col-4 d-none d-md-block pa-0">
          <v-img
            src="@/assets/img/sidePhoto.svg" height="100%"
          ></v-img>
          <div class="show-text">
            <!-- display message if condition is true -->
            <p
              v-show="
                ((present_form == 'form1' || present_form == 'form2') &&
                  (this.$route.name == 'Signup' || 'fmcgSignup')) ||
                this.$route.name == 'Signin' ||
                this.$route.name == 'ForgotPassword' ||
                this.$route.name == 'RecoverPassword'
              "
            >
              Maximise Inventory, Boost <br />
              Sales!
            </p>

            <span v-show="
                ((present_form == 'form1' || present_form == 'form2') &&
                  (this.$route.name == 'Signup' || 'fmcgSignup')) ||
                this.$route.name == 'Signin' ||
                this.$route.name == 'ForgotPassword' ||
                this.$route.name == 'RecoverPassword'
              " class="show-text__imgText">Tap into our decentralised sales force and watch your business scale!</span>

            <!-- display message if condition is true -->
            <p
              v-show="
                (present_form == 'form3' &&
                  (this.$route.name == 'Signup' || 'fmcgSignup')) ||
                this.$route.name == 'EmailVerification' ||
                this.$route.name == 'ForgotPasswordVerification' ||
                this.$route.name == 'signupTeamMember'
              "
            >
              Maximise Inventory, Boost <br />
              Sales!
            </p>
            <span v-show="
                (present_form == 'form3' &&
                  (this.$route.name == 'Signup' || 'fmcgSignup')) ||
                this.$route.name == 'EmailVerification' ||
                this.$route.name == 'ForgotPasswordVerification' ||
                this.$route.name == 'signupTeamMember'
              " class="show-text__imgText">Tap into our decentralised sales force and watch your business scale!</span>
          </div>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Signup",
  // get state properties from vuex store
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState({
      present_form: (state) => state.onboarding.present_signup_form,
    }),
  },

  methods: {
    onLoad() {
      this.isLoading ? (this.isLoading = false) : (this.isLoading = true);
    },
  },
};
</script>

<style lang="scss">
@import './Onboarding';
</style>