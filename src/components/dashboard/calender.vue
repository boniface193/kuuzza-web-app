<template>
  <div class="text-center calender d-none d-md-block">
    <!-- displays calendar filter -->
    <date-range-picker
      ref="picker"
      v-model="dateRange"
      :opens="opens"
      :minDate="minDate"
      :maxDate="maxDate"
      :autoApply="autoApply"
      :ranges="ranges"
      :linkedCalendars="linkedCalendars"
      :showWeekNumbers="showWeekNumbers"
      :singleDatePicker="singleDatePicker"
      :alwaysShowCalender="alwaysShowCalender"
      @update="updateValues"
    >
      <template v-slot:input="picker" style="min-width: 350px">
        {{ dateToStart ? dateToString : picker.endDate | moment("calendar") }}
        {{ dateToStart ? "" : "-" }}
        {{ dateToEnd ? "" : picker.startDate | moment("calendar") }}
        <v-icon>mdi-chevron-down</v-icon>
      </template>
    </date-range-picker>
  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";
//you need to import the CSS manually (in case you want to override it)
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";

// this is to initialize the date ranges
let today = new Date();

today.setHours(0, 0, 0, 0);
// last 7 days
let lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);
// 1 day ago
let yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
yesterday.setHours(0, 0, 0, 0);

export default {
  components: { DateRangePicker },
  props: {
    minDate: null,
    maxDate: null,
    showWeekNumbers: Boolean,
    linkedCalendars: Boolean,
    singleDatePicker: Boolean,
    showDropdowns: Boolean,
    timePicker: Boolean,
    timePicker24Hour: Boolean,
    autoApply: Boolean,
    alwaysShowCalender: Boolean,
  },
  data() {
    return {
      opens: "left",
      dateToStart: false,
      dateToEnd: false,
      dateToString: "",
      // To specify ranges you need to pass and array where each element is an array with exactly two Date objects (from, to) or their timestamp equivalent.
      ranges: {
        Today: [today, today],
        Yesterday: [yesterday, yesterday],
        "Last 7 days": [lastWeek, today],
        "Last Month": [
          new Date(today.getFullYear(), today.getMonth() - 1, 1),
          new Date(today.getFullYear(), today.getMonth(), 0),
        ],
        "This year": [
          new Date(today.getFullYear(), 0, 1),
          new Date(today.getFullYear(), 11, 31),
        ],
        "All Time": [new Date(today.getFullYear(), 0, 0), new Date()],
      },
      dateRange: {
        startDate: moment(new Date(today.getFullYear(), 0, 0)).format("l"),
        endDate: moment(new Date()).format("l"),
      },
    };
  },

  created() {
    let comparedDate = this.dateRange;
    if (
      comparedDate.startDate == moment(new Date(today.getFullYear(), 0, 0)).format('l') ||
      comparedDate.endDate == moment(new Date()).format('l')
    ) {
      this.dateToString = "All Time";
      this.dateToStart = true;
      this.dateToEnd = true;
    }
  },

  methods: {
    updateValues() {
      this.$emit("updateDate", this.dateRange);
      let dateText = this.ranges;
      let comparedDate = this.dateRange;

      // Today
      if (
        moment(dateText.Today[0]).format("l") ===
        moment(comparedDate.startDate).format("l")
      ) {
        this.dateToString = "Today";
        this.dateToStart = true;
        this.dateToEnd = true;
      }
      // Yesterday
      else if (
        moment(dateText.Yesterday[0]).format("l") ===
        moment(comparedDate.startDate).format("l")
      ) {
        this.dateToString = "Yesterday";
        this.dateToStart = true;
        this.dateToEnd = true;
      }

      // last week
      else if (
        moment(dateText["Last 7 days"][0]).format("l") ===
        moment(comparedDate.startDate).format("l")
      ) {
        this.dateToString = "Last 7 days";
        this.dateToStart = true;
        this.dateToEnd = true;
      }

      // last month
      else if (
        moment(dateText["Last Month"][0]).format("l") ===
        moment(comparedDate.startDate).format("l")
      ) {
        this.dateToString = "Last Month";
        this.dateToStart = true;
        this.dateToEnd = true;
      }

      // last year
      else if (
        moment(dateText["This year"][0]).format("l") ===
        moment(comparedDate.startDate).format("l")
      ) {
        this.dateToString = "This year";
        this.dateToStart = true;
        this.dateToEnd = true;
      }

      // All Time
      else if (
        moment(dateText["All Time"][0]).format("l") ===
        moment(comparedDate.startDate).format("l")
      ) {
        this.dateToString = "All Time";
        this.dateToStart = true;
        this.dateToEnd = true;
      } else {
        this.dateToStart = false;
        this.dateToEnd = false;
      }
    },
  },
};
</script>
<style lang="scss">
.reportrange-text[data-v-00277188] {
  border-radius: 8px !important;
  .fa {
    color: #5064cc !important;
  }
}
.ranges.col-12.col-md-auto {
  width: 20%;
}
</style>
