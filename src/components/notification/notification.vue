<template>
  <div>
    <v-card class="mx-auto float-right" elevation="0" width="450">
      <v-toolbar height="40" color="primary" elevation="0" dark>
        <v-toolbar-title class="layout-title">Notifications</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="pl-12 pr-3" style="font-size: 12px"
          >{{ filterNotificationLength }} unread Notifications</v-toolbar-title
        >
      </v-toolbar>
      <div
        class="bg-color py-5 d-flex justify-center"
        v-if="filterNotificationLength == 0"
      >
        No Notification
      </div>
      <div class="bg-color py-5 d-flex justify-center">
        {{ msg }}
      </div>
      <v-list class="py-0">
        <v-subheader
          class="bg-color py-5 d-flex justify-center"
          v-if="showNotificationStatusToday"
          >Today</v-subheader
        >

        <div v-for="msg in newNotification" :key="msg.id" v-show="!msg.read">
          <v-list-item link>
            <v-list-item-content @click="viewBodyOfNotification(msg.id)">
              <v-list-item-title class="layout-title-noti">{{
                msg.title
              }}</v-list-item-title>
              <v-list-item-subtitle class="layout-title-sm">{{
                msg.time
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
        </div>
      </v-list>

      <v-list class="py-0">
        <v-subheader
          class="bg-color py-5 d-flex justify-center"
          v-if="showNotificationStatusOld"
          >Old Notifications</v-subheader
        >

        <div
          v-for="msg in oldNotification"
          :key="msg.id"
          v-show="msg.read === false"
        >
          <v-list-item link>
            <v-list-item-content @click="viewBodyOfNotification(msg.id)">
              <v-list-item-title class="layout-title-noti">{{
                msg.title
              }}</v-list-item-title>
              <v-list-item-subtitle class="layout-title-sm">{{
                msg.time
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
      <div class="bg-color">
        <div class="d-flex justify-end">
          <router-link
            :to="{ name: 'allNotification' }"
            style="text-decoration: none; color: #000000"
          >
            <div class="text-size-md bg-color d-flex justify-end pa-5 onhover">
              View All
            </div>
          </router-link>
          <div
            class="text-size-md bg-color d-flex justify-end pa-5 onhover"
            @click="markAll"
          >
            Mark All Read
          </div>
        </div>
      </div>
    </v-card>

    <Modal width="50">
      <v-card>
        <div class="d-flex justify-center pt-1" style="height: 43px">
          <!-- this image time loader is calculated by the loader to triger the load time -->
          <v-progress-circular
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card>
    </Modal>

    <!-- modal -->
    <Modal :dialog="showDialog" width="400">
      <v-card width="400">
        <div
          class="float-right text-size-md pa-3 onhover"
          @click="showDialog = false"
        >
          close
        </div>
        <div class="text-center pt-3 pb-2 font-weight-bold">
          Notification Details
        </div>

        <v-divider color="#FFA500"></v-divider>
        <v-container>
          <v-chip small class="float-right">{{ filteredArray.type }}</v-chip>
          <div class="font-weight-bold">{{ filteredArray.title }}</div>
          <p
            style="font-size: 13px; letter-spacing: 0.5px; font-weight: 300"
            class="mb-8"
          >
            {{ filteredArray.date | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
          </p>

          <div class="mb-3">
            {{ filteredArray.description }}
          </div>
        </v-container>
      </v-card>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/dashboard/modal.vue";
import moment from "moment";
export default {
  components: {
    Modal,
  },

  data() {
    return {
      showDialog: false,
      filterNotificationLength: 0,
      newNotification: [],
      oldNotification: [],
      showNotificationStatusToday: null,
      showNotificationStatusOld: null,
      filteredArray: {},
      msg: "",
      // isLoading: false,
    };
  },

  created() {
    this.$store.dispatch("notification/getNotification").then((e) => {
      // check for the lenght of unread notification
      let checkForLength = e.data.filter((item) => item.read === false);
      if (checkForLength) {
        this.filterNotificationLength = checkForLength.length;
      }

      // check if is an old notification
      let checkIfNewNotification = e.data
        .slice(0, 3)
        .filter((item) => moment(item.date).calendar().includes("Today"));
      if (checkIfNewNotification) {
        this.newNotification = checkIfNewNotification;
        // show msg of today
        // let showToday = e.data.find((item) => item.read == false);
        if (checkIfNewNotification.length == 0) {
          this.showNotificationStatusToday = false;
          this.msg = "Click on view all to see unread notifications";
        } else {
          this.showNotificationStatusToday = true;
        }
      } else {
        let showNotToday = e.data
          .slice(0, 2)
          .filter((item) => moment(item.date).calendar().indexOf("Today", -1));
        if (showNotToday) {
          this.oldNotification = showNotToday;
          this.showNotificationStatusOld = true;
        } else {
          this.showNotificationStatusOld = false;
        }
      }
    });
  },

  methods: {
    // iterate for each on the modal
    viewBodyOfNotification(id) {
      this.$store.dispatch("notification/getNotification").then((e) => {
        let data = e.data;
        this.filteredArray = data.find((item) => item.id === id);
        this.showDialog = true;
        // this.isLoading = false;
      });

      // mark selected as read
      this.$store.dispatch("notification/markReadForSigle", id);
      this.$store.dispatch("notification/getNotification").then((e) => {
        // check for the lenght of unread notification
        let checkForLength = e.data.filter((item) => item.read === false);
        if (checkForLength) {
          this.filterNotificationLength = checkForLength.length;
        }

        // check if is an old notification
        let checkIfNewNotification = e.data
          .slice(0, 2)
          .filter((item) => moment(item.date).calendar().includes("Today"));
        if (checkIfNewNotification) {
          this.newNotification = checkIfNewNotification;
          // show msg of today
          let showToday = e.data.find((item) => item.read == false);
          if (showToday) {
            this.showNotificationStatusToday = true;
          } else {
            this.showNotificationStatusToday = false;
          }
        } else {
          let showNotToday = e.data
            .slice(0, 2)
            .filter((item) =>
              moment(item.date).calendar().indexOf("Today", -1)
            );
          if (showNotToday) {
            this.oldNotification = showNotToday;
            this.showNotificationStatusOld = true;
          } else {
            this.showNotificationStatusOld = false;
          }
        }
      });
    },

    markAll() {
      this.$store.dispatch("notification/markAll").then(() => {
        this.$store.dispatch("notification/getNotification").then((e) => {
          // check for the lenght of unread notification
          let checkForLength = e.data.filter((item) => item.read === false);
          if (checkForLength) {
            this.filterNotificationLength = checkForLength.length;
          }

          // check if is an old notification
          let checkIfNewNotification = e.data
            .slice(0, 2)
            .filter((item) => moment(item.date).calendar().includes("Today"));
          if (checkIfNewNotification) {
            this.newNotification = checkIfNewNotification;
            // show msg of today
            let showToday = e.data.find((item) => item.read == false);
            if (showToday) {
              this.showNotificationStatusToday = true;
            } else {
              this.showNotificationStatusToday = false;
            }
          } else {
            let showNotToday = e.data
              .slice(0, 2)
              .filter((item) =>
                moment(item.date).calendar().indexOf("Today", -1)
              );
            if (showNotToday) {
              this.oldNotification = showNotToday;
              this.showNotificationStatusOld = true;
            } else {
              this.showNotificationStatusOld = false;
            }
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.text-size-md {
  font-size: 14px;
  letter-spacing: 0.5px;
  font-weight: 200;
  cursor: pointer;
}

.layout-title {
  text-align: left;
  font: normal normal 16px/20px "Product Sans";
  letter-spacing: 0.5px;
  color: #ffffff;
  opacity: 1;
}

.layout-title-noti {
  text-align: left;
  font: normal normal 16px/20px "Product Sans";
  letter-spacing: 0.5px;
}

.layout-title-sm {
  font-size: 10px;
  margin-top: 5px;
}

.onhover:hover {
  color: #029b97;
  font-weight: normal;
}
</style>