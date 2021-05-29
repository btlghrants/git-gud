<template>
  <!--
    <div>
      <div>Recommendations!</div>
      <div>{{ print($vuetify.theme.isDark) }}</div>
      <v-icon>{{ svgAccount }}</v-icon>
    </div>
  -->
  <div>{{ recommendation }}</div>
</template>

<script>
// import { inspect } from 'util';
// import { VIcon } from 'vuetify/lib/components/VIcon';
// import { mdiAccount } from '@mdi/js';

export default {
  props: {
    recommendation: {
      type: Object,
      required: true
    }
  }
  // components: {
  //   VIcon
  // },

  // data() {
  //   return {
  //     svgAccount: mdiAccount
  //   };
  // },
  
  // methods: {
  //   print(obj) {
  //     return inspect(obj);
  //   },
  // }
}
</script>
