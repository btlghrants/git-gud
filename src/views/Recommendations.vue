<template>
  <div>
    <v-virtual-scroll
      tabindex="0" ref="scroller" @hook:mounted="focusScroller"
      height="var(--var-main-height)"
      itemHeight="552px"
      :items="hands"
      bench="1"
    >
      <template #default="{ item }">
        <v-container>
          <v-row>
            <v-col
              cols="12" sm="6" md="6" lg="4" xl="3"
              v-for="(res, idx) in item.recommendations"
              :key="`${idx}-${res.name}`"
            >
              <resource-card :resource="res"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-virtual-scroll>

    <v-btn fab fixed right id="filter-fab"
      @click="openFilterDialog()"
      color="primary"
    >
      <v-icon>
        {{ filterText === "" ? filterOffIcon : filterOnIcon }}
      </v-icon>
    </v-btn>

    <!-- https://github.com/vuetifyjs/vuetify/issues/6016 -->
    <v-dialog
      width="500px"
      :value="filterDialog"
      @input="closeFilterDialog()"
    >
      <v-card>
        <v-form @submit.prevent="submitFilter">
          <v-card-title>
            Filter Recommendations
          </v-card-title>
          <v-card-text>
            <v-text-field
              class="pt-0"
              autofocus
              label="topic / name / description / modality"
              v-model="filterTextNext"
              hide-details
            />
          </v-card-text>
          <v-card-actions class="flex-row-reverse pt-0 px-4 pb-4">
            <v-btn color="primary" @click="submitFilter">submit</v-btn>
            <v-btn color="secondary" @click="cancelFilter" class="mr-2">cancel</v-btn>
            <v-spacer/>
            <v-btn @click="clearFilter">clear</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VVirtualScroll from 'vuetify/lib/components/VVirtualScroll';
import { VContainer, VRow, VCol } from 'vuetify/lib/components/VGrid';
import VBtn from 'vuetify/lib/components/VBtn';
import VDialog from 'vuetify/lib/components/VDialog';
import { VCard, VCardTitle,VCardText, VCardActions } from 'vuetify/lib/components/VCard';
import VForm from 'vuetify/lib/components/VForm'
import VTextField from 'vuetify/lib/components/VTextField'
import ResourceCard from '../components/ResourceCard.vue';
import { curry, identity, pipe, splitEvery } from 'ramda';
import { mdiFilter, mdiFilterOutline } from '@mdi/js'; 

export default {
  name: 'Home',

  components: {
    VVirtualScroll,
    VContainer,
    VRow,
    VCol,
    VBtn,
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VForm,
    VTextField,
    ResourceCard
  },

  data() {
    return {
      filterOnIcon: mdiFilter,
      filterOffIcon: mdiFilterOutline,
      filterDialog: false,
      filterText: "",
      filterTextNext: ""
    };
  },

  computed: {
    recommendations() {
      return this.$store.state.recommendations;
    },

    role() {
      return this.$route.query.role || "";
    },

    level() {
      return this.$route.query.level || "";
    },

    filtered() {
      const hasRole = curry((role, arr) => arr.filter(x => x.role === role));
      const hasLevel = curry((lvl, arr) => arr.filter(x => x.level === lvl));
      const hasText = curry((text, arr) => {
        const ft = this.filterText;
        return arr.filter(x =>
          x.topic.includes(ft) ||
          x.name.includes(ft) ||
          x.modality.includes(ft) ||
          x.description.includes(ft));
      });

      return pipe(
        this.role ? hasRole(this.role) : identity,
        this.level ? hasLevel(this.level) : identity,
        this.filterText ? hasText(this.filterText) : identity
      )(
        this.recommendations
      );
    },

    handSize() {
      const bp = this.$vuetify.breakpoint.name;
      return (
        bp === 'xs' ? 1 :
        bp === 'sm' ? 2 :
        bp === 'md' ? 2 :
        bp === 'lg' ? 3 :
                      4
      );
    },

    hands() {
      return (
        splitEvery(this.handSize, this.filtered).map((hand, idx) => (
          { id: `${idx}-${hand[0].name}`, recommendations: hand }
        ))
      );
    },
  },

  methods: {
    // https://stackoverflow.com/questions/49084991/autofocus-to-a-div-so-we-can-use-arrow-keys-to-scroll-without-having-to-click-fi
    // https://stackoverflow.com/questions/59956948/vuejs-mounted-hook-in-v-on-directive
    // https://michaelnthiessen.com/set-focus-on-input-vue/
    focusScroller() {
      this.$refs.scroller.$el.focus();
    },

    openFilterDialog() {
      this.filterTextNext = this.filterText;
      this.filterDialog = true;
    },

    closeFilterDialog() {
      this.filterDialog = false;
      this.$nextTick(() => this.focusScroller() );
    },

    clearFilter() {
      this.filterText = this.filterTextNext = "";
      this.closeFilterDialog();
    },

    cancelFilter() {
      this.filterTextNext = this.filterText;
      this.closeFilterDialog();
    },

    submitFilter() {
      this.filterText = this.filterTextNext.trim();
      this.filterDialog = false;
      this.closeFilterDialog();
    }
  },
}
</script>

<style lang="scss" scoped>
  .dead-center {
    text-align: center;
    height: var(--var-main-height);
    line-height: var(--var-main-height);
  }
  .v-virtual-scroll {
    overflow-x: hidden;
  }
  .v-virtual-scroll:focus {
    outline: 0 solid transparent;
  }
  #filter-fab {
    bottom: calc(var(--var-footer-height) + 1rem);
    right: var(--var-footer-height);
  }
</style>