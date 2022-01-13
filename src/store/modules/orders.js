import orderHttpClient from "@/axios/order.js";

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
    tableLoader: false,
    orders: [],
    searchOrder: false,
    searchValue: "",
    page: 1,
    itemPerPage: 15,
    pageDetails: {},
    filter: {
        minPrice: 0,
        maxPrice: 0,
        paid: false,
        unpaid: false,
        delivered: false,
        notDelivered: false,
        selectedOptions: [],
    },
    dateRange: {
        startDate: '',
        endDate: '',
    },
    allowDateFilter: false,
    selectedReferences: [],
    doNothing: null,
};
//returns the state properties
const getters = {
    orders(state) {
        return state.orders
    },
    orderDetail(state) {
        return state.orderDetails
    }
};

//take actions 
const actions = {
    getOrders(context) {
        return new Promise((resolve, reject) => {
            orderHttpClient.get("/orders",)
                .then(response => {
                    context.commit("setOrders", response.data.data);
                    context.commit("setPageDetails", response.data.meta);
                    resolve(response.data.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getFilteredOrders(context) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        let page = ((state.page) ? `page=${state.page}` : "");
        let perPage = ((state.itemPerPage) ? `per_page=${state.itemPerPage}` : "");
        let dateRange = ((state.dateRange.endDate !== null && state.allowDateFilter === true) ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");
        let priceRange = ((state.filter.maxPrice) ? `price_between=${state.filter.minPrice},${state.filter.maxPrice}` : "");
        let paid = ((state.filter.selectedOptions.includes('paid')) ? "paid" : "");
        let unpaid = ((state.filter.selectedOptions.includes('not paid')) ? "unpaid" : "");
        let delivered = ((state.filter.selectedOptions.includes('delivered')) ? "delivered" : "");
        let notDelivered = ((state.filter.selectedOptions.includes('not delivered')) ? "not_delivered" : "");
        return new Promise((resolve, reject) => {
            orderHttpClient.get(`/orders?${perPage}&${page}&${dateRange}&${priceRange}&${paid}&${unpaid}&${delivered}&${notDelivered}`,
            ).then(response => {
                context.commit("setOrders", response.data.data);
                context.commit("setPageDetails", response.data.meta);
                resolve(response);
            })
                .catch(error => {
                    reject(error);
                })
        })
    },
    getOrdersDetail(context, data) {
        return new Promise((resolve, reject) => {
            orderHttpClient.get(`/orders/${data.id}`).then(response => {
                resolve(response);
            })
                .catch(error => {
                    context.commit("setDoNothing", null);
                    reject(error);
                })
        })
    },
    // open selling
    createOpenSelling(context, data) {
        return new Promise((resolve, reject) => {
            orderHttpClient.post('/open-order', data).then(response => {
                resolve(response)
            }).catch(error => {
                context.commit("doNothing")
                reject(error)
            })
        })
    },
    searchOrders(context) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        let page = ((state.page) ? `page=${state.page}` : "");
        let perPage = ((state.itemPerPage) ? `per_page=${state.itemPerPage}` : "");
        let route = (state.searchValue !== "") ? `/search?q=${state.searchValue}&${page}&${perPage}` : ""
        return new Promise((resolve, reject) => {
            orderHttpClient.get(`/orders${route}`).then(response => {
                context.commit("setOrders", response.data.data);
                context.commit("setPageDetails", response.data.meta);
                resolve(response);
            })
                .catch(error => {
                    reject(error);
                })
        })
    },
    exportOrders() {
        return new Promise((resolve, reject) => {
            orderHttpClient.post(`/orders/export`, {
                start_date: state.dateRange.startDate,
                end_date: state.dateRange.endDate
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    reject(error);
                })
        })
    }

};

//updates the different state properties
const mutations = {
    setTableLoader: (state, status) => (state.tableLoader = status),
    setEmptyOrder: (state, status) => (state.emptyOrder = status),
    setOrders(state, data) {
        state.orders = data
    },
    setFilter(state, filter) {
        state.filter = filter
    },
    setDateRange(state, dateRange) {
        state.dateRange = dateRange
    },
    setAllowDateFilter: (state, status) => (state.allowDateFilter = status),
    setSearchValue(state, value) {
        state.searchValue = value
    },
    setSearchOrder(state, status) {
        state.searchOrder = status
    },
    setPageDetails(state, data) {
        state.pageDetails = data
    },
    setItemPerPage(state, itemPerPage) {
        state.itemPerPage = itemPerPage;
        let page = setItemPerPage(itemPerPage, state.pageDetails.per_page, state.pageDetails.from);
        state.page = page;
    },
    setPage(state, page) {
        state.page = page
    },
    setDoNothing: (state, status) => (state.doNothing = status)
};

export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};