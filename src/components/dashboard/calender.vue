<template>
  <div class="text-center">
    <!-- displays calendar filter -->
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
    // change the direction of the calendar
    opens: "right",
  }),
};
</script>

<style lang="scss" scoped>
</style>