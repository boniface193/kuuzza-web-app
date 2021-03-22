import axios from "../../axios/notification"
const state = {
    notification: []
};

const getters = {
    getNotified: state => state.notification
};

const actions = {
    getNotification(context){
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
    }
};

const mutations = {
    setNotification: (state, data) => {
        state.notification = data
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