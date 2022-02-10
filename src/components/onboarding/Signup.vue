<template>
  <div>
    <!-- error placeholder -->
    <p v-show="error" class="error--text mt-3">
      <span v-html="errorMessage"></span>
    </p>

    <!-- first form section-->
    <v-form
      class="flex-wrap"
      ref="form1"
      :class="{
        'd-none': present_form != 'form1',
        'd-block': present_form == 'form1',
      }"
    >
      <p class="forgot-pwd font-weight-bold mb-8">
        Step 1: Personal information
      </p>
      <div class="d-flex">
        <!-- First Name -->
        <div class="mr-4">
          <label for="" class="name-input">First Name</label>
          <v-text-field
            class="name-input"
            v-model="first_name"
            :rules="first_nameRules"
            outlined
            type="name"
            color="primary"
            required
            @keyup.enter="$refs.input2.focus"
          ></v-text-field>
        </div>

        <div>
          <!-- Last Name -->
          <label for="" class="name-input">Last Name</label>
          <v-text-field
            class="name-input"
            v-model="last_name"
            :rules="last_nameRules"
            type="name"
            outlined
            color="primary"
            required
            @keyup.enter="$refs.input3.focus"
            ref="input2"
          ></v-text-field>
        </div>
      </div>

      <!-- Email Adrress-->
      <label for="" class="onboarding-input">Email Address</label>
      <v-text-field
        class="onboarding-input"
        v-model="email"
        :rules="emailRules"
        type="email"
        outlined
        color="primary"
        required
        @keyup.enter="$refs.input4.focus"
        ref="input3"
      ></v-text-field>

      <!-- Phone Number -->
      <label for="" class="onboarding-input">Phone Number</label>
      <div class=" phone-field">
        <span class="primary--text phone-format px-3">+234</span>
        <v-text-field
          v-model="phone_number"
          :rules="phoneRules"
          color="primary"
          class="pt-1 onboarding-input"
          outlined
          type="tel"
          required
          ref="input4"
          @keyup.enter="validateForm(1)"
        ></v-text-field>
      </div>

      <!-- button container -->
      <div class="pa-0">
        <v-btn
          class="primary"
          @click="validateForm(1)"
          :loading="loading2"
          :disabled="loading2"
          >Next</v-btn
        >
        <!-- signin link -->
        <p>
          Already have an account?
          <router-link to="/signin" style="text-decoration: none"
            >Sign In</router-link
          >
        </p>
      </div>
    </v-form>

    <!-- second form section -->
    <v-form
      class="flex-wrap"
      ref="form2"
      :class="{
        'd-none': present_form != 'form2',
        'd-block': present_form == 'form2',
      }"
    >
      <p class="forgot-pwd font-weight-bold mb-8">
        Step 2: Company information
      </p>
      <!-- company name -->
      <label for="" class="onboarding-input">Company Name</label>
      <v-text-field
        class="onboarding-input"
        v-model="company_name"
        :rules="company_nameRules"
        type="address"
        outlined
        color="primary"
        @keyup.enter="$refs.autocomplete.focus"
        ref="input5"
        required
      ></v-text-field>

      <!-- company address -->
      <label for="" class="onboarding-input">Company Address</label>
      <v-text-field
        class="onboarding-input"
        v-model="company_address"
        :rules="address_nameRules"
        type="text"
        outlined
        color="primary"
        required
        ref="autocomplete"
        id="autocomplete"
        @keyup.enter="validateForm(2)"
      ></v-text-field>

      <!-- button conatainer -->
      <div class="d-flex justify-space-between btn-container">
        <v-btn class="primary--text light-background " @click="previousForm(2)">
          Back</v-btn
        >
        <v-btn class="primary" @click="validateForm(2)">Next</v-btn>
      </div>
    </v-form>

    <!-- third form section -->
    <v-form
      class="flex-wrap"
      ref="form3"
      :class="{
        'd-none': present_form != 'form3',
        'd-block': present_form == 'form3',
      }"
    >
      <p class="forgot-pwd font-weight-bold mb-8">Step 3: Create password</p>
      <!-- Create password -->
      <label for="" class="onboarding-input">Create Password</label>
      <v-text-field
        class="onboarding-input"
        v-model="create_password"
        :rules="create_passwordRules"
        outlined
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (showPassword = !showPassword)"
        :type="showPassword ? 'password' : 'text'"
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
        :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (showConfirmPassword = !showConfirmPassword)"
        :type="showConfirmPassword ? 'password' : 'text'"
        color="primary"
        required
        ref="input10"
        @keyup.enter="validateForm(3)"
      ></v-text-field>

      <div class="d-flex align-center">
        <v-checkbox v-model="acceptTerms" class="mr-1"></v-checkbox>
        <p class="" style="">
          I agree to Kuuzza
          <a
            style="text-decoration: none"
            :href="`${websiteBaseURL}/vendor/terms-conditions`"
            target="_blank"
            class="primary--text"
          >
            Terms of service
          </a>
          and
          <a
            style="text-decoration: none"
            :href="`${websiteBaseURL}/privacy-policy`"
            target="_blank"
            class="primary--text"
          >
            privacy policy</a
          >
        </p>
      </div>

      <!-- button container -->
      <div class="d-flex justify-space-between btn-container">
        <!-- goto prev form btn -->
        <v-btn
          class="primary--text light-background"
          :disabled="loading"
          @click="previousForm(3)"
        >
          Back</v-btn
        >
        <!-- goto next form btn -->
        <v-btn
          class="primary"
          @click="validateForm(3)"
          :loading="loading"
          :disabled="loading || !acceptTerms || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(create_password) || confirm_password !== create_password"
          width="200px"
          >Complete Sign Up</v-btn
        >
      </div>
    </v-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { search } from "@/helpers/general.js";
