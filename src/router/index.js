import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import index from "@/views/index.vue";
import pageNotFound from "@/components/pageNotFound.vue";
// onboarding pages
import Signup from "@/components/onboarding/Signup.vue";
import Signin from "@/components/onboarding/Signin.vue";
import signupTeamMember from "@/components/onboarding/signupTeamMember.vue";
import Recoverpassword from "@/components/onboarding/Recoverpassword.vue";
import Forgotpassword from "@/components/onboarding/Forgotpassword.vue";
import Onboarding from "@/views/onboarding/Onboarding.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import emailVerification from "@/components/onboarding/emailVerification.vue";
import forgotPasswordVerification from "@/components/onboarding/forgotPasswordVerification.vue";
// inventory pages
import Inventory from "@/views/Inventory.vue";
import inventoryHistory from "@/components/inventory/inventoryHistory.vue";
import inventoryPage from "@/components/inventory/inventoryPage.vue";
import addProduct from "@/components/inventory/addProduct.vue";
import editProduct from "@/components/inventory/editProduct.vue";
import productDetails from "@/components/inventory/productDetails.vue";
import productList from "@/components/inventory/productList.vue";
import Home from "@/views/dashboard/home.vue";
// settings pages
import Settings from "../views/Settings.vue";
import userDetails from "@/components/settings/userDetails.vue";
import team from "@/components/settings/team.vue";
import teamDetails from "@/components/settings/teamDetails.vue";
import teamInvite from "@/components/settings/teamInvite.vue";
import editTeamMember from "@/components/settings/editTeamMember.vue";
import WithdrawalPage from "@/components/settings/WithdrawalPage.vue";
import storeDetails from "@/components/settings/storeDetails.vue";
import privacyDetails from "@/components/settings/privacyDetails.vue";
import logout from "@/components/settings/logout.vue";
// withdrawal 
import WithdrawFund from "@/components/withdrawalPages/WithdrawFund.vue";
import AddBankDetails from "@/components/withdrawalPages/AddBankDetails.vue";
import EditBankDetails from '@/components/withdrawalPages/EditBankDetails.vue';

import Leaderboard from "@/views/dashboard/leaderboard.vue";

import leaderStore from "@/components/dashboard/leaderStore.vue";
import leaderGlobal from "@/components/dashboard/leaderGlobal.vue";
import Sellers from "@/views/dashboard/seller.vue";
import allSeller from "@/components/dashboard/allSeller.vue";
import newSeller from "@/components/dashboard/newSeller.vue";
import returningSeller from "@/components/dashboard/returningSeller.vue";
// orders page
import Orders from "@/views/Orders.vue";
import ordersPage from "@/components/order/ordersPage.vue";
import orderDetails from "@/components/order/orderDetails";
import sellersCard from "@/components/dashboard/sellersCard.vue";
import mainSellers from "@/components/dashboard/mainSellers.vue";
import customers from "@/views/dashboard/customers.vue";
import mainCustomer from "@/components/dashboard/customerMain.vue";
import allCustomer from "@/components/dashboard/allCustomer.vue";
import newCustomer from "@/components/dashboard/newCustomer.vue";
import returningCustomer from "@/components/dashboard/returningCustomer.vue";
import customerDetails from "@/components/dashboard/customerDetails.vue";
import balance from "@/views/dashboard/balance.vue";
import revenue from "@/components/dashboard/revenue.vue";
import settlements from "@/components/dashboard/settlements.vue";
import awaitingSettlements from "@/components/dashboard/awaitingSettlements.vue";
import paymentHistory from "@/components/dashboard/paymentHistory.vue";
import bestSeller from "@/views/dashboard/bestSeller.vue";

Vue.use(VueRouter);

// requirement for user to log on to the dashboard
const ifAuthenticated = (to, from, next) => {
  store.commit("onboarding/tokenIsPresent");
  if (store.getters["onboarding/tokenIsPresent"] === true) {
    store.dispatch("onboarding/getUserProfile").then((response) => {
      const profile = response.data.data;
      if (profile.email_verified) {
        if (profile.status) {
          store.commit("onboarding/setTokenExpired");
          if (store.getters["onboarding/tokenExpired"] === false) {
            next()
            return
          } else {
            localStorage.removeItem("accessToken");
            next({ name: 'Signin' });
          }
        } else {
          store.commit("onboarding/loggedIn", false);
          next({ name: "SuspensionPage" })
        }
      } else {
        next({
          name: 'Emailverification', params: {
            email: profile.email,
          },
        });
      }
    }).catch((error) => {
      if (error.response) {
        localStorage.removeItem("accessToken");
        next({ name: "Signin" })
      }
    })
  } else {
    next({ name: 'Signin' });
  }
}

// verify if access has been given to a user to view email verification page
const ifAccessEmailVerifcationPage = (to, from, next) => {
  if (from.name === "Signup" || from.name === "Signin") {
    next()
    return
  }
  next({ name: 'Signup' })
}
// verify if access has been given to a user to view password verification page
const ifAccessForgotPasswordVerificationPage = (to, from, next) => {
  if (from.name === "Forgotpassword") {
    next()
    return
  }
  next({ name: 'Forgotpassword' })
}

// verify if access has been given to a user to view password recovery page
const ifAccessPasswordRecoveryPage = (to, from, next) => {
  if (from.name === "forgotPasswordVerification") {
    next()
    return
  }
  next({ name: 'Forgotpassword' })
}

