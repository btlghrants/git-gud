<template>
  <div>
    <template v-if="loading">
      <div class="text-center">
        <v-progress-circular indeterminate color="primary"/>
      </div>
    </template>

    <template v-else>
      <v-virtual-scroll
        tabindex="0" ref="scroller" @hook:mounted="scrollerMounted"
        height="calc(100vh - 64px - 32px)"
        itemHeight="552px"
        :items="hands"
        bench="1"
      >
        <template #default="{ item }">
          <v-container>
            <v-row>
              <v-col
                cols="12" sm="6" md="6" lg="4" xl="3"
                v-for="(rec, idx) in item.recommendations"
                :key="`${idx}-${rec.name}`"
              >
                <recommendation-card :recommendation="rec"
                />
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-virtual-scroll>
    </template>

  </div>
</template>

<script>
import VProgressCircular from 'vuetify/lib/components/VProgressCircular';
import VVirtualScroll from 'vuetify/lib/components/VVirtualScroll';
import { VContainer, VRow, VCol } from 'vuetify/lib/components/VGrid';
import RecommendationCard from '../components/RecommendationCard.vue';
import data from '@/DataService.js'
import { splitEvery } from 'ramda';

export default {
  name: 'Home',

  components: {
    VProgressCircular,
    VVirtualScroll,
    VContainer,
    VRow,
    VCol,
    RecommendationCard
  },

  data() {
    return {
      loading: true,
      error: false,
      rawResponse: null,
      recommendations: []
    };
  },

  computed: {
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
        splitEvery(this.handSize, this.recommendations).map((hand, idx) => (
          { id: `${idx}-${hand[0].name}`, recommendations: hand }
        ))
      );
    },
  },

  methods: {
    // https://stackoverflow.com/questions/49084991/autofocus-to-a-div-so-we-can-use-arrow-keys-to-scroll-without-having-to-click-fi
    // https://stackoverflow.com/questions/59956948/vuejs-mounted-hook-in-v-on-directive
    // https://michaelnthiessen.com/set-focus-on-input-vue/
    scrollerMounted() {
      this.$refs.scroller.$el.focus();
    }
  },

  async created() {
    await data.load()
      .then(() => {
        this.recommendations = data.recommendations;
        this.error = false;
        this.loading = false;
      })
      .catch( error => {
        console.log(error);
        this.error = true;
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
  .v-virtual-scroll {
    overflow-x: hidden;
  }
  .v-virtual-scroll:focus {
    outline: 0 solid transparent;
  }
</style>