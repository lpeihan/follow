<template>
  <div class="my">
    <div class="my-menus">
      <div
        class="menu-item"
        v-for="menu in menus"
        :key="menu.id"
        :class="{ 'active': currentMenu === menu.id }"
      >{{menu.name}}</div>
    </div>

    <div class="my-content">
      <div class="my-content-header">
        <img src="http://p2.music.126.net/64JozXeLm7ErtXpwGrwwEw==/109951162811190850.jpg">
      </div>
      <songlist :songs="plays"></songlist>
    </div>
  </div>
</template>

<script>
import db from '@/utils/db';
import Songlist from '@/pages/playlist/songlist';

export default {
  components: {
    Songlist
  },
  data() {
    return {
      plays: [],
      currentMenu: 1,
      menus: [
        { name: '播放历史', id: 1 },
        { name: '我喜欢的音乐', id: 2 },
      ]
    };
  },
  methods: {
    query() {
      this.getPlayHistory();
    },
    getPlayHistory() {
      db.play.find({}, (err, data) => {
        if (err) {
          return;
        }

        this.plays = data;
      });
    }
  },
  created() {
    this.query();
  }
};
</script>

<style lang="stylus" scoped>
.my
  fixed: top 100px left 50px bottom 100px right 0
  overflow-y: auto

  &-menus
    fixed: top 100px left 50px bottom 100px
    background: hsla(0, 0%, 100%, 0.027)
    width: 220px
    border-radius: 5px
    cursor: pointer

    .menu-item
      line-height: 50px
      padding: 0 10px
      position: relative
      border-bottom-1px(hsla(0, 0%, 100%, 0.062))

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
</style>