// verify if access has been given to a user to view password recovery page
// const ifAuthenticated = (to, from, next) => {
//   store.commit("onboarding/setAuthenticated");
//   if (store.getters["onboarding/accountAuthenticated"] === true) {
//     store.commit("onboarding/setVerifyAccountStatus");
//     if (store.getters["onboarding/accountVerified"] === true) {
//       store.commit("onboarding/setTokenExpired");
//       store.commit("onboarding/accessEmailVerifcationPage", false);

//       if (store.getters["onboarding/tokenExpired"] === false) {
//         next()
//         return
//       } else {
//         localStorage.removeItem("accessToken");
//         next({ name: 'Signin' });
//       }

//     } else {
//       const emailAddress = store.getters["onboarding/getEmail"];
//       localStorage.removeItem("accessToken");
//       store.commit("onboarding/accessEmailVerifcationPage", true);
//       next({ name: 'emailVerification', params: { email: emailAddress, } });
//     }

//   } else {
//     next({ name: 'Signin' });
//   }
// }

// verify that the user is already logged
const AlreadyLogin = (to, from, next) => {
  if (to.name === 'signupTeamMember'){
    next();
  }else {
    if (localStorage.getItem("accessToken")) {
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

const routes = [
  {
    path: "/",
    name: "index",
    component: index
  },
  {//layout dashboard and children
    path: "/dashboard",
    component: Home,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: "",
        name:"dashboard",
        component: Dashboard,
      },
      {
        path: "bestSeller",
        name: "bestSeller",
        component: bestSeller
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
            name: "inventoryHistory",
            component: inventoryHistory
          },
          {
            path: "add-product",
            name: "addProduct",
            component: addProduct
          },
          {
            path: "edit-product/:id",
            name: "editProduct",
            component: editProduct
          },
          {
            path: ":id",
            name: "productDetails",
            component: productDetails,
            props: true
          },
          {
            path: "import-product-list",
            name: "productList",
            component: productList
          }
        ]
      },
      {
        path: "/leaderboard",
        component: Leaderboard,
        children: [
          {
            path: "",
            name: "leaderboard",
            component: leaderStore
          },
          {
            path: "leaderGlobal",
            name: "leaderGlobal",
            component: leaderGlobal
          },
        ]
      },
      {
        path: "/orders",
        component: Orders,
        children: [
          {
            path: "",
            name: "Orders",
            component: ordersPage
          },
          {
            path: ":id",
            name: "OrderDetails",
            component: orderDetails,
            props: true
          }
        ]
      },
      {
        path: "/balance",
        component: balance,
        children: [
          {
            path: "",
            name: "revenue",
            component: revenue
          },
          {
            path: "settlements",
            name: "settlements",
            component: settlements
          },
          {
            path: "awaitingSettlements",
            name: "awaitingSettlements",
            component: awaitingSettlements
          },
          {
            path: "paymentHistory",
            name: "paymentHistory",
            component: paymentHistory
          },
        ]
      },
      {
        path: "/customers",
        component: customers,
        children: [
          {
            path: "",
            component: mainCustomer,
            children: [
              {
                path: "",
                name: "allCustomer",
                component: allCustomer
              },
              {
                path: "newCustomer",
                name: "newCustomer",
                component: newCustomer
              },
              {
                path: "returningCustomer",
                name: "returningCustomer",
                component: returningCustomer
              },
            ]
          },
          {
            path: ":id",
            name: "customerDetail",
            component: customerDetails,
            props: true
          }
        ]
      },
      {
        path: "/seller",
        component: Sellers,
        children: [
          {
            path: "",
            component: mainSellers,
            children: [
              {
                path: "",
                name: "all",
                component: allSeller
              },
              {
                path: "new",
                name: "new",
                component: newSeller
              },
              {
                path: "returning",
                name: "returning",
                component: returningSeller
              },
            ]
          },
          {
            path: ":id",
            name: "seller",
            component: sellersCard,
            props: true
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
            component: team,
            children: [
              {
                path: "",
                name: "teamDetails",
                component: teamDetails
              },
              {
                path: "invite",
                name: "teamInvite",
                component: teamInvite
              },
              {
                path: "edit/:id",
                name: "editTeamMember",
                component: editTeamMember,
                props: true
              }
            ]
          },
          {
            path: "",
            component: WithdrawalPage,
            children: [
              {
                path: "add-account",
                name: "AddBankDetails",
                component: AddBankDetails
              },
              {
                path: "withdraw-fund",
                name: "WithdrawFund",
                component: WithdrawFund
              },
              {
                path: "change-account",
                name: "EditBankDetails",
                component: EditBankDetails ,
                beforeEnter: allowEditBankAccount
              }
            ]
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
    beforeEnter: AlreadyLogin,
    children: [
      {
        path: "",
        name: "Signup",
        component: Signup,
      },
      {
        path: "/signin",
        name: "Signin",
        component: Signin,
      },
      {
        path: "/recoverpassword",
        name: "Recoverpassword",
        component: Recoverpassword,
        beforeEnter: ifAccessPasswordRecoveryPage,
        props: true
      },
      {
        path: "/forgotpassword",
        name: "Forgotpassword",
        component: Forgotpassword,
      },
      {
        path: "/emailverification",
        name: "emailVerification",
        component: emailVerification,
        beforeEnter: ifAccessEmailVerifcationPage,
        props: true
      },
      {
        path: "/verifypassword",
        name: "forgotPasswordVerification",
        component: forgotPasswordVerification,
        beforeEnter: ifAccessForgotPasswordVerificationPage,
        props: true,
      },
      {
        path: "team-member/:email",
        name: "signupTeamMember",
        component: signupTeamMember,
        props: true,
      },
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
