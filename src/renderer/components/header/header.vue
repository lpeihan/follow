<template>
  <header class="header" @dblclick="handleDbclick">
    <div class="header-icons">
      <icon name="music" @click="$router.push('/')"></icon>
      <icon name="refresh" @click="refresh"></icon>
      <icon name="back" @click="$router.go(-1)"></icon>
      <icon name="right" @click="$router.go(1)"></icon>
    </div>
    <ul class="header-navbars">
      <li class="navbar" v-for="navbar in navbars" :key="navbar.label">
        <router-link class="navbar-link" :to="navbar.to">{{navbar.label}}</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
import eventBus from '@/services/event-bus';

export default {
  data() {
    return {
      navbars: [
        { label: '推荐', to: '/' },
        { label: '排行榜', to: '/ranking' },
        { label: '搜索', to: '/search' },
        { label: '我的', to: '/my' },
        { label: '关于', to: 'about' }
      ]
    };
  },
  methods: {
    handleDbclick() {
      this.$electron.ipcRenderer.send('max');
    },
    refresh() {
      eventBus.$emit('refresh');
    }
  }
};
</script>

<style lang="stylus" scoped>
.header
  fixed: top left 50px right 50px
  z-index: 100
  display: flex
  padding-top: 20px
  align-items: center
  height: 80px
  background: linear-gradient(90deg, $color-bg, $color-sub-bg)
  -webkit-app-region: drag
  user-select: none

  &-icons
    flex: 1
    display: flex
    align-items: center

    .icon
      cursor: pointer
      size: 16px
      color: $color-text-l
      &:hover
        color: $color-theme
    
    .icon-music
      size: 32px
      color: $color-theme
      margin-right: 20px
    
    .icon-refresh
      size: 22px
      margin-right: 20px
    
    .icon-back
      margin-right: 5px

  &-navbars
    color: $color-text-l
    font-size: $font-size-large

    .navbar
      float: left
      margin-right: 15px

      &:last-child
        margin-right: 0
        font-size: 15px
      
    .navbar-link
      transition: color $transition-time
</style>
