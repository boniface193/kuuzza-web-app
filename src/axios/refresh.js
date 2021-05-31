import axios from "axios";


const refreshHttpClient = axios.create({
    baseURL: "https://identity-staging.kuuzza.com"
})

export default refreshHttpClient;