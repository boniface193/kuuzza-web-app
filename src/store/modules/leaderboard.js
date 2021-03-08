import axios from "../../axios/gamification"
const state = {
    leaderboardItem: []
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
};

const mutations = {
    setLeaderboard: (state, data) => {
        state.leaderboardItem = data
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