<template>
  <v-card height="525px">
    <v-img
      height="250px"
      class="text-white"
      :style="{ backgroundColor: color(resource.image) }"
      :src="resource.image"
    />

    <v-card-title>
      <a class="text-sm title ellipsis-2" :href="resource.link" target="_blank">
        {{ resource.name }}
      </a>
    </v-card-title>

    <v-card-subtitle>
      <div>
        <span class="pr-2">{{ resource.topic }}</span>
        <span class="pr-2"> - </span>
        <span>{{ resource.focus }}</span>
      </div>

      <div>
        <span class="pr-1">
          <v-icon small class="pb-1">
            {{ this[`${resource.modality}Icon`] }}
          </v-icon>
        </span>
        <span class="pr-2 font-italic">{{ this.duration(resource.duration) }}</span>
        <span class="font-italic">{{ this.cost(resource.cost) }}</span>
      </div>
    </v-card-subtitle>

    <v-card-text>
      <div class="ellipsis-5">
        {{ resource.description }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  VCard,
  VCardTitle,
  VCardSubtitle,
  VCardText
} from 'vuetify/lib/components/VCard';
import { VIcon } from 'vuetify/lib/components/VIcon';
import { VImg } from 'vuetify/lib/components/VImg';
import {
  mdiBookOpenPageVariant,
  mdiHeadphones,
  mdiSchoolOutline,
  mdiTelevisionPlay,
  mdiText
} from '@mdi/js';

export default {
  props: {
    resource: {
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
    },

    color(seed = "") {
      // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
      // https://stackoverflow.com/a/21682946
      const getHashCode = () => {
        var hash = 0;
        if (seed.length == 0) return hash;
        for (var i = 0; i < seed.length; i++) {
            hash = seed.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
      };

      const intToHSL = (i) => {
        var shortened = i % 360;
        return "hsl(" + shortened + ",100%,20%)";
      };

      return intToHSL( getHashCode(seed) );
    }
  }
}
</script>

<style lang="scss" scoped>
.ellipsis-100 {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 100;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
.ellipsis-2 {
  @extend .ellipsis-100;
  -webkit-line-clamp: 2;
}
.ellipsis-5 {
  @extend .ellipsis-100;
  -webkit-line-clamp: 5;
}
a {
  text-decoration: none;
}
</style>