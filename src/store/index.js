import Vue from "vue";
import Vuex from "vuex";
import onboarding from "./modules/onboarding";
import dashboard from "./modules/dashboard";
import inventory from "./modules/inventory";
import orders from "./modules/orders";
import sellers from "./modules/sellers";
import customer from "./modules/customer";
import settings from "./modules/settings";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    onboarding: onboarding,
    dashboard: dashboard,
    inventory: inventory,
    orders: orders,
    sellers: sellers,
    customer: customer,
    settings: settings
  }
});
