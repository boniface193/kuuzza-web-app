import axios from "@/axios";

//decode token
const decodeToken = (token) => {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}


// check if user is authenticated
const checkIfTokenIsPresent = () => {
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
    present_signup_form: 'form1',
    token: localStorage.getItem('accessToken') || null,
    tokenIsPresent: false,
    tokenExpired: true,
    doNothing: null,
};

//returns the state properties
const getters = {
    tokenIsPresent: state => state.tokenIsPresent,
    tokenExpired: state => state.tokenExpired,
};

//fetch data 
const actions = {
    // get user profile details
    getUserProfile() {
        return new Promise((resolve, reject) => {
            axios.get("profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(response => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    //creates user account
    register(context, data) {
        return new Promise((resolve, reject) => {
            axios.post("auth/register", data)
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
    verifyEmail: (context, data) => {
        return new Promise((resolve, reject) => {
            axios.post("emails/verify", data).then(response => {
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
    resendEmailOTP(context, data) {
        return new Promise((resolve, reject) => {
            axios.post("emails/send-otp", data).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // forgot password
    forgotPassword: (context, data) => {
        return new Promise((resolve, reject) => {
            axios.post("passwords/reset", data).then(response => {
                resolve(response)
            }).catch(error => {
                context.commit("doNothing");
                reject(error)
            })
        })
    },
    // verify forgot password 
    verifyForgotPassword: (context, data) => {
        return new Promise((resolve, reject) => {
            axios.post("passwords/verify-otp", data).then(response => {
                resolve(response)
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // recover password
    recoverPassword: (context, data) => {
        return new Promise((resolve, reject) => {
            axios.post("passwords/new", data).then(response => {
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
    tokenIsPresent: (state) => {
        const tokenIsPresent = checkIfTokenIsPresent();
        state.tokenIsPresent = tokenIsPresent;
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