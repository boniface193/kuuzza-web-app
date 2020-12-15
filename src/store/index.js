import Vue from "vue";
import Vuex from "vuex";
import onboarding from "./modules/onboarding";
import dashboard from "./modules/dashboard";
import inventory from "./modules/inventory";
import orders from "./modules/orders";
<<<<<<< HEAD
import sellers from "./modules/sellers";
import customer from "./modules/customer"
=======
import sellers from "./modules/sellers"
>>>>>>> e14e1aeb5bb400de35debb4c5a94fa92fa5e92f5

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    onboarding: onboarding,
    dashboard: dashboard,
    inventory: inventory,
    orders: orders,
<<<<<<< HEAD
    sellers: sellers,
    customer: customer,
=======
    sellers: sellers
>>>>>>> e14e1aeb5bb400de35debb4c5a94fa92fa5e92f5
  }
});
