import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#5064CC',
            secondary: '#646464',
            heading: '#2B2B2B',
            error: '#E62222',
            success: '#00B944',
            accent: '#52F1EC'
          },
        },
    },
});
