<template>
  <scroll class="list-view" :data="data">
    <ul class="singers-wrapper">
      <li v-for="includeClassifiedData in data">
        <h2>  {{includeClassifiedData.title}}</h2>
        <ul>
          <li v-for=" item in includeClassifiedData.items">
            <img v-lazy="item.avatar" :alt="item.name">
            <span>{{item.name}}</span>
          </li>
        </ul>

      </li>
    </ul>

  </scroll>


</template>

<script>
  import Scroll from 'base/scroll/scroll'

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    components: {
      Scroll
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .list-view{
    height 100%
    overflow hidden
    .singers-wrapper{
      position: relative
      width: 100%
      overflow: hidden
    }
  }



</style>
