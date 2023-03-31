<template>
  <div id="app">
    <Build />
  </div>
</template>

<script>
import Build from '@/views/build.vue';

export default {
  name: 'App',
  components: {
    Build,
  },
};
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
}
</style>
