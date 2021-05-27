<template>
  <div>
    <div>Recommendations!</div>
    <div>{{ print($vuetify.theme.isDark) }}</div>
  </div>
</template>

<script>
import { inspect } from 'util';

export default {
  methods: {
    print(obj) {
      return inspect(obj);
    }
  }
}
</script>
