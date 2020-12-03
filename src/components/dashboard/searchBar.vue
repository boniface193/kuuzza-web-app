<template>
  <!-- search bar -->
  <div class="search-bar">
    <v-icon class="primary--text">mdi-magnify</v-icon>
    <input type="text" :placeholder="placeholder" />
  </div>
</template>
<script>
export default {
  name: "searchBar",
  props: ["placeholder"]
};
</script>
<style lang="scss" scoped>
.search-bar {
  width: 350px;
  height: 42px;
  background: #f9fafe;
  border-radius: 11px;
  display: flex;
  align-items: center;
  padding: 2px 15px;
  input {
    margin-left: 7px;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 2px;
    width: -webkit-fill-available;
    background: transparent;
  }
}
@media (max-width: 600px){
  .search-bar{
    width: 100%;
  }

}
</style>