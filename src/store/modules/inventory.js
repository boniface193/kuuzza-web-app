import axios from "axios";

//holds the state properties
const state = {
    inventories:
        [
            {
                productName: "Infinix Hot 3",
                image: "@assets/img/laptop.png",
                category: "Phones & devices",
                sku: "00772000000",
                price: 25000,
                commission: 100,
                quantity: 30,
                id: "kjkwde98",
            },
            {
                productName: "Apple MacBook 2013 Pro Core i5",
                image: "@assets/img/laptop.png",
                category: "Phones & devices",
                sku: "0000000000",
                price: "150000",
                commission: 1200,
                quantity: 30,
                id: "njwa872",
            },
            {
                productName: "Iphone 12",
                image: "@assets/img/laptop.png",
                category: "Phones & devices",
                sku: "0000000000",
                price: 25000,
                commission: "1000",
                quantity: 15,
                id: "wswawa0",
            },
            {
                productName: "Earphone",
                image: "@assets/img/laptop.png",
                category: "Phones & devices",
                sku: "000002787000",
                price: 2500,
                commission: 200,
                quantity: 10,
                id: "hjbwahyaw7",
            },
        ],
    inventoriesHistory: [
        {
            productName: "Apple MacBook 2013 Pro Core i5",
            image: "@assets/img/laptop.png",
            sku: "0000000000",
            quantity: 30,
            status: "Added",
            time: "031220 8:05am",
            salesRepresentative: "-",
            id: "kjkwde98",
        },
        {
            productName: "Infinix Hot 10",
            image: "@assets/img/laptop.png",
            sku: "6298918",
            quantity: 2,
            status: "Sold",
            time: "031120 8:05am",
            salesRepresentative: "Abdulazeez",
            id: "kjk78hj98",
        },
        {
            productName: "Hp10 pavilon",
            image: "@assets/img/laptop.png",
            sku: "0000000230",
            quantity: 30,
            status: "Added",
            time: "031220 8:05am",
            salesRepresentative: "-",
            id: "ggyu278",
        },
        {
            productName: "Apple MacBook 2013 Pro Core i5",
            image: "@assets/img/laptop.png",
            sku: "0000000000",
            quantity: 30,
            status: "Added",
            time: "031220 8:05am",
            salesRepresentative: "-",
            id: "87hjsa",
        },
        {
            productName: "Iphone 12",
            image: "@assets/img/laptop.png",
            sku: "00000010",
            quantity: 1000,
            status: "Sold",
            time: "031220 9:05am",
            salesRepresentative: "Ayotunde Lanwo",
            id: "yuu223",
        },
    ],
};

//returns the state properties
const getters = {
    inventories: state => state.inventories,
    inventoriesHistory: state => state.inventoriesHistory,
    getProductDetails: state => {
        return (productId) => state.inventories.find( ({ id }) => id === productId );
    }
};

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