<template>
  <div class="header">
    <h1>巨盒音乐<router-link to="/user" tag="i" class="icon-mine"></router-link></h1>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header {
    text-align center
    padding 5px 0
    height 40px
    line-height 40px
    box-sizing border-box
    font-size $font-size-large
    h1 {
      position relative
      i {
        position absolute
        top 0
        right 20px
        transform translate(0, 50%)
        color $color-theme
      }
    }
  }

</style>
