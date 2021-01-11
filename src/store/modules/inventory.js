import axios from "@/axios/inventory.js";

//holds the state properties
const state = {
    products: [],
    inventoryHistory: [],
    inventoryHistoryPageDetails: {},
    productsPageDetails: {
        current_page: 1,
    },
    doNothing: null
};

//returns the state properties
const getters = {
    products: state => state.products,
    inventoryHistory: state => state.inventoryHistory,
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
                    context.commit("addProduct", response.data.data)
                    resolve(response);
                })
                .catch(error => {
                    context.commit("doNothing")
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
    // filter products 
    getfilteredProducts(context, data) {
        let page = ((data.page) ? `page=${data.page}`: "");
        let perPage = ((data.itemPerPage) ? `per_page=${data.itemPerPage}`: "");
        let priceRange = ((data.maxPrice) ? `price_between=${data.minPrice},${data.maxPrice}`: "");
        let quantityRange = ((data.maxQuantity) ? `quantity_between=${data.minQuantity},${data.maxQuantity}`: "");
        let inStock = (data.selectedOptions.includes('inStock') ? `in_stock=${true}` : "")
        let outOfStock = (data.selectedOptions.includes('outOfStock') ? `out_of_stock=${true}` : "")
        
        return new Promise((resolve, reject) => { 
            axios.get(`/products?${page}&${perPage}&${priceRange}&${quantityRange}&${inStock}&${outOfStock}`,
                {
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
    // search products
    searchProducts(context, data) {
        return new Promise((resolve, reject) => { 
            axios.get(`/products/search?q=${data.value}`,
                {
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
    // take products offline
    takeProductsOffline(context, data) {
        return new Promise((resolve, reject) => { 
            axios.post(`/products/offline`, data,
                {
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
    // delete products
    deleteProducts(context, data) {
        return new Promise((resolve, reject) => { 
            axios.delete(`/products`, data,
                {
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
    // get inventory history
    getInventoryHistory(context) {
        return new Promise((resolve, reject) => { 
            axios.get(`/inventory-history`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                    context.commit("setInventoryHistory", response.data.data);
                    context.commit("setInventoryHistoryPageDetails", response.data.meta);
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
    setProducts: (state, data) => (state.products = data),
    addProduct: (state, data) => {
        state.products.push(data)
    },
    setProductsPageDetails: (state, data) => (state.productsPageDetails = data),
    setCurrentPage: (state, currentPage) => { state.productsPageDetails.current_page = currentPage },
    setInventoryHistory: (state, data) => (state.inventoryHistory = data),
    setInventoryHistoryPageDetails: (state, data) => (state.inventoryHistoryPageDetails = data),
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