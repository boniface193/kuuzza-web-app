import axios from "axios";

export default axios.create({
    baseURL: "https://nova-ids.herokuapp.com"
})