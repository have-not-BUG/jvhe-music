<template>
  <transition name="animation">
    <div class="top-tips" v-show="isShow" @click.stop="hide">
      <slot></slot>
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
    props: {
      delay: {
        type: Number,
        default: 2000
      }
    },
    methods: {
      show () {
        this.isShow = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.hide()
        }, this.delay)
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
  .top-tips {
    position fixed
    top 0
    left 0
    width 100%
    background: $color-dialog-background
    z-index 999
    &.animation-enter-active, &.animation-leave-active {
      transition all 0.3s
    }
    &.animation-enter, &.animation-leave-to {
      transform translate3d(0, -100%, 0)

    }
  }


</style>
