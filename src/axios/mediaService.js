import axios from "axios";
import store from "@/store";

export default axios.create({
    baseURL: "https://media.kuuzza.com",
    headers: {
        Authorization: `Bearer ${store.state.onboarding.accessToken}`,
    }
})