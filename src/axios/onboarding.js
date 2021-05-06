import axios from "axios";
import store from "@/store";


const onboardingHttpClient = axios.create({
    baseURL: "https://nova-ids.herokuapp.com" //baseURL: "https://identity.kuuzza.com" 
})

const onboardingRequest = (config) => {
    if (store.state.onboarding.accessToken !== null) {
        if (!store.state.onboarding.refreshingToken) {
            config.headers.Authorization = `Bearer ${store.state.onboarding.accessToken}`;
        }
    }
    return config
}


/** Adding the request interceptors */
onboardingHttpClient.interceptors.request.use(onboardingRequest);

/** Adding the response interceptors */
onboardingHttpClient.interceptors.response.use(
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
                        onboardingHttpClient.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                        // return originalRequest object with Axios.                           
                        return onboardingHttpClient(originalRequest);
                    }).catch(() => {
                        store.commit("onboarding/setRefreshingToken", false);
                    })
                } else {
                    return onboardingHttpClient(error.config)
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

export default onboardingHttpClient;