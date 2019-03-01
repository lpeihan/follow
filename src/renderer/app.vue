<template>
  <div id="app">
    <v-header></v-header>

    <keep-alive :include="['recommends', 'ranking', 'my']">
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
  height: 100%
  flex-direction: column

  .child-view
    padding: 0 50px
    height: calc(100% - 200px)
    overflow: auto

  .router-link-active
    color: $color-theme
</style>

