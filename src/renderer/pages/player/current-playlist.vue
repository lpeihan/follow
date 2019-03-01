<template>
  <div class="current-playlist">
    <transition>
      <div class="current-playlist-wrapper" v-show="show">
        <div class="playlist-item" v-for="(item, index) in playlist" :key="item.id" @click="select(index)">
          <p class="song-name">{{item.name}}</p>
          <p class="singer-name">{{item.singer}}</p>
        </div>
      </div>
    </transition>

    <div class="current-playlist-overlay" v-show="show" @click="close"></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters('song', ['playlist'])
  },
  methods: {
    ...mapMutations('song', ['SET_CURRENT_INDEX']),
    select(index) {
      this.SET_CURRENT_INDEX(index);
      this.close();
    },
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
  }
};
</script>

<style lang="stylus" scoped>
.current-playlist

  &-wrapper
    fixed: right top bottom
    width: 300px
    background: $black
    z-index: 2
    padding: 10px 0
    overflow: auto

    &.v
      &-enter-active
      &-leave-active
        transition: all $transition-time
      
      &-enter
      &-leave-to
        transform: translateX(100%)
    
    .playlist-item
      padding: 10px 20px
      position: relative
      border-bottom-1px(hsla(0, 0%, 100%, 0.2))
      cursor: pointer

      &:hover
        background: hsla(0, 0%, 100%, 0.07)
      .song-name
        font-size: 13px
      .singer-name
        font-size: 12px
        color: $color-text-l


  &-overlay
    fixed: top left right bottom
</style>

