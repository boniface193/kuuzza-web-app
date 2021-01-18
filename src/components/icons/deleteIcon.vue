<template>
  <!-- delete btn -->
  <div class="delete-btn">
    <v-icon class="error--text">mdi-trash-can-outline</v-icon>
    <span class="tooltiptext">{{ toolTipText }}</span>
  </div>
</template>
<script>
export default {
  name: "deleteIcon",
  props: ["toolTipText"],
};
</script>
<style lang="scss" scoped>
.delete-btn {
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-align: center;
  position: relative;
  &:hover {
    background-color: rgb(239, 245, 255);
  }
  .tooltiptext {
    color: #5064cc;
    background-color: rgb(239, 245, 255);
    width: 70px;
    text-align: center;
    border-radius: 3px;
    padding: 5px;
    top: 40px;
    position: absolute;
    z-index: 5;
    display: none;
  }
  &:hover .tooltiptext {
    display: block;
  }
}
</style>