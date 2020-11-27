<template>
  <div>
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
      ></v-text-field>

      <!-- button container -->
      <div class="pa-0 mt-5" style="width: 100%">
        <v-btn class="primary px-8 py-5 mb-5" @click="validate_form(1)"
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
        required
      ></v-text-field>

      <!-- country -->
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
        required
      ></v-select>

      <!-- state -->
      <v-select
        class="onboarding-input mr-5 mt-5"
        :items="states"
        v-model="state"
        label="State"
        :rules="state_nameRules"
        color="primary"
        required
      ></v-select>

      <!-- company address -->
      <v-text-field
        class="onboarding-input mr-5 mt-5"
        v-model="company_address"
        :rules="address_nameRules"
        type="text"
        label="Company Address"
        color="primary"
        required
      ></v-text-field>

      <!-- button conatainer -->
      <div class="pa-0 mt-5" style="width: 100%">
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
      ></v-text-field>

      <!-- button container -->
      <div class="pa-0 mt-5" style="width: 100%">
        <v-btn class="primary px-8 py-5 mb-5" @click="validate_form(3)"
          >Complete Sign Up</v-btn
        >
      </div>
    </v-form>
  </div>
</template>
<script>
import countries from "@/assets/data/countries.js";
import { mapState } from "vuex";
export default {
  name: "Signup",
  data: function () {
    return {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      company_name: "",
      country: "",
      state: "",
      company_address: "",
      create_password: "",
      confirm_password: "",
      countries: countries,
      states: [],
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
      country_nameRules: [(v) => !!v || "Country is required"],
      state_nameRules: [(v) => !!v || "State is required"],
      address_nameRules: [
        //verifies comapany address satisfies the requirement
        (v) => !!v || "Company address is required",
      ],
      create_passwordRules: [
        //verifies password satisfies the requirement
        (v) => !!v || "Password is required",
        (v) =>
          /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\w\W]{8,30}$/.test(v) ||
          "Password must contain a minimum of 8 character and at least one number",
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
  },
  methods: {
    //get the states under the country selected
    get_states() {
      this.states = this.countries.find(
        (x) => x.country === this.country
      ).states;
    },
    //validate forms
    validate_form(form_num) {
      this.$refs[`form${form_num}`].validate();
      if (this.$refs[`form${form_num}`].validate()) {
        if (form_num == 3) {
          this.submit();
        } else {
          this.$store.commit(
            "onboarding/present_signup_form",
            `form${form_num + 1}`
          );
        }
      }
    },
    //submit form and create an account
    submit() {
      this.$store.commit("onboarding/user_info", [
        this.first_name,
        this.last_name,
        this.email,
        this.phone_number,
        this.company_name,
        this.country,
        this.state,
        this.company_address,
        this.create_password,
      ]);
      this.$store.dispatch("onboarding/create_account");
    },
  },
};
</script>