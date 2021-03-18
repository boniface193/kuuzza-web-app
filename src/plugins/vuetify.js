import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#029B97',
        secondary: '#646464',
        heading: '#2B2B2B',
        error: '#E62222',
        success: '#00B944',
        accent: '#FFA500',
        'secondary-background': '#1C3737',
        'light-background': '#D4ECEF',
      },
    },
    options: {
      customProperties: true
    }
  },
});