export default {
  name: "Signup",
  data: function () {
    return {
      websiteBaseURL: process.env.VUE_APP_WEBSITE_BASE_URL,
      loading: false,
      loading2: false,
      errorMessage: "",
      error: false,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      company_name: "",
      company_address: "",
      lat: "",
      lng: "",
      state: null,
      validAddress: false,
      autocomplete: "",
      create_password: "",
      confirm_password: "",
      acceptTerms: false,
      showPassword: true,
      showConfirmPassword: true,
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
        (v) => !!v || "This field is required",
        (v) => v.substring(0, 1) != 0 || "Phone number cannot begin with 0",
        (v) => v.length > 9 || "Number should be 10 digits",
        (v) => v.length < 11 || "Maximum of 10 digits is allowed",
      ],
      company_nameRules: [
        //verifies comapany name satisfies the requirement
        (v) => !!v || "Company Name is required",
      ],
      // country_nameRules: [(v) => !!v || "Country is required"],
      // state_nameRules: [(v) => !!v || "State is required"],
      address_nameRules: [
        //verifies comapany address satisfies the requirement
        (v) => !!v || "Company address is required",
        () => this.validAddress || "Select a valid Address",
      ],
      create_passwordRules: [
        //verifies password satisfies the requirement
        (v) => !!v || "Password is required",
        (v) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v) ||
          "Password must contain a minimum of 8 character, at least one uppercase, one lowercase, one number",
      ],
      confirm_passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v === this.create_password || "Passwords do not match",
      ],
    };
  },
  computed: {
    //get state properties from vuex store to know the present form
    ...mapState({
      present_form: (state) => state.onboarding.present_signup_form,
    }),
  },
  mounted() {
    // google autocomplete for places
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(6.5244, 3.3792)
        ),
        componentRestrictions: { country: ["NG"] },
        fields: ["geometry", "name", "formatted_address", "address_components"],
      }
    );
    this.autocomplete.addListener("place_changed", this.onPlaceChanged);
  },
  methods: {
    // on google autocomplete selection
    onPlaceChanged() {
      let place = this.autocomplete.getPlace();
      if (!place.geometry) {
        // User did not select a prediction; reset the input field
        this.validAddress = false;
      } else {
        //Display details about the valid place
        this.validAddress = true;
        this.company_address = place.name + " " + place.formatted_address;
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        this.state = search(
          "administrative_area_level_1",
          place.address_components
        ).long_name;
        this.state = this.formatState(this.state);
      }
    },
    formatState(state) {
      if (state == "Federal Capital Territory") {
        return "ABUJA";
      } else {
        let capitalState = state.toUpperCase();
        return capitalState.replace(/ +/g, "_");
      }
    },
    // validate form and goto to next form
    validateForm(form_num) {
      this.$refs[`form${form_num}`].validate();
      if (this.$refs[`form${form_num}`].validate()) {
        if (form_num == 3) {
          if (this.acceptTerms) {
            this.submit();
          }
        } else if (form_num == 1) {
          this.loading2 = true;
          this.$store
            .dispatch("onboarding/checkAccount", {
              email: this.email,
            })
            .then(() => {
              this.error = false;
              this.loading2 = false;
              this.errorMessage = "";
              this.$store.commit(
                "onboarding/present_signup_form",
                `form${form_num + 1}`
              );
            })
            .catch((error) => {
              this.error = true;
              this.loading2 = false;
              if (error.status == 422) {
                this.errorMessage = error.data.errors.email[0];
              } else if (error.status == 400) {
                this.errorMessage = error.data.message;
              } else if (error.status == 404) {
                this.errorMessage = "404 not found";
              } else if (error.status == 500) {
                this.errorMessage = "Something went wrong, please try again";
              } else if (!navigator.onLine) {
                this.errorMessage = "No internet connection!";
              }
            });
        } else if (form_num == 2 && this.validAddress) {
          this.$store.commit(
            "onboarding/present_signup_form",
            `form${form_num + 1}`
          );
        }
      }
    },
    // go to previous form
    previousForm(form_num) {
      this.$store.commit(
        "onboarding/present_signup_form",
        `form${form_num - 1}`
      );
    },
    getUserDetails() {
      let userDetails = { company_location: {} };
      userDetails.first_name = this.first_name;
      userDetails.last_name = this.last_name;
      userDetails.email = this.email;
      userDetails.phone_number =
        this.phone_number.substring(0, 1) == "0"
          ? "+234" + this.phone_number.substring(1)
          : "+234" + this.phone_number;
      userDetails.company_name = this.company_name;
      userDetails.company_location.address = this.company_address;
      userDetails.company_location.lat = this.lat;
      userDetails.company_location.lng = this.lng;
      userDetails.company_location.state = this.state;
      (userDetails.password = this.create_password),
        (userDetails.password_confirmation = this.confirm_password);

      if (this.$route.name == "fmcgSignup") {
        userDetails.is_fmcg = true;
      }

      return userDetails;
    },
    //submit form and create an account
    submit() {
      this.loading = true;
      this.$store
        .dispatch("onboarding/register", this.getUserDetails())
        .then((response) => {
          this.loading = false;
          if (response.data.message === "Registeration successful.") {
            this.$store.commit("onboarding/present_signup_form", "form1");
            this.$router.push({
              name: "EmailVerification",
              params: {
                email: this.email,
              },
            });
          }
        })
        .catch((error) => {
          this.error = true;
          this.loading = false;

          if (error.status == 422) {
            this.errorMessage = error.data.errors.email[0];
          } else if (error.status == 400) {
            this.errorMessage = error.data.message;
          } else if (error.status == 404) {
            this.errorMessage = "404 not found";
          } else if (error.status == 500) {
            this.errorMessage = "Something went wrong, please try again";
          } else if (!navigator.onLine) {
            this.errorMessage = "No internet connection!";
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-container {
  width: 476px !important;
}
.phone-field {
  position: relative;
}
.phone-format {
  position: absolute;
  margin-top: 20px;
  left: 0px;
}
@media (max-width: 1100px) {
  .btn-container {
    width: 476px !important;
  }
}
@media (max-width: 550px) {
  .btn-container {
    width: 100% !important;
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
  padding-left: 0px !important;
}
</style>