// orderstatus base url
import axios from "../../axios/bankServices"
import moment from "moment"
//holds the state properties
const state = {
    dashboardRevenue: {
        total_revenue: 0,
        awaiting_settlement: 0,
        settled: 0
    },
    dateRange: {
        startDate: moment(new Date()).format("L"),
        endDate: moment(new Date()).format("L"),
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
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== null) ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");

        return new Promise((resolve, reject) => {
            axios.get(`/metrics/${data.id}/total-revenue?${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((response) => {
                context.commit('setRevenue', response.data.data)
                resolve(response.data.data)
            })
                .catch((error) => {
                    context.commit('error', error)
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