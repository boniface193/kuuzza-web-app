import axios from "axios";

export default axios.create({
    baseURL: "https://nova-gamification.herokuapp.com"
})