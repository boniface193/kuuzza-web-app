<template>
  <div class="px-4 pt-7 my-2 pb-16">
    <v-btn class="primary" @click="logout">Log Out </v-btn>
    <!-- modal for dialog messages -->
    <modal :dialog="dialog" width="120">
      <div class="text-center dialog white">Loging Out...</div>
    </modal>
  </div>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
export default {
  name: "logout",
  data: function () {
    return {
      dialog: false,
    };
  },
  components: { modal },
  methods: {
    logout() {
      this.dialog = true;
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