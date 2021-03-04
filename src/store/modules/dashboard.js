// orderstatus base url
import instock from "../../axios/inventory"
import orderStatus from "../../axios/order"
import payment from "../../axios/bankServices"
import moment from "moment"
import leaderboard from "../../axios/gamification"
//holds the state properties
const state = {
    dashboardOrder: [],
    dashboardBestSelling: [],
    topCustomerItem: [],
    dashboardSeller: [],
    customerItem: [],
    stockItem: [],
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
    bestSellingItem: state => state.dashboardBestSelling,
    topCustomer: state => state.topCustomerItem,
    bestSelling: state => state.dashboardSeller,
    dashboardCustomer: state => state.customerItem,
    dashboardStock: state => state.stockItem,
    revenue: state => state.dashboardRevenue
};

//fetch data 
const actions = {
    getStock(context) {
        return new Promise((resolve, reject) => {
            instock.get('/products/metrics', {
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

    getStockDateFilter(context) {
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== null) ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");

        return new Promise((resolve, reject) => {
            instock.get(`/products/metrics?${dateRange}`, {
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

    getOrderStatus(context) {
        return new Promise((resolve, reject) => {
            orderStatus.get('/metrics', {
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

    getCustomer(context) {
        return new Promise((resolve, reject) => {
            orderStatus.get('/metrics/customers', {
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
            orderStatus.get(`/metrics/customers?${dateRange}`, {
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

    getSeller(context) {
        return new Promise((resolve, reject) => {
            orderStatus.get('/metrics/sellers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                context.commit("setSeller", res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },

    getSellerFilter(context) {
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== null) ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");

        return new Promise((resolve, reject) => {
            orderStatus.get(`/metrics/sellers?${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                context.commit("setSeller", res.data.data)
                resolve(res.data.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },

    getBestSelling(context) {
        return new Promise((resolve, reject) => {
            orderStatus.get('/metrics/best-selling', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                context.commit("setdashboardBestSelling", res.data)
                // console.log("best seller", res.data)
                resolve(res.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },

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

    getTotalRevenue(context, data) {
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== null) ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");

        return new Promise((resolve, reject) => {
            payment.get(`/metrics/${data.id}/total-revenue?${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((response) => {
                context.commit('setRevenue', response.data.data)
                console.log("revenue", response.data.data)
                resolve(response.data.data)
            })
                .catch((error) => {
                    context.commit('error', error)
                    reject(error)
                })
        })
    },

    getLeaderboard(context) {
        return new Promise((resolve, reject) => {
            leaderboard.get("/leaderboard/seller", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then(response => {
                context.commit("setLeaderboard", response.data)
                // console.log("leaderboard", response.data)
                // context.commit("setPageDetails", response.data.meta);
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
};



//updates the different state properties
const mutations = {
    setdashboardOrder: (state, data) => {
        state.dashboardOrder = data
    },
    setdashboardBestSelling: (state, data) => {
        state.dashboardBestSelling = data
    },
    setTopCustomer: (state, data) => {
        state.topCustomerItem = data
    },
    setSeller: (state, data) => {
        state.dashboardSeller = data
    },
    setCustomer: (state, data) => {
        state.customerItem = data
    },
    setStock: (state, data) => {
        state.stockItem = data
    },
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