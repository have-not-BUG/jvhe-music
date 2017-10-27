<template>
  <transition name="slide">
    <div class="add-song" v-show="isShow" @click.stop>
      <div class="title-close">
        <h1>添加歌曲到播放列表中</h1>
        <div class="close">
          <i class="icon-close" @click="hide"></i>
        </div>
      </div>
      <div class="search-box-wrap">
        <search-box ref="searchBox" @inputWord="showInputWord" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="suggest-wrap" v-show="newInputWord">
        <suggest :newInputWord="newInputWord"
                 @pushBlur="getBlur"
                 @chooseIt="saveHistory"
                 :showSinger="false"
                 ref="suggest"
        ></suggest>
      </div>
      <div class="switch-wrap">
        <switches-tabs :switches="switches"
                       :currentIndex="currentIndex"
                       @select="chooseItem"
        ></switches-tabs>
      </div>

    </div>
  </transition>
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
  import { searchMixin } from 'common/js/mixin'
  import SwitchesTabs from 'base/switches/switches'

  export default {
    mixins: [searchMixin],
    data () {
      return {
        isShow: false,
        switches: [
          {name: '最近播放'},
          {name: '搜索历史'}
        ],
        currentIndex: 0
      }
    },
    methods: {
      show () {
        this.isShow = true
      },
      hide () {
        this.isShow = false
      },
      chooseItem (index) {
        this.currentIndex = index
      }
    },
    components: {
      SearchBox, Suggest, SwitchesTabs
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
    padding 10px 20px
    .title-close {
      display: flex
      align-items center
      justify-content center
      height 44px
      position relative
      h1 {
        font-size $font-size-large
      }
      .icon-close {
        font-size 20px
        color $color-theme
        position absolute
        right 10px
        top 22px
        transform translate(0, -50%)
      }
    }
    .search-box-wrap {
    }
    .suggest-wrap {
      .suggest {
        top 114px !important
        text-align left
      }
    }
    .switch-wrap {
      margin 25px auto
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform translate3d(100%, 0, 0)
  }


</style>
