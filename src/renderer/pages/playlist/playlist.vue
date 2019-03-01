<template>
  <div class="playlist">
    <div class="playlist-info">
      <img :src="playlistData.coverImgUrl" class="info-corver">

      <div class="info-name">{{playlistData.name}}</div>
      <div class="info-desc">{{playlistData.description}}</div>
    </div>

    <songlist :songs="songs"></songlist>
  </div>
</template>

<script>
import { getPlaylist } from '@/api/recommends';
import { createSong } from '@/services/song';
import loading from '@/components/loading';
import { refreshMixins } from '@/services/mixins';
import { mapGetters } from 'vuex';
import Songlist from './songlist';

export default {
  components: {
    Songlist
  },
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
    query() {
      this.getPlaylist(this.$route.params.id);
    },
    async getPlaylist(id) {
      loading.open();
      const res = await getPlaylist(id);
      loading.close();
      this.playlistData = res.playlist;
      this.songs = res.playlist.tracks.map(song => createSong(song));
    }
  },
  created() {
    this.query();
  }
};
</script>

<style lang="stylus" scoped>
.playlist

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
  
  .songlist
    margin-left: 270px
</style>
