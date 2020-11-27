<template>
    <v-main>
<<<<<<< HEAD
        <v-row class="onboarding-container">
=======
        <v-row class="onboarding-conatiner">
>>>>>>> 8ff4f7d... bg-fix-layout
           <v-col class="pl-7 pr-7 pt-15 pl-sm-15 pr-sm-0 pb-5 col-12 col-md-6">
               
               <!-- app logo -->
               <router-link to="/" class="d-flex dark--text app-logo">
                   N<v-img src="@/assets/fire.svg"
                   max-width="35"
                   ></v-img>VA
               </router-link>

                <h1 class="primary--text mt-5 mb-0"
                 v-if="present_form == 'form1' || present_form == 'form2'">Welcome!</h1>

                <h1 class="primary--text mt-5 mb-0"
                 v-if="present_form == 'form3'">Create your password!</h1>

                <p class="mt-5 mb-0"
                 v-if="present_form == 'form1' || present_form == 'form2'">
                    Do you want to amplify your performance and grow sales?
                </p>


                <!-- first form section-->
                <v-form 
                class="d-flex flex-wrap"
                ref="form1" 
                v-if="present_form == 'form1'" 
                > 

                    <!-- First Name -->
                    <v-text-field
                    class="name-input mr-5 mt-5"
                    v-model="first_name"
                    :rules="first_nameRules"
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
                    <div class="pa-0 mt-5" style="width:100%">
<<<<<<< HEAD
                        <v-btn class="primary px-8 py-5 mb-5" @click="validate_form1">Next</v-btn>
=======
                        <v-btn class="primary px-8 py-5 mb-3" @click="validate_form1">Next</v-btn>
>>>>>>> 8ff4f7d... bg-fix-layout
                        <p>
                            Already have an account?
                            <router-link to="/signin" style="text-decoration:none">Sign In</router-link>
                        </p>
                    </div>
                </v-form>
                
                <!-- second form section -->
                <v-form 
                class="d-flex flex-wrap" 
                ref="form2" 
                v-if="present_form == 'form2'"> 

                    <!-- company name -->
                    <v-text-field
                    class="onboarding-input mr-5 mt-5"
                    v-model="company_name"
                    :rules="company_nameRules"
                    label="Company Name"
                    color="primary"
                    required
                    ></v-text-field>
                    
                    <!-- button conatainer -->
                    <div class="pa-0 mt-5" style="width:100%">
<<<<<<< HEAD
                        <v-btn class="primary px-8 py-5 mb-5" @click="validate_form2">Next</v-btn>
=======
                        <v-btn class="primary px-8 py-5 mb-3" @click="validate_form2">Next</v-btn>
>>>>>>> 8ff4f7d... bg-fix-layout
                    </div>
                </v-form>

                <!-- third form section -->
                <v-form 
                class="d-flex flex-wrap" 
                ref="form3" 
                v-if="present_form == 'form3'"> 

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
                    :rules="[confirm_passwordRules, passwordConfirmationRule]"
                    label="Confirm Password"
                    type="password"
                    color="primary"
                    required
                    ></v-text-field>
                    
                    <!-- button container -->
                    <div class="pa-0 mt-5" style="width:100%">
<<<<<<< HEAD
                        <v-btn class="primary px-8 py-5 mb-5" @click="validate_form3">Complete Sign Up</v-btn>
=======
                        <v-btn class="primary px-8 py-5 mb-3" @click="validate_form3">Complete Sign Up</v-btn>
>>>>>>> 8ff4f7d... bg-fix-layout
                    </div>
                </v-form>

           </v-col>

            <!-- banner -->
<<<<<<< HEAD
            <v-col class="col-6 banner d-none d-md-block">
=======
            <v-col cols="6 banner d-none d-md-block">
>>>>>>> 8ff4f7d... bg-fix-layout
                <v-img src="@/assets/Image2.svg" width="100%;" height="100%"></v-img>
                <div class="mask d-flex align-center pl-10">
                    <p 
                    v-if="present_form == 'form1' || present_form == 'form2'"
                    class="white--text">
                        Learn, Compete… Grow
                    </p>

                    <p 
                    v-if="present_form == 'form3'"
