import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "@/components/onboarding/Signup.vue";
import Signin from "@/components/onboarding/Signin.vue";
import Recoverpassword from "@/components/onboarding/Recoverpassword.vue";
import Forgotpassword from "@/components/onboarding/Forgotpassword.vue";
import onboarding from "@/views/onboarding/Onboarding.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {  // onboarding routes
    path: '/signup', component: onboarding,
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
