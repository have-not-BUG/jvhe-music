<template>
  <div class="progress-bar" ref="progressBar" @click="clickProgress">
    <div class="progress" ref="progress"></div>
    <div class="progress-btn-wrap" ref="progressBtnWrap"
         @touchstart.prevent="progressTouchStart"
         @touchmove.prevent="progressTouchMove"
         @touchend.prevent="progressTouchEnd">
      <div class="progress-btn"></div>
    </div>
  </div>
</template>

<script>
  const progressBtnWith = 16
  import { mapGetters } from 'vuex'
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.init) {
          this.changeProgress(newPercent * this.$refs.progressBar.clientWidth)
        }
      },
      fullScreen(newfullScreen) {
        if (newfullScreen) {
          if (!this.playing) {
            this.changeProgress(this.percent * this.$refs.progressBar.clientWidth)
          }
        }
      }

    },
    created(){
      this.touch = {}
    },
    methods: {
      progressTouchStart(e) {
        this.touch.init = true
        this.touch.touchStartX = e.touches[0].pageX
        this.touch.progressRunnedWidth = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.init) {
          return
        }
        let touchMoveto = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.progressRunnedWidth + (e.touches[0].pageX - this.touch.touchStartX)))
        this.changeProgress(touchMoveto)
        this.emitMove('touchMoving')
      },
      progressTouchEnd() {
        this.touch.init = false
        this.emitMove('touchMoveTo')
      },
      changeProgress(offset) {
        this.$refs.progress.style.width = offset + 'px'
        this.$refs.progressBtnWrap.style.left = offset - progressBtnWith / 2 + 'px'
      },
      emitMove(emitEvent) {
        let touchPercent = this.$refs.progress.clientWidth / this.$refs.progressBar.clientWidth
        this.$emit(emitEvent, touchPercent)
      },
      clickProgress(e) {
        const position = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - position.left
        this.changeProgress(offsetWidth)
        this.emitMove('touchMoveTo')
      }

    },
    computed: {
      ...mapGetters(['playing', 'fullScreen'])
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progress-bar {
    background-color $color-background-d
    position relative
    height 4px
    width 100%
    .progress {
      position absolute
      top 0
      left 0
      background-color $color-theme
      width 0
      height 4px
    }
    .progress-btn-wrap {
      position absolute
      top 50%
      left 0px
      transform translate(0, -50%)

      .progress-btn {
        box-sizing border-box
        width 16px
        height 16px
        border 3px solid #fff
        border-radius 50%
        background-color $color-theme

      }
    }
  }


</style>
