<template>
  <div class="mt-10">
    <!-- page description -->
    <div>
      <p class="text-center mb-0 primary--text" style="font-size: 20px">
       NB: You are required to fill the informations below before you can proceed
        to add products to your inventory
      </p>
    </div>
    <!-- step progress  -->
    <StepProgress
      :steps="[
        'Bussiness informations',
        'Return & Refund Policy ',
        'Pick up Location',
        'Verification',
      ]"
      :currentStep="currentStep"
      :lineThickness="lineThickness"
      :activeColor="activeColor"
      :activeThickness="activeThickness"
      :passiveThickness="passiveThickness"
      :passiveColor="passiveColor"
      class="mt-5 mb-5"
    />

    <div class="form-container mt-16 pt-5">
      <v-form ref="form1" v-show="presentForm === 'form1'">
        <!-- account type  -->
        <div class="mb-8">
          <p class="mb-1">Select account type</p>
          <div class="select-item">
            <select-btn
              bgColor="transparent"
              borderRadius="5px"
              borderColor="slategrey"
              :items="['Business', 'Individual']"
              :item="'---Select account type---'"
              @selectedItem="setAccountType"
            />
          </div>
        </div>
        <!-- show if account type is business -->
        <div v-show="accountType === 'Business'">
          <!-- business name -->
          <div class="mb-3">
            <p class="mb-1">Business Name</p>
            <v-text-field
              class="mt-0"
              v-model="businessName"
              type="name"
              :rules="inputRules"
              color="primary"
              placeholder="Business name"
              required
              outlined
            >
            </v-text-field>
          </div>

          <!-- RC number -->
          <div class="mb-3">
            <p class="mb-1">RC Number</p>
            <v-text-field
              class="input mt-0"
              v-model="rcNumber"
              type="text"
              :rules="inputRules"
              color="primary"
              placeholder="RC Number"
              required
              outlined
            >
            </v-text-field>
          </div>
        </div>

        <!-- show if account type is individual -->
        <div v-show="accountType === 'Individual'">
          <!-- business name -->
          <div class="mb-8">
            <p class="mb-1">Select an ID type</p>
            <div class="select-item">
              <select-btn
                bgColor="transparent"
                borderRadius="5px"
                borderColor="slategrey"
                :items="[
                  'NIN',
                  'Voter card',
                  'Driver license',
                  'International passport',
                ]"
                :item="'---ID type---'"
                @selectedItem="setIDtype"
              />
            </div>
          </div>

          <!-- RC number -->
          <div class="mb-3">
            <p class="mb-1">ID Number</p>
            <v-text-field
              class="input mt-0"
              v-model="idNumber"
              type="text"
              :rules="inputRules"
              color="primary"
              placeholder="ID Number"
              required
              outlined
            >
            </v-text-field>
          </div>
        </div>

        <div class="btn-container d-flex justify-end">
          <v-btn class="primary py-6 px-8" @click="goNextForm('1')">
            Next
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>
<script>
import StepProgress from "@/components/general/StepProgress.vue";
import selectBtn from "@/components/dashboard/selectBtn.vue";
export default {
  name: "RequiredInformationPage",
  components: {
    StepProgress,
    "select-btn": selectBtn,
  },
  data: function () {
    return {
      lineThickness: 4,
      activeThickness: 4,
      passiveThickness: 4,
      activeColor: "#5064CC",
      passiveColor: "#ddd",
      currentStep: 0,
      presentForm: "form1",
      accountType: null,
      businessName: "",
      rcNumber: "",
      idNumber: "",
      IDtype: "",
      inputRules: [(v) => !!v || "This field is required"],
    };
  },
  methods: {
    setAccountType(params) {
      this.accountType = params;
    },
    setIDtype(params) {
      this.IDtype = params;
    },
    goNextForm(formNum) {
      this.$refs[`form${formNum}`].validate();
      if(this.$refs[`form${formNum}`].validate()){
          this.presentForm = 'form' + (formNum + 1);
          console.log(formNum)
      }
    },
  },
};
</script>
<style lang="scss">
.form-container {
  width: 50%;
}
.select-item {
  height: 58px;
  position: relative;
}
</style>