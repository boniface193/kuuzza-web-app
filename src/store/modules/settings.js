import onboardingHttpClient from "@/axios/onboarding";
import store from "@/store";

//holds the state properties
const state = {
    token: localStorage.getItem('vendorToken') || null,
    profile: {
        store: {
            location: {},
            phone_number: ""
        },
        name: "",
        email: "",
        phone_number: "",
        photo: null,
        role: "",
        status: "",
        id: "",
    },
    loader: false,
    doNothing: null,
    teamMembers: [],
    pageDetails: {
        current_page: 1
    },
};

//returns the state properties
const getters = {
    getUserProfile: state => state.profile,
    verifiedStore: state => state.profile.store.setup_is_complete,
    verifiedPhoneNumber: state => state.profile.store.phone_number_verified,
    storeApprovalStatus: () => true,
    loader: state => state.loader,
    teamMembers: state => state.teamMembers,
    pageDetails: state => state.pageDetails
};

//fetch data 
const actions = {

    // get profile informations
    getUserProfile(context) {
        return new Promise((resolve, reject) => {
            state.loader = true;
            onboardingHttpClient.get("profile", {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                context.commit("setUserProfile", response.data.data)
                state.loader = false
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // edit user profile
    editUserProfile(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.post("profile", data, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                context.commit("setUserProfile", response.data.data)
                resolve(response);
            })
                .catch(error => {
                    reject(error);
                })
        });
    },
    // edit store information
    editStore(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.post("store", data, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                context.commit("setUserProfile", response.data.data)
                store.commit("onboarding/setAccessToken", response.data.token);
                resolve(response);
            })
                .catch(error => {
                    reject(error);
                })
        });
    },
    // reset password
    resetPassword(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.post("security/password", data, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing")
                    reject(error);
                })
        });
    },
    // invite team member
    inviteMember(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.post("users/invite", data, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing")
                    reject(error);
                })
        });
    },
    // get all team Members information
    getTeamMembers(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.get(`users?page=${data.page}&per_page=${data.itemPerPage}`, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                context.commit("setTeamMembers", response.data.data);
                context.commit("setPageDetails", response.data.meta);
                resolve(response);
            })
                .catch(error => {
                    reject(error);
                })
        })

    },
    // get details of a team member 
    getSingleTeamMember(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.get(`users/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // delete team member
    deleteMember(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.delete(`users/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // suspend a team member
    suspendTeamMember(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.post(`users/${data.id}/suspend`, {}, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // unsuspend a team member
    unSuspendTeamMember(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.post(`users/${data.id}/unsuspend`, {}, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // update team member 
    updateTeamMember(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.put(`users/${data.id}`, data, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // verify phone number 
    verifyPhoneNumber(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.post(`store/phone-number/verify`, data, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                store.commit("onboarding/setAccessToken", response.data.token);
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // verify phone number 
    resendPhoneNumberOTP(context, data) {
        return new Promise((resolve, reject) => {
            onboardingHttpClient.post(`store/phone-number/send-otp`, data, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    }
};

//updates the different state properties
const mutations = {
    setUserProfile: (state, data) => (state.profile = data),
    setTeamMembers: (state, data) => (state.teamMembers = data),
    setPageDetails: (state, data) => (state.pageDetails = data),
    setCurrentPage: (state, currentPage) => { state.pageDetails.current_page = currentPage },
    //set token
    setToken: (state, token) => {
        localStorage.setItem('vendorToken', token)
        state.token = localStorage.getItem('vendorToken') || null
    },
    doNothing: (state) => (state.doNothing = null)
};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};