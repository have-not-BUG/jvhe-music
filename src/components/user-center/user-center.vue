<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back-parts">
        <i class="icon-back" @click="goBack"></i>
        <switches :switches="switches" :currentIndex="currentIndex" @select="selectIndex"></switches>
      </div>
      <div class="random-play-all-wrap">
        <div class="random-play-all-button" @click="randomPlayLikeOrHistorySong"><i class="icon-play"></i> 随机播放全部</div>
      </div>
      <div class="like-play-history-wrap">
        <scroll ref="likeListScroll" class="like-list-scroll" :data="likeList" v-if="currentIndex===0">
          <div class="like-list-wrap">
            <song-list :songs="likeList" @selectEvent="playSelectSong"></song-list>
          </div>
        </scroll>
        <scroll ref="playHistoryListScroll" class="play-history-list-scroll" :data="playHistory" v-if="currentIndex===1"
        >
          <div class="play-history-wrap">
            <song-list :songs="playHistory" @selectEvent="playSelectSong"></song-list>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
  import Switches from 'base/switches/switches'
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import { mapGetters, mapActions } from 'vuex'
  import Song from 'common/js/song'

  export default {
    data () {
      return {
        currentIndex: 0,
        switches: [
          {name: '我喜欢的'},
          {name: '最近听的'}
        ]

      }
    },
    computed: {
      ...mapGetters(['playHistory', 'likeList'])
    },
    components: {
      Switches, Scroll, SongList
    },
    methods: {
      selectIndex (index) {
        this.currentIndex = index
      },
      goBack () {
        this.$router.back()
      },
      playSelectSong (song) {
        this.insertSong(new Song(song))
      },
      randomPlayLikeOrHistorySong () {
        let list = this.currentIndex === 0 ? this.likeList : this.playHistory
        list = list.map((song) => {
          return new Song(song)
        })
        this.randomPlay({list})
      },
      ...mapActions(['insertSong', 'randomPlay'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .user-center {
    position fixed
    z-index 90
    top 0
    left 0
    right 0
    bottom 0
    background: $color-background
    padding 10px 20px
    .back-parts {
      display flex
      align-items center
      i {
        font-size $font-size-large-x
        color $color-theme
      }
    }
    .random-play-all-wrap {
      position absolute
      left 50%
      top 72px
      transform translate(-50%, 0)
      text-align center
      color $color-text-l
      .random-play-all-button {
        box-sizing border-box
        width 135px
        padding 7px 0
        border 1px solid $color-text-l
        border-radius 100px
        font-size $font-size-medium
      }
    }
    .like-play-history-wrap {
      .like-list-scroll, .play-history-list-scroll {
        position fixed
        top 122px
        bottom 0
        left 0
        right 0
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
