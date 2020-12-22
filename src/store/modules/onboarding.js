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
    //country: credentials.country,
    //state: credentials.state,
    register(context, credentials) {
        return new Promise((resolve, reject) => {
            axios.post(" https://nova-ids.herokuapp.com/auth/register", {
                'first_name': credentials.firstName,
                'last_name': credentials.lastName,
                'email': credentials.email,
                'phone_number': credentials.phoneNumber,
                'company_name': credentials.companyName,
                'company_address': credentials.companyAddress,
                'password': credentials.password,
                'password_confirmation': credentials.password
            })
                .then(response => {
                    context.commit('setToken', response.token)
                    resolve(response)
                })
                .catch(error => {
                    console.log(error)
                    if(error.response){
                        console.log(error.response)
                    }
                    reject(error)
                })
        })
    },

    //allows users to login
    signIn: (context, credentials) => {
        return new Promise((resolve, reject) => {
            axios.post("https://nova-ids.herokuapp.com/auth/login", {
                email: credentials.email,
                password: credentials.password,
            }).then(response => {
                context.commit("setToken", response.data.token)
                resolve(response)
            })
                .catch(error => {
                    reject(error);
                })
        })
    },
    // verify email address 
    verifyEmail: (context, credentials) => {
        console.log(credentials.code, credentials.email)
        return new Promise((resolve, reject) => {
            axios.post("https://nova-ids.herokuapp.com/emails/verify", {
                'otp': credentials.code,
                'email': credentials.email
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    console.log(error)
                    if(error.response){
                        console.log(error.response)
                    }
                    context.commit('setToken', null);
                    reject(error);
                })
        })
    },
    // resend opt for email verification 
    resendEmailOTP(credentials, context){
        return new Promise((resolve, reject) => {
            axios.post("https://nova-ids.herokuapp.com/emails/send-otp", {
                email: credentials.email
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit('', '');
                    reject(error);
                })
        })
    }, 
    // logout
    logout: (context) => {
        return new Promise((resolve, reject) => {
            axios.post("/logout", {
                token: state.token
            }).then(response => {
                context.commit('setToken', response.data.token)
                resolve(response)
            }).catch(error => {
                context.commit('setToken', null)
                reject(error)
            })
        })
    },
    //forgot password
    forgotPassword: (context, credentials) => {
        return new Promise((resolve, reject) => {
            axios.post("https://nova-ids.herokuapp.com/passwords/reset", {
                email: credentials.email
            }).then(response => {
                resolve(response)
            }).catch(error => {
                context.commit("", "");
                reject(error)
            })
        })
    },
    // verify forgot password 
    verifyForgotPassword: (context, credentials) => {
        return new Promise((resolve, reject) => {
            axios.post("https://nova-ids.herokuapp.com/passwords/verify-otp", {
                opt: credentials.code,
                email: credentials.email
            }).then(response => {
                resolve(response)
            })
                .catch(error => {
                    context.commit("", "")
                    reject(error);
                })
        })
    },
    // recover password
    recoverPassword: (context, credentials) => {
        return new Promise((resolve, reject) => {
            axios.post("https://nova-ids.herokuapp.com/passwords/new", {
                email: credentials.email,
                password: credentials.newPassword,
                password_confirmation: credentials.newPassword,
                opt: credentials.opt
            }).then(response => {
                resolve(response)
            })
                .catch(error => {
                    context.commit("", "");
                    console.log(error)
                    reject(error);
                })
        })
    }
};

//updates the different state properties
const mutations = {
    //set token
    setToken: (state, token) => {
        localStorage.setItem('accessToken', token);
        state.token = localStorage.getItem('accessToken') || null;
    },
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