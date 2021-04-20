<template>
  <v-container fluid>
    <div class="mx-lg-12 mx-md-5 mx-sm-5 my-8">
      <!-- page title -->
      <div class="d-flex justify-space-between">
        <router-link
          to="/dashboard"
          style="text-decoration: none; color: #2b2b2b"
        >
          <h2
            class="float-left text-sm-body-1 text-md-h6 text-lg-h5 text-xl-h3 text-body-1 font-weight-bold"
          >
            <v-icon class="mb-1 mr-3" size="35">mdi-chevron-left</v-icon>
            Dashboard
          </h2>
        </router-link>
      </div>
      <div>
        <div
          v-if="isLoading"
          style="position: absolute; margin: 15% 50%; text-align: center"
        >
          <!-- this image time loader is calculated by the loader to triger the load time -->
          <v-progress-circular
            color="primary"
            class=""
            indeterminate
          ></v-progress-circular>
        </div>
      </div>
      <p class="text-center mt-8">{{ msg }}</p>

      <v-expansion-panels>
        <v-expansion-panel
          v-for="item in notification"
          :key="item.id"
          @click="markSigleMsg(item.id)"
        >
          <v-expansion-panel-header>
            <div>
              <v-badge
                class="flaot-left mr-4 mb-1"
                color="#FFA500"
                dot
                v-show="item.read == false"
              >
              </v-badge
              >{{ item.title }}
            </div>

            <div class="d-flex justify-end">
              <p
                style="font-size: 13px; letter-spacing: 0.5px; font-weight: 400"
                class="mx-2 mb-0"
              >
                {{ item.date | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
              </p>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="mx-2">
            <v-chip small>{{ item.type }}</v-chip>
            <div class="my-3 d-flex justify-center">
            {{ item.description }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <router-view />
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      isLoading: true,
      msg: "",
      notification: [],
    };
  },

  computed: {
    ...mapGetters({ getNotified: "notification/getNotified" }),
  },

  created() {
    this.$store.dispatch("notification/getNotification").then((e) => {
      if (e.data.length == 0) {
        this.msg = "No Notification";
      }
      this.notification = e.data;
      this.isLoading = false;
    });
  },

  methods: {
    markSigleMsg(params) {
      this.$store.dispatch("notification/markReadForSigle", params);
      this.$store.dispatch("notification/getNotification").then((res) => {
        this.notification = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.position-absolute {
  position: absolute;
}
</style>

