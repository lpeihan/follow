<template>
  <div class="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    data: {},
    listenScroll: {
      type: Boolean,
      default: false
    },
    wheel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    initScroll() {
      this.scroll = new BScroll(this.$el, {
        probeType: this.probeType,
        click: true,
        scrollbar: true,
        mouseWheel: true,
      });
      if (this.listenScroll) {
        const that = this;
        this.scroll.on('scroll', (pos) => {
          that.$emit('scroll', pos, that.scroll.maxScrollY);
        });
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    changeScrollbar() {
      document.querySelectorAll('.bscroll-indicator').forEach((item) => {
        item.style.backgroundColor = '#9e9e9e';
        item.style.border = 'none';
      });

      document.querySelectorAll('.bscroll-vertical-scrollbar').forEach((item) => {
        item.style.width = '3px';
      });
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
      this.changeScrollbar();
    });
  }
};
</script>
