import axios from "../../axios/notification"
import store from "@/store";
const state = {
    notification: [],
    readSingleNotification: [],
};

const getters = {
    getNotified: state => state.notification
};

const actions = {
    getNotification(context) {
        return new Promise((resolve, reject) => {
            axios.get('/notification', {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`
                }
            }).then((res) => {
                context.commit('setNotification', res.data)
                resolve(res.data)
            }).catch((error) => {
                if (error.response.status == 401) {
                    store.commit("onboarding/setTokenAuthorizeStatus", false);
                }
                reject(error)
            })
        })
    },

    markReadForSigle(context, data) {
        return new Promise((resolve, reject) => {
            axios.post('/notification/read', { "ids": [data] }, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`
                }
            }).then((res) => {
                context.commit('setNotification', res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                if (error.response.status == 401) {
                    store.commit("onboarding/setTokenAuthorizeStatus", false);
                }
                reject(error)
            })
        })
    },

    markAll(context) {
        return new Promise((resolve, reject) => {
            axios.post('/notification/read/all', {}, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`
                }
            }).then((res) => {
                context.commit('setNotification', res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
};

const mutations = {
    setNotification: (state, data) => {
        state.notification = data
    },
    setSingleNotification: (state, data) => {
        state.readSingleNotification = data
    }
};

export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};