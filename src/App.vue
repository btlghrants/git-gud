<template>
  <v-app>
    <v-app-bar app height="64px">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>git-gud</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <!--  -->
    </v-navigation-drawer>

    <v-main>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-main>

    <v-footer app height="32px">v-footer</v-footer>
  </v-app>
</template>

<script>
import VApp from 'vuetify/lib/components/VApp';
import { VAppBar, VAppBarNavIcon } from 'vuetify/lib/components/VAppBar';
import { VToolbarTitle } from 'vuetify/lib/components/VToolbar';
import VNavigationDrawer from 'vuetify/lib/components/VNavigationDrawer';
import VMain from 'vuetify/lib/components/VMain';
import VFooter from 'vuetify/lib/components/VFooter';

export default {
  components: {
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VToolbarTitle,
    VNavigationDrawer,
    VMain,
    VFooter
  },

  data() {
    return {
      drawer: false
    };
  },

  mounted () {
    window.addEventListener('keydown', this.keydown)
  },
  destroyed () {
    window.removeEventListener('keydown', this.keydown)
  },
  methods: {
    keydown (event) {
      event.key === 'Escape' ? this.drawer = false : '';
    }
  }
}
</script>

<style lang="scss">
  // https://vuetifyjs.com/en/getting-started/frequently-asked-questions/#scrollbar-overflow
  html {
    overflow: hidden;
  }
</style>