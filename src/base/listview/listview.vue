<template>
  <scroll class="list-view"
          :data="data"
          ref="listview"
          :probeType="probeType"
          @scroll="scroll"
  >
    <ul class="singers-wrapper">
      <li v-for="includeClassifiedData in data" ref="includeClassified">
        <h2 class="classified-title"> {{includeClassifiedData.title}}</h2>
        <ul class="under-classified-wrapper">
          <li class="under-classified-item"
              v-for=" item in includeClassifiedData.items"
              @click="chooseItem(item)"
          >
            <img class="avatar" v-lazy="item.avatar" :alt="item.name">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="initials-navigation"
        @touchstart="toInitialsSingers"
        @touchmove.stop.prevent="moveToInitialsSingers">
      <li v-for="(item,index) in singerInitials"
          :data-index="index" :class="{'showcurrent':currentIndex===index}">
        {{item}}
      </li>
    </ul>
    <div :class="{'classified-fixed-title':scrollY <0 }" ref="classifiedFixedTitle">
      <h2>{{classifiedFixedTitle}}</h2>
    </div>

    <div class="loading-wrapper" v-show="!data.length">
      <loading></loading>
    </div>

  </scroll>


</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import { getOrSetAttributeData } from 'common/js/dom'
  import Loading from 'base/loading/loading'

  let initialsNavigationSize = 16
  export default {
    created () {
      this.touch = {}
      this.classifiedHeight = []
      this.listenScroll = true
      this.probeType = 3

    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        scrollY: -1,
        currentIndex: 0
      }
    },
    components: {
      Scroll,
      Loading
    },
    computed: {
      singerInitials () {
        return this.data.map((includeClassifiedData) => {
          return includeClassifiedData.title.substr(0, 1)
        })
      },
      classifiedFixedTitle () {
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''

      }

    },
    methods: {
      refresh () {
        this.$refs.listview.refresh()
      },
      toInitialsSingers (e) {
        let startnum = getOrSetAttributeData(e.target, 'index'),
          starttouch = e.touches[0]
        this.touch.pageY1 = starttouch.pageY
        this.touch.startindex = parseInt(startnum)
        this._scrollTo(startnum)

      },
      moveToInitialsSingers (e) {
        let endtouch = e.touches[0]
        this.touch.pageY2 = endtouch.pageY
        let movednum = parseInt((this.touch.pageY2 - this.touch.pageY1) / initialsNavigationSize | 0)
        let movetonum = this.touch.startindex + movednum
        this._scrollTo(movetonum)
      },
      _scrollTo (index) {
        let num = parseInt(index)

        if (num === 0 || num < 0) {
          this.scrollY = 0
          num = 0

        } else if (num > this.classifiedHeight.length - 1) {
          num = this.classifiedHeight.length - 1
          this.scrollY = -(this.classifiedHeight[num - 1])
        }
        else {
          this.scrollY = -(this.classifiedHeight[num - 1])
        }

        this.$refs.listview.scrollToElement(this.$refs.includeClassified[num], 0)

      },
      _computHeight () {
        let includeClassified = this.$refs.includeClassified,
          height = 0
        for (let i = 0; i < includeClassified.length; i++) {
          height += includeClassified[i].clientHeight
          this.classifiedHeight.push(height)
        }
      },
      scroll (pos) {
        this.scrollY = pos.y

      },
      chooseItem (item) {
        this.$emit('choose', item)
      }

    },
    watch: {
      data () {
        setTimeout(() => {
          this._computHeight()
        }, 20)
      },
      scrollY (newY) {
        let classifiedHeight = this.classifiedHeight
        if (newY > 0 || newY === 0 || -newY < classifiedHeight[0]) {
          this.currentIndex = 0
          return
        }
        for (let i = 0; i < classifiedHeight.length - 1; i++) {
          let height1 = classifiedHeight[i],
            height2 = classifiedHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i + 1
            return
          }

        }

        this.currentIndex = classifiedHeight.length

      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .list-view {
    height 100%
    overflow hidden
    position relative
    .singers-wrapper {
      position relative
      width 100%
      overflow hidden
      .classified-title {
        color $color-text-l
        background-color #333
        padding-left 20px
        line-height 30px
        height 30px
        font-size $font-size-small
      }
      .under-classified-wrapper {
        .under-classified-item {
          padding: 15px 0 15px 30px
          display flex
          align-items center
          .avatar {
            width 50px
            height 50px
            border-radius 50%
          }
          span {
            color $color-text-l
            font-size $font-size-medium
            margin-left 20px
          }
        }

      }
    }
    .initials-navigation {
      position absolute
      top 0
      right 0
      padding 5px 2px
      background-color $color-background-d
      z-index 9
      li {
        height 14px
        line-height 14px
        padding 1px 3px
        font-size $font-size-small-s
        color $color-text-l
        &.showcurrent {
          color: $color-theme
        }
      }

    }
    .classified-fixed-title {
      position fixed
      top 90px
      left 0
      width 100%
      padding-left 20px
      background-color #333
      color: $color-theme
      line-height 30px
      height 30px
      font-size $font-size-small
    }
    .loading-wrapper {
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)

    }
  }


</style>
