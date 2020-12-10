<template>
  <div>
    <input
      type="file"
      style="display: none"
      ref="imageInput"
      accept="image/*"
      @change="onImagePicked"
      multiple
    />

    <div
      class="fileUploader"
      :style="{ width: width, height: height }"
      :class="{ focus: dialog === true, errorStatus: inputError }"
      @click="openImageModal"
    >
      <div
        class="fileUploader-content d-flex align-center justify-space-between"
      >
        <span class="selected-color">{{ itemHolder }}</span>
        <span
          ><v-icon :color="caretColor" class="caret"
            >mdi-chevron-down</v-icon
          ></span
        >
      </div>
    </div>

    <!-- dialog for upload -->
    <modal :dialog="dialog" width="650">
      <div class="white pa-3 pb-10 dialog">
        <div class="d-flex justify-end">
          <v-icon class="secondary--text close-btn mr-2" @click="minimizeModal"
            >mdi-minus</v-icon
          >
          <v-icon class="error--text close-btn" @click="cancelModal"
            >mdi-close</v-icon
          >
        </div>

        <div class="px-4 px-sm-7">
          <h4 class="secondary--text">Upload Product Image</h4>

          <div class="upload-container">
            <div class="upload-content" @click="pickImage">
              <span class="image-uploader">
                <img src="@/assets/img/upload.svg" alt="" />
                <span color="#979797" v-show="imageNames.length == 0"
                  >Upload Image</span
                >
                <span
                  color="#979797"
                  style="min-width: fit-content"
                  v-show="imageNames.length > 0"
                  v-for="(image, index) in imageNames"
                  :key="index"
                  >{{ image.name }},
                </span>
              </span>
            </div>
            <v-btn
              class="px-6 upload-btn white--text primary"
              height="45"
              :disabled="numberOfImage == 0"
            >
              Upload
            </v-btn>
          </div>

          <h4 class="error--text" v-show="numberOfImage === 0">
            No image selected yet!
          </h4>
          <h4 class="success--text" v-show="numberOfImage !== 0">
            {{ numberOfImage }}
            {{ numberOfImage > 1 ? "images" : "image" }} selected
          </h4>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
export default {
  name: "imageUploader",
  components: { modal },
  props: ["itemHolder", "width", "height", "caretColor"],
  data: function () {
    return {
      dialog: false,
      imageNames: [],
      numberOfImage: 0,
      inputError: false
    };
  },
  methods: {
    cancelModal() {
      this.dialog = false;
    },
    minimizeModal() {},
    openImageModal() {
      this.dialog = true;
    },
    pickImage() {
      this.$refs.imageInput.click();
    },
    onImagePicked(event) {
      const files = event.target.files;
      this.imageNames = files;
      this.numberOfImage = this.imageNames.length;
      if(this.numberOfImage == 0){
        this.inputError = true;
      }else {
        this.inputError = false;
      }
      this.$emit("images", this.imageNames);
    },
  },
};
</script>
<style lang="scss" scoped>
.fileUploader {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.38);
  padding: 0px 12px;
  outline: none;
  position: relative;
  z-index: 10;
  &:hover {
    border-color: rgba(0, 0, 0, 0.87);
  }
  .custom-placeholder {
    color: rgba(0, 0, 0, 0.38);
  }
  .selected-color {
    color: rgba(0, 0, 0, 0.87);
  }
  .caret {
    font-size: 30px;
  }
  &-content {
    height: 100%;
  }
}
.focus {
  border: 2px solid #5064cc;
  &:hover {
    border-color: #5064cc;
  }
}
.errorStatus {
  border: 2px solid #e62222 !important;
  &:hover {
    border-color: #e62222 !important;
  }
}
.close-btn {
  cursor: pointer;
}

.upload-container {
  width: 100%;
  height: 55px;
  border: 1px solid #d3d9de;
  border-radius: 10px;
  margin: 20px 0px;
  display: flex;
  align-items: center;
  padding: 5px;
  position: relative;
  .upload-content {
    padding-left: 20px;
    margin: 0px 5px;
    width: 81%;
    overflow: hidden;
    cursor: pointer;
    .image-uploader {
      overflow: hidden;
      display: flex;
      img {
        margin-right: 15px;
      }
    }
  }
}
@media (max-width: 550px) {
  .upload-container {
    display: grid;
    height: 100px;
    .upload-content {
      padding: 0px 10px;
      margin: 0px;
      width: 100%;
      .image-uploader {
        margin: 7px 0px 10px 0px;
      }
    }
  }
}
</style>