import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
// public pages
import index from "@/views/index.vue";
import check from "@/views/onboarding/check.vue";
import pageNotFound from "@/components/pageNotFound.vue";
// onboarding pages
import Signup from "@/components/onboarding/Signup.vue";
import Signin from "@/components/onboarding/Signin.vue";
//import signupTeamMember from "@/components/onboarding/signupTeamMember.vue";
import RecoverPassword from "@/components/onboarding/RecoverPassword.vue";
import ForgotPassword from "@/components/onboarding/ForgotPassword.vue";
import Onboarding from "@/views/onboarding/Onboarding.vue";
import EmailVerification from "@/components/onboarding/EmailVerification.vue";
import ForgotPasswordVerification from "@/components/onboarding/ForgotPasswordVerification.vue";
// dashboard page
import Dashboard from "@/views/authPages/Dashboard.vue";
import AuthLayout from "@/views/layout/AuthLayout.vue";
import allNotification from "@/views/authPages/allNotification.vue"
// inventory pages
import Inventory from "@/views/authPages/Inventory.vue";
import inventoryHistory from "@/components/inventory/inventoryHistory.vue";
import inventoryPage from "@/components/inventory/inventoryPage.vue";
import addProduct from "@/components/inventory/addProduct.vue";
import editProduct from "@/components/inventory/editProduct.vue";
import productDetails from "@/components/inventory/productDetails.vue";
import ImportProduct from "@/components/inventory/ImportProduct.vue";
// order pages
import Orders from "@/views/authPages/Orders.vue";
import OrderLayout from "@/layouts/OrderLayout.vue";
import OrderDetails from "@/components/order/OrderDetails.vue";
import OpensellingOrderDetails from "@/components/openSelling/OpensellingOrderDetails.vue";
import InventoryOrders from "@/components/order/InventoryOrders.vue";
import OpensellingOrders from "@/components/openSelling/OpensellingOrders.vue";
// settings pages
import Settings from "../views/authPages/Settings.vue";
import userDetails from "@/components/settings/userDetails.vue";
import storeDetails from "@/components/settings/storeDetails.vue";
import privacyDetails from "@/components/settings/privacyDetails.vue";
import logout from "@/components/settings/logout.vue";
// import team from "@/components/settings/team.vue";
// import teamDetails from "@/components/settings/teamDetails.vue";
// import teamInvite from "@/components/settings/teamInvite.vue";
// import editTeamMember from "@/components/settings/editTeamMember.vue";
// withdrawal pages
import WithdrawalPage from "@/components/settings/WithdrawalPage.vue";
import WithdrawFund from "@/components/withdrawalPages/WithdrawFund.vue";
import AddBankDetails from "@/components/withdrawalPages/AddBankDetails.vue";
import EditBankDetails from '@/components/withdrawalPages/EditBankDetails.vue';
// Leaderboard pages
import Leaderboard from "@/components/leaderboard/Leaderboard.vue";
// seller pages
import bestSeller from "@/components/seller/BestSeller.vue";
// balance pages
import Balance from "@/views/authPages/Balance.vue";
import Revenue from "@/components/balancePages/Revenue.vue";
import Settlements from "@/components/balancePages/Settlements.vue";
import AwaitingSettlements from "@/components/balancePages/AwaitingSettlements.vue";
import PaymentHistory from "@/components/balancePages/PaymentHistory.vue";
//open selling 
import OpenSellingLayout from "@/layouts/OpenSellingLayout.vue";
import OpenSellingPage from "@/components/openSelling/OpenSellingPage.vue";

Vue.use(VueRouter);

// get user profile information and check they meet the conditions
const getProfile = (to, from, next) => {
  store.dispatch("onboarding/getUserProfile").then(response => {
    const profile = response.data.data;
    if (profile.email_verified) {
      if (profile.status) {
        next()
        return
      } else {
        // store.commit("onboarding/removeClientID");
        // store.commit("onboarding/removeRefreshToken");
        // store.commit("onboarding/setAccessToken", null)
        // store.commit("reset");
        router.push({ name: "SuspensionPage" });
      }
    } else {
      // store.commit("onboarding/removeClientID");
      // store.commit("onboarding/removeRefreshToken");
      // store.commit("onboarding/setAccessToken", null)
      // store.commit("reset");
      router.push({
        name: 'EmailVerification', params: {
          email: profile.email,
        },
      });
    }
  }).catch((error) => {
    if (error.status == 401 || error.status == 422) {
      store.commit("onboarding/removeClientID");
      store.commit("onboarding/removeRefreshToken");
      store.commit("onboarding/setAccessToken", null)
      store.commit("reset");
      router.push({ name: "Signin" });
    }
  })
}

