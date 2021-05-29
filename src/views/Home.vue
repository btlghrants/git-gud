<template>
  <div>

    <template v-if="loading">
      <div class="text-center">
        <v-progress-circular indeterminate color="primary"/>
      </div>
    </template>

    <template v-else>  
      <v-row v-for="recomm in recommendations" :key="recomm.key">
        <v-col>
          <recommendation-card :recommendation="recomm"/>
        </v-col>
      </v-row>
    </template>

  </div>
</template>

<script>
import VProgressCircular from 'vuetify/lib/components/VProgressCircular';
import { VRow, VCol } from 'vuetify/lib/components/VGrid';
import RecommendationCard from '../components/RecommendationCard.vue';
import data from '@/DataService.js'

export default {
  name: 'Home',

  components: {
    VProgressCircular,
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