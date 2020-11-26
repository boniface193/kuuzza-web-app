import Vue from "vue";
import Vuex from "vuex";
import onboarding from "./modules/onboarding";
import dashboard from "./modules/dashboard";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    onboarding: onboarding,
    dashboard: dashboard
  }
});
