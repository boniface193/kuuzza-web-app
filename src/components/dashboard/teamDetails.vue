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
          itemKey="id"
          :itemPerPage="getItemPerPage.itemPerPage || 15"
          :paginationLength="pageDetails.last_page"
          :page="pageDetails.current_page"
          @requestedAction="setRequestedAction"
          @itemPerPage="setItemPerPage"
          @onPageChange="setCurentPage"
        />
      </div>
      <!-- no data -->
      <div
        class="text-center pt-10 pb-5"
        v-show="teamMembers.length == 0 && !loader"
      >
        <p class="mb-0 secondary--text" style="font-size: 20px">
          No team member has been added yet!
        </p>
      </div>
      <!-- loader -->
      <div class="text-center pt-10 pb-5" v-show="loader">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
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
          <v-img :src="statusImage"></v-img>
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

    <!-- suspend member modal -->
    <modal :dialog="dialog3" width="440">
      <div class="white pa-3 pb-8 dialog">
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
            :loading="suspendLoader"
            :disabled="suspendLoader"
            >Yes, suspend member</v-btn
          >
          <v-btn
            color="#F6F7FD"
            class="primary--text py-5"
            @click="closeDialog3"
            :disabled="suspendLoader"
            >No, keep this member</v-btn
          >
        </div>
        <div></div>
      </div>
    </modal>
    <!-- unsuspend modal -->
    <modal :dialog="dialog4" width="440">
      <div class="white pa-3 pb-8 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="closeDialog4"
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
        <div class="text-center">
          <p class="error--text mt-5">
            Are you sure you want unsuspend this member?
          </p>
        </div>

        <!-- btns -->
        <div class="d-flex justify-center flex-wrap">
          <v-btn
            class="primary py-5 mb-3 mb-sm-0"
            @click="unSuspendTeamMember"
            :loading="unSuspendLoader"
            :disabled="unSuspendLoader"
            >Yes, unsuspend member</v-btn
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
import successImage from "@/assets/img/success-img.svg";
import failedImage from "@/assets/img/failed-img.svg";
import { mapGetters} from "vuex";
export default {
  name: "teamDetails",
  components: { searchBar, modal, dataTable },
  data: function () {
    return {
      statusImage: null,
      itemPerPage: 15,
      suspendLoader: false,
      unSuspendLoader: false,
      deleteLoader: false,
      salesRepresentative: "",
      itemId: null,
      searchValue: "",
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialogMessage: "",
      loader: false,
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
        { text: "Role", value: "role", width: "20%" },
        { text: "Status", value: "status", width: "20%" },
      ],
    };
  },
  created () {
    //  get the team members details
    if (this.$store.getters["settings/teamMembers"].length == 0) {
      this.loader = true;
      this.$store
        .dispatch("settings/getTeamMembers", {
          page: 1,
          itemPerPage: 15,
        })
        .then(() => (this.loader = false))
        .catch(() => (this.loader = false));
    }
  },
  computed: {
    ...mapGetters({
      teamMembers: "settings/teamMembers",
      pageDetails: "settings/pageDetails",
    }),
    getItemPerPage() {
      return {
        itemPerPage: parseInt(this.pageDetails.per_page, 10),
      };
    },
  },
  methods: {
    getSearchValue(params) {
      this.searchValue = params;
    },
    setRequestedAction(params) {
      this.actions = params;
      //checks if edit action is triggered for a member
      if (this.actions.editId !== null) {
        const item = this.teamMembers.find(
          (x) => x.id == `${this.actions.editId}`
        );
        this.$router.push({
          name: "editTeamMember",
          params: {
            id: item.id,
          },
        });
      } //checks if delete action is triggered for a member
      else if (this.actions.deleteId !== null) {
        const item = this.teamMembers.find(
          (x) => x.id == `${this.actions.deleteId}`
        );
        this.dialog2 = true;
        this.salesRepresentative = item.name;
        this.itemId = item.id;
      } //checks if offline action is triggered for a member
      else if (this.actions.offlineId !== null) {
        const item = this.teamMembers.find(
          (x) => x.id == `${this.actions.offlineId}`
        );
        if (this.actions.itemStatus == "suspended") {
          this.dialog4 = true;
        } else {
          this.dialog3 = true;
        }

        this.salesRepresentative = item.name;
        this.itemId = item.id;
      }
    },

    // set item per page
    setItemPerPage(params) {
      this.itemPerPage = params;
      let page = null
      if(this.itemPerPage > this.pageDetails.per_page){
        let range = Math.round((this.pageDetails.from - 1)/ this.pageDetails.per_page);
        if(range < 0.5) {
          page = range + 1
        }else {
          page = range;
          this.$store.commit("settings/setCurrentPage", page); 
        }
      }else {
        page = Math.round(((this.pageDetails.from - 1)/ this.itemPerPage) + 1);
        this.$store.commit("settings/setCurrentPage", page);
      }
      this.$store.dispatch("settings/getTeamMembers", {
        page: page,
        itemPerPage: this.itemPerPage,
      });
    },
    // set current page
    setCurentPage(params) {
      this.$store.commit("settings/setCurrentPage", params);
      this.$store.dispatch("settings/getTeamMembers", {
        page: params,
        itemPerPage: this.itemPerPage,
      });
    },
    // close the dialog that shows up when you want to delete a row
    closeDialog2() {
      this.dialog2 = false;
      this.actions.deleteId = null;
      this.itemId = null;
    },
    // close the dialog that shows up when you want to suspend a team member
    closeDialog3() {
      this.dialog3 = false;
      this.actions.editId = null;
      this.itemId = null;
    },
    // close the dialog that shows up when you want to suspend a team member
    closeDialog4() {
      this.dialog4 = false;
      this.actions.offlineId = null;
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
            this.statusImage = successImage;
            this.dialog1 = true;
            this.dialogMessage = "You have successfully deleted this member";
            this.setItemPerPage(this.itemPerPage);
          })
          .catch((error) => {
            this.itemId = null;
            this.deleteLoader = false;
            this.statusImage = failedImage;
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
        this.suspendLoader = true;
        this.$store
          .dispatch("settings/suspendTeamMember", {
            id: this.itemId,
          })
          .then(() => {
            this.itemId = null;
            this.suspendLoader = false;
            this.closeDialog3();
            this.statusImage = successImage;
            this.dialog1 = true;
            this.dialogMessage = "You have successfully suspended this member";
            this.setItemPerPage(this.itemPerPage);
          })
          .catch((error) => {
            this.itemId = null;
            this.suspendLoader = false;
            this.closeDialog3();
            this.statusImage = failedImage;
            this.dialog1 = true;
            if (error.response) {
              this.dialogMessage = "Pls try again, was not successfull";
            } else {
              this.dialogMessage = "No internet Connection!";
            }
          });
      }
    },
    // unsuspend team member
    unSuspendTeamMember() {
      if (this.itemId !== null) {
        this.unSuspendLoader = true;
        this.$store
          .dispatch("settings/unSuspendTeamMember", {
            id: this.itemId,
          })
          .then(() => {
            this.itemId = null;
            this.unSuspendLoader = false;
            this.closeDialog4();
            this.statusImage = successImage;
            this.dialog1 = true;
            this.dialogMessage =
              "You have successfully unsuspended this member";
              this.setItemPerPage(this.itemPerPage);
          })
          .catch((error) => {
            this.itemId = null;
            this.unSuspendLoader = false;
            this.statusImage = failedImage;
            this.closeDialog4();
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