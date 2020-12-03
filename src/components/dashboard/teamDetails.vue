<template>
  <div class="pt-7 my-2 pb-16">
    <div v-show="invitePage === false">
      <div class="d-flex justify-space-between flex-wrap align-center px-4">
        <v-btn
          @click="invitePage = true"
          class="primary py-6 px-4 mr-10 mb-5 mb-md-0"
          ><span>+</span> Invite new member</v-btn
        >
        <div class="d-flex align-center flex-wrap">
          <v-icon class="primary--text mr-2 mb-5 mb-sm-0">mdi-upload</v-icon>
          <v-icon class="primary--text mr-2 mb-5 mb-sm-0">mdi-sort</v-icon>
          <searchBar placeholder="Search representative" />
        </div>
      </div>

      <!-- table  -->
      <dataTable
        :action="true"
        :select="true"
        :headers="headers"
        :items="items"
      />
    </div>

    <!-- invite members -->
    <div class="invite-body px-4" v-show="invitePage === true">
      <!-- return button -->
      <h4 @click="invitePage = false" class="d-flex align-center return-btn">
        <v-icon color="rgba(0, 0, 0, 0.87)">mdi-chevron-left</v-icon>Return to
        Team
      </h4>

      <v-form ref="form" class="pt-10 pl-2 invite-form">
        <!-- email field-->
        <div class="mb-5 settings-input">
          <p class="mb-1">Email Address</p>
          <v-text-field
            class="input mt-0"
            v-model="email"
            :rules="emailRules"
            type="email"
            color="primary"
            placeholder="Enter email address"
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
            v-model="role"
            :rules="roleRules"
            color="primary"
            placeholder="Select role"
            required
            outlined
          >
          </v-select>
        </div>

        <v-btn class="primary py-6 px-4" @click="submitRepresentative"
          >Invite new member</v-btn
        >
      </v-form>
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
          <v-img src="@/assets/img/success-img.svg"></v-img>
        </div>

        <h4>{{ dialogMessage }}</h4>
      </div>
    </modal>
  </div>
</template>
<script>
import searchBar from "@/components/dashboard/searchBar.vue";
import modal from "@/components/dashboard/modal.vue";
import dataTable from "@/components/dashboard/dataTable.vue";
export default {
  name: "teamDetails",
  components: { searchBar, modal, dataTable },
  data: function () {
    return {
      email: "",
      role: "",
      invitePage: false,
      dialog: false,
      dialogMessage: "",
      roles: ["Super admin", "Admin"],
      emailRules: [
        // verifies email address satisfies the requirement
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      roleRules: [(v) => !!v || "Role is required"],
      headers: [
        {
          text: "Name",
          sortable: true,
          value: "name",
        },
        { text: "Role", value: "role" },
        { text: "Status", value: "status" },
      ],
      items: [
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          status: "Active",
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          status: "Not Active",
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          status: "Active",
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          status: "Active",
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          status: "Not Active",
        },
        {
          name: "Ayotunde Lanwo",
          role: "Super",
          status: "Active",
        },
        {
          name: "Ayotunde Lanwo",
          role: "Super",
          status: "Active",
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          status: "Active",
        },
        {
          name: "Ayotunde Lanwo",
          role: "Super",
          status: "Active",
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          status: "Active",
        },
        {
          name: "Abdulazeez Abdulazeez",
          role: "Sales Representative",
          status: "Active",
        },
        {
          name: "Ayotunde Lanwo",
          role: "Sales Representative",
          status: "Not Active",
        },
      ],
    };
  },
  methods: {
    submitRepresentative() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.dialog = true;
        this.dialogMessage = `An invite have been sent to ${this.email}`;
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
.return-btn {
  cursor: pointer;
  .v-icon {
    margin-right: 15px;
  }
}
.status-img {
  width: 140px;
  .v-image {
    width: 100%;
  }
}
.invite-form {
  width: 50%;
}

@media (max-width: 950px) {
  .invite-form {
    width: 100%;
  }
}
</style>