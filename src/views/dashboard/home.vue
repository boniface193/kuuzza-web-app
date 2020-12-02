<template>
  <!-- main page for layout and dashboard -->
  <div class="bg-color">
    <Layout />
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import Layout from "@/components/dashboard/Layout.vue";

export default {
  components: {
    Layout,
  },
};
</script>

<style>
.bg-color {
  background: #f9fafe 0% 0% no-repeat padding-box;
  opacity: 1;
}
</style>