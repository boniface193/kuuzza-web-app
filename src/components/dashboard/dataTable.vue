<template>
  <div>
    <!-- table -->
    <div class="table">
      <table class="custom-table">
        <!-- tables header -->
        <thead class="custom-thead">
          <tr>
            <!-- header for each column -->
            <th v-for="(header, index) in headers" :key="index" :style="{'min-width': header.width}">
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
            <th v-if="action === true">Action</th>
          </tr>
        </thead>
        <!-- tables body -->
        <tbody class="custom-tbody">
          <!-- table row -->
          <tr
            v-for="(item) in sortedItems"
            :key="item.id"
            :class="{ selectedRow: selected.includes(`${item.id}`) }"
          >
            <!-- columns -->
            <td v-for="(header, index2) in headers" :key="index2" :style="{'min-width': header.width}">
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
                <!-- shows if the content is a text -->
                <span
                  v-if="header.image !== true"
                  :class="{ productLink: header.href === true }"
                  >{{ item[`${header.value}`] }}</span
                ></span
              >
            </td>

            <!-- action column-->
            <td v-if="action === true">
              <span v-show="action === true">
                <!-- edit btn -->
                <span
                  ><v-icon
                    class="primary--text action-btn"
                    @click="editRow(item.id)"
                    >mdi-pencil</v-icon
                  ></span
                >
                <!--  -->
                <span
                  ><v-icon class="error--text action-btn"
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
  </div>
</template>
<script>
export default {
  name: "dataTable",
  data: function () {
    return {
      selected: [],
      selectAll: false,
      dialog: false,
      page: 1,
      currentSort: "",
      modifier: 1,
      paginationLength: 4,
    };
  },
  props: ["items", "headers", "action", "select", "actions"],
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
    selectRow() {
      this.selected = [];
      if (this.selectAll) {
        for (let i in this.items) {
          this.selected.push(this.items[i].id);
        }
      }
      this.emitSelectedRow();
    },
    emitSelectedRow() {
      //console.log(this.selected)
      this.$emit("selectedRow", this.selected);
    },
    // handles the request to delete a row
    deleteRow(itemId) {
      //console.log(itemId)
      this.actions.deleteId = itemId;
      //console.log(this.actions)
      this.$emit("requestedAction", this.actions);
    },
    // handles the request to edit a row
    editRow(itemId) {
      this.actions.editId = itemId;
      this.$emit("requestedAction", this.actions);
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
        }
      }
      .selectedRow {
        background: #f9f9f9;
      }
    }
  }
}
.pagination {
  max-width: 500px;
}
.productLink {
  color: #5064cc;
  text-decoration: underline;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 5px;
}
</style>