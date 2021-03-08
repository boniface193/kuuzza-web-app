<template>
  <div>
    <step-progress
      :steps="steps"
      :current-step="currentStep"
      :line-thickness="lineThickness"
      :active-color="activeColor"
      :active-thickness="activeThickness"
      :passive-thickness="passiveThickness"
      :passive-color="passiveColor"
    ></step-progress>
  </div>
</template>
<script>
import StepProgress from "vue-step-progress";
// import the css (OPTIONAL - you can provide your own design)
import "vue-step-progress/dist/main.css";
export default {
  name: "StepProgress",
  components: {
    "step-progress": StepProgress,
  },
  props: [
    "steps",
    "currentStep",
    "lineThickness",
    "activeThickness",
    "passiveThickness",
    "passiveColor",
    "activeColor",
  ],
};
</script>
<style lang="scss">

div.step-progress__step span {
  color: var(--passiveColor);
  transition: 0.3s ease;
  display: none !important;
  font-size: 50px;
  transform: translateZ(0) scale(1) perspective(1000px);
  font-weight: 900;
  text-align: center;
  opacity: 1;
}

.step-progress__step-label {
  position: absolute;
  top: calc(100% + 25px);
  left: 0%;
  transform: translateX(-50%) perspective(1000px);
  white-space: nowrap;
  font-size: 15px;
  font-weight: normal;
  color: #5064CC !important;
  transition: 0.3s ease;
}

.step-progress__step:after {
  width: 13px;
  height: 13px;
}

.step-progress__bar {
  width: 100%;
  display: flex;
  height: 15px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
}
</style>