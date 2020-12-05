import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

import VMdDateRangePicker from "@ikechukwu_boniface/vmddaterangepicker";
import { Server } from "miragejs";

new Server({

  seeds(server) {
    server.db.loadData({
      accounts: [
        {
          firstName: "Abdulazeez",
          lastName: "Abdulazeez",
          email: "abdulazeeza180@gmail.com",
          phoneNumber: "09013289338",
          companyName: "Nova",
          country: "Nigeria",
          state: "lagos",
          companyAddress: "ikoyi banana island",
          password: "abdulazeez1",
        }
      ],
    })
  },

  routes() {
    this.timing = 3000

    this.post("/signup", (schema, request) => {

      const user = JSON.parse(request.requestBody);
      const userEmail = user.email
      const checkUser = schema.db.accounts.findBy({ email: userEmail });

      if (checkUser == null) {
        schema.db.accounts.insert({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          companyName: user.companyName,
          country: user.country,
          state: user.state,
          companyAddress: user.companyAddress,
          password: user.password,
          code: 11111
        })
        console.log(schema.db.accounts)
        return {
          status: "success",
          email: userEmail
        }
      } else {
        return {
          status: "accountExist",
          email: userEmail
        }
      }

    })

    this.post("/signin", (schema, request) => {
      const user = JSON.parse(request.requestBody);
      const email = user.email;
      const password = user.password;

      const checkUser = schema.db.accounts.findBy({ email: email });

      if (checkUser == null) {
        return {
          status: "incorrectDetails",
          token: null,
        }
      } else {
        if (checkUser.password === password) {
          return {
            status: "success",
            token: "HSIW99022",
          }
        } else {
          return {
            status: "incorrectDetails",
            token: null,
          }
        }
      }
    })

    this.post("/verifyemail", (schema, request) => {
      const user = JSON.parse(request.requestBody);
      const email = user.email;
      const code = user.code;
      const checkUser = schema.db.accounts.findBy({ email: email });



      if (checkUser.code === code) {
        return {
          status: "success",
          email: email,
        }
      } else {
        return {
          status: "failed",
          email: email,
        }
      }
    })
  }
})

Vue.use(VMdDateRangePicker);

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
