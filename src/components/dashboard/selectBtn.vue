<template>
  <div class="select-btn" tabindex="0" v-on-clickaway="away">
    <!-- select -->
    <div class="select" @click="toggleDropdown">
      <div class="select-placeholder d-flex align-center justify-space-between">
        <span>{{ selectedItem }}</span>
        <span><v-icon class="primary--text">mdi-chevron-down</v-icon></span>
      </div>
    </div>
    <!-- select dropdown -->
    <div
      class="select-dropdown"
      :class="{ 'select-dropdown--active': selectDropdown }"
    >
      <p
        class="py-2 mb-0 dropdown-item"
        v-for="(item, index) in items"
        :key="index"
        @click="setSelectedItem(item)"
      >
        {{ item }}
      </p>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  name: "selectBtn",
  mixins: [clickaway],
  props: ["items", "item", "dropDownMenu"],
  data: function () {
    return {
      selectDropdown: false,
      selectedItem: this.item,
      selectedDropDownValue: null
    };
  },
  methods: {
    // toggle the select dropdown
    toggleDropdown() {
      this.selectDropdown = !this.selectDropdown;
    },
    away() {
      this.dropdown = false;
    },
    setSelectedItem(item) {
      if (this.dropDownMenu !== true) {
        this.selectedItem = item;
        this.$emit("selectedItem", this.selectedItem);
      }else {
        this.selectedDropDownValue = item
        this.$emit("selectedItem", this.selectedDropDownValue);
      }
      this.selectDropdown = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.select-btn {
  width: 100%;
  height: 100%;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  align-items: center;
  position: relative;
  outline: none;
  &:hover {
    border-color: rgba(0, 0, 0, 0.87);
  }
  cursor: pointer;
  .select {
    padding: 0px 12px;
    width: 100%;
    height: 100%;
    .select-placeholder {
      height: 100%;
    }
  }
  .select-dropdown {
    width: 100%;
    position: absolute;
    overflow-x: hidden;
    box-shadow: 0px 3px 6px #00000029;
    top: 100%;
    left: 0px;
    display: none;
    margin-top: 3px;
    background: #ffffff;
    border-radius: 8px;
    z-index: 5;
    .dropdown-item {
      cursor: pointer;
      padding: 0px 12px;
      &:hover {
        color: #5064cc;
        background: #5064cc26;
      }
    }
  }
  &:focus {
    border: 2px solid #5064cc;
    .select-dropdown--active {
      display: block;
    }
  }
}
</style>