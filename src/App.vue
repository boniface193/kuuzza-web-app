<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App"
};
</script>

<style lang="scss">
  *{
    box-sizing: border-box;
  }
  body{
    padding: 0;
    margin: auto;
  }
  #app{
    max-width: 1700px;
    margin: auto;
  }
</style>
