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
        <h2 class="mb-3">Importing file...</h2>
        <p class="secondary--text">
          Please wait a few seconds while we <br />import your file to Nova
        </p>
      </div>

      <div class="text-center" style="display: none">
        <h2 class="mb-3">Product list imported successfully!</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "productList",
  data: function () {
    return {
      importingFile: false,
      fileImported: false,
    };
  },
  methods: {
    pickDocument() {
      this.$refs.docInput.click();
    },
    uploadFile() {
      const formData = new FormData();
      // console.log(this.$refs.docInput.files[0])
      formData.append("file", this.$refs.docInput.files[0]);
      this.importingFile = true;
      console.log(formData);

      this.$store
        .dispatch("inventory/importProducts", formData)
        .then(() => {
          this.importingFile = false;
          console.log(111);
        })
        .catch(() => {
          this.importingFile = false;
          console.log(222);
        });
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
.browse-container {
  padding-top: 13%;
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
</style>