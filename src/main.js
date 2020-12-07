import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
// mock server 
<<<<<<< HEAD
import { onboardServer } from '@/server/onboarding'
=======
import { onboardServer } from './server/onboarding.js'
>>>>>>> 486481e... bg-fixed-mock-API-setup

import VMdDateRangePicker from "@ikechukwu_boniface/vmddaterangepicker";

Vue.use(VMdDateRangePicker);

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false;

<<<<<<< HEAD
if (process.env.NODE_ENV === "development") {
  onboardServer;
}

=======
>>>>>>> 486481e... bg-fixed-mock-API-setup
new Vue({
  router,
  onboardServer,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
