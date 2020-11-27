<template>
<<<<<<< HEAD
    <v-main>
        <v-row class="onboarding-container">
           <v-col class="pl-7 pr-7 pt-15 pl-sm-15 pr-sm-0 pb-5 col-12 col-md-6">
               
                <!-- app logo -->
                <router-link to="/" class="d-flex dark--text app-logo">
                   N<v-img src="@/assets/fire.svg"
                   max-width="35"
                   ></v-img>VA
                </router-link>

                <h1 class="primary--text mt-5 mb-0">Welcome back!</h1>

                <p class="mt-5 mb-0">Do you want to amplify your performance and grow sales?</p>

                <!-- form section-->
                <v-form 
                class="d-flex flex-wrap"
                ref="form" 
                > 
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

                    <!-- Password -->
                    <v-text-field
                    class="onboarding-input mr-5 mt-5"
                    v-model="password"
                    :rules="passwordRules"
                    type="password"
                    label="Password"
                    color="primary"
                    required
                    ></v-text-field>
                    
                    <!-- button container -->
                    <div class="pa-0 mt-5" style="width:100%">
                        <v-btn class="primary px-8 py-5 mb-5" @click="validate_form">Sign In</v-btn>
                        <p>
                            Don't have an account?
                            <router-link to="/signup" style="text-decoration:none">Create Account</router-link>
                        </p>
                    </div>
                </v-form>
           </v-col>

            <!-- banner -->
            <v-col class="col-6 banner d-none d-md-block">
                <v-img src="@/assets/Image2.svg" width="100%;" height="100%"></v-img>
                <div class="mask d-flex align-center pl-10">
                    <p class="white--text">
                        Learn, Compete… Grow
                    </p>
                </div>
            </v-col>

        </v-row>
    </v-main>
=======
    <div>
        Sign In
    </div>
>>>>>>> 8ff4f7d... bg-fix-layout
</template>

<script>
export default {
    name: 'Signup',
    data: () => ({
        email: '',
        password: '',
        emailRules: [ // verifies email address satisfies the requirement
        v => !!v || 'E-mail is required', 
        ],
        passwordRules: [ // verifies password satisfies the requirement
            v => !!v || 'Password is required',
        ]
    }),
    methods: {
        validate_form () { //validates form
            this.$refs.form.validate()
             if (this.$refs.form.validate()) {
               this.signin()
            }
        },
        signin () { // Sign in
            this.$store.commit("onboarding/user_info", [
                this.email,
                this.password,
            ]);
            this.$store.dispatch('onboarding/signin');
        }
    }
}
</script>

