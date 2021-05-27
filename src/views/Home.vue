<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <recommendation-comp />
  </div>
</template>

<script>
import RecommendationComp from '@/components/Recommendation.vue';

export default {
  name: 'Home',
  components: {
    RecommendationComp
  }
}
</script>