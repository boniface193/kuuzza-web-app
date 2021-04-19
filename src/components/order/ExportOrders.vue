<template>
  <div>
    <div @click="exportOrders">
      <exportIcon toolTipText="Export orders" />
    </div>

    <!--------------------------- Modal for dialog messages ------------------------------>
    <Modal :dialog="dialog" width="400">
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
    </Modal>
  </div>
</template>
<script>
import exportIcon from "@/components/icons/exportIcon.vue";
import Modal from "@/components/general/Modal.vue";
import failedImage from "@/assets/img/failed-img.svg";
import successImage from "@/assets/img/success-img.svg";
export default {
  name: "exportOrders",
  components: { exportIcon, Modal },
  data: function () {
    return {
      dialog: false,
      dialogMessage: "",
      statusImage: null,
    };
  },
  methods: {
    // export orders
    exportOrders() {
      if (
        this.$store.state.orders.dateRange.startDate !== "" &&
        this.$store.state.orders.dateRange.endDate !== ""
      ) {
        this.dialog = true;
        this.statusImage = successImage;
        this.dialogMessage = "Exporting orders...";
        this.$store
          .dispatch("orders/exportOrders")
          .then(() => {
            this.dialog = true;
            this.statusImage = successImage;
            this.dialogMessage =
              "Orders successfully exported, An email would be sent to you shortly!";
          })
          .catch((error) => {
            this.statusImage = failedImage;
            if (error.status == 422 || error.status == 400) {
              this.dialog = true;
              this.dialogMessage = error.data.message;
            }
          });
      } else {
        this.statusImage = failedImage;
        this.dialog = true;
        this.dialogMessage =
          "Please select a date range before proceeding with your export.";
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