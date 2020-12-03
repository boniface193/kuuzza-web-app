<template>
  <div>
    <!-- table -->
    <div class="table">
      <table class="custom-table">
        <!-- tables header -->
        <thead class="custom-thead">
          <tr>
            <th v-for="(header, index) in headers" :key="index">
              <span class="with-checkbox">
                <v-checkbox
                  v-show="index == 0 && select === true"
                  color="white"
                ></v-checkbox>
                <span>{{ header.text }}</span></span
              >
              <span class="sort-icons">
                <v-icon
                  color="#52F1EC"
                  v-show="header.sortable != false"
                  @click="sortAscending(header.value)"
                  >mdi-menu-up
                </v-icon>
                <v-icon
                  color="#52F1EC"
                  v-show="header.sortable != false"
                  @click="sortDecending(header.value)"
                  >mdi-menu-down
                </v-icon>
              </span>
            </th>
            <th v-show="action === true">Action</th>
          </tr>
        </thead>
        <!-- tables body -->
        <tbody class="custom-tbody">
          <tr v-for="(item, index1) in sortedItems" :key="index1">
            <td v-for="(header, index2) in headers" :key="index2">
              <span class="with-checkbox">
                <v-checkbox
                  v-show="index2 == 0 && select === true"
                ></v-checkbox>
                <span>{{ item[`${header.value}`] }}</span></span
              >
            </td>
            <td>
              <span>
                <span
                  ><v-icon class="primary--text action-btn"
                    >mdi-pencil</v-icon
                  ></span
                >
                <span
                  ><v-icon class="error--text action-btn"
                    >mdi-cancel</v-icon
                  ></span
                >
                <span
                  ><v-icon class="error--text action-btn"
                    @click="dialog = true">mdi-trash-can-outline</v-icon
                  ></span
                ></span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- pagination -->
    <div class="d-flex justify-space-between px-4 align-center">
      <p>Page {{ page }} of {{ paginationLength }}</p>
      <div class="pagination">
        <v-pagination
          v-model="page"
          :length="paginationLength"
          circle
        ></v-pagination>
      </div>
    </div>

    <!-- modal -->
    <modal :dialog="dialog" width="470">
      <div class="white pa-3 pb-10 dialog">
        <div class="d-flex justify-end">
          <v-icon class="error--text close-btn" @click="dialog = false"
            >mdi-close</v-icon
          >
        </div>

        <p>Are you sure you want to delete this team member?</p>

        <div class="d-flex align-center">
          <div>
          <v-img
          class=""
            style="width: 50px; height: 50px; border-radius: 50%; margin-right:10px"
            src="@/assets/img/user-profile.svg"
          >
          </v-img>
          </div>
          <p class="grey--text title mb-0">Abdulazeez Abdulazeez</p>
        </div>
        <p class="mt-5">All associated data will also be deleted!</p>
        <p class="error--text">Are you sure? There is no undo.</p>

        <!-- btns -->
        <div class="d-flex justify-space-between">
          <v-btn  class="error py-5">Yes, delete this member</v-btn>
          <v-btn color="#F6F7FD" class="primary--text py-5">No, keep this member</v-btn>
        </div>
        <div></div>
      </div>
    </modal>
  </div>
</template>
<script>
import modal from "@/components/dashboard/modal.vue";
export default {
  name: "dataTable",
  components: { modal },
  data: function () {
    return {
      dialog: false,
      page: 1,
      currentSort: "",
      modifier: 1,
      paginationLength: 4,
    };
  },
  props: ["items", "headers", "action", "select"],
  computed: {
    // return sorted data
    sortedItems: function () {
      return this.sort(this.items);
    },
  },
  methods: {
    // sort data
    sort(data) {
      return data.sort((a, b) => {
        if (a[this.currentSort] < b[this.currentSort])
          return -1 * this.modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * this.modifier;
        return 0;
      });
    },
    // sort data in ascending order
    sortAscending(col) {
      this.modifier = 1;
      this.currentSort = col;
    },
    // sort data in decending order
    sortDecending(col) {
      this.modifier = -1;
      this.currentSort = col;
    },
  },
};
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
  margin: 20px 0px;
  overflow-x: auto;
  overflow-y: hidden;
  .custom-table {
    max-width: 100%;
    .custom-thead,
    .custom-tbody {
      tr {
        background: #5064cc;
        display: flex;
        align-items: center;
        max-height: 45px;
        th {
          min-width: 250px;
          color: #ffffff;
          font-size: 15px;
          text-align: left;
          padding: 0px 5px 0px 10px;
          height: 45px;
          display: flex;
          align-items: center;
          border-right: 0.5px solid white;
          justify-content: space-between;
          .sort-icons {
            padding: 10px 0px;
            .v-icon {
              cursor: pointer;
              display: block;
              font-size: 18px !important;
              line-height: 0.5;
            }
          }
        }
        .with-checkbox {
          display: flex;
          align-items: center;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
    .custom-tbody {
      tr {
        background: #ffffff;
        &:hover {
          background: #f9f9f9;
        }
        td {
          color: #979797;
          font-weight: normal;
          min-width: 250px;
          text-align: left;
          padding: 0px 5px 0px 10px;
          height: 45px;
          display: flex;
          align-items: center;
          border-right: 0.5px solid white;
          justify-content: space-between;
          .action-btn {
            margin-right: 12px;
            cursor: pointer;
            &:hover {
              color: #979797 !important;
            }
          }
        }
      }
    }
  }
}
.pagination {
  max-width: 500px;
}
</style>