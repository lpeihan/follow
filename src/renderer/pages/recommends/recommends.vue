<template>
  <div class="page-recommends">
    <swiper :options="swiperOption" v-if="banners.length && recommends.length">
      <swiper-slide v-for="banner in banners" :key="banner.picUrl">
        <img :src="banner.picUrl" width="100%">
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="recommends" v-if="recommends.length">
      <h2 class="recommends-title">推荐歌单</h2>
      <ul class="recommends-list">
        <li
          class="recommends-item"
          v-for="recommend in recommends"
          :key="recommend.id"
          @click="goPlaylist(recommend)"
        >
          <div class="play-count">
            <icon name="earphone"></icon>
            {{recommend.playCount | count}}
          </div>
          <img v-lazy="recommend.picUrl" class="recommends-item-pic">
          <p class="recommends-item-text">{{recommend.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import { getBanners, getRecommends } from '@/api/recommends';
import { refreshMixins } from '@/services/mixins';
import loading from '@/components/loading';

export default {
  name: 'recommends',
  components: {
    swiper,
    swiperSlide
  },
  mixins: [refreshMixins],
  data() {
    return {
      banners: [],
      recommends: [],
      swiperOption: {
        loop: true,
        autoplay: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    };
  },
  methods: {
    async query() {
      if (this.$route.name === 'recommends') {
        loading.open();

        const res = await Promise.all([
          this.getBanners(),
          this.getRecommends()
        ]);

        setTimeout(() => {
          [this.banners, this.recommends] = res;
          loading.close();
        }, 500);
      }
    },
    async getBanners() {
      const res = await getBanners();
      return res.banners;
    },
    async getRecommends() {
      const res = await getRecommends();
      return res.result;
    },
    goPlaylist(recommend) {
      this.$router.push({ path: `/playlist/${recommend.id}` });
    }
  },
  filters: {
    count(val) {
      if (val < 10000) {
        return val;
      }

      return `${Math.round(val / 10000)}万`;
    }
  },
  created() {
    this.query();
  }
};
</script>

<style lang="stylus" scoped>
.page-recommends
  padding: 20px 0

  .swiper-slide
    background-position: center
    background-size: cover
    width: 480px

  >>>.swiper-pagination
    &-bullet-active
      background: #f6325b

  .recommends
    &-title
      font-size: 18px
      margin-top: 30px

    &-list
      margin-top: 25px
      font-size: 0

      .recommends-item
        position: relative
        width: calc(20% - 24px)
        display: inline-block
        margin: 0 30px 30px 0
        font-size: 14px
        vertical-align: top
        cursor: pointer

        &:nth-child(5n)
          margin-right: 0

        .play-count
          absolute: right 10px top 10px
          display: flex
          color: #dbdbdb
          align-items: center
          font-size: $font-size-small
          transition: all $transition-time

          .icon-earphone
            margin-right: 4px
            size: 16px

        &:hover
          .play-count
            color: $color-theme
            transform: scale(1.1)

            .icon-earphone
              color: $color-theme

        &-pic
          width: 100%
          border-radius: 8px

        &-text
          color: #ebebeb
          margin-top: 10px
</style>
