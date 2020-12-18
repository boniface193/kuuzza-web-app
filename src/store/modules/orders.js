
//holds the state properties
const state = {
    orders: [
        {
            productName: "Infinix Hot 3",
            orderNumber: "8787239",
            price: 839201,
            commission: 5000,
            seller: "Abdulazeez Abdulazeez",
            customer: "Ayotunde Lanwo",
            time: "031220 9:05am",
            payment: "paid",
            delivery: "delivered",
            id: "hhbhbhj8u8909"
        },
        {
            productName: "Iphone 12",
            orderNumber: "87872909",
            price: 700000,
            commission: 11000,
            seller: "Ikechukwu",
            customer: "Emike Lanwo",
            time: "031220 9:05am",
            payment: "not paid",
            delivery: "not delivered",
            id: "eyugd873"
        }
    ],
    filteredOrders: null
};

//returns the state properties
const getters = {
    orders: state => {
        if (state.filteredOrders === null) {
            return state.orders
        } else {
            return state.filteredOrders
        }
    },
    getOrderDetails: state => {
        return (orderId) => state.orders.find(({ id }) => id === orderId);
    }
};

//take actions 
const actions = {

};

//updates the different state properties
const mutations = {
    filterOrders: (state, payload) => {
        state.filteredOrders = state.orders.filter(item =>
            (item.price >= payload.minPrice && item.price <= payload.maxPrice) ||
            (item.commission >= payload.minCommission && item.commission <= payload.maxCommission) || 
            (payload.selectedOptions.includes(item.payment) ) ||
            (payload.selectedOptions.includes(item.delivery) ))
    },
    resetFilter: (state) => (state.filteredOrders = null)
};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};  