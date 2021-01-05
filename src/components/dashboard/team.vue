<template>
  <div class="pt-7 my-2 pb-16">
    <div v-show="!loader">
      <router-view />
    </div>
    <!-- loader -->
    <div class="loader-body text-center pt-10" v-show="loader">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>
<script>
export default {
  name: "team",
  data: function () {
    return {
      loader: false,
    };
  },
  created() {
    if (this.$store.getters["settings/teamMembers"].length == 0) {
      this.loader = true;
      this.$store
        .dispatch("settings/getTeamMembers")
        .then(() => (this.loader = false))
        .catch(() => (this.loader = false));
    }
  },
};
</script>