// requirement for user to log on to the authenticated pages
const ifAuthenticated = (to, from, next) => {
  // check if client ID exists in localstorage
  if (localStorage.getItem("clientID") && localStorage.getItem("refreshToken")) {
    // check if accessToken is not equal to null in memory
    if (store.state.onboarding.accessToken !== null) {
      store.commit("onboarding/setAccessTokenExpired");
      if (store.state.onboarding.accessTokenExpired === false) {
        getProfile((to, from, next()));
      } //if accesstoken as expired make a request for new accesstoken 
      else {
        store.dispatch("onboarding/getAccessToken").then(() => {
          getProfile((to, from, next()));
        }).catch((error) => {
          if (error.status == 401 || error.status == 422) {
            store.commit("onboarding/removeClientID");
            store.commit("onboarding/removeRefreshToken");
            store.commit("onboarding/setAccessToken", null)
            store.commit("reset");
            next({ name: "Signin" });
          }
        })
      }
    } else {
      store.dispatch("onboarding/getAccessToken").then(() => {
        getProfile((to, from, next()));
      }).catch((error) => {
        if (error.status == 401 || error.status == 422) {
          store.commit("onboarding/removeClientID");
          store.commit("onboarding/removeRefreshToken");
          store.commit("onboarding/setAccessToken", null)
          store.commit("reset");
          next({ name: "Signin" });
        }
      })
    }
  } else {
    store.commit("onboarding/removeClientID");
    store.commit("onboarding/removeRefreshToken");
    store.commit("onboarding/setAccessToken", null);
    store.commit("reset");
    next({ name: 'Signin' });
  }
}

// verify if access has been given to a user to view email verification page
const ifAccessEmailVerifcationPage = (to, from, next) => {
  if (from.name === "Signup" || from.name === "fmcgSignup" || from.name === "Signin" || from.name === "dashboard") {
    next()
    return
  }
  next({ name: 'Signup' })
}
// verify if access has been given to a user to view password verification page
const ifAccessForgotPasswordVerificationPage = (to, from, next) => {
  if (from.name === "ForgotPassword") {
    next()
    return
  }
  next({ name: 'ForgotPassword' })
}

// verify if access has been given to a user to view password recovery page
const ifAccessPasswordRecoveryPage = (to, from, next) => {
  if (from.name === "ForgotPasswordVerification") {
    next()
    return
  }
  next({ name: 'ForgotPassword' })
}

// verify that the user is already logged
const AlreadyLogin = (to, from, next) => {
  if (to.name === 'signupTeamMember') {
    next();
    return;
  } else {
    // check if client ID exists in localstorage
    if (localStorage.getItem("clientID") && localStorage.getItem("refreshToken") && to.name !== "EmailVerification") {
      next({ name: 'dashboard' })
    } else {
      next();
      return
    }
  }
}

// allow a user to edit account only when comming from the withdrawal page
const allowEditBankAccount = (to, from, next) => {
  if (from.name === "WithdrawFund") {
    next();
    return
  } else {
    next({ name: "WithdrawFund" });
  }
}

