<template>
  <div class="text-center">
    <v-md-date-range-picker
      class="mdrp__activator activator-wrapper text-field"
      start-date="2019-01-01"
      :opens="opens"
    ></v-md-date-range-picker>
  </div>
</template>

<script>
export default {
  data: () => ({
    opens: "right",
  }),
};
</script>

<style lang="scss" scoped>
.mdrp__activator .activator-wrapper .text-field {
  display: block;
  font-size: 18px;
  padding: 4px 10px 10px 5px;
  width: 300px;
  border: none;
  border-bottom: none;
}
</style>