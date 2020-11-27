<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: "App",
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
  max-width: 1500px;
  margin: auto;
}
</style>
