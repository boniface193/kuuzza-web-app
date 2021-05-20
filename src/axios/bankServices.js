import axios from "axios";
import store from "@/store";

let requestQueue = [];

const bankServiceHttpClient = axios.create({
    // baseURL: "https://payment.kuuzza.com",
    baseURL: "https://nova-payment.herokuapp.com",
})

const bankServiceRequest = (config) => {
    if (store.state.onboarding.accessToken !== null) {
        if (!store.state.onboarding.refreshingToken) {
            config.headers.Authorization = `Bearer ${store.state.onboarding.accessToken}`;
        } else {
            // add to pending request
            requestQueue.push(config);
        }
    }
    return config
}

/** Adding the request interceptors */
bankServiceHttpClient.interceptors.request.use(bankServiceRequest);

/** Adding the response interceptors */
bankServiceHttpClient.interceptors.response.use(
    (response) => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }, async (error) => {
        if (error.response.status) {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                if (!store.state.onboarding.refreshingToken) {
                    store.commit("onboarding/setRefreshingToken", true);
                    originalRequest._retry = true;
                    return store.dispatch("onboarding/getAccessToken").then(res => {
                        store.commit("onboarding/setRefreshingToken", false);
                        // Change Authorization header
                        bankServiceHttpClient.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                        // return originalRequest object with Axios.                           
                        return bankServiceHttpClient(originalRequest);
                    }).catch(() => store.commit("onboarding/setRefreshingToken", false))
                } else {
                    return bankServiceHttpClient(error.config)
                }
            }
            else if (error.response.status === 500) {
                store.commit("onboarding/setErrorTracker", {
                    message: "Something went wrong, Please try again",
                    error: true
                })
            } else if (error.response.status === 404) {
                store.commit("onboarding/setErrorTracker", {
                    message: "404 Not found",
                    error: true
                })
            } else if (!navigator.onLine) {
                store.commit("onboarding/setErrorTracker", {
                    message: "No internet connection.",
                    error: true
                })
            }

            return Promise.reject(error.response);
        }
    }
);

export default bankServiceHttpClient;