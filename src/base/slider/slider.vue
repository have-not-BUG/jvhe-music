<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

<script>
  import { addClass } from 'common/js/dom'
  import BetterScroll from 'better-scroll'

  export default {
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
      _setSliderWidth: function () {
        this.children = this.$refs.sliderGroup.children;
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;

        for (var i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }

        if (this.loop) {
          width += 2 * sliderWidth
        }

        this.$refs.sliderGroup.style.width = width + 'px'

      },
      _initSlider: function () {
        this.slider = new BetterScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop:this.loop,
            threshold:0.3,
            speed:400
          },

          click: true
        })
      }
    },
    mounted: function () {
      setTimeout(() => {
        this._setSliderWidth();
        this._initSlider();
      }, 20)

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider {
    min-height 1px
    .slider-group {
      position relative
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
  }

</style>
