<template>
  <div class="search-wrap">
    <div class="search-box-wrap">
      <search-box></search-box>
    </div>

  </div>
</template>

<script>
  import searchBox from 'base/search-box/search-box'
  export default {
    data() {
      return {
        msg: '搜索页面'
      }
    },
    components: {
      searchBox
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-wrap{
    .search-box-wrap{
      margin 20px
    }
  }

</style>
