<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent :width="width" :height="height"> 
        <slot></slot>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  name: "Modal",
  props: ["width","dialog","height"],
};
</script>
<style lang="scss" scoped>
.v-dialog{
  border-radius: 15px !important;
}
</style>