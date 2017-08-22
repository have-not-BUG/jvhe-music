<template>
  <div class="tab">
    <router-link to="/recommend" tag="div" class="tab-item">推荐</router-link>
    <router-link to="/singer" tag="div" class="tab-item">歌手</router-link>
    <router-link to="/rank" tag="div" class="tab-item">排行</router-link>
    <router-link to="/search" tag="div" class="tab-item">搜索</router-link>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .tab {
    display flex
    justify-content center
    .tab-item {
      cursor pointer
      width 25%
      box-sizing border-box
      text-align center
      padding 10px 0

    }
  }

  .router-link-active {
    color $color-theme
    border-bottom 1px solid $color-theme
  }

</style>
