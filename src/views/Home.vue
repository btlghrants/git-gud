<template>
  <div>
    <template v-if="loading">
      <div class="text-center">
        <v-progress-circular indeterminate color="primary"/>
      </div>
    </template>

    <template v-else>
      <v-row v-for="hand in hands" :key="hand.id">
        <v-col
          cols="12" sm="6" md="6" lg="4" xl="3"
          v-for="(rec, idx) in hand.recommendations"
          :key="`${idx}-${rec.name}`"
        >
          <recommendation-card :recommendation="rec"
          />
        </v-col>
      </v-row>
    </template>

  </div>
</template>

<script>
import VProgressCircular from 'vuetify/lib/components/VProgressCircular';
import RecommendationCard from '../components/RecommendationCard.vue';
import data from '@/DataService.js'
import { splitEvery } from 'ramda';

export default {
  name: 'Home',

  components: {
    VProgressCircular,
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