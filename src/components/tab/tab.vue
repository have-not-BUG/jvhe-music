<template>
  <div class="tab">
    <router-link to="/recommend" >推荐</router-link>
    <router-link to="/singer" >歌手</router-link>
    <router-link to="/rank" >排行</router-link>
    <router-link to="/search" >搜索</router-link>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

.router-link-active{
   color red
}

</style>
