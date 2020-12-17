import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
// import
// mock server 
import { onboardServer } from './server/onboarding.js'

Vue.use(require('vue-moment'));

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false;

new Vue({
  router,
  onboardServer,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
