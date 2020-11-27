<template>
  <v-app>
    <Layout />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Layout from "@/components/dashboard/Layout.vue";

export default {
  name: "App",
  components: { Layout },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: auto;
}
#app {
  max-width: 1700px;
  margin: auto;
  background: #f9fafe 0% 0% no-repeat padding-box;
  opacity: 1;
}
</style>
