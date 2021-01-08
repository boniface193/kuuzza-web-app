<template>
  <div style="margin: auto; max-width: 1800px">
    <v-card>
      <!-- User dashboard layout -->
      <!-- navbar -->
      <v-app-bar
        dense
        elevation="0"
        app
        color="#F9FAFE"
        class="elevation-1"
        max-width="100%"
      >
        <v-app-bar-nav-icon v-if="!drawer" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <v-icon color="#C4C4C4" size="21" class="mr-6">mdi-magnify</v-icon>
        <div class="d-flex mr-6">
          <v-icon size="21" color="#C4C4C4" class="">mdi-bell</v-icon>
          <v-badge
            color="primary"
            bordered
            dot
            class="mt-2 position-absolute ml-4"
          >
          </v-badge>
        </div>

        <v-avatar size="31">
          <v-img src="../../assets/layout/fire.svg"></v-img>
        </v-avatar>
      </v-app-bar>
      <!-- drawer -->
      <v-navigation-drawer
        app
        color="primary"
        width="250"
        dark
        v-model="drawer"
      >
        <v-container class="mx-5">
          <div class="d-flex nova-logo">
            N<span
              ><v-img
                src="../../assets/layout/fire.svg"
                width="16px"
              ></v-img></span
            >VA
          </div>
        </v-container>
        <v-list class="pa-0" nav tile>
          <v-list-item class="my-5">
            <v-list-item-content class="mx-5">
              <v-list-item-title class="layout-title mb-3">
                Ayotunde Lanwo
              </v-list-item-title>
              <v-list-item-subtitle class="layout-title-subtitle">
                Store Manager
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item-group mandatory>
            <v-list-item
              class="rounded-0"
              v-for="item in items"
              :key="item.key"
              link
              router
              :to="item.routes"
            >
              <v-list-item-content class="mx-5">
                <v-list-item-title
                  class="text-size-md"
                  :class="{ activeColor: item.routes }"
                >
                  <v-icon class="float-left" size="20">{{ item.icon }}</v-icon>
                  <div class="ml-12 pt-1 white--text">
                    {{ item.title }}
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="ml-3 mt-8">
          <span class="white--text text-size-md" @click="logout"
            ><v-icon class="ml-4 mr-6" size="20">mdi-logout</v-icon>LogOut</span
          >
        </div>
      </v-navigation-drawer>
    </v-card>
    <!-- modal for dialog messages -->
    <modal :dialog="dialog" width="120">
      <div class="text-center dialog white">Loging Out...</div>
    </modal>
  </div>
</template>

<script>
import modal from "@/components/dashboard/modal.vue";
export default {
  components: { modal },
  data: () => ({
    dialog: false,
    drawer: true,
    items: [
      {
        title: "Dashboard",
        icon: "mdi-border-all",
        routes: "/dashboard",
      },
      {
        title: "Inventory",
        icon: "mdi-clipboard-text-outline",
        routes: "/inventory",
      },
      {
        title: "Leaderboard",
        icon: "mdi-chart-bar",
        routes: "/leaderboard",
      },
      {
        title: "Orders",
        icon: "mdi-shopping",
        routes: "/orders",
      },
      {
        title: "Balance",
        icon: "mdi-credit-card",
        routes: "/balance",
      },
      {
        title: "Customers",
        icon: "mdi-human-queue",
        routes: "/customers",
      },
      {
        title: "Sellers",
        icon: "mdi-account-supervisor",
        routes: "/seller",
      },
      {
        title: "Best Seller",
        icon: "mdi-account",
        routes: "/bestseller",
      },
      {
        title: "Settings",
        icon: "mdi-cog",
        routes: "/settings",
      },
      {
        title: "Integrations",
        icon: "mdi-arrow-right",
        routes: "/integrations",
      },
    ],
  }),
  methods: {
    // logout
    logout() {
      this.$store.commit("reset");
      this.$store.commit("onboarding/removeToken");
      this.dialog = true;
      setTimeout(() => {
        this.$router.push({
          name: "Signin",
        });
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kumbh&family=Montserrat&family=Poppins&family=Roboto&family=Product+Sans&display=swap");

.v-app-bar.v-app-bar--fixed {
  max-width: 1550px;
}
.v-navigation-drawer--fixed {
  height: 100% !important;
  * {
    zoom: 101.5%;
  }
}

.nova-logo {
  text-align: left;
  font: normal normal 500 17px/25px "Poppins";
  letter-spacing: 0.84px;
  color: #ffffff;
  opacity: 1;
}

.layout-title {
  text-align: left;
  font: normal normal 16px/20px "Product Sans";
  letter-spacing: 0.5px;
  color: #ffffff;
  opacity: 1;
}

.layout-title-subtitle {
  font: normal normal lighter 14px/17px "Product Sans";
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
a.v-item--active.v-list-item--active.v-list-item.v-list-item--link.theme--dark {
  background-color: #323e7e;
  border-left: 4px solid #52f1ec;
  font: normal normal bolder 16px/19px "Product Sans";
  letter-spacing: 0px;
  color: #ffffff;
}

.v-list-item--link::before {
  color: white;
  background-color: transparent;
  z-index: 1;
}

.activeColor {
  color: #52f1ec;
}

.text-size-md {
  font-size: 14px;
  letter-spacing: 0.5px;
  font-weight: 200;
  cursor: pointer;
}

button.v-btn.v-btn--depressed.v-btn--flat.v-btn--outlined.v-btn--tile.theme--dark.v-size--default {
  border: none;
  background: none;
}

.position-absolute {
  position: absolute;
}

.v-btn:before {
  background-color: transparent;
}

.v-list--nav .v-list-item:not(:last-child):not(:only-child),
.v-list--rounded .v-list-item:not(:last-child):not(:only-child) {
  margin-bottom: 0px;
}
</style>