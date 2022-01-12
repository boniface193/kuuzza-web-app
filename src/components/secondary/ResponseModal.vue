<template>
  <Modal :dialog="dialog" width="400">
    <div class="white pa-3 pb-10 text-center dialog">
      <div class="d-flex justify-end">
        <v-icon class="error--text close-btn" @click="closeDialog"
          >mdi-close</v-icon
        >
      </div>
      <div class="mb-7 mt-5 mx-auto status-img">
        <v-img :src="status ? successImage : failedImage" alt=""></v-img>
      </div>

      <h4>{{ dialogMessage }}</h4>
    </div>
  </Modal>
</template>
<script>
import Modal from "./Modal.vue";
import failedImage from "@/assets/images/failed-img.svg";
import successImage from "@/assets/images/success-img.svg";
export default {
  name: "ResponseModal",
  components: { Modal },
  data: function () {
    return {
      successImage: successImage,
      failedImage: failedImage,
    };
  },
  props: ["dialogMessage", "dialog", "status"],
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
  img {
    width: 100%;
  }
}
</style>