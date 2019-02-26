<template>
  <div class="ranking">
    <ul class="ranking-list">
      <li class="ranking-item" v-for="(ranking, index) in rankings" :key="index">
        <div class="item-logo">
          <img :src="ranking.coverImgUrl" width="100%">
        </div>
        <div class="item-info"></div>
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
    .ranking-item
      display: flex

      .item-logo
        width: 30%
      
      .item-info
        flex: 1
</style>
