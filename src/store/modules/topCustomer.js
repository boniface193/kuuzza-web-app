// orderstatus base url
import orderStatus from "../../axios/order"
import moment from "moment"
//holds the state properties
const state = {
    topCustomerItem: [],
    dateRange: {
        startDate: moment(new Date()).format("L"),
        endDate: moment(new Date()).format("L"),
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
            orderStatus.get('/metrics/top-customers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
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