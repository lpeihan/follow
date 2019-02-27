<template>
  <div id="app">
    <v-header></v-header>

    <keep-alive :include="['recommends', 'ranking']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import VHeader from '@/components/header/header';

export default {
  name: 'app',
  components: {
    VHeader
  }
};
</script>

<style lang="stylus">
#app
  padding: 80px 50px 0

  .router-link-active
    color: $color-theme
</style>

