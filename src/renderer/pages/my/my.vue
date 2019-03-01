<template>
  <div class="my">
    <div class="my-menus">
      <div
        class="menu-item"
        v-for="menu in menus"
        :key="menu.id"
        @click="select(menu)"
        :class="{ 'active': currentMenu.id === menu.id }"
      ><icon :name="menu.icon"></icon>{{menu.name}}</div>
    </div>

    <div class="my-content">
      <template v-if="currentMenu.id === 1">
        <div class="my-content-header">
          <img src="http://p1.music.126.net/B6qfDeEhaeqTbKd1zhQnWg==/109951163885799892.jpg">
          <div class="header-info">
            <h3 class="name">{{currentMenu.name}}</h3>

            <div class="song-count">
              共{{plays.length}}首
            </div>
          </div>
        </div>
        <songlist :songs="plays"></songlist>
      </template>
      <template v-if="currentMenu.id === 2">
        <div class="my-content-header">
          <img src="http://p2.music.126.net/64JozXeLm7ErtXpwGrwwEw==/109951162811190850.jpg">
          <div class="header-info">
            <h3 class="name">{{currentMenu.name}}</h3>
            <div class="song-count">
              共{{plays.length}}首
            </div>
          </div>
        </div>
        <songlist :songs="loves"></songlist>
      </template>

    </div>
  </div>
</template>

<script>
import db from '@/utils/db';
import Songlist from '@/pages/playlist/songlist';
import eventBus from '@/services/event-bus';

export default {
  name: 'my',
  components: {
    Songlist
  },
  data() {
    return {
      plays: [],
      loves: [],
      currentMenu: { name: '我的最近播放', id: 1, icon: 'music' },
      menus: [
        { name: '我的最近播放', id: 1, icon: 'music' },
        { name: '我喜欢的音乐', id: 2, icon: 'unlove' },
      ]
    };
  },
  methods: {
    query() {
      this.getPlayHistory();
    },
    select(menu) {
      this.currentMenu = menu;

      switch (menu.id) {
        case 1:
          this.getPlayHistory();
          break;
        case 2:
          this.getLoves();
          break;
        default:
          break;
      }
    },
    getPlayHistory() {
      db.play.find({}).sort({ listen_time: -1 }).exec((err, data) => {
        this.plays = data;
      });
    },
    getLoves() {
      db.love.find({}).sort({ create_time: -1 }).exec((err, data) => {
        this.loves = data;
      });
    }
  },
  created() {
    this.query();
    eventBus.$on('love', () => {
      this.select(this.currentMenu);
    });
  }
};
</script>

<style lang="stylus" scoped>
.my

  &-menus
    fixed: top 100px left 50px bottom 100px
    background: hsla(0, 0%, 100%, 0.027)
    width: 220px
    border-radius: 5px

    .menu-item
      line-height: 50px
      padding: 0 10px
      position: relative
      border-bottom-1px(hsla(0, 0%, 100%, 0.062))
      cursor: pointer
      display: flex
      align-items: center

      .icon
        margin-right: 10px

      .icon-music
        size: 22px
        margin: 0 8px 0 -2px
      
      &.active
        background: hsla(0, 0%, 100%, 0.062)

  &-content
    margin: 0 50px 0 240px

    &-header
      padding-bottom: 30px
      display: flex

      img
        size: 150px
        border-radius: 5px
      
      .header-info
        padding-left: 20px
        .name
          font-size: 22px
        
        .song-count
          margin-top: 10px
          color: $color-text-l
</style>
