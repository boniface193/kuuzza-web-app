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

      <div v-for="(item, index) in variantItems" :key="index + 1">
        <h4 class="mb-1">Option {{ index + 1 }}</h4>
        <div class="d-flex align-center justify-space-between flex-wrap">
          <!-- variant name -->
          <div class="option-name mb-8">
            <SelectBtn
              :items="variantTypes"
              :item="
                variantItems[index].name !== ''
                  ? variantItems[index].name
                  : '---select variant---'
              "
              bgColor="transparent"
              borderRadius="8px"
              borderColor="rgba(0, 0, 0, 0.38)"
              :inputStatus="variantItems[index].inValidInput"
              errorMsg="Select variant"
              @selectedItem="setVariant(index, ...arguments)"
            />
          </div>
          <!-- variant options -->
          <div
            class="option-variant mb-8"
            :class="{
              'option-variant--active': variantItems[index].values.length > 0,
            }"
          >
            <div class="mt-1 mb-0 px-3">
              <span
                class="item-selected mr-2"
                v-for="(item, itemd) in variantItems[index].values"
                :key="itemd"
                >{{ item }}
                <v-icon
                  class="error--text ml-2"
                  style="font-size: 16px"
                  @click="removeVariantOption(index, itemd)"
                  >mdi-close</v-icon
                >
              </span>
            </div>
            <v-text-field
              class="mt-0"
              type="text"
              color="primary"
              placeholder="Seperate options with a comma"
              v-model="variantItems[index].value"
              @keyup="setVariantOption(index)"
              :rules="[
                inputRules.checkVariantOption(variantItems[index].values),
              ]"
              solo
              flat
              required
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
  props: ["variants"],
  data: function () {
    return {
      haveVariant: this.variants == null ? false : true,
      variantItems:
        this.variants == null
          ? [
              {
                name: "",
                value: "",
                values: [],
                inValidInput: null,
              },
            ]
          : this.variants,
      variantTypes: ["Size", "Color"],
      variantErrorMsg: "",
      variantError: false,
      formsValidated: false,
      variantOptionError: false,
      inputRules: {
        checkVariantOption(values) {
          return () => values.length > 0 || "Add at least one variant option";
        },
      },
    };
  },
  watch: {
    variants: function () {
      this.haveVariant = this.variants == null ? false : true;
      this.variantItems =
        this.variants == null
          ? [
              {
                name: "",
                value: "",
                values: [],
                inValidInput: null,
              },
            ]
          : this.variants;
    },
  },
  methods: {
    // generate variant form
    generateForm() {
      if (this.variantTypes.length > this.variantItems.length) {
        let variant = {};
        variant.name = "";
        variant.value = "";
        variant.values = [];
        variant.inValidInput = null;
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
    // remove variant form
    removeForm(index) {
      this.variantTypes.push(this.variantItems[index].name);
      this.variantItems.splice(index, 1);
    },
    // add the variant option
    setVariantOption(index) {
      if (
        this.variantItems[index].value.slice(-1) == "," &&
        this.variantItems[index].value.length > 1
      ) {
        this.variantItems[index].value = this.variantItems[
          index
        ].value.substring(0, this.variantItems[index].value.length - 1);
        this.variantItems[index].values.push(
          `${this.variantItems[index].value}`
        );
        this.variantItems[index].value = "";
        this.emitVariant();
      }
    },
    // remove variant option
    removeVariantOption(index, itemIndex) {
      this.variantItems[index].values.splice(itemIndex, 1);
      this.emitVariant();
    },
    // set variant name
    setVariant(index, params) {
      this.variantItems[index].name = params;
      this.variantItems[index].inValidInput = false;
      this.emitVariant();
    },
    emitVariant() {
      this.$emit("setVariant", {
        variants: this.variantItems,
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
  height: 58px;
  border: 1px solid rgba(0, 0, 0, 0.38) !important;
  min-height: 58px;
  border-radius: 8px;
  padding: 0px 0px;
  &:hover {
    border-color: rgba(0, 0, 0, 0.87);
  }
  &:focus-within {
    border-color: var(--v-primary-base) !important;
  }
  &--active {
    height: 75px;
  }
  &--error {
    border-color: var(--v-error-base) !important;
  }
  .item-selected {
    color: var(--v-primary-base);
    background: var(--v-light-background-base);
    margin: 5px 2px 2px 0px;
    padding: 3px 4px;
    border-radius: 5px;
  }
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
<style>
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: transparent !important;
}
</style>