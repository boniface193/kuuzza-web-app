<template>
  <div>
    <div class="px-3 bank-container" v-show="!pageLoader">

      <div class="mt-5 px-2">
        <h3 class="mb-4">Change account details</h3>

        <!-- error message -->
        <p class="error--text mb-1" v-show="error">{{ errorMsg }}</p>

        <!-- form section -->
        <v-form ref="form">
          <!-- Select Bank -->
          <div class="mb-9">
            <p class="mb-1">Bank *</p>
            <customSelect
              width="100%"
              height="57px"
              caretColor="#5064cc"
              :placeholder="getAccountDetails.bank_name"
              :searchBar="true"
              :items="bankList"
              :item="getAccountDetails.bank_name"
              :inputStatus="bankError"
              @selectedItem="setBank"
            />
            <div v-if="bankError === true" class="inputError error--text">
              Bank is required
            </div>
          </div>

          <!-- acciunt number field-->
          <div class="mb-5">
            <p class="mb-1">Account Number *</p>
            <v-text-field
              class="input mt-0"
              v-model="getAccountDetails.accNumber"
              :rules="accountNumRules"
              type="number"
              color="primary"
              placeholder="Enter account number"
              @keyup="validateAccount"
              required
            >
            </v-text-field>
            <div class="primary--text">
              <span v-show="!fetchingAccountDetails">{{
                newAccountDetails.account_name
              }}</span>
              <span v-show="fetchingAccountDetails">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  :size="20"
                ></v-progress-circular>
              </span>
            </div>
          </div>

          <v-btn
            class="primary py-6 px-4"
            :disabled="!accountVerified || this.getAccountDetails.accNumber.length !== 10"
            @click="openPasswordModal"
            >Update</v-btn
          >
        </v-form>
      </div>
    </div>
    <!-- page loader -->
    <div class="d-flex text-center" v-if="pageLoader">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
    </div>
    <!-- modal for dialog messages -->
    <modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
            >mdi-close</v-icon
          >
        </div>
        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img :src="statusImage"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>
    <!-- modal for dialog messages -->
    <modal :dialog="passwordDialog" width="300">
      <div class="white pa-3 pb-2 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="passwordDialog = false"
            >mdi-close</v-icon
          >
        </div>
        <div class="px-4">
          <p class="mt-2 mb-1">
            Please enter your password for security measures
          </p>
          <!-- error message -->
          <p class="error--text mt-2 mb-1" v-show="passwordError">
            {{ passwordErrorMsg }}
          </p>
          <!-- form section-->
          <v-form class="password-container" ref="passwordForm">
            <!-- password -->
            <v-text-field
              class="input mt-5"
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Enter your password"
              color="primary"
              required
              @keyup.enter="setAccountDetails()"
            ></v-text-field>
            <v-text-field style="display: none"></v-text-field>

            <!-- button container -->
            <div class="pa-0 mt-1" style="width: 100%">
              <v-btn
                class="primary py-5 mb-5 mx-auto"
                :loading="loading"
                :disabled="loading"
                @click="setAccountDetails()"
                >Update</v-btn
              >
            </div>
          </v-form>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import customSelect from "@/components/general/customSelect.vue";
import { mapGetters } from "vuex";
import failedImage from "@/assets/img/failed-img.svg";
import modal from "@/components/dashboard/modal.vue";
export default {
  name: "EditBankDetails",
  components: { customSelect, modal },
  props: ["accountDetails"],
  data: function () {
    return {
      password: "",
      loading: false,
      passwordError: false,
      passwordErrorMsg: "",
      bank: {},
      dialog: false,
      dialogMessage: "",
      error: false,
      errorMsg: "",
      statusImage: null,
      pageLoader: false,
      bankError: false,
      fetchingAccountDetails: false,
      accountVerified: false,
      passwordDialog: false,
      newAccountDetails: this.accountDetails,
      accountNumRules: [
        // verifies email address satisfies the requirement
        (v) => !!v || "Account Number is required",
        (v) => v.length == 10 || "Invalid account number",
      ],
      passwordRules: [
        // verifies password satisfies the requirement
        (v) => !!v || "Password is required",
      ],
    };
  },
  created() {
    if (this.bankList.length === 0) {
      this.getBankList();
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "settings/getUserProfile",
      bankList: "bankService/bankList",
    }),
    getAccountDetails() {
      return {
        accNumber: this.accountDetails.data.number,
        bank_name: this.accountDetails.data.bank_name,
      };
    },
  },
  methods: {
    // get the list of banks
    getBankList() {
      this.pageLoader = true;
      this.$store
        .dispatch("bankService/getBankList")
        .then((response) => {
          this.$store.commit("bankService/setBankList", response.data.data);
          this.pageLoader = false;
        })
        .catch((error) => {
          this.pageLoader = false;
          this.dialog = true;
          this.statusImage = failedImage;
          if (error.response) {
            this.dialogMessage = error.response.data.message;
          } else {
            this.dialogMessage = "No internet Connection!";
          }
        });
    },
    // verfiy that category is selected
    verifyBankSelect() {
      if (this.bank.name === "") {
        this.bankError = true;
      } else {
        this.bankError = false;
        this.validateAccount();
        this.accountVerified = false;
      }
    },
    setBank(params) {
      this.bank = params;
      this.verifyBankSelect();
    },
    validateAccount() {
      if (this.bank.name !== undefined && this.getAccountDetails.accNumber.length == 10) {
        this.fetchingAccountDetails = true; 
        this.accountVerified = false;
        this.$store
          .dispatch("bankService/validateBankAccount", {
            account_number: this.getAccountDetails.accNumber,
            bank_name: this.bank.name,
            bank_code: this.bank.code,
          })
          .then((response) => {
            this.newAccountDetails = response.data.data;
            this.accountVerified = true;
            this.error = false;
            this.errorMsg = "";
            this.fetchingAccountDetails = false;
          })
          .catch((error) => {
            this.error = true;
            this.accountVerified = false;
            this.newAccountDetails = {};
            this.fetchingAccountDetails = false;
            if (error.response) {
              this.errorMsg = error.response.data.message;
            } else {
              this.errorMsg = "No internet Connection!";
            }
          });
      }
    },
    setAccountDetails() {
      this.$refs.passwordForm.validate();
      this.loading = true;
      if (this.$refs.passwordForm.validate()) {
        this.$store
          .dispatch("bankService/setAccountDetails", {
            account_number: this.getAccountDetails.accNumber,
            bank_name: this.bank.name,
            bank_code: this.bank.code,
            password: this.password,
          })
          .then(() => {
            this.loading = false;
            this.passwordError = false;
            this.passwordDialog = false;
            // get lastest profile information
            location.reload();
          })
          .catch((error) => {
            this.passwordError = true;
            this.loading = false;
            if (error.response) {
              this.passwordErrorMsg = error.response.data.password[0];
            } else {
              this.passwordErrorMsg = "No internet Connection!";
            }
          });
      }
    },
    openPasswordModal() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.passwordDialog = true;
        this.$refs.passwordForm.reset();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bank-container {
  width: 50%;
}
.password-container .v-btn:not(.v-btn--round).v-size--default {
  height: 45px;
  min-width: 100%;
  padding: 0 16px;
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
.inputError {
  line-height: 12px;
  word-break: break-word;
  word-wrap: break-word;
  font-size: 12px;
  margin-top: 8px;
  padding-left: 12px;
}
.back-btn {
  position: absolute;
  left: 0px;
  top: 0;
}
@media (max-width: 750px) {
  .bank-container {
    width: 100%;
  }
}
</style>