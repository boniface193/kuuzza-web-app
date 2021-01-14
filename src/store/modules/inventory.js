import axios from "@/axios/inventory.js";

//holds the state properties
const state = {
    products: [],
    inventoryHistory: [],
    inventoryHistoryPageDetails: {},
    searchProduct: false,
    filteredProductsDetails: {
        page: 1,
        itemPerPage: 15,
        pageDetails: {},
        filter: {
            minPrice: 0,
            maxPrice: 0,
            minQuantity: 0,
            maxQuantity: 0,
            selectedOptions: [],
        },
    },
    searchProductsDetails: {
        page: 1,
        itemPerPage: 15,
        pageDetails: {},
        minPrice: 0,
        maxPrice: 0,
        minQuantity: 0,
        maxQuantity: 0,
        selectedOptions: [],
        value: ""
    },
    selectedReferences: [],
    doNothing: null
};

//returns the state properties
const getters = {
    products: state => state.products,
    inventoryHistory: state => state.inventoryHistory,
    productsPageDetails: state => state.productsPageDetails,
    searchProduct: state => state.searchProduct,
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
    updateProduct(context, data) {
        return new Promise((resolve, reject) => {
            axios.put(`/products/${data.ref}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then(response => {
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
                context.commit("setFilteredProductsPageDetails", response.data.meta);
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
    getfilteredProducts(context) {
        let page = ((state.filteredProductsDetails.page) ? `page=${state.filteredProductsDetails.page}` : "");
        let perPage = ((state.filteredProductsDetails.itemPerPage) ? `per_page=${state.filteredProductsDetails.itemPerPage}` : "");
        let priceRange = ((state.filteredProductsDetails.filter.maxPrice) ? `price_between=${state.filteredProductsDetails.filter.minPrice},${state.filteredProductsDetails.filter.maxPrice}` : "");
        let quantityRange = ((state.filteredProductsDetails.filter.maxQuantity) ? `quantity_between=${state.filteredProductsDetails.filter.minQuantity},${state.filteredProductsDetails.filter.maxQuantity}` : "");
        let inStock = (state.filteredProductsDetails.filter.selectedOptions.includes('inStock') ? `in_stock=${true}` : "")
        let outOfStock = (state.filteredProductsDetails.filter.selectedOptions.includes('outOfStock') ? `out_of_stock=${true}` : "")

        return new Promise((resolve, reject) => {
            axios.get(`/products?${page}&${perPage}&${priceRange}&${quantityRange}&${inStock}&${outOfStock}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                    context.commit("setProducts", response.data.data);
                    context.commit("setFilteredProductsPageDetails", response.data.meta);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    // search products
    searchProducts(context, data) {
        let page = ((state.searchProductsDetails.page) ? `page=${state.searchProductsDetails.page}` : "");
        let perPage = ((state.searchProductsDetails.itemPerPage) ? `per_page=${state.searchProductsDetails.itemPerPage}` : "");
        return new Promise((resolve, reject) => {
            axios.get(`/products/search?q=${data.value}&${page}&${perPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                    context.commit("setProducts", response.data.data);
                    context.commit("setSearchProductsPageDetails", response.data.meta);
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
    // bring products online
    takeProductsOnline(context, data) {
        return new Promise((resolve, reject) => {
            axios.post(`/products/online`, data,
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
            axios.delete(`/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }, data
            },
            ).then(response => {
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
    },
    // export product
    exportProducts() {
        return new Promise((resolve, reject) => {
            axios.post(`/products/export`, {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
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
    setProducts: (state, data) => (state.products = data),
    addProduct: (state, data) => {
        state.products.push(data)
    },
    setFilteredProductsPageDetails: (state, data) => (state.filteredProductsDetails.pageDetails = data),
    setFilteredCurrentPage: (state, currentPage) => (state.filteredProductsDetails.page = currentPage),
    setFilteredItemPerPage: (state, itemPerPage) => (state.filteredProductsDetails.itemPerPage = itemPerPage),
    setFilter: (state, data) => (state.filteredProductsDetails.filter = data),
    setSearchProductsPageDetails: (state, data) => (state.searchProductsDetails.pageDetails = data),
    setSearchCurrentPage: (state, currentPage) => (state.searchProductsDetails.page = currentPage),
    setSearchItemPerPage: (state, itemPerPage) => (state.searchProductsDetails.itemPerPage = itemPerPage),
    setSearchProduct: (state, status) => (state.searchProduct = status),
    setInventoryHistory: (state, data) => (state.inventoryHistory = data),
    setInventoryHistoryPageDetails: (state, data) => (state.inventoryHistoryPageDetails = data),
    setSelectedReferences: (state, value) => (state.selectedReferences = value),
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