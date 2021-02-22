<template>
  <div>
    <p v-show="error" class="error--text mt-3 mb-0">
      <span v-html="errorMessage"></span>
    </p>

    <!-- first form section-->
    <v-form
      class="flex-wrap"
      ref="form1"
      :class="{
        'd-none': present_form != 'form1',
        'd-flex': present_form == 'form1',
      }"
    >
      <!-- First Name -->
      <v-text-field
        class="name-input mr-5 mt-5"
        v-model="first_name"
        :rules="first_nameRules"
        type="name"
        label="First Name"
        color="primary"
        required
        @keyup.enter="$refs.input2.focus"
      ></v-text-field>

      <!-- Last Name -->
      <v-text-field
        class="name-input mr-5 mt-5"
        v-model="last_name"
        :rules="last_nameRules"
        type="name"
        label="Last Name"
        color="primary"
        required
        @keyup.enter="$refs.input3.focus"
        ref="input2"
      ></v-text-field>

      <!-- Email Adrress-->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="email"
        :rules="emailRules"
        type="email"
        label="Email"
        color="primary"
        required
        @keyup.enter="$refs.input4.focus"
        ref="input3"
      ></v-text-field>

      <!-- Phone Number -->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="phone_number"
        :rules="phoneRules"
        label="Phone Number"
        color="primary"
        type="tel"
        required
        ref="input4"
        @keyup.enter="validate_form(1)"
      ></v-text-field>

      <!-- button container -->
      <div class="pa-0 mt-5" style="width: 100%">
        <v-btn
          class="primary px-8 py-5 mb-5"
          @click="validate_form(1)"
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
        'd-flex': present_form == 'form2',
      }"
    >
      <!-- company name -->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="company_name"
        :rules="company_nameRules"
        type="address"
        label="Company Name"
        color="primary"
        @keyup.enter="$refs.autocomplete.focus"
        ref="input5"
        required
      ></v-text-field>

      <!-- country
      <v-select
        class="onboarding-input mr-5 mt-5"
        :items="countries"
        item-text="country"
        item-value="country"
        v-model="country"
        label="Country"
        :rules="country_nameRules"
        color="primary"
        @change="get_states"
        @keyup.enter="$refs.input7.focus"
        ref="input6"
        required
      ></v-select>

      
      <v-select
        class="onboarding-input mr-5 mt-5"
        :items="states"
        v-model="state"
        label="State"
        :rules="state_nameRules"
        color="primary"
        @keyup.enter="$refs.input8.focus"
        ref="input7"
        required
      ></v-select> -->

      <!-- company address -->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="company_address"
        :rules="address_nameRules"
        type="text"
        label="Company Address"
        color="primary"
        required
        ref="autocomplete"
        id="autocomplete"
        @keyup.enter="validate_form(2)"
      ></v-text-field>

      <!-- button conatainer -->
      <div
        class="pa-0 mt-5 d-flex justify-space-between align-center btn-container"
      >
        <v-btn
          class="primary--text mb-5 mb-0 px-1 py-2"
          style="background: #5064cc26"
          @click="previousForm(2)"
        >
          Back</v-btn
        >
        <v-btn class="primary px-8 py-5 mb-5" @click="validate_form(2)"
          >Next</v-btn
        >
      </div>
    </v-form>

    <!-- third form section -->
    <v-form
      class="flex-wrap"
      ref="form3"
      :class="{
        'd-none': present_form != 'form3',
        'd-flex': present_form == 'form3',
      }"
    >
      <!-- Create password -->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="create_password"
        :rules="create_passwordRules"
        label="Create Password"
        type="password"
        color="primary"
        @keyup.enter="$refs.input10.focus"
        ref="input9"
        required
      ></v-text-field>

      <!-- Confirm password-->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="confirm_password"
        :rules="confirm_passwordRules"
        label="Confirm Password"
        type="password"
        color="primary"
        required
        ref="input10"
        @keyup.enter="validate_form(3)"
      ></v-text-field>

      <!-- button container -->
      <div
        class="pa-0 mt-5 d-flex justify-space-between align-center btn-container"
      >
        <v-btn
          class="primary--text mb-5 mb-0 px-1 py-2"
          style="background: #5064cc26"
          :disabled="loading"
          @click="previousForm(3)"
        >
          Back</v-btn
        >
        <v-btn
          class="primary px-8 py-5 mb-5"
          @click="validate_form(3)"
          :loading="loading"
          :disabled="loading"
          >Complete Sign Up</v-btn
        >
      </div>
    </v-form>
  </div>
</template>
<script>
//import countries from "@/assets/data/countries.js";
import { mapState } from "vuex";
export default {
  name: "Signup",
  data: function () {
    return {
      loading: false,
      loading2: false,
      errorMessage: "",
      error: false,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      company_name: "",
      lat: "",
      lng: "",
      validAddress: false,
      autocomplete: "",
      company_address: "",
      create_password: "",
      confirm_password: "",
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
          /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v) ||
          "Password must contain a minimum of 8 character, at least one uppercase, one lowercase, one number",
      ],
      confirm_passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v === this.create_password || "Passwords do not match",
      ],
    };
  },
  computed: {
    //get state properties from vuex store
    ...mapState({
      present_form: (state) => state.onboarding.present_signup_form,
    }),
    getAddress() {
      return {
        company_address: "",
      };
    },
  },
  mounted() {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(6.5244, 3.3792)
        ),
        types: ["establishment"],
        componentRestrictions: { country: ["NG"] },
        fields: ["place_id", "geometry", "name"],
      }
    );

    this.autocomplete.addListener("place_changed", this.onPlaceChanged);
  },
  methods: {
    onPlaceChanged() {
      let place = this.autocomplete.getPlace();
      if (!place.geometry) {
        // User did not select a prediction; reset the input field
        this.validAddress = false;
      } else {
        //Display details about the valid place
        this.validAddress = true;
        this.getAddress.company_address = place.name;
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
      }
    },
    //validate forms
    validate_form(form_num) {
      this.$refs[`form${form_num}`].validate();
      if (this.$refs[`form${form_num}`].validate()) {
        if (form_num == 3) {
          this.submit();
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
              if (error.response) {
                this.errorMessage = error.response.data.errors.email[0];
              } else {
                this.errorMessage = "No internet Connection!";
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
    //submit form and create an account
    submit() {
      this.loading = true;
      this.$store
        .dispatch("onboarding/register", {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          phone_number: this.phone_number,
          company_name: this.company_name,
          company_location: {
            address: this.getAddress.company_address,
            lat: this.lat,
            lng: this.lng,
          },
          password: this.create_password,
          password_confirmation: this.confirm_password,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.message === "Registeration successful.") {
            this.$store.commit("onboarding/present_signup_form", "form1");
            this.$router.push({
              name: "emailVerification",
              params: {
                email: this.email,
              },
            });
          }
        })
        .catch((error) => {
          this.error = true;
          this.loading = false;
          if (error.response) {
            this.errorMessage = error.response.data.errors.email[0];
          } else {
            this.errorMessage = "No internet Connection!";
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-container {
  width: 60%;
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