<template>
  <div class="home">
    
    <template v-if="loading">
      <div class="text-center">
        <v-progress-circular indeterminate color="primary"/>
      </div>
    </template>

    <template v-else>
      <template v-for="recommendation in recommendations">
        <recommendation-card
          :key="recommendation.key"
          :recommendation="recommendation"
        />
      </template>
    </template>

  </div>
</template>

<script>
import VProgressCircular from 'vuetify/lib/components/VProgressCircular';
import data from '@/DataService.js'
import RecommendationCard from '../components/RecommendationCard.vue';

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