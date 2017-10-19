<template>
  <div class="history-list">
    <p>{{title}}</p>
  </div>

</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '老师'
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .history-list{
    text-align center
    p{
      color $color-text-d
      font-size $font-size-medium
    }
  }



</style>
