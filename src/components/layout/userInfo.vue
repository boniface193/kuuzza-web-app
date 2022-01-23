<template>
  <div>
    <v-card width="300">
      <div class="text-center py-5">
        <v-avatar size="40" class="rounded-circle mb-4">
          <v-img v-if="userInfor.photo" :src="userInfor.photo"></v-img>
          <v-icon v-else size="40">mdi-account-circle</v-icon>
        </v-avatar>
        <div class="layout-title mb-2">{{ userInfor.name }}</div>
        <div class="layout-title-subtitle mb-5">{{ userInfor.email }}</div>
        <v-btn
          depressed
          class="layout-title-subtitle mx-6"
          :to="{ name: 'user' }"
          >Manage your Kuuzza Account</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ userInfor: "settings/getUserProfile" })
  }
};
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