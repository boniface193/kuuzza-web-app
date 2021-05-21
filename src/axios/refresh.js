import axios from "axios";


const refreshHttpClient = axios.create({
    baseURL: "https://nova-ids.herokuapp.com"
})

export default refreshHttpClient;