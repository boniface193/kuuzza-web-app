<template>
  <div>
    <div>
      <div class="d-flex justify-space-between flex-wrap align-center px-4">
        <router-link :to="{ name: 'teamInvite' }">
          <v-btn class="primary py-6 px-4 mr-10 mb-5 mb-md-0"
            ><span>+</span> Invite new member</v-btn
          ></router-link
        >

        <div class="d-flex align-center flex-wrap">
          <v-icon class="primary--text mr-2 mb-5 mb-sm-0">mdi-upload</v-icon>
          <v-icon class="primary--text mr-2 mb-5 mb-sm-0">mdi-sort</v-icon>
          <searchBar
            placeholder="Search representative"
            @search="getSearchValue"
          />
        </div>
      </div>

      <!-- table  -->
      <div v-show="teamMembers.length > 0"> 
      <dataTable
        :action="true"
        :actions="actions"
        :select="false"
        :headers="tableHeaders"
        :items="teamMembers"
        @requestedAction="setRequestedAction"
      />
      </div>
      <!-- no data -->
      <div class="text-center pt-10 pb-5" v-show="teamMembers.length == 0">
        <p class="mb-0 secondary--text" style="font-size: 20px">No team member has been added yet!</p>
      </div>
    </div>

    <!-- modal for dialog messages -->
    <modal :dialog="dialog1" width="400">
      <div class="white pa-3 pb-10 text-center dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog1 = false"
            >mdi-close</v-icon
          >
        </div>

        <div class="mb-7 mt-5 mx-auto status-img">
          <v-img src="@/assets/img/success-img.svg"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>

    <!-- delete modal -->
    <modal :dialog="dialog2" width="470">
      <div class="white pa-3 pb-10 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeDialog2"
            >mdi-close</v-icon
          >
        </div>

        <p>Are you sure you want to delete this team member?</p>

        <div class="d-flex align-center">
          <div>
            <v-img
              class=""
              style="
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
              "
              src="@/assets/img/user-profile.svg"
            >
            </v-img>
          </div>
          <p class="grey--text title mb-0">{{ salesRepresentative }}</p>
        </div>
        <p class="mt-5">All associated data will also be deleted!</p>
        <p class="error--text">Are you sure? There is no undo.</p>

        <!-- btns -->
        <div class="d-flex justify-space-between flex-wrap">
          <v-btn
            class="error py-5 mb-3 mb-sm-0"
            @click="deleteMember"
            :loading="deleteLoader"
            :disabled="deleteLoader"
            >Yes, delete this member</v-btn
          >
          <v-btn
            color="#F6F7FD"
            class="primary--text py-5"
            @click="closeDialog2"
            :disabled="deleteLoader"
            >No, keep this member</v-btn
          >
        </div>
        <div></div>
      </div>
    </modal>

    <!-- take member offline modal -->
    <modal :dialog="dialog3" width="470">
      <div class="white pa-3 pb-10 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeDialog3"
            >mdi-close</v-icon
          >
        </div>
        <div class="d-flex align-center">
          <div>
            <v-img
              class=""
              style="
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
              "
              src="@/assets/img/user-profile.svg"
            >
            </v-img>
          </div>
          <p class="grey--text title mb-0">{{ salesRepresentative }}</p>
        </div>
        <p class="error--text mt-5">
          Are you sure you want suspend this team member?
        </p>

        <!-- btns -->
        <div class="d-flex justify-space-between flex-wrap">
          <v-btn
            class="error py-5 mb-3 mb-sm-0"
            @click="suspendTeamMember"
            :loading="offlineLoader"
            :disabled="offlineLoader"
            >Yes, suspend member</v-btn
          >
          <v-btn
            color="#F6F7FD"
            class="primary--text py-5"
            @click="closeDialog3"
            :disabled="offlineLoader"
            >No, keep this member</v-btn
          >
        </div>
        <div></div>
      </div>
    </modal>
  </div>
