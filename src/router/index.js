import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../views/onboarding/Signup.vue";
import Signin from "../views/onboarding/Signin.vue";
import Dashboard from "../views/dashboard/Dashboard.vue"
import Inventory from "../views/dashboard/Inventory.vue"
import Signin from "../views/onboarding/Signin.vue";
import Dashboard from "../views/dashboard/Dashboard.vue"
import Inventory from "../views/dashboard/Inventory.vue"
// import Onboarding from "./onboarding"; 
// import Dashboard from "./dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/inventory",
    name: "inventory",
    component: Inventory
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // Onboarding,
  // Dashboard
});

export default router;
