<template>
  <header class="header">
    <div class="header-bar" @dblclick="handleDbclick"></div>

    <div class="header-content">
      <div class="icons">
        <img src="@/assets/imgs/logo.png" width="80" class="logo" @click="$router.push('/')">
        <!-- <icon name="music" @click="$router.push('/')"></icon> -->
        <icon name="refresh" @click="refresh"></icon>
        <icon name="back" @click="$router.go(-1)"></icon>
        <icon name="right" @click="$router.go(1)"></icon>
      </div>
      <ul class="navbars">
        <li class="navbar" v-for="navbar in navbars" :key="navbar.label">
          <router-link class="navbar-link" :to="navbar.to">{{navbar.label}}</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import eventBus from '@/services/event-bus';

export default {
  data() {
    return {
      navbars: [
        { label: '推荐', to: '/recommends' },
        { label: '排行榜', to: '/ranking' },
        { label: '搜索', to: '/search' },
        { label: '我的', to: '/my' },
        { label: '关于', to: '/about' }
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
  z-index: 100
  height: 100px
  padding: 0 50px
  background: linear-gradient(90deg, $color-bg, $color-sub-bg)
  user-select: none

  &-bar
    height: 30px
    -webkit-app-region: drag

  &-content
    height: 70px
    display: flex
    align-items: center

    .icons
      flex: 1
      display: flex
      align-items: center

      .logo
        margin-right: 10px
        cursor: pointer
        &:hover
          color: $color-theme

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

    .navbars
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
