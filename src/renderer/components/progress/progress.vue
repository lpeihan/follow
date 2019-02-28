<template>
  <div
    class="progress-bar"
    @mousedown="handleMousedown"
  >
    <div class="progress-bar-inner">
      <div class="progress-current" :style="{ width: `${offsetX}px` }"></div>
    </div>
    <div class="progress-bar-btn" :style="{ 'left':  `${offsetX - 5}px` }" ref="btn"></div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      offsetX: 0,
      draging: false,
      width: 0
    };
  },
  methods: {
    handleMousedown(e) {
      this.draging = true;
      this.offsetX = e.clientX - this.x;
      this.$emit('update', this.offsetX / this.width);
    },
    handleMouseup() {
      this.draging = false;
    },
    handleMousemove(e) {
      if (this.draging === false) {
        return;
      }
      let offsetX = e.clientX - this.x;

      if (offsetX > this.width) {
        offsetX = this.width;
      }

      if (offsetX < 0) {
        offsetX = 0;
      }

      this.$emit('update', this.offsetX / this.width);

      this.offsetX = offsetX;
    },
    resize() {
      this.width = this.$el.clientWidth;
      this.x = this.$el.getBoundingClientRect().x;
    }
  },
  watch: {
    percent(val) {
      if (this.draging === false) {
        this.offsetX = val * this.width;
      }
    }
  },
  mounted() {
    window.addEventListener('mouseup', this.handleMouseup);
    window.addEventListener('mousemove', this.handleMousemove);
    window.addEventListener('resize', this.resize);
    this.resize();

    if (this.percent) {
      this.offsetX = this.percent * this.width;
    }
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.handleMouseup);
    window.removeEventListener('mousemove', this.handleMousemove);
    window.removeEventListener('resize', this.resize);
  }
};
</script>

<style lang="stylus" scoped>
.progress-bar
  padding: 3px 0
  position: relative
  cursor: pointer
  width: 100%

  &-inner
    size: 100% 5px
    background: $black
    position: relative
    border-radius: 5px

    .progress-current
      absolute: top left bottom
      border-radius: 5px
      background: hsla(0, 0%, 100%, 0.534)

  &-btn
    size: 11px
    border-radius: 50%
    background: $white
    absolute: top left
</style>
