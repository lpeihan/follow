<template>
  <div class="loading" v-show="show">
    <img width="36" src="@/assets/imgs/loading.gif">
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  }
};
</script>

<style lang="stylus" scoped>
.loading
  fixed: top 50% left 50%
  transform: translate(-50%, -50%)
</style>
