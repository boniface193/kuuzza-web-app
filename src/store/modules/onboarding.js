import axios from "axios";

//holds the state properties
const state = {
    token: localStorage.getItem('accessToken') || null,
    present_signup_form: 'form1'
};

//returns the state properties
const getters = {
    //checks if user is logged in
    loggedin: () => {
        return state.token != null;
    }
};

//fetch data 
const actions = {
    //creates user account
    register(context, credentials) {
        return new Promise((resolve, reject) => {
            axios.post("/signup", {
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                email: credentials.email,
                phoneNumber: credentials.phoneNumber,
                companyName: credentials.companyName,
                country: credentials.country,
                state: credentials.state,
                companyAddress: credentials.companyAddress,
                password: credentials.password,
            })
                .then(response => {
                    context.commit('set_token', 'aaa')
                    console.log(response)
                    resolve(response)
                    
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    },
    //allows users to login
    signIn: (context, credentials) => {
        return new Promise((resolve, reject) => {
            axios.post("/signin", {
                email: credentials.email,
                password: credentials.password,
            }).then(response => {
                context.commit('set_token', response.data.token)
                resolve(response)
            })
            .catch(error => {
                reject(error);
            })
        })
    },
    // verify email address 
    verifyEmail: (credentials) =>{
        return new Promise((resolve, reject) => {
            axios.post("/verifyemail", {
                code: credentials.code
            }).then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error);
            })
        })   
    }
};

//updates the different state properties
const mutations = {
    //set token
    set_token: (state, token) => (state.token = token),
    // update the present form on signup 
    present_signup_form: (state, form) => (state.present_signup_form = form)
};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};  