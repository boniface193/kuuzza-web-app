import axios from "axios";

export default axios.create({
    baseURL: "http://nova-gamification.herokuapp.com"
})