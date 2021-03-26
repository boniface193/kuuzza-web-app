<template>
  <div>
    <!-- title -->
    <h4 class="mb-0">Variants</h4>

    <v-checkbox
      v-model="haveVariant"
      label="This product has multiple options, like different sizes or colors"
      class="primary--text my-4"
    ></v-checkbox>
    <hr />

    <div class="py-4" v-show="haveVariant">
      <p class="mb-4">OPTIONS</p>

      <div>
        <h4 class="mb-1">Option 1</h4>
        <div class="d-flex align-center justify-space-between flex-wrap">
          <!-- variant name -->
          <div class="option-name">
            <v-text-field
              class="mt-0"
              type="text"
              color="primary"
              placeholder="Variant name"
              required
              outlined
            >
            </v-text-field>
          </div>
          <!-- variant options -->
          <div class="option-variant">
            <v-text-field
              class="mt-0"
              type="text"
              color="primary"
              placeholder="Seperate options with a comma"
              required
              outlined
            >
            </v-text-field>
          </div>
        </div>
      </div>

      <div>
        <h4 class="mb-1">Option 2</h4>
        <div class="d-flex align-center justify-space-between flex-wrap">
          <!-- variant name -->
          <div class="option-name">
            <v-text-field
              class="mt-0"
              type="text"
              color="primary"
              placeholder="Variant name"
              required
              outlined
            >
            </v-text-field>
          </div>
          <!-- variant options -->
          <div class="option-variant">
            <v-text-field
              class="mt-0"
              type="text"
              color="primary"
              placeholder="Seperate options with a comma"
              required
              outlined
            >
            </v-text-field>
          </div>
        </div>
      </div>
    </div>
    <hr v-show="haveVariant" />

    <v-btn class="light-background primary--text mt-4" v-show="haveVariant"
      >Add another option</v-btn
    >
  </div>
</template>
<script>
export default {
  name: "ProductVariant",
  data: function () {
    return {
      haveVariant: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.option-name {
  width: 35%;
}
.option-variant {
  width: 62%;
}
.v-text-field--outlined {
  border-radius: 8px !important;
}
@media (max-width: 600px) {
  .option-variant {
    width: 100%;
  }
}
</style>