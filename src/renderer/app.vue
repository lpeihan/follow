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

<style lang="stylus" scoped>
#app
  padding: 80px 50px 0
</style>

