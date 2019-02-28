<template>
  <div id="app">
    <v-header></v-header>

    <keep-alive :include="['recommends', 'ranking']">
      <router-view class="child-view"></router-view>
    </keep-alive>

    <player></player>
  </div>
</template>

<script>
import VHeader from '@/components/header/header';
import Player from '@/pages/player/player';

export default {
  name: 'app',
  components: {
    VHeader,
    Player
  }
};
</script>

<style lang="stylus">
#app
  padding: 80px 50px 0

  .router-link-active
    color: $color-theme
</style>

