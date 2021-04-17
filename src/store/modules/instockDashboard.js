import inventoryHttpClient from "@/axios/inventory.js";
//holds the state properties
const state = {
    instock: [],
    dateRange: {
        startDate: '',
        endDate: '',
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
            inventoryHttpClient.get('/products/metrics').then((res) => {
                context.commit("setStock", res.data.data)
                resolve(res.data.data)

            }).catch((error) => {
                reject(error.response)
            })
        })

    },

    getStockDateFilter(context) {
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== '') ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");
        return new Promise((resolve, reject) => {
            inventoryHttpClient.get(`/products/metrics?${dateRange}`).then((res) => {
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