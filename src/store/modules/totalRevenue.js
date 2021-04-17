// orderstatus base url
import bankServiceHttpClient from "@/axios/bankServices";
// import moment from "moment"
//holds the state properties
const state = {
    dashboardRevenue: {
        total_revenue: 0,
        awaiting_settlement: 0,
        settled: 0
    },
    dateRange: {
        startDate: '',
        endDate: '',
    },
};

//returns the state properties
const getters = {
    revenue: state => state.dashboardRevenue,
    getDate: state => state.dateRange
};

//fetch data 
const actions = {
    getTotalRevenue(context, data) {
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== '') ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");

        return new Promise((resolve, reject) => {
            bankServiceHttpClient.get(`/metrics/${data.id}/total-revenue?${dateRange}`).then((response) => {
                context.commit('setRevenue', response.data.data)
                resolve(response.data.data)
            })
                .catch((error) => {
                    reject(error)
                })
        })
    },
};



//updates the different state properties
const mutations = {
    setRevenue: (state, data) => {
        state.dashboardRevenue = data
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