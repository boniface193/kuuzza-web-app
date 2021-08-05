import axios from "axios";

// base url for development environment
let onboardingBaseUrl = "https://identity-develop.kuuzza.com";

// set base url if environment is staging
if (process.env.VUE_APP_ENV == "staging") {
    onboardingBaseUrl = "https://identity-staging.kuuzza.com";
}
// set base url if environment is prodution
if (process.env.VUE_APP_ENV == "production") {
    onboardingBaseUrl = "https://identity.kuuzza.com";
}
const refreshHttpClient = axios.create({
    baseURL: onboardingBaseUrl,
});

export default refreshHttpClient;