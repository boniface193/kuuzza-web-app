<template>
  <div class="px-4 pt-7 my-2 pb-16 store-width">
    <!-- store name field -->
    <div class="mb-5 settings-input">
      <p class="mb-1 secondary--text">Store Name</p>
      <v-text-field
        class="input mt-0"
        :rules="inputRules"
        type="name"
        color="primary"
        v-model="computed_info.storename"
        :disabled="edit_storename == false"
        required
      >
      </v-text-field>

      <!-- edit btn -->
      <span
        class="edit-btn"
        v-show="edit_storename == false"
        @click="edit_storename = true"
        >Edit</span
      >
      <!-- done btn -->
      <span
        class="edit-btn"
        v-show="edit_storename == true"
        @click="submit_edited_info('storename')"
        >Done</span
      >
    </div>
    <!-- store location field -->
    <div class="mb-5 settings-input">
      <p class="mb-1 secondary--text">Store Location</p>
      <v-text-field
        class="input mt-0"
        :rules="inputRules"
        type="text"
        color="primary"
        v-model="computed_info.storelocation"
        :disabled="edit_storelocation == false"
        required
      >
      </v-text-field>

      <!-- edit btn -->
      <span
        class="edit-btn"
        v-show="edit_storelocation == false"
        @click="edit_storelocation = true"
        >Edit</span
      >
      <!-- done btn -->
      <span
        class="edit-btn"
        v-show="edit_storelocation == true"
        @click="submit_edited_info('storelocation')"
        >Done</span
      >
    </div>
    <!-- phone number field -->
    <div class="mb-5 settings-input">
      <p class="mb-1 secondary--text">Phone Number</p>
      <v-text-field
        class="input mt-0"
        :rules="inputRules"
        type="tel"
        color="primary"
        v-model="computed_info.storenum"
        :disabled="edit_storenum == false"
        required
      >
      </v-text-field>

      <!-- edit btn -->
      <span
        class="edit-btn"
        v-show="edit_storenum == false"
        @click="edit_storenum = true"
        >Edit</span
      >
      <!-- done btn -->
      <span
        class="edit-btn"
        v-show="edit_storenum == true"
        @click="submit_edited_info('storenum')"
        >Done</span
      >
    </div>

     <!-- modal for dialog messages -->
      <modal :dialog="dialog" width="400" >
        <div class="white pa-3 pb-10 text-center dialog">
          <div class="d-flex justify-end"><v-icon class="error--text close-btn" @click="dialog = false">mdi-close</v-icon></div>

          <h4> {{dialogMessage}}</h4>
        </div>
      </modal>
  </div>
</template>
<script>
import modal from '@/components/dashboard/modal.vue';
export default {
  name: "storeDetails",
  components: {modal},
  data: function () {
    return {
      dialog: false,
      dialogMessage: '',
      edit_storenum: false,
      edit_storename: false,
      edit_storelocation: false,
      inputRules: [(v) => !!v || "This field is required"],
    };
  },
  computed: {
    computed_info() {
      // gets the values of user information
      //let user_info = this.$store.getters["admin/user_info"];
      let storename = 'Mariam super store'
      let storelocation = 'Ikeja Lagos Nigeria';
      let storenum = '0901234986';
  
      return {
        storename: storename,
        storelocation: storelocation,
        storenum: storenum,
      };
    },
  },
  methods: {
    submit_edited_info(input_field) {

      if (input_field === "storename") {
        this.edit_storename = false
        this.dialogMessage = "Store name changed successfully!"
      }
      if (input_field === "storelocation") {
        this.edit_storelocation = false
        this.dialogMessage = "Store location changed successfully!"
      }
      if (input_field === "storenum") {
        this.edit_storenum = false
        this.dialogMessage = "Store phone number changed successfully!"
      }

      this.dialog = true
    },
  },
};
</script>
<style lang="scss" scoped>
.close-btn{
  cursor: pointer;
}
</style>