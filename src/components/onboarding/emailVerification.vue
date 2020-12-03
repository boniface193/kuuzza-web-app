<template>
  <div>
    <p class="mt-5 mb-0">
      Kindly enter the code sent to
      <span style="font-weight: bold">ayotundelanwo@gmail.com</span>
    </p>
    <v-form>
      <div class="my-10">
        <input
            class="verify-input"
          @paste="handlePaste"
          type="text"
          title="code"
          maxLength="1"
          v-focus="item - 1 === currentIndex"
          size="1"
          min="0"
          max="9"
          pattern="[0-9]{1}"
          @input="handleInput($event, item - 1)"
          @keyup.delete="onDelete($event, item - 1)"
          v-model="code[item - 1]"
          v-for="item in amount"
          :key="item"
        />
      </div>

      <!-- button container -->
      <div class="pa-0 mt-5" style="width: 100%">
        <p>
          Didn't receive the code?
          <a style="text-decoration: none">Resend Code</a>
        </p>
        <v-btn class="primary px-8 py-5 mb-5" @click="validate_form(1)"
          >Verify</v-btn
        >
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "emailVerification",
  props: {
    amount: {
      type: Number,
      default: 5,
    },
  },
  directives: {
    focus: {
      componentUpdated: function (el, obj) {
        obj.value && el.focus();
      },
    },
  },
  created() {
    this.code = new Array(this.amount).fill("");
  },
  methods: {
    handleInput(e, index) {
      this.currentIndex = index;
      e.target.value = this.validateNumber(e.target.value);
      e.target.value !== "" && ++this.currentIndex;
      !this.code.includes("") && this.$emit("onCompleted", this.code.join(""));
    },
    onDelete(e, index) {
      if (e.target.value === "") {
        this.currentIndex = index - 1;
      }
    },
    validateNumber(val) {
      return val.replace(/\D/g, "");
    },
    handlePaste(e) {
      e.preventDefault();
    },
  },
  data() {
    return {
      code: [],
      currentIndex: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
.verify-input {
  border: 1px solid #5064cc;
  outline: none;
  width: 49px;
  height: 49px;
  margin-right: 7px;
  border-radius: 5px;
  font-size: 30px;
  color: #2b2b2b;
  text-align: center;
  transition: all 0.2s ease-in-out;
}
</style>