// allow a user to add products 
const allowAddProducts = (to, from, next) => {
  if (store.getters["settings/getUserProfile"].name != "") {
    if (store.getters["settings/verifiedStore"] && store.getters["settings/storeApprovalStatus"]) {
      next();
      return
    } else {
      if (from.name !== "inventoryPage") {
        next({
          name: "inventoryPage"
        })
      }
    }
  } else {
    store.dispatch("onboarding/getUserProfile").then(response => {
      if (response.data.data.store.setup_is_complete && response.data.data.store.approved) {
        next();
        return
      } else {
        if (from.name !== "inventoryPage") {
          next({
            name: "inventoryPage"
          })
        }
      }
    })
  }
}
const routes = [
  {
    path: "/",
    name: "index",
    component: index,
    redirect: { name: 'Signin' },
  },
  {//layout dashboard and children
    path: "/dashboard",
    component: AuthLayout,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "bestSeller",
        name: "bestSeller",
        component: bestSeller,
      },
      {
        path: "allNotification",
        name: "allNotification",
        component: allNotification,
      },
      {
        path: "/inventory",
        component: Inventory,
        children: [
          {
            path: "",
            name: "inventoryPage",
            component: inventoryPage,
          },
          {
            path: "history",
            name: "inventoryHistory",
            component: inventoryHistory,
          },
          {
            path: "add-product",
            name: "addProduct",
            component: addProduct,
            beforeEnter: allowAddProducts
          },
          {
            path: "edit-product/:id",
            name: "editProduct",
            component: editProduct,
            props: true,
            beforeEnter: allowAddProducts
          },
          {
            path: "product-details/:id",
            name: "productDetails",
            component: productDetails,
            props: true,
            beforeEnter: allowAddProducts
          },
          {
            path: "import-product",
            name: "ImportProduct",
            component: ImportProduct,
            beforeEnter: allowAddProducts
          }
        ]
      },
      {
        path: "/leaderboard",
        name: "leaderboard",
        component: Leaderboard,
      },
      {
        path: "/orders",
        component: Orders,
        children: [
          {
            path: "",
            component: OrderLayout,
            children: [
              {
                path: "",
                name: "Orders",
                component: InventoryOrders,
              },
              {
                path: "open-selling",
                name: "OpensellingOrders",
                component: OpensellingOrders,
              },
            ]
          },
          {
            path: ":id",
            name: "OrderDetails",
            component: OrderDetails,
            props: true,
          },
          {
            path: "open-selling/:id",
            name: "OpensellingOrderDetails",
            component: OpensellingOrderDetails,
            props: true,
          }
        ]
      },
      {
        path: "/balance",
        component: Balance,
        children: [
          {
            path: "",
            name: "Revenue",
            component: Revenue,
          },
          {
            path: "settlements",
            name: "Settlements",
            component: Settlements
          },
          {
            path: "awaiting-settlements",
            name: "AwaitingSettlements",
            component: AwaitingSettlements,
          },
          {
            path: "payment-history",
            name: "PaymentHistory",
            component: PaymentHistory,
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
            component: storeDetails,
          },
          {
            path: "user",
            name: "user",
            component: userDetails,
          },
          // {
          //   path: "team",
          //   component: team,
          //   children: [
          //     {
          //       path: "",
          //       name: "teamDetails",
          //       component: teamDetails,
          //     },
          //     {
          //       path: "invite",
          //       name: "teamInvite",
          //       component: teamInvite,
          //     },
          //     {
          //       path: "edit/:id",
          //       name: "editTeamMember",
          //       component: editTeamMember,
          //       props: true,
          //     }
          //   ]
          // },
          {
            path: "",
            component: WithdrawalPage,
            children: [
              {
                path: "add-account",
                name: "AddBankDetails",
                component: AddBankDetails,
              },
              {
                path: "withdraw-fund",
                name: "WithdrawFund",
                component: WithdrawFund,
              },
              {
                path: "change-account",
                name: "EditBankDetails",
                component: EditBankDetails,
                beforeEnter: allowEditBankAccount
              }
            ]
          },
          {
            path: "privacy",
            name: "privacy",
            component: privacyDetails,
          },
          {
            path: "logout",
            name: "logout",
            component: logout,
          }
        ]
      },
      //opening selling
      {
        path: "/open-selling",
        component: OpenSellingLayout,
        children: [
          {
            path: "",
            name: "OpenSellingPage",
            component: OpenSellingPage
          }
        ]
      },
    ]
  },

  {
    path: '/check',
    name: 'check',
    component: check
  },

  {  // onboarding routes
    path: '/signup', component: Onboarding,
    beforeEnter: AlreadyLogin,
    children: [
      {
        path: "",
        name: "Signup",
        component: Signup,
      },
      {
        path: "/fmcg/signup",
        name: "fmcgSignup",
        component: Signup,
      },
      {
        path: "/signin",
        name: "Signin",
        component: Signin,
      },
      {
        path: "/recover-password",
        name: "RecoverPassword",
        component: RecoverPassword,
        beforeEnter: ifAccessPasswordRecoveryPage,
        props: true
      },
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
      },
      {
        path: "/email-verification",
        name: "EmailVerification",
        component: EmailVerification,
        beforeEnter: ifAccessEmailVerifcationPage,
        props: true
      },
      {
        path: "/verify-password",
        name: "ForgotPasswordVerification",
        component: ForgotPasswordVerification,
        beforeEnter: ifAccessForgotPasswordVerificationPage,
        props: true,
      },
      // {
      //   path: "team-member/:email",
      //   name: "signupTeamMember",
      //   component: signupTeamMember,
      //   props: true,
      // },
    ],
  },
  {
    path: "*",
    component: pageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;