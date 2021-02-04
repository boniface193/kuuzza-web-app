import axios from "@/axios";

// decode token
const decodeToken = (token) => {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}

// checkif user account is verified
const checkIfAccountVerified = () => {
    if (localStorage.getItem('accessToken')) {
        const accountStatus = decodeToken(state.token).meta.email_verified
        return accountStatus;
    } else {
        return false;
    }
}

// check if user is authenticated
const checkIfAuthenticated = () => {
    if (state.token !== null) {
        return true;
    } else {
        return false;
    }
}

// check if token is expired
const checkIftokenExpired = () => {
    if (localStorage.getItem('accessToken')) {
        const expiration = decodeToken(state.token).exp
        return expiration >= new Date() || false;
    } else {
        return false
    }
};

//holds the state properties
const state = {
    token: localStorage.getItem('accessToken') || null,
    present_signup_form: 'form1',
    accessEmailVerifcationPage: false,
    accessForgotPasswordVerificationPage: false,
    accessPasswordRecoveryPage: false,
    accountVerified: false,
    accountAuthenticated: false,
    tokenExpired: true,
    doNothing: null,
};

//returns the state properties
const getters = {
    //checks if user is logged in
    loggedin: () => {
        return state.token != null;
    },
    accessEmailVerifcationPage: state => state.accessEmailVerifcationPage,
    accessForgotPasswordVerificationPage: state => state.accessForgotPasswordVerificationPage,
    accessPasswordRecoveryPage: state => state.accessPasswordRecoveryPage,
    accountVerified: state => state.accountVerified,
    accountAuthenticated: state => state.accountAuthenticated,
    tokenExpired: state => state.tokenExpired,
    getEmail: state => {
        if (localStorage.getItem('accessToken')) {
            const email = decodeToken(state.token).meta.email
            return email;
        } else {
            return null;
        }
    },
};

//fetch data 
const actions = {
    //creates user account
    register(context, credentials) {
        return new Promise((resolve, reject) => {
            axios.post("auth/register", {
                first_name: credentials.firstName,
                last_name: credentials.lastName,
                email: credentials.email,
                phone_number: credentials.phoneNumber,
                company_name: credentials.companyName,
                company_country: credentials.country,
                company_state: credentials.state,
                company_address: credentials.companyAddress,
                password: credentials.password,
                password_confirmation: credentials.password
            })
                .then(response => {
                    context.commit("setToken", response.data.token);
                    resolve(response)
                })
                .catch(error => {
                    context.commit("removeToken")
                    reject(error)
                })
        })
    },
    //allows users to login
    signIn: (context, data) => {
        return new Promise((resolve, reject) => {
            axios.post("auth/login", data).then(response => {
                context.commit("setToken", response.data.token)
                resolve(response)
            })
                .catch(error => {
                    context.commit("removeToken")
                    reject(error);
                })
        })
    },
    // verify email address 
    verifyEmail: (context, credentials) => {
        return new Promise((resolve, reject) => {
            axios.post("emails/verify", {
                otp: credentials.code,
                email: credentials.email
            }).then(response => {
                context.commit("setToken", response.data.token)
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // resend opt for email verification 
    resendEmailOTP(context, credentials) {
        return new Promise((resolve, reject) => {
            axios.post("emails/send-otp", {
                email: credentials.email
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // forgot password
    forgotPassword: (context, credentials) => {
        return new Promise((resolve, reject) => {
            axios.post("passwords/reset", {
                email: credentials.email
            }).then(response => {
                resolve(response)
            }).catch(error => {
                context.commit("doNothing");
                reject(error)
            })
        })
    },
    // verify forgot password 
    verifyForgotPassword: (context, credentials) => {
        return new Promise((resolve, reject) => {
            axios.post("passwords/verify-otp", {
                otp: credentials.code,
                email: credentials.email
            }).then(response => {
                resolve(response)
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // recover password
    recoverPassword: (context, credentials) => {
        return new Promise((resolve, reject) => {
            axios.post("passwords/new", {
                email: credentials.email,
                password: credentials.password,
                password_confirmation: credentials.password_confirmation,
                otp: credentials.otp
            }).then(response => {
                resolve(response)
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        });
    },
    // check if an account exist
    checkAccount: (context, data) => {
        return new Promise((resolve, reject) => {
            axios.post("auth/register/validate-email", data).then(response => {
                resolve(response)
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        });
    },
    // registration for invited team member
    inviteTeamMember: (context, data) => {
        return new Promise((resolve, reject) => {
            axios.post("invites/accept", data).then(response => {
                resolve(response)
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        });
    }
};

//updates the different state properties
const mutations = {
    // update the present form on signup 
    present_signup_form: (state, form) => (state.present_signup_form = form),
    //set token
    setToken: (state, token) => {
        localStorage.setItem('accessToken', token)
        state.token = localStorage.getItem('accessToken') || null
    },
    // remove token
    removeToken: () => {
        localStorage.removeItem('accessToken');
        state.token = localStorage.getItem('accessToken') || null
    },
    accessEmailVerifcationPage: (state, status) => (state.accessEmailVerifcationPage = status),
    accessForgotPasswordVerificationPage: (state, status) => (state.accessForgotPasswordVerificationPage = status),
    accessPasswordRecoveryPage: (state, status) => (state.accessPasswordRecoveryPage = status),
    setVerifyAccountStatus: (state) => {
        const accountVerified = checkIfAccountVerified();
        state.accountVerified = accountVerified;
    },
    setAuthenticated: (state) => {
        const accountAuthenticated = checkIfAuthenticated();
        state.accountAuthenticated = accountAuthenticated;
    },
    setTokenExpired: (state) => {
        const tokenExpired = checkIftokenExpired();
        state.tokenExpired = tokenExpired;
    },
    // commit nothing
    doNothing: (state) => (state.doNothing = null)

};

export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};  