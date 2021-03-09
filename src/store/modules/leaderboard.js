import axios from "../../axios/gamification"
import moment from "moment"
const state = {
    leaderboardItem: [],
    searchOrder: false,
    searchValue: "",
    dateRange: {
        startDate: moment(new Date()).format("L"),
        endDate: moment(new Date()).format("L"),
    },
};

const getters = {
    leaderboard: state => state. leaderboardItem
};

const actions = {
    getLeaderboard(context) {
        return new Promise((resolve, reject) => {
            axios.get("/leaderboard", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then(response => {
                    context.commit("setLeaderboard", response.data)
                    // context.commit("setPageDetails", response.data.meta);
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    searchLeaderboard(context) {
        let route = (state.searchValue !== "") ? `/search?query=${state.searchValue}` : "";
        let dateRange = ((state.dateRange.startDate || state.dateRange.endDate !== null) ? `/filter?created_between=${state.dateRange.startDate},${state.dateRange.endDate}` : "");
        let params = route || dateRange;
        return new Promise((resolve, reject) => {
            axios.get(`/leaderboard${params}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then(response => {
                    context.commit("setLeaderboard", response.data)
                    // context.commit("setPageDetails", response.data.meta);
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    // filterLeaderboard(context) {
    //     let route = (state.searchValue !== "") ? `/search?query=${state.searchValue}` : "";        
    //     return new Promise((resolve, reject) => {
    //         axios.get(`/leaderboard${route}`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    //             }
    //         })
    //             .then(response => {
    //                 context.commit("setLeaderboard", response.data)
    //                 // context.commit("setPageDetails", response.data.meta);
    //                 resolve(response.data)
    //             })
    //             .catch(error => {
    //                 reject(error)
    //             })
    //     })
    // },
};

const mutations = {
    setLeaderboard: (state, data) => {
        state.leaderboardItem = data
    },
    getSearchValue(state, value) {
        state.searchValue = value
    },
    setSearchOrder(state, status) {
        state.searchOrder = status
    },
    filterRange(state, dateRange) {
        state.dateRange = dateRange
    },
};

export default {
    //export all the listed properties
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}; 