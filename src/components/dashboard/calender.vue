<template>
  <div class="text-center calender d-none d-md-block">
    <!-- displays calendar filter -->
    <date-range-picker
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
        {{ picker.startDate | moment("calendar") }} -
        {{ picker.endDate | moment("calendar") }}
        <v-icon>mdi-chevron-down</v-icon>
      </template>
    </date-range-picker>
  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";
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
      // To specify ranges you need to pass and array where each element is an array with exactly two Date objects (from, to) or their timestamp equivalent.
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
        "All Time": [
          new Date(today.getFullYear(), 0, 0), new Date()
        ],
      },
      dateRange: {
        startDate: new Date(today.getFullYear(), 0, 0),
        endDate: new Date(),
      },
    };
  },

  methods:{
    updateValues(){
      this.$emit("updateDate", this.dateRange)
    }
  }
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
