//holds the state properties
const state = {
    user_info: {},
    sigin_info: {}
};

//returns the state properties
const getters = {};

//fetch data 
const actions = {
    create_account: () => {
        alert(state.user_info)
        console.log(state.user_info)
    },
    signin: () => {
        alert(state.sigin_info)
        console.log(state.sigin_info)
    }
};

//updates the different state properties
const mutations = {
    user_info: (state, [first_name, last_name, email, phone_number, company_name, password]) => {
        state.user_info.phone = phone_number;
        state.user_info.email = email;
        state.user_info.company_name = company_name;
        state.user_info.first_name = first_name;
        state.user_info.last_name = last_name;
        state.user_info.password = password
    },
    sigin_info : (state, [email, password]) => {
        state.sigin_info.email = email;
        state.sigin_info.password = password;
    }
};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};  