<<<<<<< HEAD
                    class="white--text" style="width:58%">
=======
                    class="white--text" style="width:62%">
>>>>>>> 8ff4f7d... bg-fix-layout
                        <span class="float-left" style="width:100%">Amplify Performance</span><br>
                        <span class="float-right">Grow Sales</span>
                    </p>
                </div>
            </v-col>

        </v-row>
    </v-main>
</template>

<script>
export default {
    name: 'Signup',
    data: () => ({
        present_form: 'form1',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        company_name: '',
        create_password: '',
        confirm_password: '',
        first_nameRules: [
        v => !!v || 'First Name is required', // verifies first name satisfies the requirement
        ],
        last_nameRules: [ // verifies last name satisfies the requirement
        v => !!v || 'last Name is required',
        ],
        emailRules: [ // verifies email address satisfies the requirement
        v => !!v || 'E-mail is required', 
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid', 
        ],
        phoneRules: [ //verifies phone number satisfies the requirement
        v => !!v || 'Phone Number is required', 
        ],
        company_nameRules: [ //verifies comapany name satisfies the requirement
        v => !!v || 'Company Name is required',
        ],
        create_passwordRules: [ //verifies password satisfies the requirement
            v => !!v || 'Password is required', 
            v => /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\w\W]{8,30}$/.test(v) || 'Password must contain a minimum of 8 character and at least one number'
        ],
        confirm_passwordRules: [
            v => !!v || 'Password is required',
        ]
    }),
    computed: {
        passwordConfirmationRule() { //checks if passwords match
            return () => (this.create_password === this.confirm_password) || 'Password must match'
        }
    },
    methods: {
        validate_form1 () { //validates the first form
            this.$refs.form1.validate()
            if (this.$refs.form1.validate()) {
                this.present_form = 'form2'   
            }
        },
        validate_form2 () { //validates the second form
            this.$refs.form2.validate()
            if (this.$refs.form2.validate()) {
                this.present_form = 'form3'   
            }
        },
        validate_form3 () { //validates the third form
            this.$refs.form3.validate()
             if (this.$refs.form3.validate()) {
               this.submit()
            }
        },
        submit () { // submit form and create an account 
            this.$store.commit("onboarding/user_info", [
                this.first_name,
                this.last_name,
                this.email,
                this.phone_number,
                this.company_name,
                this.create_password
            ]);
            this.$store.dispatch('onboarding/create_account');
        }
    }
}
</script>

<style lang="scss">
<<<<<<< HEAD
    .onboarding-container {
        flex-wrap: nowrap;
        overflow: hidden;
        .onboarding-input {
            width: 60% !important;
=======
    .onboarding-conatiner {
        flex-wrap: nowrap;
        overflow: hidden;
        .onboarding-input {
            width: 65% !important;
>>>>>>> 8ff4f7d... bg-fix-layout
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
        }
        .banner {
            position: relative;
            overflow: hidden;
<<<<<<< HEAD
            border-bottom-left-radius: 70px !important;
            transform: rotate(45deg);
            margin-left: 13%;
=======
            border-top-left-radius: 70px !important;
            border-bottom-left-radius: 70px !important;
            transform: rotate(45deg);
            //background-image: url('~@/assets/Image2.svg');
            //background-size: cover;
            margin-left: 14%;
>>>>>>> 8ff4f7d... bg-fix-layout
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
            background: transparent linear-gradient(253deg, #52F1ECB1 0%, #297976 100%);
            p{
                font-size: 35px;
                transform: rotate(-45deg);
                margin-top: 50%;
            }
        }
<<<<<<< HEAD
        .v-btn {
            text-transform: capitalize;
        }
    }
    @media (max-width:1100px) {
        .onboarding-container {
            .name-input,.onboarding-input {
                width: 80% !important;
            }
        }
    }
    @media (max-width:550px) {
        .onboarding-container {
            .onboarding-input, .name-input{
=======
    }
    @media (max-width:550px) {
        .onboarding-conatiner {
            .onboarding-input {
                width: 100% !important;
            }
            .name-input {
>>>>>>> 8ff4f7d... bg-fix-layout
                width: 100% !important;
            }
        }
    }
</style>