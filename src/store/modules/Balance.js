import axios from "@/axios/bankServices.js";

// get todays date
const curday = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //As January is 0.
    let yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return (dd + '-' + mm + '-' + yyyy);
};

//holds the state properties
const state = {
    doNothing: null,
    settlements: {
        data: [],
        meta: {}
    },
    awaitingSettlements: {
        data: [],
        meta: {}
    },
    paymentHistory: {
        data: [],
        meta: {}
    },
    dateRange: {
        startDate: curday(),
        endDate: curday(),
    },
};
//returns the state properties
const getters = {
    settlements: state => state.settlements,
    awaitingSettlements: state => state.awaitingSettlements,
    paymentHistory: state => state.paymentHistory
};

//take actions 
const actions = {
    getSettlements(context, data) {
        let dateRange = (state.dateRange.endDate !== null) ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : ""
        return new Promise((resolve, reject) => {
            axios.get(`${data.storeId}/settlements?status=${data.status}&${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
                .then((response) => {
                    if (data.status === "settled") {
                        context.commit("setSettlements", response.data)
                    }
                    if (data.status === "pending") {
                        context.commit("setAwaitingSettlements", response.data)
                    }
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    },
    getRevenueDetails(context, data) {
        let dateRange = (state.dateRange.endDate !== null) ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : ""
        return new Promise((resolve, reject) => {
            axios.get(`/metrics/${data.storeId}/total-revenue?${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    context.commit("doNothing");
                    reject(error)
                });
        })
    },
    withdrawFunds(context) {
        return new Promise((resolve, reject) => {
            axios.post("/settlements/withdraw", {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    getPaymentHistory(context, data) {
        let dateRange = (state.dateRange.endDate !== null) ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : ""
        return new Promise((resolve, reject) => {
            axios.get(`/payouts/${data.storeId}/history?${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
                .then((response) => {
                    context.commit("setPaymentHistory", response.data)
                    resolve(response)
                })
                .catch((error) => {
                    context.commit("doNothing");
                    reject(error)
                });
        })
    }
};

//updates the different state properties
const mutations = {
    // commit nothing
    doNothing: (state) => (state.doNothing = null),
    setSettlements: (state, list) => (state.settlement = list),
    setAwaitingSettlements: (state, list) => (state.awaitingSettlements = list),
    setPaymentHistory: (state, list) => (state.paymentHistory = list),
    setDateRange: (state, dateRange) => (state.dateRange = dateRange),
};

export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};  