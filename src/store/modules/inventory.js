//holds the state properties
const state = {};

//returns the state properties
const getters = {};

//take actions 
const actions = {
    addProduct(context, details) {
        return new Promise((resolve, reject) => {
            axios.post("/inventory/addproduct", {
                productName: details.productName,
                category: details.category,
                skuNumber: details.skuNumber,
                quantity: details.quantity,
                price: details.price,
                commission: details.commission,
                productDescription: details.productDescription,
                images: details.images,
            })
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    context.commit('', '')
                    reject(error)
                })
        })
    }
    
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