<template>
  <transition name="slide">
    <div class="add-song" v-show="isShow" @click.stop>
      <top-tips ref="topTips" class="top-tips">
        <div class="top-tips-icon-title">
          <i class="icon-ok"></i>
          <span class="top-tips-title">一首歌曲已被添至播放列表</span>
        </div>
      </top-tips>
      <div class="title-close">
        <h1>点击歌曲添至播放列表中</h1>
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
      <div class="switch-wrap" v-show="!newInputWord">
        <switches-tabs :switches="switches"
                       :currentIndex="currentIndex"
                       @select="chooseItem"
        ></switches-tabs>
      </div>
      <div class="play-search-history-wrap" v-if="!newInputWord">
        <scroll ref="songListScroll" class="song-list-scroll" :data="playHistory" v-if="currentIndex===0">
          <div class="song-list-wrap">
            <song-list :songs="playHistory" @selectEvent="playSelectSong"></song-list>
          </div>
        </scroll>
        <scroll ref="historyListScroll" class="history-list-scroll" :data="searchHistory" v-if="currentIndex===1" :refreshDelay="refreshDelay">
          <div class="history-list-wrap">
            <history-list :searches="searchHistory" @chooseIt="deleteOne" @clickSavedWord="changeWord"></history-list>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
  import { searchMixin } from 'common/js/mixin'
  import SwitchesTabs from 'base/switches/switches'
  import { mapGetters, mapActions } from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import Song from 'common/js/song'
  import HistoryList from 'base/history-list/history-list'
  import TopTips from 'base/top-tips/top-tips'

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
    computed: {
      ...mapGetters(['playHistory'])
    },
    methods: {
      show () {
        this.isShow = true
        setTimeout(() => {
          if (this.currentIndex === 0) {
            this.$refs.songListScroll.refresh()
          }
          if (this.currentIndex === 1) {
            this.$refs.historyListScroll.refresh()
          }
        }, 20)
      },
      hide () {
        this.isShow = false
      },
      chooseItem (index) {
        this.currentIndex = index
      },
      playSelectSong (song, index) {
        if (index > 0) {
          this.insertSong(new Song(song))
          this.$refs.topTips.show()
        }
      },
      ...mapActions(['insertSong'])

    },
    components: {
      SearchBox, Suggest, SwitchesTabs, Scroll, SongList, HistoryList, TopTips
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
    .top-tips{
      height 54px
      line-height 54px
      .icon-ok{
        color $color-theme
      }
    }
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
        right 5px
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
    .play-search-history-wrap {
      .song-list-scroll {
        position fixed
        top 166px
        bottom 0
        left 0
        right 0
        text-align left
        overflow hidden
      }

      .history-list-scroll {
        position fixed
        top 166px
        bottom 0
        left 20px
        right 20px
        text-align left
        overflow hidden

      }
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform translate3d(100%, 0, 0)
  }


</style>
