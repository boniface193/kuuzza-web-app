<template>
  <div>
    <div style="width: 205px">
      <!-- back to Inventory -->
      <router-link :to="{ name: 'inventoryPage' }" class="no-decoration">
        <h3 class="d-flex align-center return-btn my-3">
          <v-icon color="#2B2B2B">mdi-chevron-left</v-icon>Import Product List
        </h3>
      </router-link>
    </div>

    <input
      type="file"
      style="display: none"
      ref="docInput"
      accept=".xlsx, .xls, .csv"
      @change="uploadFile"
    />

    <div class="text-center mt-5 instruction">
      <p>
        Upload format (Select a CSV File, Each line should contain the product
        details) <a style="text-decoration:none" href="https://docs.google.com/spreadsheets/d/136uj_qJ71ilG4o-psx4qIp1WmVmRM3gp/edit#gid=1185075535" target="_blank">Download CSV format</a> and see how to upload <a>here</a>.
      </p>
    </div>

    <div class="d-flex align-center justify-center browse-container">
      <div class="text-center" v-show="!importingFile && !fileImported">
        <div class="upload-img mb-5 mx-auto">
          <img src="@/assets/img/Group12879.svg" alt="" />
        </div>
        <h2 class="mb-3">Import file</h2>
        <p class="secondary--text">
          Drag and drop a file to import <br />
          or
          <span class="primary--text browse" @click="pickDocument">
            browse
          </span>
          to choose a file
        </p>
      </div>

      <div class="text-center" v-show="importingFile && !fileImported">
        <div class="upload-img mb-5 mx-auto">
          <img src="@/assets/img/Group12879.svg" alt="" />
        </div>
        <h2 class="mb-3">Importing file...</h2>
        <p class="secondary--text">
          Please wait a few seconds while we <br />import your file to kuuzza
        </p>
      </div>

      <div class="text-center" style="display: none">
        <h2 class="mb-3">Product list imported successfully!</h2>
      </div>
    </div>

    <!-- Modal for dialog messages -->
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

        <h4 v-html="dialogMessage"></h4>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/general/Modal.vue";
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
export default {
  name: "ImportProduct",
  components: {
    Modal,
  },
  data: function () {
    return {
      importingFile: false,
      fileImported: false,
      dialog: false,
      dialogMessage: "",
      statusImage: null,
    };
  },
  methods: {
    pickDocument() {
      this.$refs.docInput.click();
    },
    uploadFile() {
      const formData = new FormData();
      formData.append("file", this.$refs.docInput.files[0]);
      this.importingFile = true;

      this.$store
        .dispatch("inventory/importProducts", formData)
        .then((response) => {
          this.importingFile = false;
          this.dialog = true;

          if (response.data.meta.successful_imports_count > 0) {
            this.statusImage = successImage;
            this.dialogMessage = `${response.data.message} succesfully.<br />
            <span class="secondary--text">Total number: ${
              response.data.meta.failed_imports_count +
              response.data.meta.successful_imports_count
            }</span>
            <span class="success--text">Total success: ${
              response.data.meta.successful_imports_count
            }</span>
            <span class="error--text">Total failed: ${
              response.data.meta.failed_imports_count
            }</span>`;
          } else {
            this.statusImage = failedImage;
            this.dialogMessage = "All products failed to import";
          }

          this.getProducts();
          setTimeout(() => {
            this.dialog = false;
            this.$router.push({ name: "inventoryPage" });
          }, 2000);
        })
        .catch((error) => {
          this.importingFile = false;
          this.loading = false;
          this.statusImage = failedImage;

          if (error.status == 422) {
            this.dialog = true;
            this.dialogMessage = error.response.data.errors.file[0];
          } else if (error.response.status == 400) {
            this.dialog = true;
            this.dialogMessage = error.response.data.message;
          }
        });
    },
    // get products from inventory
    getProducts() {
      this.$store.commit("inventory/setTableLoader", true);
      this.$store
        .dispatch("inventory/getProducts")
        .then(() => this.$store.commit("inventory/setTableLoader", false))
        .catch(() => this.$store.commit("inventory/setTableLoader", false));
    },
  },
};
</script>
<style lang="scss" scoped>
.no-decoration {
  text-decoration: none;
}
.return-btn {
  cursor: pointer;
  color: #2b2b2b;
  .v-icon {
    margin-right: 15px;
  }
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
.instruction {
  padding-top: 12%;
  width: 500px;
  margin: auto;
}
.browse-container {
  .upload-img {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--v-primary-base);
  }
}
.browse {
  cursor: pointer;
}
@media (max-width: 550px) {
  .instruction {
    width: auto;
  }
}
</style>