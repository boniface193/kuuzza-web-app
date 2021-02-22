import axios from "@/axios/bankServices.js";

//holds the state properties
const state = {
    bankList: [],
    //accountDetails: {},
    doNothing: null,
};
//returns the state properties
const getters = {
    bankList: state => state.bankList,
    //accountDetails: state => state.accountDetails,
};

//take actions 
const actions = {
    // get bank list
    getBankList(context) {
        return new Promise((resolve, reject) => {
            axios.get("/banks", {
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
    validateBankAccount(context, data) {
        return new Promise((resolve, reject) => {
            axios.post("/banks/verify-account", data, {
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
    setAccountDetails(context, data) {
        return new Promise((resolve, reject) => {
            axios.post("/bank-accounts", data, {
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
    getUserBankDetails(context, data) {
        return new Promise((resolve, reject) => {
            axios.get(`/bank-accounts/${data.user_id}`, {
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
    }
};

//updates the different state properties
const mutations = {
    // commit nothing
    doNothing: (state) => (state.doNothing = null),
    setBankList: (state, bankList) => (state.bankList = bankList),
    //setAccountDetails: (state, accountDetails) => (state.accountDetails = accountDetails),
};

export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};  