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
  font-family: "Product Sans" Light;
}
body {
  padding: 0;
  margin: auto;
}
#app {
  max-width: 1800px;
  margin: auto;
  .v-btn {
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
    .v-btn__loader {
      color: var(--v-primary-base);
    }
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 45px;
    border-radius: 8px;
  }
}

*::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

*::-webkit-scrollbar-button {
  width: 5px;
  height: 5px;
}

*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
  background-color: var(--v-primary-base);
  outline: 1px solid slategrey;
}

:root {
  scrollbar-color: var(--v-primary-base) rgb(210, 210, 210) !important;
}
</style>
