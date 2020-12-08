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
import Settings from "../views/dashboard/Settings.vue";
import userDetails from "@/components/dashboard/userDetails.vue";
import teamDetails from "@/components/dashboard/teamDetails.vue";
import storeDetails from "@/components/dashboard/storeDetails.vue";
import privacyDetails from "@/components/dashboard/privacyDetails.vue";
import logout from "@/components/dashboard/logout.vue";
import emailVerification from "@/components/onboarding/emailVerification.vue";
import forgotPasswordVerification from "@/components/onboarding/forgotPasswordVerification.vue";
import Leaderboard from "../views/dashboard/leaderboard.vue";
import history from "@/components/dashboard/history.vue";
import inventoryPage from "@/components/dashboard/inventoryPage.vue";
import addProduct from "@/components/dashboard/addProduct.vue";
import leaderStore from "@/components/dashboard/leaderStore.vue";
import leaderGlobal from "@/components/dashboard/leaderGlobal.vue";

Vue.use(VueRouter);

const routes = [
  {//layout dashboard and children
    path: "/dashboard", component: Home,
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "/inventory",
        component: Inventory,
        children: [
          {
            path: "",
            name: "inventoryPage",
            component: inventoryPage
          },
          {
            path: "history",
            name: "history",
            component: history
          },
          {
            path: "addproduct",
            name: "addProduct",
            component: addProduct
          }
        ]
      },
      {
        path: "/leaderboard",
        component: Leaderboard,
        children: [
          {
            path: "",
            name: "leaderStore",
            component: leaderStore
          },
          {
            path: "",
            name: "leaderGlobal",
            component: leaderGlobal
          },
        ]
      },
      {
        path: "/settings",
        component: Settings,
        children: [
          {
            path: "",
            name: "store",
            component: storeDetails
          },
          {
            path: "user",
            name: "user",
            component: userDetails
          },
          {
            path: "team",
            name: "team",
            component: teamDetails
          },
          {
            path: "privacy",
            name: "privacy",
            component: privacyDetails
          },
          {
            path: "logout",
            name: "logout",
            component: logout
          }
        ]
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
        component: Recoverpassword,
        props: true
      },
      {
        path: "/forgotpassword",
        name: "Forgotpassword",
        component: Forgotpassword
      },
      {
        path: "/emailverification",
        name: "emailVerification",
        component: emailVerification,
        props: true
      },
      {
        path: "/verifypassword",
        name: "forgotPasswordVerification",
        component: forgotPasswordVerification,
        props: true
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
