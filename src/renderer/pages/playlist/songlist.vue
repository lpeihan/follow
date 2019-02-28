<template>
  <ul class="songlist">
    <li class="songlist-item">
      <div class="item-left"></div>
      <div class="song-name">歌曲名</div>
      <div class="singer-name">歌手</div>
      <div class="album-name">专辑</div>
    </li>
    <li class="songlist-item" v-for="(song, index) in songs" :key="index" @click="select(index)">
      <div class="item-left">
        <span class="song-index">{{index + 1}}</span>
        <!-- <icon name="love"></icon> -->
      </div>

      <div class="song-name">{{song.name}}</div>
      <div class="singer-name">{{song.singer}}</div>
      <div class="album-name">{{song.album}}</div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions('song', ['selectPlay']),
    select(index) {
      this.$emit('select', index);
      this.selectPlay({ index, songs: this.songs });
    },
  }
};
</script>

<style lang="stylus" scoped>
.songlist
  &-item
    position: relative
    display: flex
    padding: 15px 0
    cursor: pointer
    border-bottom-1px(hsla(0, 0%, 100%, 0.062))

    &:hover
      background: hsla(0, 0%, 100%, 0.07)

    .item-left
      display: flex
      // width: 98px
      width: 60px

      .song-index
        width: 60px
        padding-left: 10px
      
      .icon-love
        margin: 0 30px 0 20px
        color: $color-theme
      
    .song-name
    .singer-name
    .album-name
      flex: 1
      padding-right: 15px
      text-overflow()

    .singer-name
    .album-name
      color: $color-text-l

    &:first-child
      background: hsla(0, 0%, 100%, 0.07)

      .song-name
      .singer-name
      .album-name
        color: $white
        font-size: $font-size-large
</style>
