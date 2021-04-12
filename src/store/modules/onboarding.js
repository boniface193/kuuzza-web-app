import axios from "@/axios";
import store from "@/store";

//decode token
const decodeToken = (token) => {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}

// check if token is expired
const checkIftokenExpired = () => {
    if (state.accessToken) {
        const expiration = decodeToken(state.accessToken).exp
        return expiration >= new Date() || false;
    } else {
        return false
    }
};

//holds the state properties
const state = {
    present_signup_form: 'form1',
    clientID: localStorage.getItem("clientID") || null,
    accessToken: null,
    tokenIsPresent: false,
    tokenExpired: true,
    tokenAuthorize: true,
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
    getUserProfile(context) {
        return new Promise((resolve, reject) => {
            axios.get("profile", {
                headers: {
                    Authorization: `Bearer ${state.accessToken}`
                }
            }).then(response => {
                resolve(response)
            }).catch((error) => {
                if (error.response.status == 401) {
                    context.commit("setTokenAuthorizeStatus", false);
                }
                reject(error)
            })
        })
    },
    //creates user account
    register(context, data) {
        return new Promise((resolve, reject) => {
            axios.post("auth/register", data)
                .then(response => {
                    context.commit("setClientID", response.data.client_id)
                    context.commit("setAccessToken", response.data.token);
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
                context.commit("setClientID", response.data.client_id)
                context.commit("setAccessToken", response.data.token);
                context.commit("setTokenAuthorizeStatus", true);
                resolve(response)
            })
                .catch(error => {
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
    // resend opt verify forgot password 
    resendverifyForgotPasswordOTP(context, data) {
        return new Promise((resolve, reject) => {
            axios.post("passwords/reset", data).then(response => {
                resolve(response);
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
    // inviteTeamMember: (context, data) => {
    //     return new Promise((resolve, reject) => {
    //         axios.post("invites/accept", data).then(response => {
    //             context.commit("setToken", response.data.token)
    //             context.commit("setTokenAuthorizeStatus", true);
    //             resolve(response)
    //         })
    //             .catch(error => {
    //                 context.commit("doNothing");
    //                 reject(error);
    //             })
    //     });
    // },
    // get access token  
    getAccessToken: (context) => {
        return new Promise((resolve, reject) => {
            axios.post("auth/refresh", {
                client_id: state.clientID
            },
            ).then(response => {
                context.commit("setClientID", response.data.client_id);
                context.commit("setAccessToken", response.data.token);
                context.commit("setTokenAuthorizeStatus", true);
                resolve(response);
            })
                .catch(error => {
                    if (error.response.status == 401) {
                        context.commit("setTokenAuthorizeStatus", false);
                    }
                    reject(error);
                })
        });
    },
    logout: (context) => {
        return new Promise((resolve, reject) => {
            axios.post("auth/logout", {
                client_id: state.clientID
            }, {
                headers: {
                    Authorization: `Bearer ${state.accessToken}`
                }
            }
            ).then(response => {
                context.commit("removeClientID");
                context.commit("setAccessToken", null);
                store.commit("reset");
                resolve(response);
            })
                .catch(error => {
                    if (error.response.status == 401) {
                        context.commit("setTokenAuthorizeStatus", false);
                    }
                    reject(error);
                })
        });
    }
};

//updates the different state properties
const mutations = {
    // update the present form on signup 
    present_signup_form: (state, form) => (state.present_signup_form = form),
    // set client ID 
    setClientID: (state, clientID) => {
        localStorage.setItem('clientID', clientID)
        state.clientID = localStorage.getItem('clientID') || null
    },
    // set access token
    setAccessToken: (state, token) => (state.accessToken = token),
    // remove client ID
    removeClientID: () => {
        localStorage.removeItem('clientID');
        state.clientID = localStorage.getItem('clientID') || null
    },
    // check if token expired
    setTokenExpired: (state) => {
        const tokenExpired = checkIftokenExpired();
        state.tokenExpired = tokenExpired;
    },
    setTokenAuthorizeStatus: (state, status) => (state.tokenAuthorize = status),
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