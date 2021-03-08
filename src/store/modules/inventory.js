import axios from "@/axios/inventory.js";

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
const curday = ()=> {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //As January is 0.
    let yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+'-'+mm+'-'+yyyy);
};

//holds the state properties
const state = {
    tableLoader: false,
    products: [],
    inventoryHistory: [],
    inventoryHistoryPageDetails: {},
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
        startDate: curday(),
        endDate: curday(),
    },
    allowDateFilter: false,
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
    // update products on inventory
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
                context.commit("setPageDetails", response.data.meta);
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
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                    context.commit("setProducts", response.data.data);
                    context.commit("setPageDetails", response.data.meta);
                    resolve(response);
                })
                .catch(error => {
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
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(response => {
                    context.commit("setProducts", response.data.data);
                    context.commit("setPageDetails", response.data.meta);
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
            axios.get("/inventory-history",
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
            axios.post(`/products/export`, {
                start_date: state.dateRange.startDate,
                end_date: state.dateRange.endDate
            },
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
    },
    // import product
    importProducts(context, data) {
        return new Promise((resolve, reject) => {
            axios.post(`/products/import`, data,
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
    }
};

//updates the different state properties
const mutations = {
    setProducts: (state, data) => (state.products = data),
    addProduct: (state, data) => {
        state.products.push(data)
    },
    setInventoryHistory: (state, data) => (state.inventoryHistory = data),
    setInventoryHistoryPageDetails: (state, data) => (state.inventoryHistoryPageDetails = data),
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
    doNothing: (state) => (state.doNothing = null),
};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};  