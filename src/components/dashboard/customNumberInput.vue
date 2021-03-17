<template>
  <div
    class="quantity-input"
    :style="{ width: width, height: height }"
    :class="{ errorStatus: inputStatus === true }"
  >
    <input
      type="number"
      class=""
      placeholder=""
      min="1"
      v-model="getQuantity.quantity"
      @change="emitQuantity"
    />
    <div class="numberControl">
      <span style="border-top-right-radius: 8px" @click="increaseNum"
        ><v-icon :color="caretColor" class="caret">mdi-chevron-up</v-icon></span
      >
      <span style="border-bottom-right-radius: 8px" @click="decreaseNum"
        ><v-icon :color="caretColor" class="caret"
          >mdi-chevron-down</v-icon
        ></span
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "customNumberInput",
  props: [
    "width",
    "height",
    "caretColor",
    "inputStatus",
    "quantity",
    "minimumNumber",
  ],
  computed: {
    getQuantity() {
      return {
        quantity: this.quantity,
      };
    },
  },
  methods: {
    increaseNum() {
      this.getQuantity.quantity = parseInt(this.getQuantity.quantity, 10) + 1;
      this.emitQuantity();
    },
    decreaseNum() {
      let minValue = 0
      if (this.minimumNumber) {
        minValue = this.minimumNumber;
      }
      if (this.getQuantity.quantity > minValue) {
        this.getQuantity.quantity = parseInt(this.getQuantity.quantity, 10) - 1;
        this.emitQuantity();
      }
    },
    emitQuantity() {
      this.$emit("quantity", parseInt(this.getQuantity.quantity, 10));
    },
  },
};
</script>
<style lang="scss" scoped>
.quantity-input {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.38);
  display: flex;
  align-items: center;
  border-radius: 8px;
  &:focus-within {
    border: 2px solid var(--v-primary-base) !important;
  }
  &:hover {
    border-color: rgba(0, 0, 0, 0.87);
  }
  input {
    width: 75%;
    border: none;
    background: transparent;
    height: 100%;
    padding: 0px 2px 0px 12px;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    outline: none;
  }
  .numberControl {
    background: var(--v-light-background-base);;
    width: -webkit-fill-available;
    max-width: 32px;
    height: 100%;
    display: grid;
    span {
      cursor: pointer;
      height: 28.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #5166cc26;
      }
    }
  }
}
.errorStatus {
  border: 2px solid #e62222 !important;
  &:hover {
    border-color: #e62222 !important;
  }
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>