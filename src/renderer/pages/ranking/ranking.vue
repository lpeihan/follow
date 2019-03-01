<template>
  <div class="ranking">
    <ul class="ranking-list">
      <li class="ranking-item" v-for="(ranking, index) in rankings" :key="index" @click="select(ranking.id)">
        <img :src="ranking.coverImgUrl" class="item-logo" >
        <div class="item-info">
          <template v-if="ranking.tracks.length">
            <div
              class="song-item"
              v-for="song in ranking.tracks"
              :key="song.first"
            >{{song.first}} - {{song.second}}</div>
          </template>

          <template v-else>
            <div class="song-item">{{ranking.name}}</div>
            <div class="song-item">{{ranking.description}}</div>
            <div class="song-item">{{ranking.updateFrequency}}</div>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getRanking } from '@/api/ranking';
export default {
  name: 'ranking',
  data() {
    return {
      rankings: []
    };
  },
  methods: {
    async getRanking() {
      const res = await getRanking();
      this.rankings = res.list;
    },
    select(id) {
      this.$router.push({ path: `/ranking/${id}` });
    }
  },
  created() {
    this.getRanking();
  }
};
</script>

<style lang="stylus" scoped>
.ranking
  &-list
    display: flex
    flex-wrap: wrap

    .ranking-item
      float: left
      width: 50%
      display: flex
      margin-bottom: 30px
      cursor: pointer

      .item-logo
        border-radius: 5px
        size: 130px

      .item-info
        width: calc(100% - 130px)
        padding: 20px 15px 0
        font-size: 14px
        color: $color-text-l
        align-items: center

        .song-item
          text-overflow()
          margin-bottom: 15px
</style>
