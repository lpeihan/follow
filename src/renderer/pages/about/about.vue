<template>
  <div class="about">
    <div class="logo-wrapper">
      <img src="@/assets/imgs/logo.png" class="logo" @click="go">
      <span class="version">V 1.0.0</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    go() {
      this.$electron.shell.openExternal('https://github.com/lpeihan/follow');
    }
  }
};
</script>

<style lang="stylus" scoped>
.about
  display: flex
  align-items: center
  justify-content: center
  .logo-wrapper
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    .logo
      width: 100px
    .version
      margin-left: 10px
      color: $color-text-l
</style>
