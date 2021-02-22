<template>
  <div
    class="custom-select"
    :style="{ width: width, height: height }"
    :class="{ errorStatus: inputStatus === true }"
    tabindex="0"
    v-on-clickaway="away"
  >
    <div
      class="custom-select-content d-flex align-center justify-space-between"
      @click="toggleDropdown"
    >
      <span
        class="custom-placeholder"
        :class="{ 'selected-color': selectedValue !== null }"
        >{{ getItemValue.itemHolder }}</span
      >
      <span
        ><v-icon :color="caretColor" class="caret"
          >mdi-chevron-down</v-icon
        ></span
      >
    </div>
    <!-- dropdown -->
    <div
      class="custom-dropdown"
      :style="{ top: height }"
      v-show="dropdown === true"
    >
      <div class="search-container" v-if="searchBar === true">
        <div class="search-bar">
          <input
            type="text"
            v-model="searchValue"
            placeholder="Search Category"
          />
          <v-icon class="primary--text">mdi-magnify</v-icon>
        </div>
      </div>
      <!-- dropdown items -->
      <div class="items">
        <p
          v-for="(item, index) in filteredItem"
          :key="index"
          @click="itemSelected(item)"
        >
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  name: "customSelect",
  mixins: [clickaway],
  props: [
    "width",
    "height",
    "caretColor",
    "placeholder",
    "items",
    "inputStatus",
    "searchBar",
    "item"
  ],
  data: function () {
    return {
      dropdown: false,
      selectedValue: null,
      searchValue: "",
    };
  },
  computed: {
    filteredItem() {
      return this.items.filter((item) => {
        return item.name.toLowerCase().includes(this.searchValue.toLowerCase());
      });
    },
    getItemValue() {
      return {
        itemHolder : this.placeholder
      }
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown;
      this.searchValue = "";
    },
    away() {
      this.dropdown = false;
    },
    itemSelected(item) {
      this.dropdown = false;
      this.selectedValue = item.name;
      this.$emit("selectedItem", item);
      this.getItemValue.itemHolder = item.name;
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-select {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.38);
  padding: 0px 12px;
  outline: none;
  position: relative;
  z-index: 11;
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
  .custom-dropdown {
    width: 100%;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    position: absolute;
    background: #ffffff;
    display: block;
    z-index: 1000;
    left: 0;
    margin-top: 5px;
    .search-container {
      background: rgba(80, 100, 204, 0.15);
      padding: 12px 0px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .search-bar {
      width: 90%;
      height: 45px;
      background: #ffffff;
      border-radius: 1px;
      display: flex;
      align-items: center;
      padding: 2px 15px;
      margin: auto;
      text-align: right;
      input {
        margin-left: 7px;
        height: 100%;
        border: none;
        outline: none;
        padding-left: 2px;
        width: -webkit-fill-available;
        background: transparent;
        &::placeholder {
          color: rgba(0, 0, 0, 0.38);
        }
      }
    }
    .items {
      background: white;
      margin-top: 1px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      max-height: 300px;
      overflow-y: auto;
      p {
        width: 100%;
        padding: 10px 5%;
        margin-bottom: 0px;
        cursor: pointer;
        &:hover {
          color: #5064cc;
          background: #5064cc26;
        }
      }
    }
  }
  &:focus {
    border: 2px solid #5064cc;
  }
}

.errorStatus {
  border: 2px solid #e62222 !important;
  &:hover {
    border-color: #e62222 !important;
  }
}
</style>