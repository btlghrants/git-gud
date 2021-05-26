<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    props: {
      message: String
    },
  }
</script>
