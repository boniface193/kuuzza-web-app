import axios from "@/axios/inventory.js";
import store from "@/store";

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
    // history states parameters
    inventoryHistory: [],
    inventoryHistoryPageDetails: {},
    historyPage: 1,
    historyItemPerPage: 15,
    historyDateRange: {
        startDate: null,
        endDate: null,
    },
    allowHistoryDateFilter: false,
    // main inventory states parameter
    tableLoader: false,
    products: [],
    searchProduct: false,
    searchValue: "",
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
    dateRange: {
        startDate: '',
        endDate: '',
    },
    allowDateFilter: false,
    selectedReferences: [],
    productCategories: [],
    doNothing: null
};

//returns the state properties
const getters = {
    products: state => state.products,
    inventoryHistory: state => state.inventoryHistory,
    productsPageDetails: state => state.productsPageDetails,
    searchProduct: state => state.searchProduct,
    productCategories: state => state.productCategories
};

//take actions 
const actions = {
    // add product to inventory
    addProduct(context, data) {
        return new Promise((resolve, reject) => {
            axios.post("/products", data, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
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
    // update products on inventory
    updateProduct(context, data) {
        return new Promise((resolve, reject) => {
            axios.put(`/products/${data.ref}`, data, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
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
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                context.commit("setProducts", response.data.data);
                context.commit("setPageDetails", response.data.meta);
                resolve(response);
            })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    reject(error);
                })
        })
    },
    // get a product detail
    getProductDetail(context, data) {
        return new Promise((resolve, reject) => {
            axios.get(`/products/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }
            }).then(response => {
                resolve(response);
            })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // filter products 
    getfilteredProducts(context) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        let page = ((state.page) ? `page=${state.page}` : "");
        let perPage = ((state.itemPerPage) ? `per_page=${state.itemPerPage}` : "");
        let priceRange = ((state.filter.maxPrice) ? `price_between=${state.filter.minPrice},${state.filter.maxPrice}` : "");
        let quantityRange = ((state.filter.maxQuantity) ? `quantity_between=${state.filter.minQuantity},${state.filter.maxQuantity}` : "");
        let inStock = (state.filter.selectedOptions.includes('inStock') ? `in_stock=${true}` : "")
        let outOfStock = (state.filter.selectedOptions.includes('outOfStock') ? `out_of_stock=${true}` : "")
        let dateRange = (state.dateRange.endDate !== null && state.allowDateFilter === true) ? `created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : ""

        return new Promise((resolve, reject) => {
            axios.get(`/products?${page}&${perPage}&${priceRange}&${quantityRange}&${inStock}&${outOfStock}&${dateRange}`,
                {
                    headers: {
                        Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                    }
                }).then(response => {
                    context.commit("setProducts", response.data.data);
                    context.commit("setPageDetails", response.data.meta);
                    resolve(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    reject(error);
                })
        })
    },
    // search products
    searchProducts(context) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        let page = ((state.page) ? `page=${state.page}` : "");
        let perPage = ((state.itemPerPage) ? `per_page=${state.itemPerPage}` : "");
        let route = (state.searchValue !== "") ? `/search?q=${state.searchValue}&${page}&${perPage}` : ""
        return new Promise((resolve, reject) => {
            axios.get(`/products${route}`,
                {
                    headers: {
                        Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                    }
                }).then(response => {
                    context.commit("setProducts", response.data.data);
                    context.commit("setPageDetails", response.data.meta);
                    resolve(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
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
                        Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                    }
                }).then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
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
                        Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                    }
                }).then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
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
                    Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                }, data
            },
            ).then(response => {
                resolve(response);
            })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // get inventory history
    getInventoryHistory(context) {
        return new Promise((resolve, reject) => {
            axios.get("/inventory-history",
                {
                    headers: {
                        Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                    }
                }).then(response => {
                    context.commit("setInventoryHistory", response.data.data);
                    context.commit("setInventoryHistoryPageDetails", response.data.meta);
                    resolve(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    reject(error);
                })
        })
    },
    // filtered history
    getFilteredInventoryHistory(context) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        let page = ((state.historyPage) ? `page=${state.historyPage}` : "");
        let perPage = ((state.historyItemPerPage) ? `per_page=${state.historyItemPerPage}` : "");
        let dateRange = (state.historyDateRange.endDate !== null && state.allowHistoryDateFilter === true) ? `created_between=${state.historyDateRange.startDate},${state.historyDateRange.endDate}` : ""
        return new Promise((resolve, reject) => {
            axios.get(`/inventory-history?${page}&${perPage}&${dateRange}`,
                {
                    headers: {
                        Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                    }
                }).then(response => {
                    context.commit("setInventoryHistory", response.data.data);
                    context.commit("setInventoryHistoryPageDetails", response.data.meta);
                    resolve(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    reject(error);
                })
        })
    },
    // export product
    exportProducts() {
        return new Promise((resolve, reject) => {
            axios.post(`/products/export`, {
                start_date: state.dateRange.startDate,
                end_date: state.dateRange.endDate,
            },
                {
                    headers: {
                        Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                    }
                }).then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    reject(error);
                })
        })
    },
    // import product
    importProducts(context, data) {
        return new Promise((resolve, reject) => {
            axios.post(`/products/import`, data,
                {
                    headers: {
                        Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                    }
                }).then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    context.commit("doNothing");
                    reject(error);
                })
        })
    },
    // get product categories
    getProductCategories(context) {
        return new Promise((resolve, reject) => {
            axios.get(`/categories`,
                {
                    headers: {
                        Authorization: `Bearer ${store.state.onboarding.accessToken}`,
                    }
                }).then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        store.commit("onboarding/setTokenAuthorizeStatus", false);
                    }
                    context.commit("doNothing");
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
    setSelectedReferences: (state, value) => (state.selectedReferences = value),
    setDateRange: (state, dateRange) => (state.dateRange = dateRange),
    setAllowDateFilter: (state, status) => (state.allowDateFilter = status),
    setTableLoader: (state, status) => (state.tableLoader = status),
    setSearchProduct: (state, status) => (state.searchProduct = status),
    setSearchValue: (state, value) => (state.searchValue = value),
    setPageDetails: (state, data) => (state.pageDetails = data),
    setItemPerPage: (state, itemPerPage) => {
        state.itemPerPage = itemPerPage;
        let page = setItemPerPage(itemPerPage, state.pageDetails.per_page, state.pageDetails.from);
        state.page = page;
    },
    setPage: (state, page) => (state.page = page),
    setFilter: (state, filter) => (state.filter = filter),

    setInventoryHistory: (state, data) => (state.inventoryHistory = data),
    setInventoryHistoryPageDetails: (state, data) => (state.inventoryHistoryPageDetails = data),
    setHistoryDateRange: (state, dateRange) => (state.historyDateRange = dateRange),
    setHistoryItemPerPage: (state, itemPerPage) => {
        state.historyItemPerPage = itemPerPage;
        let page = setItemPerPage(itemPerPage, state.inventoryHistoryPageDetails.per_page, state.inventoryHistoryPageDetails.from);
        state.historyPage = page;
    },
    setHistoryPage: (state, page) => (state.historyPage = page),
    setAllowHistoryDateFilter: (state, status) => (state.allowHistoryDateFilter = status),
    doNothing: (state) => (state.doNothing = null),
    setProductCategories: (state, productCategories) => (state.productCategories = productCategories)
};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};