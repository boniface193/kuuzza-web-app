<template>
  <nav>
    <v-app-bar dense elevation="0" app color="#F9FAFE" class="elevation-1">
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

    <v-navigation-drawer app color="primary" width="250" dark v-model="drawer">
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
            <v-list-item-subtitle class="layout-title-subtitle active-list">
              Store Manager
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list color="white--text">
          <v-list-group
            :value="true"
            active-class="white--text"
            prepend-icon="mdi-account-circle"
          >
            <template v-slot:activator>
              <v-list-item-title>Users </v-list-item-title>
            </template>

            <v-list-group :value="true" no-action sub-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Admin</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="([title, icon], i) in admins" :key="i" link>
                <v-list-item-title v-text="title"></v-list-item-title>

                <v-list-item-icon>
                  <v-icon v-text="icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>

            <v-list-group no-action sub-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Actions</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="([title, icon], i) in cruds" :key="i" link>
                <v-list-item-title v-text="title"></v-list-item-title>

                <v-list-item-icon>
                  <v-icon v-text="icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>
          </v-list-group>
        </v-list> -->

        <v-list-item-group v-model="model" mandatory>
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
                <v-icon class="float-left">{{ item.icon }}</v-icon>
                <div class="ml-12 pt-1 white--text">
                  {{ item.title }}
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="ml-3 mt-8">
        <v-btn outlined tile class="text-size-md"
          ><v-icon class="mr-5 text-size-md">mdi-logout</v-icon> Log Out</v-btn
        >
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
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
        routes: "/order",
      },
      {
        title: "Customers",
        icon: "mdi-account-supervisor",
        routes: "/customers",
      },
      {
        title: "Sellers",
        icon: "mdi-account-supervisor",
        routes: "/seller",
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
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kumbh&family=Montserrat&family=Poppins&family=Roboto&family=Product+Sans&display=swap");

.text-size {
  font-size: 10px;
}

.nova-logo {
  text-align: left;
  font: normal normal 600 19px/27px Poppins;
  letter-spacing: 0.84px;
  color: #ffffff;
  opacity: 1;
}

.layout-title {
  text-align: left;
  font: normal normal 18px/22px "Product Sans";
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}

.layout-title-subtitle {
  font: normal normal lighter 16px/19px "Product Sans";
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
a.v-item--active.v-list-item--active.v-list-item.v-list-item--link.theme--dark {
  background: #16257b;
  font-weight: bolder;
  border-left: 4px solid #52f1ec;
}

.activeColor {
  color: #52f1ec;
}

.text-size-md {
  font-size: 13px;
  font-weight: lighter;
  letter-spacing: 0.5px;
}

button.v-btn.v-btn--depressed.v-btn--flat.v-btn--outlined.v-btn--tile.theme--dark.v-size--default {
  border: none;
  background: none;
}

.position-absolute {
  position: absolute;
}
</style>