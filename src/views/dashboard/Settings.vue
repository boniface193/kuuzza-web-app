<template>
  <div class="px-12 py-7">
    <!-- page title -->
    <h1>Settings</h1>

    <div class="settings-container py-2 mt-7 white">
    <!-- nav section -->
      <div class="settings-nav px-4 py-0 d-flex">
        <a class="nav-item nav-item--active">Store</a>
        <a class="nav-item">User</a>
        <a class="nav-item">Team</a>
        <a class="nav-item">Privacy & Security</a>
        <a class="nav-item">Log Out</a>
      </div>

      <!-- settings content -->
      <div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Settings",
};
</script>

<style lang="scss" scoped>
.settings-container {
  border-radius: 15px;
}
.settings-nav {
  border-bottom: 1px solid #f1edec;
  width: 100%;
  max-height: 60px;
  .nav-item {
    padding: 15px 5px;
    border-bottom: 3px solid transparent;
    display: inline-block;
    margin: 0px 40px 0px 0px;
    color: #979797;
    margin-bottom: -2px;
    &--active{
        color: #5064CC;
        border-color: #5064CC;
        font-weight: bold;
    }
  }
}
</style>