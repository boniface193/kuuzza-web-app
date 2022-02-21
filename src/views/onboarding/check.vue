<template>
  <div>
    <v-row>
      <v-col cols="8" class="primary" style="height: 100vh">
      <v-container>
        <router-link to="/" class="d-flex dark--text">
            <div class="kuuzza-logo d-flex align-center">
              <img src="@/assets/img/primary-logo.png" alt="" />
            </div>
          </router-link>

                    <!-- display this introductory message if the condition is meet -->
          <h1
            class="mt-5 mb-0"
            v-show="
              (present_form == 'form1' || present_form == 'form2') &&
              (this.$route.name == 'Signup' ||
                this.$route.name == 'fmcgSignup' ||
                this.$route.name == 'signupTeamMember')
            "
          >
            Welcome!
          </h1>

          <!-- display this introductory message if the condition is meet -->
          <h1
            class="mt-5 mb-0"
            v-show="
              present_form == 'form3' &&
              (this.$route.name == 'Signup' || 'fmcgSignup')
            "
          >
            Create your password!
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
            class="mt-5 mb-0 text-caption"
            v-show="
              (present_form == 'form1' || present_form == 'form2') &&
              (this.$route.name == 'Signin' ||
                this.$route.name == 'Signup' ||
                'fmcgSignup')
            "
          >
            Do you want to amplify your performance and grow sales? <br />
            Tap into our decentralised sales force and watch your business
            scale!
          </p>
        <!-- route view for pages (signup, signin, recoverpassowrd)-->
        <router-view />
        </v-container>
      </v-col>
      <v-col cols="4" class="secondary pa-0">
          <v-img src="../../assets/img/sidePhoto.svg" height="100%" style="overflow-y: hidden;"></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.kuuzza-logo {
    width: 160px;
    img {
      width: 100px;
      height: 32.1px;
    }
}
    .left-conner {
    background: url(../../assets/img/sidePhoto.svg);
    background-repeat: no-repeat;
    height: 720px;
    background-size: auto;
    width: 100%;
        p {
      font-size: 35px;
      margin-top: 50%;
    }
      .v-btn {
    text-transform: capitalize;
  }
    }
</style>