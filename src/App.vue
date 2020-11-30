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
@font-face {
  font-family: "Product Sans";
  src: local("Product Sans Regular"),
    url(~@/assets/fonts/Product-Sans-Regular.ttf) format("truetype");
}
* {
  box-sizing: border-box;
  font-family: "Product Sans";
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
