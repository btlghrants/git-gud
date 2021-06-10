<template>
  <div>
    <template v-if="loading">
      <div class="text-center">
        <v-progress-circular indeterminate color="primary"/>
      </div>
    </template>

    <template v-else>  
      <recommendation-hand
        v-for="hand in hands"
        :key="hand.id"
        :recommendations="hand.recommendations"
      />
    </template>

  </div>
</template>

<script>
import VProgressCircular from 'vuetify/lib/components/VProgressCircular';
import RecommendationHand from '../components/RecommendationHand.vue';
import data from '@/DataService.js'
import { splitEvery } from 'ramda';

export default {
  name: 'Home',

  components: {
    VProgressCircular,
    RecommendationHand
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