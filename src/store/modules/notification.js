import axios from "../../axios/notification"
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
                    Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
                }
            }).then((res) => {
                context.commit('setNotification', res.data)
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    markReadForSigle(context, data) {
        return new Promise((resolve, reject) => {
            axios.post('/notification/read', { "ids": [data] }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
                }
            }).then((res) => {
                context.commit('setNotification', res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // markAll(context) {
    //     return new Promise((resolve, reject) => {
    //         axios.post('/notification/read/all', {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
    //             }
    //         }).then((res) => {
    //             context.commit('setNotification', res.data.data)
    //             console.log(res.data)
    //             resolve(res.data.data)
    //         }).catch((error) => {
    //             reject(error)
    //         })
    //     })
    // }
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