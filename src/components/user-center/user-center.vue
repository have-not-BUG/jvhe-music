<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back-parts">
        <i class="icon-back" @click="goBack"></i>
        <switches :switches="switches" :currentIndex="currentIndex" @select="selectIndex"></switches>
      </div>
      <div class="random-play-and-source-wrap">
        <div class="random-play-all-button" @click="randomPlayLikeOrHistorySong" v-show="currentIndex!==2"><i
          class="icon-play"></i> 随机播放全部
        </div>
        <div class="music-source" v-show="currentIndex===2">
          <div class="qqmusic">
            <label for="qqmusic">QQ</label>
            <input type="radio" id="qqmusic" value="1" v-model="musicSource">
          </div>
          <div class="wymusic">
            <label for="wymusic">网易云</label>
            <input type="radio" id="wymusic" value="2" v-model="musicSource">
          </div>
          <h1>您选择的是{{musicSourceCover()}}</h1>
        </div>
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
        <div class="no-result-wrap">
          <no-result :title="showNoResultTitle()" v-show="showNoResult"></no-result>
        </div>
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
  import { playListMixin } from 'common/js/mixin'
  import NoResult from 'base/no-result/no-result'

  export default {
    mixins: [playListMixin],
    data () {
      return {
        currentIndex: 0,
        switches: [
          {name: '我喜欢的'},
          {name: '最近听的'},
          {name: '音乐平台'}
        ],
        musicSource: '1'
      }
    },
    computed: {
      ...mapGetters(['playHistory', 'likeList', 'musicSourceData'])
    },
    components: {
      Switches, Scroll, SongList, NoResult
    },
    methods: {
      handlePlayList (playList) {
        let bottom = playList.length > 0 ? '60px' : ''
        if (this.$refs.likeListScroll) {
          this.$refs.likeListScroll.$el.style.bottom = bottom
          this.$refs.likeListScroll.refresh()
        }
        if (this.$refs.playHistoryListScroll) {
          this.$refs.playHistoryListScroll.$el.style.bottom = bottom
          this.$refs.playHistoryListScroll.refresh()
        }

      },
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
        if (this.showNoResult()) {
          return
        }
        let list = this.currentIndex === 0 ? this.likeList : this.playHistory
        list = list.map((song) => {
          return new Song(song)
        })
        this.randomPlay({list})
      },
      showNoResult () {
        if (this.currentIndex === 0 && !this.likeList.length) {
          return true
        }
        if (this.currentIndex === 1 && !this.playHistory.length) {
          return true
        }
        if (this.currentIndex === 2) {
          return true
        }
      },
      showNoResultTitle () {
        if (this.currentIndex === 0 && !this.likeList.length) {
          return '您暂未收藏音乐哦'
        }
        if (this.currentIndex === 1 && !this.playHistory.length) {
          return '您暂未播放过歌曲哦'
        }
      },
      musicSourceCover () {
        if (this.musicSource === '1') {
          return 'QQ音乐'
        }
        if (this.musicSource === '2') {
          return '网易云音乐'
        }
      },
      ...mapActions(['insertSong', 'randomPlay', 'saveMusicSourceData'])
    },
    watch: {
      musicSource (newValue) {
        console.log(newValue)
        this.musicSource = newValue
        this.saveMusicSourceData(newValue)
      }
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
    .random-play-and-source-wrap {
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
      .music-source {
        div {
          display inline
        }
        h1 {
          margin 40px auto
        }

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
      .no-result-wrap {
        position fixed
        top 122px
        left 50%
        transform translate(-50%, 0)
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
