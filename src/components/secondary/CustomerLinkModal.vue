<template>
  <div>
    <!-- link container -->
    <Modal
      persistent
      :dialog="showUrlModal"
      transition="dialog-bottom-transition"
      width="500"
    >
      <template>
        <v-card class="rounded-t-xl rounded-b-0 position-modal pa-5">
          <h4 class="mt-8">Complete Sale</h4>
          <p class="mb-4 secondary--text">
            Kindly Share the link below with your customer to make payment
          </p>
          <div class="link py-3 px-2">
            <img src="@/assets/icons/link.svg" alt="" />
            <span
              class="text-truncate"
              style="cursor: pointer; height: 25px; overflow: hidden"
              v-on:click="copyToClipBoard"
              >{{ url }}</span
            >
            <span style="position: relative">
              <v-icon class="ml-5 copy-btn" v-on:click="copyToClipBoard"
                >mdi-content-copy</v-icon
              >
              <span
                v-show="copyStatus"
                class="copy-status primary--text py-1 px-2"
                >Copied</span
              >
            </span>
          </div>
          <div class="mt-5 d-flex justify-space-between flex-wrap" style="position:relative">
            <v-btn
              color="#E7FAF9"
              width="49%"
              class="primary--text mb-2"
              v-on:click="copyToClipBoard"
              >Copy link
            </v-btn>
            <v-btn width="49%" class="primary mb-2" @click="shareDialog = true"
              >Share Link</v-btn
            >
          </div>
          <v-card-actions class="justify-center mb-5">
            <router-link color="primary" to="/inventory"
              >Return to home</router-link
            >
          </v-card-actions>
        </v-card>
      </template>
    </Modal>

    <!-- Modal for dialog messages -->
    <Modal :dialog="shareDialog" width="250">
      <div class="white pa-3 pb-5 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="shareDialog = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="d-flex align-center justify-space-between px-8">
          <whats-app
            class="mt-3 mr-3"
            :url="url"
            :title="``"
            scale="2"
          ></whats-app>
          <twitter class="mt-3 mr-3" :url="url" :title="``" scale="2"></twitter>
          <facebook
            class="mt-3 mr-3"
            :url="url"
            scale="2"
            :title="``"
          ></facebook>
        </div>
        <p class="mt-4 mb-0 secondary--text">
          Share products with customers on social media
        </p>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Facebook } from "vue-socialmedia-share";
import { Twitter } from "vue-socialmedia-share";
import { WhatsApp } from "vue-socialmedia-share";
import Modal from "@/components/secondary/Modal.vue";
export default {
  name: "CustomerLinkModal",
  components: { Modal, Facebook, Twitter, WhatsApp },
  props: ["showUrlModal", "url"],
  data: function () {
    return {
      shareDialog: false,
      copyStatus: false,
    };
  },
  methods: {
    copyToClipBoard() {
      navigator.clipboard.writeText(this.url);
      this.copyStatus = true;
      setTimeout(() => {
        this.copyStatus = false;
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.link {
  margin: auto 0px;
  color: #029b97;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #029b97;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-all;
  img {
    margin-right: 10px;
  }
  .copy-btn {
    cursor: pointer;
    &:hover {
      color: #03a09b;
    }
  }
  .copy-status {
    position: absolute;
    bottom: 100%;
    background: #e0e7ff;
    word-break: none;
    width: 90px;
    right: 0;
    border-radius: 8px;
  }
}
</style>