<template>
  <div class="home">
    
    <template v-if="loading">
      <div class="text-center">
        <v-progress-circular indeterminate color="primary"/>
      </div>
    </template>

    <template v-else>
      <pre>{{ recommendations }}</pre>
    </template>

  </div>
</template>

<script>
import { VProgressCircular } from 'vuetify/lib/components/VProgressCircular';
// import RecommendationCard from '@/components/RecommendationCard.vue';
import GApi from '@/GApi.js'

export default {
  name: 'Home',

  components: {
    VProgressCircular
    // RecommendationCard
  },

  data() {
    return {
      loading: true,
      error: false,
      rawResponse: null,
      recommendations: []
    };
  },

  created() {
    new GApi(window.gapi).getRecommendations()
      .then( recommendations => {
        this.recommendations = recommendations;
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