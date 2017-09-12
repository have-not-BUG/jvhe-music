<template>
  <div class="singer-detail-wrapper">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'singer-detail',
  data () {
    return {
      msg: '歌手详情页面'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer-detail-wrapper{
    position fixed
    z-index 9999
    top 0
    left 0
    right 0
    bottom 0
    background-color #000
  }


</style>
