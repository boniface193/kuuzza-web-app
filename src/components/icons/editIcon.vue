<template>
  <!-- edit btn -->
  <div class="edit-btn">
    <v-icon class="primary--text">mdi-pencil</v-icon>
    <span class="tooltiptext">{{ toolTipText }}</span>
  </div>
</template>
<script>
export default {
  name: "editIcon",
  props: ["toolTipText"],
};
</script>
<style lang="scss" scoped>
.edit-btn {
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
    z-index: 2;
    display: none;
  }
  &:hover .tooltiptext {
    display: block;
  }
}
</style>