</template>
<script>
import searchBar from "@/components/dashboard/searchBar.vue";
import modal from "@/components/dashboard/modal.vue";
import dataTable from "@/components/dashboard/dataTable.vue";
import { mapGetters } from "vuex";
export default {
  name: "teamDetails",
  components: { searchBar, modal, dataTable },
  data: function () {
    return {
      offlineLoader: false,
      deleteLoader: false,
      salesRepresentative: "",
      itemId: null,
      searchValue: "",
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialogMessage: "",
      actions: {
        deleteId: null,
        editId: null,
        offlineId: null,
      },
      tableHeaders: [
        {
          text: "Name",
          sortable: true,
          value: "name",
           width: "40%",
        },
        { text: "Role", value: "role",  width: "20%", },
        { text: "Status", value: "status", width: "20%"},
      ],
    };
  },
  computed: {
    ...mapGetters({
      teamMembers: "settings/teamMembers",
    }),
  },
  methods: {
    getSearchValue(params) {
      this.searchValue = params;
    },
    setRequestedAction(params) {
      this.actions = params;
      if (this.actions.editId !== null) {
        //checks if edit action is triggered for a member
        const item = this.teamMembers.find(
          (x) => x.id == `${this.actions.editId}`
        );
        this.$router.push({
          name: "editTeamMember",
          params: {
            id: item.id,
          },
        });
      } else if (this.actions.deleteId !== null) {
        //checks if delete action is triggered for a member
        const item = this.teamMembers.find(
          (x) => x.id == `${this.actions.deleteId}`
        );
        this.dialog2 = true;
        this.salesRepresentative = item.name;
        this.itemId = item.id;
      } else if (this.actions.offlineId !== null) {
        //checks if offline action is triggered for a member
        const item = this.teamMembers.find(
          (x) => x.id == `${this.actions.offlineId}`
        );
        this.dialog3 = true;
        this.salesRepresentative = item.name;
        this.itemId = item.id;
      }
    },
    // close the dialog that shows up when you want to delete a row
    closeDialog2() {
      this.dialog2 = false;
      this.actions.deleteId = null;
      this.itemId = null;
    },
    // close the dialog that shows up when you want to take a memeber offline
    closeDialog3() {
      this.dialog3 = false;
      this.actions.editId = null;
      this.itemId = null;
    },
    // delete member
    deleteMember() {
      if (this.itemId !== null) {
        this.deleteLoader = true;
        this.$store
          .dispatch("settings/deleteMember", {
            id: this.itemId,
          })
          .then(() => {
            this.itemId = null;
            this.deleteLoader = false;
            this.closeDialog2();
            this.dialog1 = true;
            this.dialogMessage = "You have successfully deleted this member";
          })
          .catch((error) => {
            this.itemId = null;
            this.deleteLoader = false;
            this.closeDialog2();
            this.dialog1 = true;

            if (error.response) {
              this.dialogMessage = "Pls try again, was not successfull";
            } else {
              this.dialogMessage = "No internet Connection!";
            }
          });
      }
    },
    // suspend team member
    suspendTeamMember() {
      if (this.itemId !== null) {
        this.offlineLoader = true;
        this.$store
          .dispatch("settings/suspendTeamMember", {
            id: this.itemId,
          })
          .then(() => {
            this.itemId = null;
            this.offlineLoader = false;
            this.closeDialog3();
            this.dialog1 = true;
            this.dialogMessage =
              "You have successfully suspended this member";
          })
          .catch((error) => {
            this.itemId = null;
            this.offlineLoader = false;
            this.closeDialog3();
            this.dialog1 = true;
            if (error.response) {
              this.dialogMessage = "Pls try again, was not successfull";
            } else {
              this.dialogMessage = "No internet Connection!";
            }
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.v-btn {
  span {
    font-size: 25px;
    margin-right: 3px;
  }
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
</style>