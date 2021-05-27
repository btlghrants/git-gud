<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>git-gud</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <!--  -->
    </v-navigation-drawer>

    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="text-center">

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>v-footer</v-footer>
  </v-app>
</template>

<script>
import VApp from 'vuetify/lib/components/VApp';
import { VAppBar, VAppBarNavIcon } from 'vuetify/lib/components/VAppBar';
import { VToolbarTitle } from 'vuetify/lib/components/VToolbar';
import VNavigationDrawer from 'vuetify/lib/components/VNavigationDrawer';
import VMain from 'vuetify/lib/components/VMain';
import { VContainer } from 'vuetify/lib/components/VGrid';
import VFooter from 'vuetify/lib/components/VFooter';

export default {
  components: {
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VToolbarTitle,
    VNavigationDrawer,
    VMain,
    VContainer,
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