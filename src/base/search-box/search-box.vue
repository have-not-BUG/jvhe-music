<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="search-input" type="search" :placeholder="placeholder">
  </div>

</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-box {
    display flex
    align-items center
    justify-content center
    box-sizing border-box
    border-radius 6px
    height 40px
    padding 10px 5px
    background-color $color-highlight-background


    .icon-search {
      font-size 24px


    }
    .search-input {
      flex 1
      background-color $color-highlight-background
      margin 0 5px
      line-height 18px
      font-size $font-size-medium
      color $color-text
    }
  }


</style>
