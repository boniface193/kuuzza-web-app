<template>
  <div class="range-slider">
    <!-- min range  -->
    <input
      type="range"
      :min="minNum"
      :max="maxNum"
      @change="setNumber"
      step="1"
      v-model="sliderMin"
    />
    <!-- max range -->
    <input
      type="range"
      :min="minNum"
      :max="maxNum"
      @change="setNumber"
      step="1"
      v-model="sliderMax"
    />

    <div class="input-container pt-4 pb-2">
      <!-- min input -->
      <div class="input">
        <label>Min</label>
        <input
          type="number"
          :min="minNum"
          :max="maxNum"
          step="1"
          v-model="sliderMin"
          @change="setNumber"
        />
      </div>
      <div style="font-size: 30px; margin: 0px 5px; color: #979797">-</div>
      <!-- max input -->
      <div class="input">
        <label>Max</label>
        <input
          type="number"
          :min="minNum"
          :max="maxNum"
          step="1"
          v-model="sliderMax"
          @change="setNumber"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "multipleRangle",
  props: ["minNum", "maxNum"],
  data: function () {
    return {
      minAngle: this.minNum,
      maxAngle: this.maxNum,
    };
  },
  computed: {
    sliderMin: {
      get: function () {
        var val = parseInt(this.minAngle);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val > this.maxAngle) {
          this.maxAngle = val;
        }
        this.minAngle = val;
      },
    },
    sliderMax: {
      get: function () {
        var val = parseInt(this.maxAngle);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val < this.minAngle) {
          this.minAngle = val;
        }
        this.maxAngle = val;
      },
    },
  },
  methods: {
    setNumber() {
      this.$emit("minMaxNumber", {
        minNum: this.sliderMin,
        maxNum: this.sliderMax,
      });
    },
    resetRange() {
      this.minAngle = this.minNum;
      this.maxAngle = this.maxNum;
    }
  },
};
</script>
<style lang="scss" scoped>
.range-slider {
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;
}

.range-slider input[type="range"] {
  position: absolute;
  left: 0;
  top: 0;
}
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #ced4da;
}

input[type="range"]:focus::-ms-fill-lower {
  background: #ced4da;
}

input[type="range"]:focus::-ms-fill-upper {
  background: #ced4da;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: #ced4da;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type="range"]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #5064cc;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -4px;
}
.input-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .input {
    text-align: left;
    label {
      color: #979797;
    }
    input {
      width: 90px;
      outline: none;
      border: 1px solid #e2e2e2;
      border-radius: 3px;
      padding-left: 4px;
      height: 30px;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      &[type="number"] {
        -moz-appearance: textfield;
      }
      &:hover {
        border-color: rgba(0, 0, 0, 0.87);
      }
      &:focus {
        border: 2px solid #5064cc;
      }
    }
  }
}
</style>