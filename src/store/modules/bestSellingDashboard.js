// orderstatus base url
import axios from "../../axios/order"
import moment from "moment"
//holds the state properties
const state = {
    bestSellingItems: [],
    dateRange: {
        startDate: moment(new Date()).format("L"),
        endDate: moment(new Date()).format("L"),
    },
};

//returns the state properties
const getters = {
    bestSelling: state => state.bestSellingItems,
};

//fetch data 
const actions = {
    getBestSelling(context) {
        return new Promise((resolve, reject) => {
            axios.get('/metrics/best-selling', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                context.commit("setBestSelling", res.data)
                console.log("bestselling", res.data)
                resolve(res.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },

    getSellerFilter(context) {
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== null) ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");

        return new Promise((resolve, reject) => {
            axios.get(`/metrics/best-selling?${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                context.commit("setBestSelling", res.data)
                resolve(res.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },
};

//updates the different state properties
const mutations = {
    setBestSelling: (state, data) => {
        state.bestSellingItems = data
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