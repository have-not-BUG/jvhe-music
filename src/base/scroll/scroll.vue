<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BetterScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: true
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      pullup: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      _initScroll: function () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BetterScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let me = this;
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= this.scroll.maxScrollY + 50) {
              this.$emit('scrollToEnd')
            }
          })
        }
      },
      enable: function () {
        this.scroll && this.scroll.enable()
      },
      disable: function () {
        this.scroll && this.scroll.disable()
      },
      refresh: function () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo: function () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement: function () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }

    },
    mounted: function () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~common/stylus/variable"*/


</style>
