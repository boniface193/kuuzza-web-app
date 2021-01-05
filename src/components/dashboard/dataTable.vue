<template>
  <div>
    <!-- table -->
    <div class="table">
      <table class="custom-table">
        <!-- tables header -->
        <thead class="custom-thead">
          <tr>
            <!-- header for each column -->
            <th
              v-for="(header, index) in headers"
              :key="index"
              :style="{ 'min-width': header.width }"
            >
              <span class="with-checkbox">
                <v-checkbox
                  v-show="index == 0 && select === true"
                  v-model="selectAll"
                  @click="selectRow"
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
            <!-- action header -->
            <th v-if="action === true" style="min-width: 200px">Action</th>
          </tr>
        </thead>
        <!-- tables body -->
        <tbody class="custom-tbody">
          <!-- table row -->
          <tr
            v-for="item in sortedItems"
            :key="item.id"
            :class="{
              selectedRow: selected.includes(`${item.id}`),
              suspendedRow: item.status == 'suspended',
            }"
          >
            <!-- columns -->
            <td
              v-for="(header, index2) in headers"
              :key="index2"
              :style="{ 'min-width': header.width }"
            >
              <span class="with-checkbox">
                <v-checkbox
                  v-if="index2 == 0 && select === true"
                  :value="item.id"
                  v-model="selected"
                  @click="emitSelectedRow"
                ></v-checkbox>
                <!-- shows if the content is an image -->
                <img
                  src="@/assets/img/laptop.png"
                  v-if="header.image === true"
                  alt="Product Image"
                  style="width: 150px; height: 120px"
                />
                <!-- shows if the content is a text and not an image or link -->
                <span v-if="header.image !== true && header.href !== true"
                  >{{ item[`${header.value}`] }}
                </span>

                <!-- shows if the content is a text and link but not an image -->
                <span v-if="header.image !== true && header.href === true">
                  <router-link
                    :to="{
                      name: header.routeName,
                      params: { id: item.id },
                    }"
                    class="productLink"
                    >{{ item[`${header.value}`] }}</router-link
                  >
                </span></span
              >
            </td>

            <!-- action column-->
            <td v-if="action === true" style="min-width: 200px">
              <span v-show="action === true">
                <!-- edit btn -->
                <span
                  ><v-icon
                    class="primary--text action-btn"
                    :class="{
                      'action-icon-not-active': item.status == 'suspended',
                    }"
                    @click="editRow(item.id, item.status)"
                    >mdi-pencil</v-icon
                  ></span
                >
                <!-- suspend row -->
                <span
                  ><v-icon
                    class="error--text action-btn"
                    :class="{
                      'success--text': item.status == 'suspended',
                    }"
                    @click="offlineRow(item.id, item.status)"
                    >mdi-cancel</v-icon
                  ></span
                >
                <!-- delete btn -->
                <span
                  ><v-icon
                    class="error--text action-btn"
                    @click="deleteRow(item.id)"
                    >mdi-trash-can-outline</v-icon
                  ></span
                ></span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- pagination -->
    <div class="d-flex justify-space-between px-4 align-center flex-wrap">
      <div class="d-flex justify-space-between align-center flex-wrap">
        <p class="mb-2 mr-5">Page {{ page }} of {{ paginationLength }}</p>
        <div class="d-flex justify-space-between align-center mb-2">
          <span class="mr-2">Number per page</span>
          <div class="select-item">
            <selectBtn
              :items="[5, 10, 15, 30, 50]"
              :item="itemPerPage"
              @selectedItem="setItemPerPage"
            />
          </div>
        </div>
      </div>
      <div class="pagination mb-2">
        <v-pagination
          v-model="currentPage"
          :length="paginationLength"
          @input="onPageChange"
          circle
        ></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import selectBtn from "@/components/dashboard/selectBtn.vue";
export default {
  name: "dataTable",
  components: { selectBtn },
  data: function () {
    return {
      selected: [],
      selectAll: false,
      dialog: false,
      currentSort: "",
      modifier: 1,
      currentPage: this.page
    };
  },
  props: [
    "items",
    "headers",
    "action",
    "select",
    "actions",
    "paginationLength",
    "page",
    "itemPerPage",
  ],
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
    // set number of item per page
    setItemPerPage(params) {
      this.$emit("itemPerPage", params);
    },
    selectRow() {
      this.selected = [];
      if (this.selectAll) {
        for (let i in this.items) {
          this.selected.push(this.items[i].id);
        }
      }
      this.emitSelectedRow();
    },
    //
    emitSelectedRow() {
      this.$emit("selectedRow", this.selected);
    },
    // handles the request to delete a row
    deleteRow(itemId) {
      this.actions.deleteId = itemId;
      this.$emit("requestedAction", this.actions);
    },
    // handles the request to edit a row
    editRow(itemId, itemStatus) {
      if (itemStatus !== "suspended") {
        this.actions.editId = itemId;
        this.$emit("requestedAction", this.actions);
      }
    },
    // handles request to take a row offline
    offlineRow(itemId, itemStatus) {
      this.actions.offlineId = itemId;
      this.actions.itemStatus = itemStatus;
      this.$emit("requestedAction", this.actions);
    },
    // on page change 
    onPageChange() {
      this.$emit("onPageChange", this.currentPage);
    }
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
    width: 100%;
    .custom-thead,
    .custom-tbody {
      tr {
        background: #5064cc;
        display: flex;
        align-items: center;
        min-height: 45px;
        th {
          color: #ffffff;
          font-size: 15px;
          text-align: left;
          padding: 0px 5px 0px 10px;
          min-width: 250px;
          min-height: 45px;
          max-height: 45px;
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
        border-bottom: 0.5px solid #e2e2e2;
        &:hover {
          background: #f9f9f9;
        }
        td {
          color: #979797;
          font-weight: normal;
          text-align: left;
          padding: 0px 5px 0px 10px;
          min-height: 45px;
          min-width: 250px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          .action-btn {
            margin-right: 12px;
            cursor: pointer;
            &:hover {
              color: #979797 !important;
            }
          }
          .action-icon-not-active {
            color: #eeeeee !important;
            cursor: context-menu;
            &:hover {
              color: #eeeeee !important;
            }
          }
        }
      }
      .selectedRow {
        background: #f9f9f9;
      }
      .suspendedRow {
        background: rgb(249, 250, 255);
        &:hover {
          background: rgb(249, 250, 255);
        }
      }
    }
  }
}
.pagination {
  max-width: 300px;
}
.select-item {
  width: 75px;
  height: 35px;
  position: relative;
}
.productLink {
  color: #5064cc;
  text-decoration: underline;
  cursor: pointer;
}
@media (max-width: 650px) {
  .pagination {
    max-width: 100%;
  }
}
</style>