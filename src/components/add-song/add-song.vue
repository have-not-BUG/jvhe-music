<template>
  <transition name="slide">
    <div class="add-song"  v-show="isShow" @click.stop>
      <div class="title-close">
        <h1>添加歌曲到播放列表中</h1>
        <div class="close">
          <i class="icon-close" @click="hide"></i>
        </div>
      </div>
      <div class="search-box-wrap">

      </div>
      <div class="tabs">

      </div>

    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      show () {
        this.isShow = true
      },
      hide () {
        this.isShow = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .add-song {
    position fixed
    z-index 90
    top 0
    left 0
    right 0
    bottom 0
    background: $color-background
  }

  .slide-enter-active, .slide-leave-active {
    transition all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform translate3d(100%, 0, 0)
  }


</style>
