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
        <icon :name="isLove ? 'love' : 'unlove'" @click="love"></icon>
        <icon name="repeat"></icon>
        <icon name="menu"></icon>
      </div>

      <div class="volume-progress">
        <icon name="volume"></icon>
        <progress-bar @update="changeVolume" :percent="initialVolume"></progress-bar>
      </div>
    </div>

    <audio ref="audio" :src="url" autoplay @timeupdate="updateTime" @ended="ended"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { getSong } from '@/api/song';
import ProgressBar from '@/components/progress/progress';
import { leftpad } from '@/utils';
import Storage from '@/utils/storage';
import db from '@/utils/db';
import eventBus from '@/services/event-bus';

export default {
  components: {
    ProgressBar
  },
  data() {
    return {
      url: '',
      currentTime: 0,
      duration: 0,
      isLove: false,
      initialVolume: Storage.getItem('Volume') || 1
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

      const timer = setInterval(() => {
        if (this.duration) {
          clearInterval(timer);
          return;
        }

        this.duration = this.$refs.audio.duration;
      }, 300);
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
    updateProgress(percent) {
      this.$refs.audio.currentTime = percent * this.duration;

      !this.playing && this.togglePlay();
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    ended() {
      this.next();
    },
    changeVolume(percent) {
      this.$refs.audio.volume = percent;
      Storage.setItem('Volume', percent);
    },
    love() {
      if (this.isLove) {
        db.love.remove({ id: this.currentSong.id }, () => {
          this.isLove = false;
          eventBus.$emit('love');
        });
      } else {
        db.love.insert(
          Object.assign(this.currentSong, { create_time: Date.now() }),
          (err, data) => {
            if (data) {
              this.isLove = true;
              eventBus.$emit('love');
            }
          }
        );
      }
    },
    checkIsLove() {
      db.love.findOne({ id: this.currentSong.id }, (err, data) => {
        this.isLove = Boolean(data);
      });
    }
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

      this.duration = 0;
      this.currentTime = 0;
      this.url = '';

      db.play.update({ id: newVal.id }, { $set: { listen_time: Date.now() } }, (err, data) => {
        if (data === 0) {
          const time = Date.now();
          db.play.insert(Object.assign(newVal, {
            create_time: time, listen_time: time
          }), (err, res) => {
            console.log(res);
          });
        }
      });

      this.checkIsLove();

      await this.getSong(newVal.id);
    },
    playing(val) {
      if (!this.url) {
        this.getSong(this.currentSong.id);
        return;
      }

      this.$nextTick(() => {
        val ? this.$refs.audio.play() : this.$refs.audio.pause();
      });
    }
  },
  mounted() {
    this.SET_PLAYING(false);
    this.checkIsLove();
  }
};
</script>


<style lang="stylus" scoped>
.player
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
    padding-left: 20px
    padding-bottom: 15px

    .icons
      display: flex
      justify-content: space-between
      margin-bottom: 15px
      cursor: pointer

      .icon-love
        color: $color-theme

    .volume-progress
      display: flex
      align-items: center

      .icon-volume
        margin-right: 10px
</style>

