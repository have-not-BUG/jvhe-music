<template>
  <div class="header">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      msg: '巨盒音乐'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header{
    text-align center
    padding 5px 0
    height 40px
    line-height 40px
    box-sizing border-box
    font-size $font-size-large
  }

</style>
