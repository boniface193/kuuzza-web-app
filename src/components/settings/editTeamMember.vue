<template>
  <div>
    <div class="px-4" v-show="!showMessage">
      <!-- return button -->
      <router-link :to="{ name: 'teamDetails' }" style="text-decoration: none">
        <h4 class="d-flex align-center return-btn" style="width: 160px">
          <v-icon color="rgba(0, 0, 0, 0.87)">mdi-chevron-left</v-icon>Return to
          Team
        </h4>
      </router-link>

      <v-form ref="form" class="pt-10 pl-2 edit-form">
        <!-- error message -->
        <p class="mb-3 error--text" v-show="showErrorMessage">{{errorMessage}}</p>

        <!-- email field-->
        <div class="mb-5 settings-input">
          <p class="mb-1">Email Address</p>
          <v-text-field
            class="input mt-0"
            v-model="computedInfo.email"
            :rules="emailRules"
            type="email"
            color="primary"
            placeholder="Enter email address"
            :disabled="true"
            required
          >
          </v-text-field>
        </div>

        <!-- assign role -->
        <div class="mb-5 settings-input">
          <p class="mb-1">Assign Role</p>
          <v-select
            class="input mt-0"
            :items="roles"
            v-model="computedInfo.currentRole"
            :rules="roleRules"
            color="primary"
            placeholder="Select role"
            required
            outlined
          >
          </v-select>
        </div>

        <v-btn
          class="primary py-6 px-4"
          @click="updateTeamMember"
          :loading="loading"
          :disabled="loading"
          >Update Member</v-btn
        >
      </v-form>
    </div>

    <div class="px-4 text-center error--text" v-show="showMessage">
      {{message}}
    </div>

    <!-- Modal for dialog messages -->
    <Modal :dialog="dialog" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeModal"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img src="@/assets/img/success-img.svg"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/general/Modal.vue";
import { mapGetters } from 'vuex';
export default {
  name: "editTeamMember",
  components: { Modal },
  data: function () {
    return {
      roles: ["vendor.super-admin", "vendor.admin"],
      emailRules: [
        // verifies email address satisfies the requirement
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      roleRules: [(v) => !!v || "Role is required"],
      dialogMessage: "",
      dialog: false,
      loading: false,
      teamMember: {},
      message: "",
      showMessage: false,
      errorMessage: "",
      showErrorMessage: false
    };
  },
  created(){
    this.$store.dispatch("settings/getSingleTeamMember",{
      id: this.$route.params.id,
    }).then((response) => {
      this.teamMember = response.data.data
    }).catch((error) => {
      if(error.response){
        this.message= "Sorry, this data does not Exist"
        this.showMessage = true
      }
    })
  },
  computed: {
     ...mapGetters({
      pageDetails: "settings/pageDetails",
    }),
    computedInfo() {
      let member = this.teamMember

      return {
        email: member.email,
        currentRole: member.role,
        role: member.role,
      };
    },
  },
  methods: {
    // update team member
    updateTeamMember() {
      if (this.computedInfo.role !== this.computedInfo.currentRole) {
        this.loading = true;
        this.$store
          .dispatch("settings/updateTeamMember", {
            id: this.teamMember.id,
            role: this.computedInfo.currentRole
          })
          .then(() => {
            this.dialogMessage =
              "You have successfully updated this team member";
            this.dialog = true;
            this.loading = false;
            this.$store.dispatch("settings/getTeamMembers", {
            page: this.pageDetails.current_page,
            itemPerPage: this.pageDetails.per_page,
      });
          })
          .catch((error) => {
            if (error.response) {
             this.errorMessage = error.response.data.message
             this.showErrorMessage = true;
            }else{
               this.errorMessage = "No internet Connection!";
               this.showErrorMessage = true;
            }
            this.loading = false;
          });
      }
    },
    closeModal(){
      this.dialog= false;
       this.$router.push({ name: "teamDetails" });
    }
  },
};
</script>
<style lang="scss" scoped>
.return-btn {
  color: #000000;
  .v-icon {
    margin-right: 15px;
  }
}
.edit-form {
  width: 50%;
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
@media (max-width: 950px) {
  .edit-form {
    width: 100%;
  }
}
</style>