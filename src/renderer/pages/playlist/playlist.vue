<template>
  <div class="playlist">
    <div class="playlist-info">
      <img :src="playlistData.coverImgUrl" class="info-corver">

      <div class="info-name">{{playlistData.name}}</div>
      <div class="info-desc">{{playlistData.description}}</div>
    </div>
    <div class="playlist-songs">
      <ul class="songs-list">
        <li class="songs-item">
          <div class="song-left"></div>
          <div class="song-name">歌曲名</div>
          <div class="singer-name">歌手</div>
          <div class="album-name">专辑</div>
        </li>
        <li class="songs-item" v-for="(song, index) in songs" :key="index" @click="selectSong(index)">
          <div class="song-left">
            <span class="song-index">{{index + 1}}</span>
            <div class="song-love">
              <icon name="love"></icon>
            </div>
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
import loading from '@/components/loading';
import { refreshMixins } from '@/services/mixins';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      playlistData: {},
      songs: []
    };
  },
  mixins: [refreshMixins],
  computed: {
    ...mapGetters('song', ['currentSong'])
  },
  methods: {
    ...mapActions('song', ['selectPlay']),
    query() {
      this.getPlaylist(this.$route.params.id);
    },
    async getPlaylist(id) {
      loading.open();
      const res = await getPlaylist(id);
      loading.close();
      this.playlistData = res.playlist;
      this.songs = res.playlist.tracks.map(song => createSong(song));
    },
    selectSong(index) {
      this.selectPlay({ index, songs: this.songs });
    }
  },
  created() {
    this.query();
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
    width: 240px
    display: flex
    flex-direction: column
    border-right-1px(hsla(0, 0%, 100%, 0.062))

    .info-corver
      width: 100%
      border-radius: 5px

    .info-name
      font-size: $font-size-large
      margin: 15px 0

    .info-desc
      flex: 1
      color: $color-text-l
      line-height: 22px
      overflow: auto

  &-songs
    margin: 0 50px 0 270px

    .songs-item
      padding: 12px 0
      position: relative
      border-bottom-1px(hsla(0, 0%, 100%, 0.062))
      display: flex

      &:hover
        background: hsla(0, 0%, 100%, 0.07)

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
        text-overflow()
        cursor: pointer

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
