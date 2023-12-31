// orderstatus base url
import orderHttpClient from "@/axios/order";

//holds the state properties
const state = {
    topCustomerItem: [],
    dateRange: {
        startDate: '',
        endDate: '',
    },
};

//returns the state properties
const getters = {
    topCustomer: state => state.topCustomerItem,
};

//fetch data 
const actions = {
    getTopCustomer(context) {
        return new Promise((resolve, reject) => {
            orderHttpClient.get('/metrics/top-customers').then((res) => {
                context.commit("setTopCustomer", res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },

    getFilterTopCustomer(context) {
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== '') ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");
        return new Promise((resolve, reject) => {
            orderHttpClient.get(`/metrics/top-customers?${dateRange}`).then((res) => {
                context.commit("setTopCustomer", res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },
};



//updates the different state properties
const mutations = {
    setTopCustomer: (state, data) => {
        state.topCustomerItem = data
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