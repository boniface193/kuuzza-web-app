import axios from "@/axios/bankServices.js";
import store from "@/store";

// set the number of item you want to show on table
const setItemPerPage = (itemPerPage, per_page, from_page) => {
    let page = null;
    if (itemPerPage > per_page) {
        let range = Math.round(
            (from_page - 1) / per_page
        );
        if (range < 0.5) {
            page = range + 1;
            return page;
        } else {
            page = range;
            return page;
        }
    } else {
        page = Math.round(
            (from_page - 1) / itemPerPage + 1
        );
        return page
    }
}

// get todays date
// const curday = () => {
//     const today = new Date();
//     let dd = today.getDate();
//     let mm = today.getMonth() + 1; //As January is 0.
//     let yyyy = today.getFullYear();

//     if (dd < 10) dd = '0' + dd;
//     if (mm < 10) mm = '0' + mm;
//     return (dd + '-' + mm + '-' + yyyy);
// };

//holds the state properties
const state = {
    doNothing: null,
    settlements: {
        data: [],
        meta: {}
    },
    awaitingSettlements: {
        data: [],
        meta: {
            current_page: 1,
            per_page: 15,
        }
    },
    paymentHistory: {
        data: [],
        meta: {}
    },
    dateRange: {
        startDate: '',
        endDate: '',
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
        let dateRange = (state.dateRange.endDate !== '') ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : ""
        let page = ((state.awaitingSettlements.meta.current_page) ? `page=${state.awaitingSettlements.meta.current_page}` : "");
        let perPage = ((state.awaitingSettlements.meta.per_page) ? `per_page=${state.awaitingSettlements.meta.per_page}` : "");
        return new Promise((resolve, reject) => {
            axios.get(`${data.storeId}/settlements?status=${data.status}&${dateRange}&${page}&${perPage}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
                },
            })
                .then((response) => {
                    if (data.status === "settled") {
                        context.commit("setSettlements", response.data)
                    }
                    if (data.status === "pending") {
                        let newDataFormat = []
                        response.data.data.forEach(item => {
                            let newData = {}
                            newData.amount = item.amount;
                            newData.order_id = item.order_id;
                            newData.product_name = item.meta.product_name;
                            newData.due_date = (item.due_date == null) ? "pending" : item.due_date;
                            newDataFormat.push(newData);
                        });
                        let awaitingSettlements = {}
                        awaitingSettlements.data = newDataFormat
                        awaitingSettlements.meta = response.data.meta
                        context.commit("setAwaitingSettlements", awaitingSettlements);
                    }
                    resolve(response)
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    reject(error)
                });
        })
    },
    getRevenueDetails(context, data) {
        let dateRange = (state.dateRange.endDate !== '') ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : ""
        return new Promise((resolve, reject) => {
            axios.get(`/metrics/${data.storeId}/total-revenue?${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
                },
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    context.commit("doNothing");
                    reject(error)
                });
        })
    },
    withdrawFunds(context) {
        return new Promise((resolve, reject) => {
            axios.post("/settlements/withdraw", {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    getPaymentHistory(context, data) {
        let dateRange = (state.dateRange.endDate !== '') ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : ""
        return new Promise((resolve, reject) => {
            axios.get(`/payouts/${data.storeId}/history?${dateRange}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
                },
            })
                .then((response) => {
                    context.commit("setPaymentHistory", response.data)
                    resolve(response)
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
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
    setItemPerPage: (state, itemPerPage) => {
        let page = setItemPerPage(itemPerPage, state.awaitingSettlements.meta.per_page, state.awaitingSettlements.meta.from);
        state.awaitingSettlements.meta.current_page = page;
        state.awaitingSettlements.meta.per_page = itemPerPage;
    },
    setPage: (state, page) => (state.awaitingSettlements.meta.current_page = page),
};

export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};