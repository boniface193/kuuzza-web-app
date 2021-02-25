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
                  class="mr-2"
                ></v-checkbox>
                <span>{{
                  header.money === true
                    ? `${header.text} (&#8358;)`
                    : header.text
                }}</span></span
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
            <th v-if="action === true">Action</th>
          </tr>
        </thead>
        <!-- tables body -->
        <tbody class="custom-tbody">
          <!-- table row -->
          <tr
            v-for="item in sortedItems"
            :key="item[`${itemKey}`]"
            :class="{
              selectedRow: selected.includes(item[`${itemKey}`]),
              statusRow:
                item[`${statusKey}`] == 'suspended' ||
                item[`${statusKey}`] == false,
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
                  :value="item[`${itemKey}`]"
                  v-model="selected"
                  @click="emitSelectedRow()"
                  class="mr-2"
                ></v-checkbox>
                <!-- shows if the content is an image -->
                <img
                  :src="item[header.value]"
                  v-if="header.image === true"
                  alt="Product Image"
                  style="width: 60px; height: 50px"
                />
                <!-- shows if the content is a text and not an image or link -->
                <span v-if="header.image !== true && header.href !== true"
                  >{{
                    header.money === true
                      ? numberWithCommas(item[`${header.value}`])
                      : item[`${header.value}`]
                  }}
                </span>

                <!-- shows if the content is a text and link but not an image -->
                <span v-if="header.image !== true && header.href === true">
                  <router-link
                    :to="{
                      name: header.routeName,
                      params: { id: item[`${itemKey}`] },
                    }"
                    class="productLink"
                    >{{
                      header.money === true
                        ? numberWithCommas(item[`${header.value}`])
                        : item[`${header.value}`]
                    }}</router-link
                  >
                </span></span
              >
            </td>

            <!-- action column-->
            <td v-if="action === true">
              <span v-show="action === true" class="d-flex align-center">
                <!-- edit btn -->
                <span
                  @click="editRow(item[`${itemKey}`], item.status)"
                  class="mr-1"
                >
                  <editIcon toolTipText="Edit" />
                </span>

                <!-- remove btn -->
                <span
                  @click="offlineRow(item[`${itemKey}`], item[`${statusKey}`])"
                  class="mr-1"
                >
                  <removeIcon
                    :color="
                      item[`${statusKey}`] === 'suspended' ||
                      item[`${statusKey}`] === false
                        ? 'success'
                        : 'error'
                    "
                    :toolTipText="
                      item[`${statusKey}`] === 'suspended' ||
                      item[`${statusKey}`] === false
                        ? 'Take online'
                        : 'Take offline'
                    "
                  />
                </span>

                <!-- delete btn -->
                <span @click="deleteRow(item[`${itemKey}`])" class="mr-1">
                  <deleteIcon toolTipText="Delete" /> </span
              ></span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- table that shows on mobile at screen 650px -->
      <div class="secondary-table">
        <div class="px-2" v-show="select === true">
          <span class="d-flex align-center py-2">
            <v-checkbox
              v-model="selectAll"
              @click="selectRow"
              class="primary--text mr-2"
            ></v-checkbox>
            <span>Select all</span>
          </span>
        </div>
        <div
          v-for="item in sortedItems"
          :key="item[`${itemKey}`]"
          :class="{
            selectedRow: selected.includes(item[`${itemKey}`]),
            statusRow:
              item[`${statusKey}`] == 'suspended' ||
              item[`${statusKey}`] == false,
          }"
        >
          <div>
            <div class="d-flex py-1 px-2 primary justify-end">
              <span class="custom-checkbox">
                <v-checkbox
                  v-if="select === true"
                  :value="item[`${itemKey}`]"
                  v-model="selected"
                  @click="emitSelectedRow()"
                  class="white"
                ></v-checkbox>
              </span>
            </div>
            <div
              class="d-flex align-center justify-space-between row-height px-2"
              v-for="(header, index2) in headers"
              :key="index2"
            >
              <div
                style="font-weight: 600; word-break: break-all"
                class="mr-2 name"
              >
                <!-- check if it is money and the currency symbol -->
                <span>{{
                  header.money === true
                    ? `${header.text} (&#8358;)`
                    : header.text
                }}</span>
              </div>
              <div>
                <span style="word-break: break-all">
                  <!-- shows if the content is an image -->
                  <img
                    :src="item[header.value]"
                    v-if="header.image === true"
                    alt="Product Image"
                    style="width: 60px; height: 50px"
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
                        params: { id: item[`${itemKey}`] },
                      }"
                      class="productLink"
                      >{{
                        header.money === true
                          ? numberWithCommas(item[`${header.value}`])
                          : item[`${header.value}`]
                      }}</router-link
                    >
                  </span></span
                >
              </div>
            </div>
            <!-- action row-->
            <div
              class="d-flex align-center justify-space-between row-height px-2"
              v-if="action === true"
            >
              <!-- action header -->
              <span style="font-weight: 600">Action</span>
              <!-- action btns -->
              <span class="d-flex align-center">
                <!-- edit btn -->
                <span
                  @click="editRow(item[`${itemKey}`], item.status)"
                  class="mr-1"
                >
                  <editIcon toolTipText="Edit" />
                </span>

                <!-- remove btn -->
                <span
                  @click="offlineRow(item[`${itemKey}`], item[`${statusKey}`])"
                  class="mr-1"
                >
                  <removeIcon
                    :color="
                      item[`${statusKey}`] === 'suspended' ||
                      item[`${statusKey}`] === false
                        ? 'success'
                        : 'error'
                    "
                    :toolTipText="
                      item[`${statusKey}`] === 'suspended' ||
                      item[`${statusKey}`] === false
                        ? 'Take online'
                        : 'Take offline'
                    "
                  />
                </span>

                <!-- delete btn -->
                <span @click="deleteRow(item[`${itemKey}`])" class="mr-1">
                  <deleteIcon toolTipText="Delete" /> </span
              ></span>
            </div>
          </div>
        </div>
      </div>
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
          v-model="getCurrentPage.currentPage"
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
import editIcon from "@/components/icons/editIcon.vue";
import deleteIcon from "@/components/icons/deleteIcon.vue";
import removeIcon from "@/components/icons/removeIcon.vue";
export default {
  name: "dataTable",
  components: { selectBtn, editIcon, deleteIcon, removeIcon },
  data: function () {
    return {
      selected: [],
      selectAll: false,
      dialog: false,
      currentSort: "",
      modifier: 1,
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
    "itemKey",
    "statusKey",
  ],
  computed: {
    // return sorted data
    sortedItems: function () {
      return this.sort(this.items);
    },
    // get the current table page
    getCurrentPage() {
      return {
        currentPage: this.page,
      };
    },
    // get selected row
    getSelectedRow() {
      return {
        selectedItem: this.selected,
      };
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
          this.selected.push(this.items[i][`${this.itemKey}`]);
        }
      }
      this.emitSelectedRow();
    },
    // clear the items
    clearRow() {
      this.selected = [];
    },
    emitSelectedRow() {
      this.$emit("selectedRow", this.selected);
    },
    // handles the request to delete a row
    deleteRow(itemId) {
      this.actions.deleteId = itemId;
      this.$emit("requestedAction", this.actions);
    },
    // handles the request to edit a row
    editRow(itemId) {
      this.actions.editId = itemId;
      this.$emit("requestedAction", this.actions);
    },
    // handles request to take a row offline
    offlineRow(itemId, itemStatus) {
      this.actions.offlineId = itemId;
      this.actions.itemStatus = itemStatus;
      this.$emit("requestedAction", this.actions);
    },
    // on page change
    onPageChange() {
      this.$emit("onPageChange", this.getCurrentPage.currentPage);
    },
    // separate money with comma
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<style lang="scss">
.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}

