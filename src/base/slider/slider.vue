<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item , index) in dots" v-bind:class="{active: currentPageIndex===index }">
      </span>
    </div>
  </div>
</template>

<script>
  import { addClass } from 'common/js/dom'
  import BetterScroll from 'better-scroll'

  export default {
    data: function () {
      return {
        dots: [],
        currentPageIndex: 0
      }

    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    methods: {
      _setSliderWidth: function (isResize) {
        this.children = this.$refs.sliderGroup.children;
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;

        for (var i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }

        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }

        this.$refs.sliderGroup.style.width = width + 'px'

      },
      _initDots: function () {
        this.dots = new Array(this.children.length)
      },
      _initSlider: function () {
        this.slider = new BetterScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
        })
        this.slider.on("scrollEnd", () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this._sliderPlay();
          }

        })
      },
      _sliderPlay: function () {
        let pageIndex = this.currentPageIndex + 1;
        if (this.loop) {
          pageIndex += 1
        }

        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)

      }
    },
    mounted: function () {
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();
        if (this.autoPlay) {
          this._sliderPlay();
        }
      }, 20);

      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })

    },
    destroyed: function () {
      clearTimeout(this.timer)
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider {
    min-height 1px
    position relative
    overflow hidden
    .slider-group {
      overflow hidden
      white-space nowrap
      &:after {
        content ""
        display block
        clear both
      }
      .slider-item {
        float left
        overflow hidden
        box-sizing border-box
        text-align center
        img {
          width 100%
          display block
        }
      }
    }
    .dots {
      position absolute
      bottom 6px
      left 50%
      transform translateX(-50%)
      .dot {
        box-sizing border-box
        padding 3px
        margin 0 2.5px
        display inline-block
        border-radius 2.5px
        background-color rgba(144, 144, 144, .8)
        &.active {
          background-color $color-theme
        }
      }
    }
  }

</style>
