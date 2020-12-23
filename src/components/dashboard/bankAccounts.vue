<template>
  <div class="px-4 pt-7 my-2 pb-16">
    <h4 class="mb-7">Bank Accounts</h4>
    <div v-if="!accountPresent">
      <v-form ref="form" class="invite-form">
        <!-- Select Bank -->
        <div class="mb-5 settings-input">
          <p class="mb-1">Bank</p>
          <div style="height: 52px">
            <selectBtn :items="['Select bank', 'Zenith Bank', 'Gt Bank']" />
          </div>
        </div>

        <!-- email field-->
        <div class="mb-5 settings-input">
          <p class="mb-1">Account Number</p>
          <v-text-field
            class="input mt-0"
            v-model="accNumber"
            type="number"
            color="primary"
            placeholder="Enter account number"
            required
          >
          </v-text-field>
        </div>

        <v-btn class="primary py-6 px-4">Save</v-btn>
      </v-form>
    </div>
    <div>
      <v-row>
        <v-col class="col-3">
          <p class="headers">Bank Name</p>
          <p class="mb-2 secondary--text content">Zenith Bank</p>
          <p class="mb-2 secondary--text content">Gt Bank</p>
        </v-col>
        <v-col class="col-3">
          <p class="headers">Account Number</p>
          <p class="mb-2 secondary--text content">2110287878</p>
          <p class="mb-2 secondary--text content">2110287878</p>
        </v-col>
        <v-col class="col-3">
          <p class="headers">Account Name</p>
          <p class="mb-2 secondary--text content">Abdulazeez Abdulazeez</p>
          <p class="mb-2 secondary--text content">Abdulazeez Abdulazeez</p>
        </v-col>
        <v-col class="col-3 text-center">
            <p class="mb-10"></p>
           <p class="mb-2 primary--text content edit-btn">edit</p>
           <p class="mb-2 primary--text content edit-btn">edit</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import selectBtn from "@/components/dashboard/selectBtn.vue";
export default {
  name: "bankAccounts",
  components: { selectBtn },
  data: function () {
    return {
      bankName: "",
      accNumber: "",
      accountPresent: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.invite-form {
  width: 50%;
}
.header{
    font-weight: 400;
}
.content {
    font-weight: 300;
}
.edit-btn{
    cursor: pointer;
}
</style>