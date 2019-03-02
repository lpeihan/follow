<template>
  <div class="search">
    <div class="input-box">
      <icon name="search"></icon>
      <form @submit="submit">
        <input
          @focus="handleFocus"
          @blur="isFocus = false"
          @click.stop
          type="text"
          class="input"
          placeholder="搜点什么想听的吧..."
          ref="input"
          @input="handleInput"
          v-model="search"
        >
      </form>

      <transition name="suggests">
        <div class="suggests-wrapper" v-show="suggests.length && isFocus">
          <div
            class="suggests-item"
            v-for="suggest in suggests"
            :key="suggest.id"
            @click="goSearch(suggest.name)"
          >{{suggest.name}}</div>
        </div>
      </transition>
    </div>

    <ul class="hots">
      <li
        class="hots-item"
        v-for="hot in hots"
        :key="hot.first"
        @click="goSearch(hot.first)"
      >{{hot.first}}</li>
    </ul>

    <div class="search-results">
      <div class="search-bar">
        <div
          class="search-bar-item"
          v-for="bar in searchBars"
          :key="bar"
          @click="selectBar(bar)"
          :class="{ 'active': currentBar === bar }"
        >{{bar}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchHot, getSearchSuggest, getSearchSinger, getSearchSongs, getSearchMusicList } from '@/api/search';
import { debounce } from '@/utils';
import loading from '@/components/loading';

export default {
  name: 'search',
  data() {
    return {
      hots: [],
      suggests: [],
      songs: [],
      musiclist: [],
      singers: [],
      search: '',
      isFocus: false,
      currentBar: '歌曲',
      searchBars: ['歌曲', '歌手', '歌单']
    };
  },
  methods: {
    async getSearchHot() {
      const res = await getSearchHot();

      this.hots = res.result.hots;
    },
    async getSearchSuggest() {
      if (this.search === '') {
        this.suggests = [];
        return;
      }
      const res = await getSearchSuggest(this.search);

      const { albums, artists, playlists, songs, mvs } = res.result;

      this.suggests = (artists || []).concat(songs || [], playlists || [], albums || [], mvs || []);
    },
    submit(e) {
      e.preventDefault();

      this.goSearch(this.search);
    },
    async goSearch(search) {
      this.search = search;
      this.$refs.input.blur();

      if (this.search === '') {
        return;
      }

      loading.open();
      if (this.currentBar === '歌曲') {
        await this.getSearchSongs();
      } else if (this.currentBar === '歌手') {
        await this.getSearchSinger();
      } else if (this.currentBar === '歌单') {
        await this.getSearchMusicList();
      }
      loading.close();
    },
    selectBar(bar) {
      this.currentBar = bar;
      this.goSearch(this.search);
    },
    handleInput: debounce(function () {
      this.getSearchSuggest();
    }, 300),
    handleFocus() {
      this.isFocus = true;
      this.getSearchSuggest();
    },
    async getSearchSinger() {
      const res = await getSearchSinger({ keywords: this.search });
      this.singers = res.result.artists;
      console.log(this.singers);
    },
    async getSearchSongs() {
      const res = await getSearchSongs({ keywords: this.search });
      this.songs = res.result.songs;
      console.log(this.songs);
    },
    async getSearchMusicList() {
      const res = await getSearchMusicList({ keywords: this.search });
      this.musiclist = res.result.playlists;
      console.log(this.musiclist);
    }
  },
  activated() {
    this.$refs.input.focus();
    this.isFocus = true;
    this.getSearchHot();
  }
};
</script>

<style lang="stylus" scoped>
.search
  padding: 20px 150px !important

  .input-box
    position: relative
    border-bottom-1px(#9e9e9e)
    display: flex
    align-items: center
    z-index: 1

    .icon-search
      margin-right: 10px
      relative: top -1px
      size: 19px

    .input
      flex: 1
      line-height: 45px
      color: white
      font-size: 16px
      border: none
      outline: none
      background: none

    .suggests-wrapper
      absolute: top 46px left right
      background: #16232c
      z-index: 1

      &.suggests
        &-enter-active
        &-leave-active
          transition: all 0.3s

        &-enter
        &-leave-to
          transform: scale(0.98)
          opacity: 0

      .suggests-item
        padding: 10px
        cursor: pointer

        &:hover
          background: $color-sub-bg

  .hots
    margin-top: 15px

    .hots-item
      display: inline-block
      background: hsla(0, 0%, 100%, 0.07)
      margin: 0 10px 15px 0
      padding: 8px 10px
      border-radius: 5px
      font-size: 13px
      cursor: pointer

      &:hover
        color: $color-theme

  .search-results
    .search-bar
      background: #16232c
      display: flex
      border-radius: 5px

      &-item
        padding: 12px 20px
        cursor: pointer
        font-size: 16px

        &:first-child
          padding-left: 10px

        &.active
          color: $color-theme
</style>
