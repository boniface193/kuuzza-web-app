//holds the state properties
const state = {
    token: localStorage.getItem('access_token') || null,
    present_signup_form: 'form1'
};

//returns the state properties
const getters = {};

//fetch data 
const actions = {
    //creates user account
    register: (context, credentials) => {
       console.log(credentials.first_name)
       context.commit('set_token','aaa')
    },
    //allows users to login
    login: (context, credentials) => {
       console.log(credentials.email)
       context.commit('set_token','aaa')
    },
    //checks if user is logged in
    loggedin: () => {
        return state.token != null;
    }
};

//updates the different state properties
const mutations = {
    //set token
    set_token: (state, token) => (state.token = token),
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