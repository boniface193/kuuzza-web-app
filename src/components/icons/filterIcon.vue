<template>
  <!-- filter btn -->
  <div class="filter-btn">
    <v-icon class="primary--text">mdi-sort</v-icon>
    <span class="tooltiptext">{{ toolTipText }}</span>
  </div>
</template>
<script>
export default {
  name: "filterIcon",
  props: ["toolTipText"],
};
</script>
<style lang="scss" scoped>
.filter-btn {
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
    width: 120px;
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