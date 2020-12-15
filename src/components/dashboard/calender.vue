<template>
  <div class="text-center">
    <!-- displays calendar filter -->
    <!-- <v-md-date-range-picker
      class="mdrp__activator activator-wrapper text-field"
      start-date="2019-01-01"
      end-date="2019-05-05"
      :opens="opens"
    ></v-md-date-range-picker> -->
    <date-range-picker
      ref="picker"
      :opens="opens"
      :locale-data="{ firstDay: 1, format: 'MMMM Do YYYY, h:mm:ss a' }"
      :minDate="minDate"
      :maxDate="maxDate"
      :singleDatePicker="singleDatePicker"
      :timePicker="timePicker"
      :timePicker24Hour="timePicker24Hour"
      :showWeekNumbers="showWeekNumbers"
      :showDropdowns="showDropdowns"
      :autoApply="autoApply"
      v-model="dateRange"
      @update="updateValues"
      @toggle="checkOpen"
      :linkedCalendars="linkedCalendars"
      :dateFormat="dateFormat"
    >
      <template v-slot:input="picker">
        {{ picker.startDate | date }} - {{ picker.endDate | date }}
      </template>
    </date-range-picker>
  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";
// import moment from "vue-moment";
//you need to import the CSS manually (in case you want to override it)
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
export default {
  components: { DateRangePicker },
  props: {
    // minDate: String,
    // maxDate: String,
    // showWeekNumbers: Boolean,
    // linkedCalendars: Boolean,
    // showDropdowns: Boolean,
    // timePicker: Boolean,
    // timePicker24Hour: Boolean,
    // autoApply: Boolean,
    // localeData: {
    //   direction: String,
    //   format: String,
    //   separator: " - ",
    //   applyLabel: "Apply",
    //   cancelLabel: "Cancel",
    //   weekLabel: "W",
    //   customRangeLabel: "Custom Range",
    //   daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    //   monthNames: [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ],
    //   firstDay: 0,
    // },
  },
  data: () => ({
    // change the direction of the calendar
    opens: "center",

    minDate: "2019-05-02 04:00:00",
    maxDate: "2020-12-26 14:00:00",
    showWeekNumbers: true,
    linkedCalendars: false,
    singleDatePicker: false,
    showDropdowns: false,
    timePicker: false,
    timePicker24Hour: true,
    autoApply: false,
    localeData: {
      // direction: "ltr",
      // format: "lll",
      // separator: " - ",
      // applyLabel: "Apply",
      // cancelLabel: "Cancel",
      // weekLabel: "W",
      customRangeLabel: "Custom Range",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      firstDay: 0,
    },

    dateRange: {
      startDate: Date.now(),
      endDate: Date.now() + 1,
    },

    // filters: {
    //   date(val) {
    //     return val ? moment(val).format("YYYY-MM-DD") : "";
    //   },
    // },
  }),
};
</script>
