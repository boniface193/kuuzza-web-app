import bankServiceHttpClient from "@/axios/bankServices.js";

//holds the state properties
const state = {
    bankList: [],
    doNothing: null,
};
//returns the state properties
const getters = {
    bankList: state => state.bankList,
};

//take actions 
const actions = {
    // get bank list
    getBankList(context) {
        return new Promise((resolve, reject) => {
            bankServiceHttpClient.get("/banks").then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // validate that bank account exist
    validateBankAccount(context, data) {
        return new Promise((resolve, reject) => {
            bankServiceHttpClient.post("/banks/verify-account", data).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // set account details
    setAccountDetails(context, data) {
        return new Promise((resolve, reject) => {
            bankServiceHttpClient.post("/bank-accounts", data).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // get users bank account details
    getUserBankDetails(context, data) {
        return new Promise((resolve, reject) => {
            bankServiceHttpClient.get(`/bank-accounts/${data.store_id}`).then(response => {
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
    setBankList: (state, bankList) => (state.bankList = bankList),
};

export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};  