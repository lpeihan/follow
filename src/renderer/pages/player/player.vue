<template>
  <div class="player">
    <div class="player-ctrl">
      <icon name="prev"></icon>
      <icon name="mini-play"></icon>
      <icon name="next"></icon>
    </div>

    <div class="player-progress">
      <img :src="currentSong.pic" class="pic">

      <div class="progress">
        <div class="song-info">
          <span class="song-name">{{currentSong.name}}</span>
          <span class="song-singer">{{currentSong.singer}}</span>
        </div>
      </div>
    </div>

    <audio ref="audio" :src="url" autoplay="autoplay">
    </audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSong } from '@/api/song';

export default {
  data() {
    return {
      url: ''
    };
  },
  computed: {
    ...mapGetters('song', ['currentSong'])
  },
  methods: {
    async getSong(id) {
      this.url = (await getSong(id)).data[0].url;
    }
  },
  watch: {
    currentSong(newVal, oldVal) {
      if (newVal.id === oldVal.id) {
        return;
      }

      this.getSong(newVal.id);
    }
  }
};
</script>


<style lang="stylus" scoped>
.player
  fixed: bottom left right
  height: 100px
  display: flex
  background: linear-gradient(90deg, $color-bg, $color-sub-bg)
  align-items: center
  padding: 0 50px

  &-ctrl
    display: flex
    align-items: center

    .icon
      size: 20px

    .icon-mini-play
      margin: 0 15px
      size: 32px

  &-progress
    padding-left: 20px
    display: flex
    align-items: center

    .pic
      width: 68px
      border-radius: 5px

    .progress
      padding-left: 20px
      .song-info
        .song-singer
          color: $color-text-l
</style>

