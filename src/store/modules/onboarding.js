//holds the state properties
const state = {
    user_info: {},
    sigin_info: {},
    present_signup_form: "form1"
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
    //set user details when account is created
    user_info: (state, [first_name, last_name, email, phone_number, company_name, country, region, company_address, password]) => {
        state.user_info.phone = phone_number;
        state.user_info.email = email;
        state.user_info.company_name = company_name;
        state.user_info.state = region;
        state.user_info.country = country;
        state.user_info.company_address = company_address;
        state.user_info.first_name = first_name;
        state.user_info.last_name = last_name;
        state.user_info.password = password;
    },
    // set user details on login
    sigin_info: (state, [email, password]) => {
        state.sigin_info.email = email;
        state.sigin_info.password = password;
    },
    // update the present form on signup 
    present_signup_form: (state, form) => (state.present_signup_form = form)
};


export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};  