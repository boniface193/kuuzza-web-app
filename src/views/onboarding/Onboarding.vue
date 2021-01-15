<template>
  <div style="margin: auto; max-width: 1500px">
    <!-- this is the loader visible to the user -->
  <div v-if="isLoading">
  <!-- this image time loader is calculated by the loader to triger the load time -->
  <v-img
      src="@/assets/img/Image2.svg"
      width="5px"
      height="5px"
      @load="onLoad"
    ></v-img>
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </div>
    <!-- loader ends here -->
    <v-main v-else>
      <v-row class="onboarding-container">
        <v-col class="pl-7 pr-7 pt-15 pl-sm-15 pr-sm-0 pb-5 col-12 col-md-6">
          <!-- app logo -->
          <router-link to="/" class="d-flex dark--text app-logo">
            N<v-img src="@/assets/img/fire.svg" max-width="35"></v-img>VA
          </router-link>

          <!-- display this introductory message if the condition is meet -->
          <h1
            class="primary--text mt-5 mb-0"
            v-show="
              ((present_form == 'form1' || present_form == 'form2') &&
                this.$route.name == 'Signup') ||
              this.$route.name == 'signupTeamMember'
            "
          >
            Welcome!
          </h1>

          <!-- display this introductory message if the condition is meet -->
          <h1
            class="primary--text mt-5 mb-0"
            v-show="present_form == 'form3' && this.$route.name == 'Signup'"
          >
            Create your password!
          </h1>

          <!-- display this introductory message if the condition is meet -->
          <h1
            class="primary--text mt-5 mb-0"
            v-show="this.$route.name == 'Signin'"
          >
            Welcome back!
          </h1>

          <!-- display this introductory message if the condition is meet -->
          <h1
            class="primary--text mt-5 mb-0"
            v-show="this.$route.name == 'Recoverpassword'"
          >
            Recover password!
          </h1>

          <!-- display this introductory message if the condition is meet -->
          <h1
            class="primary--text mt-5 mb-0"
            v-show="
              this.$route.name == 'Forgotpassword' ||
              this.$route.name == 'forgotPasswordVerification'
            "
          >
            Forgot password!
          </h1>

          <!-- display this introductory message if the condition is meet -->
          <h1
            class="primary--text mt-5 mb-0"
            v-show="this.$route.name == 'emailVerification'"
          >
            Verify your email address
          </h1>

          <!-- display this message if the condition is meet -->
          <p
            class="mt-5 mb-0"
            v-show="
              (present_form == 'form1' || present_form == 'form2') &&
              (this.$route.name == 'Signin' || this.$route.name == 'Signup')
            "
          >
            Do you want to amplify your performance and grow sales?
          </p>

          <!-- route view for pages (signup, signin, recoverpassowrd)-->
          <router-view />
        </v-col>

        <!-- banner -->
        <v-col class="col-6 banner d-none d-md-block">
          <v-img
            src="@/assets/img/Image2.svg"
            width="100%;"
            height="100%"
          ></v-img>
          <div class="mask d-flex align-center pl-10">
            <!-- display message if condition is true -->
            <p
              v-show="
                ((present_form == 'form1' || present_form == 'form2') &&
                  this.$route.name == 'Signup') ||
                this.$route.name == 'Signin' ||
                this.$route.name == 'Forgotpassword' ||
                this.$route.name == 'Recoverpassword'
              "
              class="white--text"
            >
              Learn, Compete… Grow
            </p>

            <!-- display message if condition is true -->
            <p
              v-show="
                (present_form == 'form3' && this.$route.name == 'Signup') ||
                this.$route.name == 'emailVerification' ||
                this.$route.name == 'forgotPasswordVerification' ||
                this.$route.name == 'signupTeamMember'
              "
              class="white--text"
              style="width: 70%"
            >
              <span class="float-left" style="width: 100%"
                >Amplify Performance</span
              ><br />
              <span class="float-right">Grow Sales</span>
            </p>
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
  data(){
    return {
      isFinishedLoading: false,
      isLoading: true,
    }
  },
  computed: {
    ...mapState({
      present_form: (state) => state.onboarding.present_signup_form,
    }),
  },

 methods: {
  onLoad() {
    this.isLoading ? this.isLoading = false : this.isLoading = true
    
  },  
}
};
</script>

<style lang="scss">
.onboarding-container {
  flex-wrap: nowrap !important;
  overflow: hidden i !important;
  .onboarding-input {
    width: 60% !important;
    flex: none !important;
  }
  .name-input {
    width: 45% !important;
    flex: none !important;
  }
  .app-logo {
    font-size: 40px;
    font-weight: bold;
    color: #000000;
    align-items: baseline;
    text-decoration: none;
    width: 120px;
  }
  .banner {
    position: relative;
    overflow: hidden;
    border-bottom-left-radius: 70px !important;
    transform: rotate(45deg);
    margin-left: 13%;
    height: 750px;
    .v-image {
      transform: rotate(-45deg);
    }
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-attachment: fixed;
    background: transparent linear-gradient(253deg, #52f1ec80 0%, #297976 100%);
    p {
      font-size: 35px;
      transform: rotate(-45deg);
      margin-top: 50%;
    }
  }
  .v-btn {
    text-transform: capitalize;
  }
}
@media (max-width: 1100px) {
  .onboarding-container {
    .name-input,
    .onboarding-input {
      width: 80% !important;
    }
  }
}
@media (max-width: 550px) {
  .onboarding-container {
    .onboarding-input,
    .name-input {
      width: 100% !important;
    }
  }
}
</style>