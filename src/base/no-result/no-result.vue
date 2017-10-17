<template>
  <div class="no-result">
    <p>{{title}}</p>
  </div>

</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .no-result{
    text-align center
    p{
      color $color-text-d
      font-size $font-size-medium
    }
  }



</style>
