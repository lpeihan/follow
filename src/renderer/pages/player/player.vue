<template>
  <div class="player">
    <div class="player-ctrl">
      <icon name="prev" @click="prev"></icon>
      <icon :name="playing ? 'mini-pause' : 'mini-play'" @click="togglePlay"></icon>
      <icon name="next" @click="next"></icon>
    </div>

    <div class="player-progress">
      <img :src="currentSong.pic" class="pic">

      <div class="progress">
        <div class="song-info">
          <span class="song-name">{{currentSong.name}}</span>
          <span class="song-singer">{{currentSong.singer}}</span>

          <span class="song-time">{{currentTime | time}} / {{duration | time}}</span>
        </div>

        <progress-bar @update="updateProgress" :percent="percent"></progress-bar>
      </div>
    </div>

    <div class="player-right">
      <div class="icons">
        <icon name="love"></icon>
        <icon name="repeat"></icon>
        <icon name="menu"></icon>
      </div>

      <div class="volume-progress">
        <icon name="volume"></icon>
        <progress-bar></progress-bar>
      </div>
    </div>

    <audio ref="audio" :src="url" autoplay @timeupdate="updateTime">
    </audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { getSong } from '@/api/song';
import ProgressBar from '@/components/progress/progress';
import { leftpad } from '@/utils';

export default {
  components: {
    ProgressBar
  },
  data() {
    return {
      url: '',
      currentTime: 0,
      duration: 0
    };
  },
  computed: {
    ...mapGetters('song', ['currentSong', 'currentIndex', 'playlist', 'playing']),
    percent() {
      return this.duration ? this.currentTime / this.duration : 0;
    }
  },
  methods: {
    ...mapMutations('song', ['SET_CURRENT_INDEX', 'SET_PLAYING']),
    async getSong(id) {
      this.url = (await getSong(id)).data[0].url;
    },
    prev() {
      let index = this.currentIndex - 1;

      if (index <= -1) {
        index = this.playlist.length - 1;
      }

      this.SET_CURRENT_INDEX(index);
    },
    next() {
      let index = this.currentIndex + 1;

      if (index === this.playlist.length) {
        index = 0;
      }

      this.SET_CURRENT_INDEX(index);
    },
    togglePlay() {
      this.SET_PLAYING(!this.playing);
    },
    updateProgress(val) {
      console.log(val);
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
  },
  filters: {
    time(time) {
      const t = time | 0;
      return `${leftpad(t / 60 | 0, 2, 0)}:${leftpad(t % 60, 2, 0)}`; // minite:second
    }
  },
  watch: {
    async currentSong(newVal, oldVal) {
      if (newVal.id === oldVal.id) {
        return;
      }

      await this.getSong(newVal.id);

      const timer = setInterval(() => {
        if (this.duration) {
          clearInterval(timer);
          return;
        }

        this.duration = this.$refs.audio.duration;
      }, 300);
    },
    playing(val) {
      if (!this.url) {
        return;
      }

      this.$nextTick(() => {
        val ? this.$refs.audio.play() : this.$refs.audio.pause();
      });
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
      cursor: pointer

    .icon-mini-play
    .icon-mini-pause
      margin: 0 15px
      size: 32px

  &-progress
    padding-left: 20px
    display: flex
    align-items: center
    flex: 1
    padding-bottom: 15px
    .pic
      width: 68px
      border-radius: 5px

    .progress
      flex: 1
      padding-left: 20px
      .song-info
        font-size: 13px
        margin-bottom: 15px
        .song-singer
          color: $color-text-l
        .song-time
          float: right
          color: $color-text-l
  
  &-right
    width: 120px
    padding-left:20px
    padding-bottom: 15px

    .icons
      display: flex
      justify-content: space-between
      margin-bottom: 15px
    
    .volume-progress
      display: flex
      align-items: center

      .icon-volume
        margin-right: 10px
</style>

