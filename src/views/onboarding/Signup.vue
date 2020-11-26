<template>
    <v-main>
        <v-row>
           <v-col cols="6" class="pt-7 pl-16 pr-7 pb-7">
               
               <a>
                   <v-img src="">
                   </v-img>
               </a>

                <h2 >Welcome!</h2>
                <p>Do you want to amplify your performance and grow sales?</p>
               <v-form class="d-flex flex-wrap"> 

                   <v-text-field
                    class="name-input mr-5"
                    v-model="firstname"
                    :rules="nameRules"
                    label="First Name"
                    color="blue"
                    required
                    ></v-text-field>

                    <v-text-field
                    class="name-input mr-5"
                    v-model="lasttname"
                    :rules="nameRules"
                    label="Last Name"
                    color="secondary"
                    required
                    ></v-text-field>

                    <v-text-field
                    class="onboarding-input mr-5"
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    color="secondary"
                    required
                    ></v-text-field>

                    <v-text-field
                    class="onboarding-input mr-5"
                    v-model="email"
                    :rules="emailRules"
                    label="Phone Number"
                    color="secondary"
                    type="tel"
                    required
                    ></v-text-field>
                    
                    <div class="pa-0">
                        <v-btn class="primary px-8 py-5">Next</v-btn>
                        <p>Already have an account? <a>Sign in</a></p>
                    </div>
                </v-form>

           </v-col>
           <v-col cols="6">
               <v-img src=""></v-img>
           </v-col>
        </v-row>
    </v-main>
</template>

<script>
export default {
    name: "Signup"
}
</script>

<style lang="scss" scoped>
    .onboarding-input {
        width: 70% !important;
        flex: none !important;
    }
    .name-input {
        width: 42% !important;
        flex: none !important;
    }
</style>