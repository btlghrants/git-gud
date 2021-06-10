<template>
  <v-row>
    <v-col
      cols="12" sm="6" md="6" lg="4" xl="3"
      v-for="(rec, idx) in recommendations"
      :key="`${idx}-${rec.name}`"
    >
      <recommendation-card :recommendation="rec"
      />
    </v-col>
  </v-row>
</template>

<script>
import { VRow, VCol } from 'vuetify/lib/components/VGrid';
import RecommendationCard from '../components/RecommendationCard.vue';

export default {
  props: {
    recommendations: {
      type: Array,
      required: true
    }
  },

  components: {
    VRow,
    VCol,
    RecommendationCard
  }
}
</script>

<style lang="scss" scoped>

</style>