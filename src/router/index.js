import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "@/components/onboarding/Signup.vue";
import Signin from "@/components/onboarding/Signin.vue";
import Recoverpassword from "@/components/onboarding/Recoverpassword.vue";
import Forgotpassword from "@/components/onboarding/Forgotpassword.vue";
import Onboarding from "@/views/onboarding/Onboarding.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import Inventory from "@/views/dashboard/Inventory.vue";
import Home from "../views/dashboard/home.vue";
import Settings from "../views/dashboard/Settings.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard", component: Home,
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "/inventory",
        name: "inventory",
        component: Inventory
      },
      {
        path: "/settings",
        name: "settings",
        component: Settings
      },
    ]
  },

  {  // onboarding routes
    path: '/signup', component: Onboarding,
    children: [
      {
        path: "",
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
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
