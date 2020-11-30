<template>
  <div>
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
</style>