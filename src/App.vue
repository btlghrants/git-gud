<template>
  <v-app>
    <v-app-bar app dense class="app-header">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>git-gud</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 pb-4">
            git-gud
          </v-list-item-title>
          <v-list-item-subtitle>
            I'm looking for...
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item link :to="nav.route"
          v-for="nav in navs"
          :key="nav.text"
        >
          <v-list-item-icon>
            <v-icon>{{ nav.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ nav.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


    </v-navigation-drawer>

    <v-main>
      <template v-if="loading">
        <div class="dead-center">
          <v-progress-circular indeterminate color="primary"/>
        </div>
      </template>

      <template v-else>
        <router-view></router-view>
      </template>
    </v-main>

    <v-footer app class="app-footer">v-footer</v-footer>
  </v-app>
</template>

<script>
import VApp from 'vuetify/lib/components/VApp';
import { VAppBar, VAppBarNavIcon } from 'vuetify/lib/components/VAppBar';
import { VToolbarTitle } from 'vuetify/lib/components/VToolbar';
import VNavigationDrawer from 'vuetify/lib/components/VNavigationDrawer';
import {
  VList,
  VListItem,
  VListItemIcon,
  VListItemContent,
  VListItemTitle,
  VListItemSubtitle
} from 'vuetify/lib/components/VList'
import VMain from 'vuetify/lib/components/VMain';
import VProgressCircular from 'vuetify/lib/components/VProgressCircular';
import VFooter from 'vuetify/lib/components/VFooter';
import { mdiBookshelf, mdiStarCircle, mdiClipboardList } from '@mdi/js'; 
import data from '@/DataService.js'

export default {
  components: {
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VToolbarTitle,
    VNavigationDrawer,
    VList,
    VListItem,
    VListItemIcon,
    VListItemContent,
    VListItemTitle,
    VListItemSubtitle,
    VMain,
    VProgressCircular,
    VFooter
  },

  data() {
    return {
      // https://router.vuejs.org/api/#to
      navs: [
        { icon: mdiBookshelf, text: "Resources", route: { name: "Resources" }},
        { icon: mdiStarCircle, text: "Recommendations", route: { name: "Recommendations" }},
        { icon: mdiClipboardList, text: "Instructions", route: { name: "Instructions" }}
      ],
      drawer: false,
      loading: true,
      error: false,
      rawResponse: null,
    };
  },

  methods: {
    keydown (event) {
      event.key === 'Escape' ? this.drawer = false : '';
    }
  },

  async created() {
    await data.load()
      .then(() => {
        this.$store.commit('dataLoad', data);
        this.error = false;
        this.loading = false;
      })
      .catch( error => {
        console.log(error);
        this.error = true;
        this.loading = false;
      });
  },

  mounted () {
    window.addEventListener('keydown', this.keydown)
  },

  destroyed () {
    window.removeEventListener('keydown', this.keydown)
  }
}
</script>

<style lang="scss">
  // https://vuetifyjs.com/en/getting-started/frequently-asked-questions/#scrollbar-overflow
  html {
    overflow: hidden;
  }

  // https://developer.mozilla.org/en-US/docs/Web/CSS/calc()#nested_calc_with_css_variables
  // https://stackoverflow.com/questions/53240081/css-variables-use-in-vue
  * {
    --var-header-height: 48px;
    --var-footer-height: 32px;
    --var-main-height: calc(100vh - var(--var-header-height) - var(--var-footer-height));
  }
  
  .app-header {
    height: var(--var-header-height) !important;
  }

  .app-footer {
    height: var(--var-footer-height);
  }

  .dead-center {
    text-align: center;
    height: var(--var-main-height);
    line-height: var(--var-main-height);
  }
</style>