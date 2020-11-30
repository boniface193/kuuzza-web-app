import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "@/components/onboarding/Signup.vue";
import Signin from "@/components/onboarding/Signin.vue";
import Recoverpassword from "@/components/onboarding/Recoverpassword.vue";
import Forgotpassword from "@/components/onboarding/Forgotpassword.vue";
import Onboarding from "@/views/onboarding/Onboarding.vue";
import Dashboard from "../views/dashboard/Dashboard.vue"

Vue.use(VueRouter);

const routes = [
  {
    path:"/dashboard", component: Dashboard
  },

  {  // onboarding routes
    path: '/signup', component: Onboarding,
    children: [
      {
        path:"",
        name: "Signup",
        component: Signup
      },
      {
        path: "/signin",
        name: "Signin",
        component: Signin
      },
      {
        path: "/recoverpassword",
        name: "Recoverpassword",
        component: Recoverpassword
      },
      {
        path: "/forgotpassword",
        name: "Forgotpassword",
        component: Forgotpassword
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
