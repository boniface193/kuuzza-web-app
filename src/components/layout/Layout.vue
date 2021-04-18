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
        <!-- search icon -->
        <!-- <v-icon color="#C4C4C4" size="21" class="mr-6">mdi-magnify</v-icon> -->
        <!-- notification -->
        <div class="d-flex mr-6" style="cursor: pointer">
          <!-- notification dropdown -->
          <v-menu open-on-click top>
            <!-- activator -->
            <template v-slot:activator="{ on, attrs }">
              <!-- icon -->
              <v-icon size="21" color="#C4C4C4" v-bind="attrs" v-on="on"
                >mdi-bell</v-icon
              >
              <!-- signal -->
              <v-badge
                v-show="showNot"
                color="primary"
                bordered
                dot
                class="mt-2 position-absolute ml-4"
              >
              </v-badge>
            </template>
            <!-- notification body-->
            <Notification />
          </v-menu>
        </div>

        <div class="d-flex mr-6" style="cursor: pointer">
          <!-- user dropdown -->
          <v-menu open-on-click bottom>
            <!-- activator -->
            <template v-slot:activator="{ on, attrs }">
              <!-- icon -->
              <v-avatar size="31" v-bind="attrs" v-on="on">
                <v-img v-if="image" :src="image"></v-img>
                <v-icon v-else size="31">mdi-account-circle</v-icon>
              </v-avatar>
            </template>
            <UserLayout />
          </v-menu>
        </div>
      </v-app-bar>
      <!-- drawer -->

      <v-navigation-drawer
        app
        color="secondary-background"
        width="250"
        dark
        class="px-3"
        v-model="drawer"
      >
        <div class="kuuzza-logo d-flex align-center pt-6 pb-4 mx-7">
          <img src="@/assets/img/secondary-logo.png" alt="" />
        </div>

        <v-list class="pa-0" nav tile>
          <v-list-item class="my-5">
            <v-list-item-content class="mx-5">
              <v-list-item-title class="layout-title mb-3">
                {{ userName }}
              </v-list-item-title>
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
                  <div class="ml-10 pt-1 white--text">
                    {{ item.title }}
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="ml-3 mt-8">
          <span class="white--text text-size-md" @click="logout"
            ><v-icon class="ml-4 mr-6" size="20">mdi-logout</v-icon>Log
            Out</span
          >
        </div>
      </v-navigation-drawer>
    </v-card>
    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog" width="120">
      <div class="text-center dialog white">Loging Out...</div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/general/Modal.vue";
import Notification from "@/components/notification/notification.vue";
import UserLayout from "@/components/layout/userInfo.vue";
import { mapState } from "vuex";
export default {
  components: { Modal, Notification, UserLayout },
  data: () => ({
    dialog: false,
    drawer: null,
    settings: [],
    showNot: null,
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
        title: "Earnings",
        icon: "mdi-credit-card",
        routes: "/balance",
      },
      // {
      //   title: "Customers",
      //   icon: "mdi-human-queue",
      //   routes: "/customers",
      // },
      // {
      //   title: "Sellers",
      //   icon: "mdi-account-supervisor",
      //   routes: "/seller",
      // },
      {
        title: "Settings",
        icon: "mdi-cog",
        routes: "/settings",
      },
      // {
      //   title: "Integrations",
      //   icon: "mdi-arrow-right",
      //   routes: "/integrations",
      // },
    ],
  }),
  computed: {
    ...mapState({
      userName: (state) => state.settings.profile.name,
      image: (state) => state.settings.profile.photo,
      getNotified: (state) => state.notification.notification,
    }),
  },

  created() {
    if (this.$store.getters["settings/getUserProfile"].name === "") {
      this.$store.dispatch("settings/getUserProfile");
    }
    this.getNotice();
  },

  methods: {
    // logout
    logout() {
      this.dialog = true;
      this.$store
        .dispatch("onboarding/logout")
        .then(() => {
          this.dialog = false;
          this.$router.push({
            name: "Signin",
          });
        })
        .catch((error) => {
          this.dialog = false;
          if (error.status == 401 || error.status == 422) {
            this.$router.push({
              name: "Signin",
            });
          }
        });
    },

    getNotice() {
      if (!this.getNotified === undefined) {
        let showing_not = this.getNotified.data.find(
          (item) => item.read === true
        );
        if (showing_not) {
          this.showNot = true;
        } else {
          this.showNot = false;
        }
      }
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

.kuuzza-logo {
  width: 120px;
  img {
    width: 100%;
  }
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
  background-color: var(--v-primary-base);
  padding-left: 20px;
  font: normal normal bolder 16px/19px "Product Sans";
  letter-spacing: 0px;
  color: #ffffff;
  border-radius: 5px !important;
}

.v-list-item--link::before {
  color: white;
  background-color: transparent;
  z-index: 1;
}

.activeColor {
  color: white;
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