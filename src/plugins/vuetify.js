import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconFont: 'mdiSvg'
  },
  theme: {
    dark: false,
    // themes: {
    //   light: {
    //     primary: colors.blueGrey.base,
    //     secondary: colors.brown.base,
    //     accent: '#82B1FF',
    //     error: '#FF5252',
    //     info: '#2196F3',
    //     success: '#4CAF50',
    //     warning: '#FFC107',
    //   }
    // }
  }
});
