// orderstatus base url
import axios from "../../axios/inventory"
import moment from "moment"
//holds the state properties
const state = {
    instock: [],
    dateRange: {
        startDate: moment(new Date()).format("L"),
        endDate: moment(new Date()).format("L"),
    },
};

//returns the state properties
const getters = {
    stockItem: state => state.instock
};

//fetch data 
const actions = {
    getStock(context) {
        return new Promise((resolve, reject) => {
            axios.get('/products/metrics', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                context.commit("setStock", res.data.data)
                resolve(res.data.data)

            }).catch((error) => {
                reject(error.response)
            })
        })

    },

    getStockDateFilter(context){
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== null) ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");
        return new Promise((resolve, reject) => {
            axios.get(`/products/metrics?${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                context.commit("setStock", res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    }
};



//updates the different state properties
const mutations = {
    setStock: (state, data) => {
        state.instock = data
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