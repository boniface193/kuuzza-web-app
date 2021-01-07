import axios from "@/axios/inventory.js";

//holds the state properties
const state = {
    products: [],
    inventoriesHistory: [],
    productsPageDetails: {
        current_page: 1
    },
    doNothing: null
};

//returns the state properties
const getters = {
    products: state => state.products,
    inventoriesHistory: state => state.inventoriesHistory,
    productsPageDetails: state => state.productsPageDetails
};

//take actions 
const actions = {
    // add product to inventory
    addProduct(context, data) {
        return new Promise((resolve, reject) => {
            axios.post("/products", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    context.commit('doNothing')
                    reject(error)
                })
        })
    },
    // get inventories 
    getProducts(context) {
        return new Promise((resolve, reject) => {
            axios.get("/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(response => {
                context.commit("setProducts", response.data.data);
                context.commit("setProductsPageDetails", response.data.meta);
                resolve(response);
            })
                .catch(error => {
                    reject(error);
                })
        })
    },
    // get a product detail
    getProductDetail(context, data) {
        return new Promise((resolve, reject) => {
            axios.get(`/products/${data.id}`, {
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
    
};

//updates the different state properties
const mutations = {
    setProducts: (state, data) => (state.products = data),
    setProductsPageDetails: (state, data) => (state.ProductsPageDetails = data),
    setCurrentPage: (state, currentPage) => {state.ProductsPageDetails.current_page = currentPage},
    doNothing: (state) => (state.doNothing = null)
};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};  