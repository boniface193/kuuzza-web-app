import axios from "axios";

export default axios.create({
    baseURL: "http://nova-inventory.herokuapp.com"
})