<template>
  <div class="playlist">
    <div class="playlist-info">
      <img :src="playlist.coverImgUrl" class="info-corver">

      <div class="info-name">{{playlist.name}}</div>
      <div class="info-desc">{{playlist.description}}</div>
    </div>
    <div class="playlist-songs">
      <ul class="songs-list">
        <li class="songs-item" v-for="(song, index) in songs" :key="index">
          <div class="song-left">
            <span class="song-index">{{index + 1}}</span>
            <div class="song-love"><icon name="love"></icon></div>
          </div>
          <div class="song-name">{{song.name}}</div>
          <div class="singer-name">{{song.singer}}</div>
          <div class="album-name">{{song.album}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPlaylist } from '@/api/recommends';
import { createSong } from '@/services/song';

export default {
  data() {
    return {
      playlist: {},
      songs: []
    };
  },
  methods: {
    async getPlaylist(id) {
      const res = await getPlaylist(id);
      this.playlist = res.playlist;
      this.songs = res.playlist.tracks.map(song => createSong(song));
    }
  },
  created() {
    this.getPlaylist(this.$route.params.id);
  }
};
</script>

<style lang="stylus" scoped>
.playlist
  fixed: top 100px left 50px bottom 100px right 0
  overflow-y: auto

  &-info
    fixed: top 100px left 50px bottom 100px
    padding-right: 30px
    width: 230px
    border-right-1px(hsla(0, 0%, 100%, 0.062))

    .info-corver
      width: 100%
      border-radius: 10px

    .info-name
      font-size: $font-size-large
      margin: 15px 0

    .info-desc
      color: $color-text-l
      font-size: 13px
      line-height: 20px

  &-songs
    margin: 0 50px 0 260px

    .songs-item
      padding: 10px 0
      position: relative
      border-bottom-1px(hsla(0, 0%, 100%, 0.062))
      display: flex

      .song-left
        width: 100px
        display: flex

        .song-index
          width: 30px
          text-align: center
        
        .song-love
          flex: 1
          padding-right: 10px
          text-align: center
          .icon-love
            color: $color-theme

      .song-name
      .singer-name
      .album-name
        flex: 1
        font-size: $font-size-base
        padding-right: 15px
        text()

      .singer-name
      .album-name
        color: $color-text-l
</style>
