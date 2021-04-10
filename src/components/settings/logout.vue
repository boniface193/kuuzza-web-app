<template>
  <div class="px-4 pt-7 my-2 pb-16">
    <v-btn class="primary" @click="logout">Log Out </v-btn>
    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog" width="120">
      <div class="text-center dialog white">Loging Out...</div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/dashboard/Modal.vue";
export default {
  name: "logout",
  data: function () {
    return {
      dialog: false,
    };
  },
  components: { Modal },
  methods: {
    logout() {
      this.dialog = true;
      this.$store.commit("reset");
      this.$store.commit("onboarding/removeToken");
      setTimeout(() => {
        this.$router.push({
          name: "Signin",
        });
      }, 1000);
    },
  },
};
</script>