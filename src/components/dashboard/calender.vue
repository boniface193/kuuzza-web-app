<template>
  <div class="text-center">
    <!-- displays calendar filter -->
    <date-range-picker
      :dateRange="dateRange"
      :opens="opens"
      :minDate="minDate"
      :maxDate="maxDate"
      :autoApply="autoApply"
      :ranges="ranges"
    >
    </date-range-picker>
  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";
// import moment from "vue-moment";
//you need to import the CSS manually (in case you want to override it)
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

// this is to initialize the date ranges
let today = new Date();
today.setHours(0, 0, 0, 0);
// last 7 days
let lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 13);
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
    showDropdowns: Boolean,
    timePicker: Boolean,
    timePicker24Hour: Boolean,
    autoApply: Boolean,
  },
  data() {
    return {
      opens: "left",

      ranges: {
        Today: [today, today],
        Yesterday: [yesterday, yesterday],
        "Last 7 days": [lastWeek, today],
        "Last 30 days": [
          new Date(today.getFullYear(), today.getMonth() - 1, 1),
          new Date(today.getFullYear(), today.getMonth(), 0),
        ],
        "This year": [
          new Date(today.getFullYear(), 0, 1),
          new Date(today.getFullYear(), 11, 31),
        ],
      },

      dateRange: {
        startDate: Date.now(),
        endDate: Date.now(),
      },
    };
  },
};
</script>
