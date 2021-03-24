<template>
  <div>
    <v-card width="300">
      <div class="text-center py-5">
        <v-avatar size="40" class="rounded-circle mb-4">
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
        </v-avatar>
        <div class="layout-title mb-2">Ayotunde Lanwo</div>
        <div class="layout-title-subtitle mb-5">ayotundelanwo@gmail.com</div>
        <v-btn depressed class="layout-title-subtitle mx-6" :to="{name: 'user'}">Manage your Kuuza Account</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.layout-title {
  text-align: center;
  font: normal normal 16px/20px "Product Sans";
  letter-spacing: 0.5px;
  color: #000;
}

.layout-title-subtitle {
  font: normal normal lighter 14px/17px "Product Sans";
  letter-spacing: 0px;
  color: #000;
}
</style>