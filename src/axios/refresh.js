import axios from "axios";


const refreshHttpClient = axios.create({
    baseURL: "https://identity.kuuzza.com"
})

export default refreshHttpClient;