<template>
  <div class="search">
    <div class="input-box">
      <icon name="search"></icon>
      <input type="text" class="input" placeholder="搜点什么想听的吧..." ref="input">
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  activated() {
    this.$refs.input.focus();
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
</style>
