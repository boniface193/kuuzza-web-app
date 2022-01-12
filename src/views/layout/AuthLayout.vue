<template>
  <!-- main page for layout and dashboard -->
  <div style="height: 100%">
    <div class="bg-color">
      <Layout />
      <v-main>
        <router-view />
      </v-main>
    </div>
    <!--------------------------- General Modal Error Handler ------------------------------>
    <Modal :dialog="errorInfo.error" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeErrorModal()"
            >mdi-close</v-icon
          >
        </div>
        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img :src="statusImage"></v-img>
        </div>

        <h4>{{ errorInfo.message }}</h4>
      </div>
    </Modal>
  </div>
</template>

<script>
import Layout from "@/components/layout/Layout.vue";
import Modal from "@/components/general/Modal.vue";
import failedImage from "@/assets/img/failed-img.svg";
import { mapState } from "vuex";
export default {
  components: {
    Layout,
    Modal
  },
  data: function () {
    return {
      statusImage: failedImage,
    };
  },
  computed: {
    ...mapState({
      errorInfo: (state) => state.onboarding.errorTracker,
    }),
  },
  methods: {
    closeErrorModal() {
      this.$store.commit("onboarding/setErrorTracker", {
        message: "",
        error: false,
      });
    },
  },
};
</script>

<style lang="scss">
.bg-color {
  background: #f9fafe 0% 0% no-repeat padding-box;
  opacity: 1;
  height: 100%;
  zoom: 80%;
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
</style>