<template>
  <v-card>
    <v-img
      height="10rem"
      :src="recommendation.image"
    />
    <v-card-title>
      <a class="text-decoration-none" :href="recommendation.link" target="_blank">
        {{ recommendation.name }}
      </a>
    </v-card-title>
    <v-card-subtitle>
      <div>
        <span class="pr-2">{{ recommendation.topic }}</span>
        <span class="pr-2"> - </span>
        <span>{{ recommendation.focus }}</span>
      </div>
      <div>
        <span class="pr-1">
          <v-icon small class="pb-1">
            {{ this[`${recommendation.modality}Icon`] }}
          </v-icon>
        </span>
        <span class="pr-2 font-italic">{{ this.duration(recommendation.duration) }}</span>
        <span class="font-italic">{{ this.cost(recommendation.cost) }}</span>
      </div>
    </v-card-subtitle>
    <v-card-text>{{ recommendation.description }}</v-card-text>
  </v-card>
</template>

<script>
import {
  VCard,
  VImg,
  VCardTitle,
  VCardSubtitle,
  VCardText
} from 'vuetify/lib/components/VCard';
import { VIcon } from 'vuetify/lib/components/VIcon';
import {
  mdiBookOpenPageVariant,
  mdiHeadphones,
  mdiSchoolOutline,
  mdiTelevisionPlay,
  mdiText
} from '@mdi/js';

export default {
  props: {
    recommendation: {
      type: Object,
      required: true
    }
  },

  components: {
    VCard,
    VImg,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VIcon
  },

  data() {
    return {
      audioIcon: mdiHeadphones,
      bookIcon: mdiBookOpenPageVariant,
      courseIcon: mdiSchoolOutline,
      textIcon: mdiText,
      videoIcon: mdiTelevisionPlay
    };
  },

  methods: {
    duration(raw) {
      let [ h, m ]= raw.split(':').map(x => parseInt(x));
      return [
        h === 0 ? 0 : `${h}h`,
        m === 0 ? 0 : `${m}m`
      ].filter(x => x).join(' ');
    },

    cost(raw) {
      return raw === "$0.00" ? "(free)" :`(${raw})`;
    }
  }
}
</script>

<style scoped>

</style>