import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VueApexCharts from 'vue-apexcharts'

// axios interceptors
import inventoryHttpClient  from "./axios/inventory.js";
import orderHttpClient from "./axios/order.js";
import onboardingHttpClient from "./axios/onboarding.js";
import bankServiceHttpClient from "./axios/bankServices.js";
import mediaServiceHttpClient from "./axios/mediaService.js";
import notificationHttpClient from "./axios/notification.js";

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(Chartkick.use(Chart))
Vue.use(require('vue-moment'));

// axios interceptors call
onboardingHttpClient();
inventoryHttpClient();
orderHttpClient();
bankServiceHttpClient();
mediaServiceHttpClient();
notificationHttpClient();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
