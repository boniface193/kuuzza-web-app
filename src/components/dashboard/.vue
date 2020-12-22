<template>
  <div class="triggered-select">
    <div class="select">
      <div
        class="select-placeholder d-flex align-center justify-space-between"
        @click="toggleDropdown"
        v-if="selectedItem === null"
      >
        <span>Actions</span>
        <span><v-icon class="primary--text">mdi-chevron-down</v-icon></span>
      </div>
      <div class="selected-value d-flex align-center justify-space-between" v-if="selectedItem !== null">
        <span @click="toggleDropdown">{{ selectedItem }}</span>
        <div class="triger-btn"></div>
      </div>
    </div>
    <div class="select-dropdown" v-show="selectDropdown">
      <p class="py-2 mb-0 dropdown-item" @click="setSelectedItem('Take product offline')">Take product offline</p>
      <p class="py-2 mb-0 dropdown-item" @click="setSelectedItem('Delete product')">Delete product</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "triggeredSelect",
  data: function () {
    return {
      selectDropdown: false,
      selectedItem: null,
    };
  },
  methods: {
    toggleDropdown() {
      if (this.selectDropdown === true) {
        this.selectDropdown = false;
      } else {
        this.selectDropdown = true;
      }
    },
    setSelectedItem(item) {
        this.selectedItem = item
        this.toggleDropdown()
    }
  },
};
</script>
<style lang="scss" scoped>
.triggered-select {
  width: 100%;
  height: 42px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  position: relative;
  &:hover {
    border-color: rgba(0, 0, 0, 0.87);
  }
  cursor: pointer;
  .select {
    width: 100%;
    .selected-value{
        .triger-btn{
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background:  #e62222;
            cursor: pointer;
            &:hover{
                background:  #e2e2e2;
            }
        }
    }
  }
  .select-dropdown {
    width: 100%;
    position: absolute;
    overflow-x: hidden;
    box-shadow: 0px 3px 6px #00000029;
    top: 42px;
    left: 0px;
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
}
</style>