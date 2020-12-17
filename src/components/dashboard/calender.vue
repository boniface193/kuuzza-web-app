<template>
  <div class="text-center">
    <!-- displays calendar filter -->
    <date-range-picker :dateRange="dateRange" :opens="opens">
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
    opens: String,
    minDate: String,
    maxDate: String,
    showWeekNumbers: Boolean,
    linkedCalendars: Boolean,
    showDropdowns: Boolean,
    timePicker: Boolean,
    timePicker24Hour: Boolean,
    autoApply: Boolean,
    dateRange: Object,
  },
};
</script>
