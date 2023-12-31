// orderstatus base url
import orderHttpClient from "@/axios/order";
//holds the state properties
const state = {
    sellerItem: [],
    dateRange: {
        startDate: '',
        endDate: '',
    },
};

//returns the state properties
const getters = {
    seller: state => state.sellerItem
};

//fetch data 
const actions = {

    getSeller(context) {
        return new Promise((resolve, reject) => {
            orderHttpClient.get('/metrics/sellers').then((res) => {
                context.commit("setSeller", res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },

    getSellerFilter(context) {
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== '') ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");

        return new Promise((resolve, reject) => {
            orderHttpClient.get(`/metrics/sellers?${dateRange}`).then((res) => {
                context.commit("setSeller", res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },
};



//updates the different state properties
const mutations = {
    setSeller: (state, data) => {
        state.sellerItem = data
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