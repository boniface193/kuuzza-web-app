<template>
  <div>
    <!-- title -->
    <h4 class="mb-0">Variants</h4>

    <v-checkbox
      v-model="haveVariant"
      label="This product has multiple options, like different sizes or colors"
      class="primary--text my-4"
      @change="emitVariant"
    ></v-checkbox>
    <hr />

    <v-form class="py-4" v-show="haveVariant" ref="variantForm">
      <p class="mb-4">OPTIONS</p>

      <div v-for="(item, index) in variantItems" :key="index">
        <h4 class="mb-1">Option {{ index + 1 }}</h4>
        <div class="d-flex align-center justify-space-between flex-wrap">
          <!-- variant name -->
          <div class="option-name mb-8">
            <SelectBtn
              :items="variantTypes"
              item="---select variant---"
              bgColor="transparent"
              borderRadius="8px"
              borderColor="rgba(0, 0, 0, 0.38)"
              :inputStatus="variantItems[index].inValidInput"
              errorMsg="Select variant"
              @selectedItem="setVariant(index, ...arguments)"
            />
          </div>
          <!-- variant options -->
          <div class="option-variant">
            <v-text-field
              class="mt-0"
              type="text"
              color="primary"
              placeholder="Seperate options with a comma"
              v-model="variantItems[index].values"
              :rules="inputRules"
              required
              outlined
            >
            </v-text-field>
          </div>
          <v-btn
            class="light-background primary--text mb-8"
            @click="removeForm(index)"
            >Remove</v-btn
          >
        </div>
      </div>
    </v-form>
    <hr v-show="haveVariant" />

    <v-btn
      class="light-background primary--text mt-4 mb-2"
      v-show="haveVariant"
      @click="generateForm()"
      >Add another option</v-btn
    >
    <span class="error--text" v-show="variantError">{{ variantErrorMsg }}</span>
  </div>
</template>
<script>
import SelectBtn from "@/components/general/SelectBtn.vue";
export default {
  name: "ProductVariant",
  components: { SelectBtn },
  data: function () {
    return {
      haveVariant: false,
      variantTypes: ["Size", "Color"],
      variantErrorMsg: "",
      variantError: false,
      variantItems: [
        {
          name: "",
          values: "",
          inValidInput: null,
        },
      ],
      formsValidated: false,
      inputRules: [(v) => !!v || "This field is required"],
    };
  },
  methods: {
    generateForm() {
      if (this.variantTypes.length > this.variantItems.length) {
        let variant = {};
        variant.name = "";
        variant.values = "";
        this.variantItems.push(variant);
      } else {
        this.variantErrorMsg =
          "Variant form cannot be greater than variant options available";
        this.variantError = true;
        setTimeout(() => {
          this.variantError = false;
        }, 2000);
      }
    },
    removeForm(item) {
      this.variantItems.splice(item, 1);
    },
    setVariant(index, params) {
      this.variantItems[index].name = params;
      this.variantItems[index].inValidInput = false;
      this.emitVariant();
    },
    emitVariant() {
      this.$emit("setVariant", {
        variant: this.variantItems,
        variantStatus: this.haveVariant,
        formsValidated: this.formsValidated,
      });
    },
    validateForm() {
      this.$refs.variantForm.validate();
      let errorCount = 0;
      this.variantItems.forEach((item, index) => {
        if (item.name === "") {
          this.variantItems[index].inValidInput = true;
          errorCount += 1;
        } else {
          this.variantItems[index].inValidInput = false;
        }
      });

      errorCount === 0 && this.$refs.variantForm.validate()
        ? (this.formsValidated = true)
        : (this.formsValidated = false);

      this.emitVariant();
    },
  },
};
</script>
<style lang="scss" scoped>
.option-name {
  width: 27%;
  height: 58px;
}
.option-variant {
  width: 62%;
}
.v-text-field--outlined {
  border-radius: 8px !important;
}
@media (max-width: 600px) {
  .option-name {
    width: 35%;
  }
  .option-variant {
    width: 100%;
  }
}
</style>