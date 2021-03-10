// orderstatus base url
import axios from "../../axios/order"
//holds the state properties
const state = {
    dashboardOrder: [],
};

//fetch data 
const actions = {
    getOrderStatus(context) {
        return new Promise((resolve, reject) => {
            axios.get('/metrics', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                context.commit("setdashboardOrder", res.data.data)
                resolve(res.data.data)

            }).catch((error) => {
                reject(error.response)
            })
        })

    },
};

//updates the different state properties
const mutations = {
    setdashboardOrder: (state, data) => {
        state.dashboardOrder = data
    }
};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    actions,
    mutations
};  