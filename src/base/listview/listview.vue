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
          <li class="under-classified-item" v-for=" item in includeClassifiedData.items">
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

  </scroll>


</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import { getOrSetAttributeData } from 'common/js/dom'

  let initialsNavigationSize = 16;
  export default {
    created(){
      this.touch = {};
      this.classifiedHeight = [];
      this.listenScroll = true;
      this.probeType = 3;
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data(){
      return {
        scrollY: -1,
        currentIndex: 0
      }
    },
    components: {
      Scroll
    },
    computed: {
      singerInitials(){
        return this.data.map((includeClassifiedData) => {
          return includeClassifiedData.title.substr(0, 1)
        })
      }
    },
    methods: {
      toInitialsSingers(e){
        let startnum = getOrSetAttributeData(e.target, 'index'),
          starttouch = e.touches[0];
        this.touch.pageY1 = starttouch.pageY;
        this.touch.startindex = startnum;
        this.$refs.listview.scrollToElement(this.$refs.includeClassified[startnum], 0);
        this.$Lazyload.lazyLoadHandler()
      },
      moveToInitialsSingers(e){
        let endtouch = e.touches[0];
        this.touch.pageY2 = endtouch.pageY
        let movednum = (this.touch.pageY2 - this.touch.pageY1) / initialsNavigationSize | 0;
        let movetonum = parseInt(this.touch.startindex) + parseInt(movednum);
        this.$refs.listview.scrollToElement(this.$refs.includeClassified[movetonum], 0);
        this.$Lazyload.lazyLoadHandler()

      },
      _computHeight(){
        let includeClassified = this.$refs.includeClassified,
          height = 0;
        for (let i = 0; i < includeClassified.length; i++) {
          height += includeClassified[i].clientHeight
          this.classifiedHeight.push(height);
        }
        console.log('classifiedHeight', this.classifiedHeight)
      },
      scroll(pos){
        this.scrollY = pos.y

      }

    },
    watch: {
      data(){
        setTimeout(() => {
          this._computHeight()
        }, 20)
      },
      scrollY(newY){
        let classifiedHeight = this.classifiedHeight;
        if (newY > 0 || newY === 0 || -newY < classifiedHeight[0]) {
          this.currentIndex = 0
          return
        }
        for (let i = 0; i < classifiedHeight.length - 1; i++) {
          let height1 = classifiedHeight[i],
            height2 = classifiedHeight[i + 1];
          if (-newY > height1 && -newY < height2) {
            this.currentIndex = i + 1
            console.log(this.currentIndex);
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
      position: relative
      width: 100%
      overflow: hidden
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
          padding: 20px 0 0 30px
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
  }


</style>
