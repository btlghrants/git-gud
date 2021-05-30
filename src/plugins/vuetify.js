import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconFont: 'mdiSvg'
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.deepPurple.base,
        secondary: colors.purple.base,
      }
    }
  }
});
