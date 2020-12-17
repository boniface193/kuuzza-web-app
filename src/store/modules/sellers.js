// import axios from "axios";

//holds the state properties
const state = {
    items: [
        {
            name: "Ayotunde Lanwo",
            totalOrder: 4,
            totalValue: 300000,
            id: "hr01",
            route: "/seller/sellersCard",
        },
        {
            name: "Abdulazeez Abdulazeez",
            totalOrder: 4,
            totalValue: 299999,
            id: "hr02",
        },
        {
            name: "Ayotunde Lanwo",
            totalOrder: 3,
            totalValue: 199999,
            id: "hr03",
        },
        {
            name: "Ayotunde Lanwo",

            totalOrder: 3,
            totalValue: 209000,
            id: "hr04",
        },
        {
            name: "Abdulazeez Abdulazeez",

            totalOrder: 2,
            totalValue: 203000,
            id: "hr05",
        },
        {
            name: "Ayotunde Lanwo",

            totalOrder: 6,
            totalValue: 100000,
            id: "hr06",
        },
        {
            name: "Ayotunde Lanwo",

            totalOrder: 5,
            totalValue: 190000,
            id: "hr07",
        },
        {
            name: "Abdulazeez Abdulazeez",

            totalOrder: 7,
            totalValue: 190000,
            id: "hr08",
        },
        {
            name: "Ayotunde Lanwo",

            totalOrder: 3,
            totalValue: 180000,
            id: "hr09",
        },
        {
            name: "Ayotunde Lanwo",

            totalOrder: 2,
            totalValue: 200000,
            id: "hr10",
        },
        {
            name: "Abdulazeez Abdulazeez",

            totalOrder: 3,
            totalValue: 14300,
            id: "hr11",
        },
        {
            name: "Ayotunde Lanwo",

            totalOrder: 2,
            totalValue: 198000,
            id: "hr12",
        },
    ],
};

//returns the state properties
const getters = {
    items: state => state.items,
    // inventoriesHistory: state => state.inventoriesHistory,
    getSellersDetail: state => {
        return (sellerId) => state.items.find(({ id }) => id === sellerId);
    }
};

//take actions 
const actions = {
    // addProduct(context, details) {
    //     return new Promise((resolve, reject) => {
    //         axios.post("/inventory/addproduct", {
    //             productName: details.productName,
    //             category: details.category,
    //             skuNumber: details.skuNumber,
    //             quantity: details.quantity,
    //             price: details.price,
    //             commission: details.commission,
    //             productDescription: details.productDescription,
    //             images: details.images,
    //         })
    //             .then(response => {
    //                 resolve(response)
    //             })
    //             .catch(error => {
    //                 context.commit('', '')
    //                 reject(error)
    //             })
    //     })
    // }

};

//updates the different state properties
const mutations = {};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};  