// orderstatus base url
import orderHttpClient from "@/axios/order"
//holds the state properties
const state = {
    bestSellingItems: [],
    page: 1,
    itemPerPage: 15,
    pageDetails: {},
    dateRange: {
        startDate: '',
        endDate: '',
    },
};

//returns the state properties
const getters = {
    bestSelling: state => state.bestSellingItems,
};

//fetch data 
const actions = {
    getBestSelling(context) {
        return new Promise((resolve, reject) => {
            orderHttpClient.get('/metrics/best-selling').then((res) => {
                context.commit("setBestSelling", res.data)
                context.commit("setPageDetails", res.data.meta);
                resolve(res.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },

    getSellerFilter(context) {
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== '') ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");
console.log(dateRange)
        return new Promise((resolve, reject) => {
            orderHttpClient.get(`/metrics/best-selling?${dateRange}`).then((res) => {
                context.commit("setBestSelling", res.data)
                context.commit("setPageDetails", res.data.meta);
                console.log(res.data)
                resolve(res.data)
            }).catch((error) => {
                reject(error.response)
            })
        })
    },
};

//updates the different state properties
const mutations = {
    setBestSelling: (state, data) => {
        state.bestSellingItems = data
    },
    filterRange: (state, data) => {
        state.dateRange = data
    },
    setPageDetails: (state, data) => (state.pageDetails = data),
    // setItemPerPage: (state, itemPerPage) => {
    //     state.itemPerPage = itemPerPage;
    //     let page = setItemPerPage(itemPerPage, state.pageDetails.per_page, state.pageDetails.from);
    //     state.page = page;
    // },
    setPage: (state, page) => (state.page = page),
};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};