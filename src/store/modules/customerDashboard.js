// orderstatus base url
import axios from "../../axios/order"
//holds the state properties
const state = {
    customerItem: [],
    dateRange: {
        startDate: '',
        endDate: '',
    },
};

//returns the state properties
const getters = {
    dashboardCustomer: state => state.customerItem,
};

//fetch data 
const actions = {

    getCustomer(context) {
        return new Promise((resolve, reject) => {
            axios.get('/metrics/customers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                context.commit("setCustomer", res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },

    getCustomerFilter(context) {
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== null) ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");

        return new Promise((resolve, reject) => {
            axios.get(`/metrics/customers?${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                context.commit("setCustomer", res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },

};



//updates the different state properties
const mutations = {
    setCustomer: (state, data) => {
        state.customerItem = data
    },
    filterRange: (state, data) => {
        state.dateRange = data
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