.v-application {
  .v-input__slot {
    margin-bottom: 0px !important;
  }
  .v-messages {
    min-height: 0px !important;
  }
}
.v-application--is-ltr .v-input--selection-controls__input {
  margin-right: 0px !important;
}
</style>
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
          padding: 10px 5px 10px 10px;
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
          align-items: flex-end;
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
          padding: 10px 5px 10px 10px;
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
        }
      }
      .statusRow {
        background-color: rgb(239, 245, 255);
      }
      .selectedRow {
        background: #f9f9f9;
      }
    }
  }
  .secondary-table {
    display: none;
    width: 100%;
    background: #fff;
    .row-height {
      min-height: 45px;
      .name {
        min-width: 120px;
      }
    }
    .statusRow {
      background-color: rgb(239, 245, 255);
    }
    .selectedRow {
      background: #f9f9f9;
    }
  }
}
.pagination {
  max-width: 300px;
}
.select-item {
  width: 75px;
  position: relative;
  select {
    width: 75px;
    height: 30px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: 1px solid #7070704d;
    border-radius: 5px;
    padding: 0px 12px;
    background: #ffffff;
    &:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }
    &:focus {
      border: 2px solid #5064cc;
    }
    option {
      color: #5064cc;
      &:hover {
        background-color: #5064cc26 !important;
      }
    }
  }
  &::before {
    content: "\f107";
    font-family: FontAwesome;
    font-size: 22px;
    display: block;
    color: #5064cc; /*change in this line color*/
    position: absolute;
    right: 12px;
    top: calc(16% - 6px);
    pointer-events: none;
  }
}
.productLink {
  color: #5064cc;
  text-decoration: underline;
  cursor: pointer;
}
@media (max-width: 650px) {
  .table {
    .custom-table {
      display: none;
    }
    .secondary-table {
      display: block;
    }
  }
  .pagination {
    max-width: 100%;
  }
}
</style>