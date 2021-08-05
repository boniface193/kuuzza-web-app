import axios from "axios";
import store from "@/store";

//let requestQueue = [];

// base url for development environment
let mediaBaseUrl = "https://media-develop.kuuzza.com";

// set base url if environment is staging
if (process.env.VUE_APP_ENV == "staging") {
    mediaBaseUrl = "https://media-staging.kuuzza.com";
}
// set base url if environment is prodution
if (process.env.VUE_APP_ENV == "production") {
    mediaBaseUrl = "https://media.kuuzza.com";
}

const mediaServiceHttpClient = axios.create({
    baseURL: mediaBaseUrl,
});
const mediaServiceRequest = (config) => {
    if (store.state.onboarding.accessToken !== null) {
        if (!store.state.onboarding.refreshingToken) {
            config.headers.Authorization = `Bearer ${store.state.onboarding.accessToken}`;
        }
    }
    return config
}

/** Adding the request interceptors */
mediaServiceHttpClient.interceptors.request.use(mediaServiceRequest);

/** Adding the response interceptors */
mediaServiceHttpClient.interceptors.response.use(
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
                        mediaServiceHttpClient.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                        // return originalRequest object with Axios.                           
                        return mediaServiceHttpClient(originalRequest);
                    }).catch(() => store.commit("onboarding/setRefreshingToken", false))
                } else {
                    return mediaServiceHttpClient(error.config)
                }
            }
            else if (error.response.status === 500) {
                store.commit("onboarding/setErrorTracker", {
                    message: "Something went wrong, Please try again.",
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

export default mediaServiceHttpClient;