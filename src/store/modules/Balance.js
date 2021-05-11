import bankServicesHttpClient from "@/axios/bankServices.js";

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
    // get settlements and awaiting settlements
    getSettlements(context, data) {
        let dateRange = (state.dateRange.endDate !== '') ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : ""
        let page, perPage;
        if (data.status === "pending") {
            page = ((state.awaitingSettlements.meta.current_page) ? `page=${state.awaitingSettlements.meta.current_page}` : "");
            perPage = ((state.awaitingSettlements.meta.per_page) ? `per_page=${state.awaitingSettlements.meta.per_page}` : "");
        }
        if (data.status === "settled") {
            page = ((state.settlements.meta.current_page) ? `page=${state.settlements.meta.current_page}` : "");
            perPage = ((state.settlements.meta.per_page) ? `per_page=${state.settlements.meta.per_page}` : "");
        }

        return new Promise((resolve, reject) => {
            bankServicesHttpClient.get(`${data.storeId}/settlements?status=${data.status}&${dateRange}&${page}&${perPage}`)
                .then((response) => {
                    let newDataFormat = []
                    response.data.data.forEach(item => {
                        let newData = {}
                        newData.amount = item.amount;
                        newData.order_id = item.order_id;
                        newData.product_name = item.meta.product_name;
                        if (data.status === "pending") {
                            newData.due_date = (item.due_date == null) ? "pending" : item.due_date;
                        } else {
                            newData.date_settled = (item.date_settled == null) ? "pending" : item.date_settled
                        }

                        newDataFormat.push(newData);
                    });
                    let resturctedData = {}
                    resturctedData.data = newDataFormat
                    resturctedData.meta = response.data.meta
                    if (data.status === "settled") {
                        context.commit("setSettlements", resturctedData)
                    }
                    if (data.status === "pending") {
                        context.commit("setAwaitingSettlements", resturctedData);
                    }
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    },
    // get revenue informations
    getRevenueDetails(context, data) {
        let dateRange = (state.dateRange.endDate !== '') ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : ""
        return new Promise((resolve, reject) => {
            bankServicesHttpClient.get(`/metrics/${data.storeId}/total-revenue?${dateRange}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    context.commit("doNothing");
                    reject(error)
                });
        })
    },
    // triger withdrwal for user funds
    withdrawFunds(context) {
        return new Promise((resolve, reject) => {
            bankServicesHttpClient.post("/settlements/withdraw", {}).then(response => {
                resolve(response);
            })
                .catch(error => {

                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // get the payout history of a user
    getPaymentHistory(context, data) {
        let dateRange = (state.dateRange.endDate !== '') ? `date_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "";
        let page = ((state.paymentHistory.meta.current_page) ? `page=${state.paymentHistory.meta.current_page}` : "");
        let perPage = ((state.paymentHistory.meta.per_page) ? `per_page=${state.paymentHistory.meta.per_page}` : "");
        return new Promise((resolve, reject) => {
            bankServicesHttpClient.get(`/payouts/${data.storeId}/history?${dateRange}&${page}&${perPage}`)
                .then((response) => {
                    context.commit("setPaymentHistory", response.data)
                    resolve(response)
                })
                .catch((error) => {

                    reject(error)
                });
        })
    },
    getWithdrawalFees(context){
        return new Promise((resolve, reject) => {
            bankServicesHttpClient.post("/settlements/withdrawal-fees", {}).then(response => {
                resolve(response);
            })
                .catch(error => {

                    context.commit("doNothing");
                    reject(error);
                })
        })
    }
};

//updates the different state properties
const mutations = {
    // commit nothing
    doNothing: (state) => (state.doNothing = null),
    setSettlements: (state, list) => (state.settlements = list),
    setAwaitingSettlements: (state, list) => (state.awaitingSettlements = list),
    setPaymentHistory: (state, list) => (state.paymentHistory = list),
    setDateRange: (state, dateRange) => (state.dateRange = dateRange),
    setItemPerPageAwaitingSettlements: (state, itemPerPage) => {
        let page = setItemPerPage(itemPerPage, state.awaitingSettlements.meta.per_page, state.awaitingSettlements.meta.from);
        state.awaitingSettlements.meta.current_page = page;
        state.awaitingSettlements.meta.per_page = itemPerPage;
    },
    setPageAwaitingSettlements: (state, page) => (state.awaitingSettlements.meta.current_page = page),
    setItemPerPageSettlements: (state, itemPerPage) => {
        let page = setItemPerPage(itemPerPage, state.settlements.meta.per_page, state.settlements.meta.from);
        state.settlements.meta.current_page = page;
        state.settlements.meta.per_page = itemPerPage;
    },
    setPageSettlements: (state, page) => (state.settlements.meta.current_page = page),
    setItemPerPagePaymentHistory: (state, itemPerPage) => {
        let page = setItemPerPage(itemPerPage, state.paymentHistory.meta.per_page, state.paymentHistory.meta.from);
        state.paymentHistory.meta.current_page = page;
        state.paymentHistory.meta.per_page = itemPerPage;
    },
    setPagePaymentHistory: (state, page) => (state.paymentHistory.meta.current_page = page),
};

export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};