<template>
  <div>
    <div @click="exportProducts">
      <exportIcon toolTipText="Export products" />
    </div>

    <!--------------------------- modal for dialog messages ------------------------------>
    <modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img :src="statusImage"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>
  </div>
</template>
<script>
import exportIcon from "@/components/icons/exportIcon.vue";
import modal from "@/components/dashboard/modal.vue";
import failedImage from "@/assets/img/failed-img.svg";
import successImage from "@/assets/img/success-img.svg";
import { mapGetters } from "vuex";
export default {
  name: "exportProducts",
  components: { exportIcon, modal },
  data: function () {
    return {
      dialog: false,
      dialogMessage: "",
      statusImage: null,
    };
  },
  computed: {
    ...mapGetters({
      verifiedStore: "settings/verifiedStore",
    }),
  },
  methods: {
    // export products
    exportProducts() {
      if (this.verifiedStore === true) {
        this.dialog = true;
        this.statusImage = successImage;
        this.dialogMessage = "Exporting Product...";
        this.$store
          .dispatch("inventory/exportProducts")
          .then(() => {
            this.dialog = true;
            this.statusImage = successImage;
            this.dialogMessage =
              "Products successfully exported, An email would be sent to you shortly!";
          })
          .catch((error) => {
            this.statusImage = failedImage;
            this.dialog = true;
            if (error.response) {
              this.dialogMessage = "Something went wrong, pls try again!";
            } else {
              this.dialogMessage = "No internet Connection!";
            }
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
</style>