<template>
  <!-- export btn -->
  <div class="export-btn d-flex align-center">
    <img src="@/assets/img/upload2.svg" alt="" />
    <span class="tooltiptext">{{ toolTipText }}</span>
  </div>
</template>
<script>
export default {
  name: "exportIcon",
  props: ["toolTipText"],
};
</script>
<style lang="scss" scoped>
.export-btn {
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
    min-width: 130px;
    text-align: center;
    border-radius: 3px;
    padding: 5px;
    top: 45px;
    position: absolute;
    z-index: 2;
    display: none;
  }
  &:hover .tooltiptext {
    display: block;
  }
}
</style>