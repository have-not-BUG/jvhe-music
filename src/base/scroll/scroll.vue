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
      },
      enable: function () {
        this.scroll && this.scroll.enable()
      },
      disable: function () {
        this.scroll && this.scroll.disable()
      },
      refresh: function () {
        this.scroll && this.scroll.refresh()
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
        }, 20)
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~common/stylus/variable"*/


</style>
