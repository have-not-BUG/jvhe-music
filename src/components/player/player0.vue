<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal-player">
      <div class="normal-player-wrap" v-show="fullScreen">
        <div class="player-bg"><img :src="currentSong.image" :alt="currentSong.name"></div>
        <div class="player-top">
          <i class="icon-back" @click="showMiniPlayer"></i>
          <h1 class="song-name" v-html="currentSong.name"></h1>
          <h1 class="singer" v-html="currentSong.singer"></h1>
        </div>
        <div class="player-middle"
             @touchstart="middleTouchStart"
             @touchmove="middleTouchMove"
             @touchend="middleTouchEnd"
             ref="playMiddle"
        >
          <div class="player-middle-left" ref="playerMiddleLeft">
            <div class="cd-wrap" ref="cdWrap">
              <div class="cd-border" :class="normalCdStateClass" ref="cdBorder">
                <img :src="currentSong.image" :alt="currentSong.name">
              </div>
            </div>
            <div class="song-lyric-wrap">
              <p class="playing-lyric">{{playingLyric}}</p>
            </div>
          </div>
          <scroll class="player-middle-right"
                  :data="currentLyric && currentLyric.lines"
                  v-if="currentLyric &&currentLyric.lines"
                  ref="playerMiddleRight"
          >
            <div class="lyric-wrap">
              <p v-for="(line,index) in currentLyric.lines"
                 :class="{'light-current-line':index===currentLyricLineNum}"
                 ref="lyricLine"
              >
                {{line.txt}} </p>
            </div>
          </scroll>
        </div>
        <div class="player-bottom">
          <div class="show-page">
            <div class="dot" :class="{active:showCurrentPage==='cd'}"></div>
            <div class="dot" :class="{active:showCurrentPage==='lyric'}"></div>
          </div>
          <div class=" progress-bar-wrap
            ">
            <span>{{runningTime}}</span>
            <progress-bar :percent="percent" @touchMoveTo="ontouchMoveTo" @touchMoving="ontouchMoving"></progress-bar>
            <span>{{totalTime}}</span>
          </div>
          <div class="control-part">
            <i :class="playModeIco" @click="changePlayMode"></i>
            <i class="icon-prev" @click="playPrevSong" :class="disableClass"></i>
            <i class="needsclick" :class="normalPlayStateClass" @click="changePlayState"></i>
            <i class="icon-next" @click="playNextSong" :class="disableClass"></i>
            <i class="icon icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini-player">
      <div class="mini-player-wrap" v-show="!fullScreen" @click="showFullScreen">
        <div class="image-name-singer">
          <div class="mini-cd-wrap" ref="miniCdWrap">
            <img :class="miniCdStateClass" :src="currentSong.image" :alt="currentSong.name">
          </div>
          <div class="name-singer">
            <h2>{{currentSong.name}}</h2>
            <p>{{currentSong.singer}}</p>
          </div>

        </div>
        <div class="state-playlist">
          <progress-circle :percent="percent" :radius="radius">
            <i class="icon-mini" :class="miniPlayStateClass" @click.stop="changePlayState"></i>
          </progress-circle>
          <i class="icon-playlist" @click.stop="showPlayList"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio"
           @canplay="changeCanplay" @error="playError"
           @timeupdate="audioUpDateTime" @ended="audioEnded"></audio>
    <play-list ref="playList"></play-list>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import progressBar from 'base/progress-bar/progress-bar'
  import progressCircle from 'base/progress-circle/progress-circle'
  import { playMode } from 'common/js/config'
  import { shuffle } from 'common/js/util'
  import QQLyric from 'lyric-parser'
  import Scroll from 'base/scroll/scroll'
  import { prefixStlye } from 'common/js/dom'
  import PlayList from 'components/play-list/play-list'

  let transform = prefixStlye('transform')
  let transitionDuration = prefixStlye('transitionDuration')
  export default {
    computed: {
      normalPlayStateClass () {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniPlayStateClass () {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      normalCdStateClass () {
        return this.playing ? 'play' : ''
      },
      miniCdStateClass () {
        return this.playing ? 'play' : ''
      },
      disableClass () {
        return this.canplay ? '' : 'disable'
      },
      runningTime () {
        return this.changingAudioProgress ? this.showMinuteAndSecond(this.changeAudioProgressTime) : this.showMinuteAndSecond(this.currentTime)
      },
      totalTime () {
        return this.showMinuteAndSecond(this.currentSong.duration)
      },
      percent () {
        return this.currentTime / this.currentSong.duration
      },
      playModeIco () {
        return this.mode === playMode.order ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
      showCurrentPage () {
        return this.currentPage === 'cd' ? 'cd' : 'lyric'
      },
      ...mapGetters(['playing', 'fullScreen', 'playList', 'currentSong', 'currentIndex', 'mode', 'orderPlayList'])
    },
    data () {
      return {
        canplay: false,
        currentTime: 0,
        bigCdMiniPausedDeg: 0,
        changeAudioProgressTime: 0,
        changingAudioProgress: false,
        radius: 32,
        currentLyric: null,
        currentLyricLineNum: 0,
        currentPage: 'cd',
        playingLyric: ''
      }
    },
    methods: {
      showPlayList () {
        this.$refs.playList.show()
      },
      showMiniPlayer () {
        this.setFullScreen(false)
      },
      showFullScreen () {
        this.setFullScreen(true)
      },
      changePlayState () {
        this.setPlaying(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }

      },
      playPrevSong () {
        if (!this.canplay) {
          return
        }

        if (this.playList.length === 1) {
          this.runLoopMode()
        } else {

          this.setCurrentIndex(this.currentIndex - 1)
          if (this.currentIndex === -1) {
            this.setCurrentIndex(this.playList.length - 1)
          }
          if (!this.playing) {
            this.changePlayState()
          }
        }
        this.canplay = false

      },
      playNextSong () {
        if (!this.canplay) {
          return
        }
        if (this.playList.length === 1) {
          this.runLoopMode()
        } else {
          if (this.currentIndex === this.playList.length - 1) {
            this.setCurrentIndex(-1)
          }
          this.setCurrentIndex(this.currentIndex + 1)
          if (!this.playing) {
            this.changePlayState()
          }
        }
        this.canplay = false
      },
      changeCanplay () {
        this.canplay = true
      },
      playError () {
        this.canplay = true
      },
      audioUpDateTime (e) {
        this.currentTime = e.target.currentTime
      },
      showMinuteAndSecond (time) {
        const minute = time / 60 | 0
        const second = this.addDigits(time % 60 | 0)
        return `${minute}:${second}`
      },
      addDigits (num, n = 2) {
        let numLength = num.toString().length
        while (numLength < n) {
          num = '0' + num
          numLength++
        }
        return num
      },
      getCurrentDeg (runningtime, animationLength) {
//        let currentDeg = ((360 / animationLength) * runningtime) % 360
//        let cosVal = Math.cos(currentDeg * Math.PI / 180)
//        let sinVal = Math.sin(currentDeg * Math.PI / 180)
//        return 'matrix(' + cosVal.toFixed(6) + ',' + sinVal.toFixed(6) + ',' + (-1 * sinVal).toFixed(6) + ',' + cosVal.toFixed(6) + ',0,0)'
//
        return ((360 / animationLength) * runningtime) % 360
      },
      ontouchMoveTo (touchPercent) {
        let currentTimeByPercent = this.currentSong.duration * touchPercent
        this.changingAudioProgress = false
        this.$refs.audio.currentTime = currentTimeByPercent
        if (this.currentLyric) {
          this.currentLyric.seek(currentTimeByPercent * 1000)
        }
        if (!this.playing) {
          this.changePlayState()
        }
      },
      ontouchMoving (touchPercent) {
        this.changingAudioProgress = true
        this.changeAudioProgressTime = this.currentSong.duration * touchPercent
        if (this.currentLyric) {
          this.currentLyric.seek(this.changeAudioProgressTime * 1000)
        }

      },
      changePlayMode () {
        const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let list = null
        if (this.mode === playMode.random) {
          list = shuffle(this.orderPlayList)
        } else {
          list = this.orderPlayList
        }
        this.restCurrentIndex(list)
        this.setPlayList(list)
      },
      restCurrentIndex (list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      runLoopMode () {
        this.$refs.audio.currentTime = 0
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
        this.$refs.audio.play()

      },
      audioEnded () {
        if (this.mode === playMode.loop) {
          this.runLoopMode()
        } else {
          this.playNextSong()
        }
      },
      getQQLyric () {
        this.currentSong.getQQLyricInSongClass().then(res => {
          this.currentLyric = new QQLyric(res, this.lyricHandle)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch((err) => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLyricLineNum = 0

          console.log('获取QQ音乐歌词出错了getQQLyricInSongClass', err)
        })
      },
      lyricHandle ({lineNum, txt}) {
        this.currentLyricLineNum = lineNum
        let showCurrentEle = this.$refs.lyricLine[lineNum - 5]
        if (lineNum > 5) {
          this.$refs.playerMiddleRight.scrollToElement(showCurrentEle, 1000)
        } else {
          this.$refs.playerMiddleRight.scrollTo(0, 0, 1000)
        }
        this.playingLyric = txt
      },
      middleTouchStart (e) {
        this.touch.init = true
        this.touch.startPageX = e.touches[0].pageX
        this.touch.startPageY = e.touches[0].pageY
        this.touch.moved = false

      },
      middleTouchMove (e) {
        if (!this.touch.init) {
          return
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }

        this.touch.movedPageX = e.touches[0].pageX - this.touch.startPageX
        this.touch.movedPageY = e.touches[0].pageY - this.touch.startPageY
        if (Math.abs(this.touch.movedPageX) > Math.abs(this.touch.movedPageY)) {
          let left = this.currentPage === 'cd' ? 0 : -window.innerWidth
          let offsetWidth = Math.min(0, Math.max(-window.innerWidth, this.touch.movedPageX + left))
          this.$refs.playerMiddleRight.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
          this.touch.percent = offsetWidth / -window.innerWidth
          this.$refs.playerMiddleLeft.style.opacity = 1 - this.touch.percent
        }
      },
      middleTouchEnd () {
        if (!this.touch.moved) {
          return
        }
        if (Math.abs(this.touch.movedPageX) > Math.abs(this.touch.movedPageY)) {
          if (this.currentPage === 'cd') {
            if (this.touch.percent > 0.1) {
              this.$refs.playerMiddleRight.$el.style[transform] = `translate3d(${-window.innerWidth}px,0,0)`
              this.currentPage = 'lyric'
              this.$refs.playerMiddleLeft.style.opacity = 0

            } else {
              this.$refs.playerMiddleRight.$el.style[transform] = `translate3d(0,0,0)`
            }
          } else {
            if (this.touch.percent < 0.9) {
              this.$refs.playerMiddleRight.$el.style[transform] = `translate3d(0,0,0)`
              this.currentPage = 'cd'
              this.$refs.playerMiddleLeft.style.opacity = 1
            } else {
              this.$refs.playerMiddleRight.$el.style[transform] = `translate3d(${-window.innerWidth}px,0,0)`

            }
          }
          this.$refs.playerMiddleRight.$el.style[transitionDuration] = '300ms'

        }

        this.touch.init = false

      },
      ...mapMutations({
        setFullScreen: 'SET_FULLSRCEEN',
        setPlaying: 'SET_PLAYING',
        setCurrentIndex: 'SET_CURRENTINDEX',
        setPlayMode: 'SET_MODE',
        setPlayList: 'SET_PLAYLIST'
      })
    },
    watch: {
      currentSong (newSong, oldSong) {
        if (newSong.id === oldSong.id) {
          return
        }
        this.$nextTick(() => {
          this.setPlaying(false)
          setTimeout(() => {
            if (this.currentLyric) {
              this.currentLyric.stop()
            }
            this.$refs.audio.play()
            this.setPlaying(true)
            this.$refs.cdWrap.style.transform = `rotate(0deg)`
            this.$refs.miniCdWrap.style.transform = `rotate(0deg)`
            this.getQQLyric()
          }, 500)
        })
      },
      playing (newPlaying) {
        let audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
          if (!newPlaying) {
            let bigCdPauseDeg = this.getCurrentDeg(this.currentTime, 20)
            let smallCdPauseDeg = this.getCurrentDeg(this.currentTime, 10)
            this.$refs.cdWrap.style.transform = `rotate(${bigCdPauseDeg}deg)`
            this.$refs.miniCdWrap.style.transform = `rotate(${smallCdPauseDeg}deg)`
          }
        })
      },
      fullScreen (newfullScreen) {
        let pausedTime = this.currentTime
        this.bigCdMiniPausedDeg = this.getCurrentDeg(pausedTime, 20)
        let smallCdShowDeg = this.getCurrentDeg(pausedTime, 10)
        if (this.playing && !newfullScreen) {
          this.$refs.miniCdWrap.style.transform = `rotate(${smallCdShowDeg}deg)`

        }
        if (this.playing && newfullScreen) {
          this.$refs.cdWrap.style.transform = `rotate(${this.bigCdMiniPausedDeg}deg)`

        }

      }

    },
    created () {
      this.touch = {}
    },
    components: {
      progressBar, progressCircle, Scroll, PlayList
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .player {
    text-align center
    z-index: 91
    position relative
    .normal-player-wrap {
      &.normal-player-enter-active, &.normal-player-leave-active {
        transition all 0.4s
        .player-top, .player-bottom {
          transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        }
      }
      &.normal-player-enter, &.normal-player-leave-to {
        opacity 0
        .player-top {
          transform translate3d(0, -100px, 0)
        }
        .player-bottom {
          transform translate3d(0, 100px, 0)
        }

      }
      /*z-index 100*/
      width 100%
      height 100%
      position fixed
      top 0
      left 0
      bottom 0
      right 0
      background-color $color-background

      .player-bg {
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        z-index -1
        filter blur(20px)
        opacity: 0.6
        img {
          width 100%
          height 100%
        }

      }
      .player-top {
        color $color-text
        position relative
        .icon-back {
          position absolute
          top 40%
          transform rotate(-90deg)
          left 20px
          font-size $font-size-large-x
          color $color-theme
          z-index 1
        }
        .song-name {
          font-size $font-size-large
          line-height 40px
          height 40px
          position relative
          no-wrap()
          padding 0 50px
        }
        .singer {
          font-size $font-size-medium-size-large
          line-height 20px
          height 20px
          width 80%
          margin 0 auto
          no-wrap()
        }

      }
      .player-middle {
        position fixed
        top 70px
        bottom 170px
        white-space: nowrap
        width 100%
        .player-middle-left {
          width 100%
          display inline-block

          .cd-wrap {
            padding-top 80%
            height 0
            width 100%
            position relative
            .cd-border {
              box-sizing border-box
              border 10px solid hsla(0, 0%, 100%, .1)
              border-radius 50%
              position absolute
              top 0
              left 10%
              width 80%
              height 100%

              &.play {
                animation rotate 20s linear infinite
              }
              &.pause {
                animation-play-state paused
              }

              img {
                display block
                width 100%
                height 100%
                border-radius 50%
              }
            }
          }

          .song-lyric-wrap {
            font-size $font-size-medium
            color $color-text-l
            margin 10px 0 0 0
            .playing-lyric {
              width 80%
              margin 0 auto
              overflow hidden
            }
          }

        }
        .player-middle-right {
          width 100%
          height 100%
          vertical-align: top
          display inline-block
          overflow hidden

          .lyric-wrap {

            .light-current-line {
              color $color-text
              font-weight bold
              font-size $font-size-medium
            }
            p {
              overflow hidden
              width 80%
              margin 20px auto
              font-size $font-size-medium
              color $color-text-ll

            }
          }

        }

      }

      .player-bottom {
        position absolute
        bottom 15px
        left 50%
        width 80%
        margin 0 auto
        transform translate(-50%, 0)

        .show-page {
          .dot {
            width 8px
            height 8px
            border-radius 50%
            background-color $color-text-l
            display inline-block
            vertical-align middle
            font-size 0
            margin 0 4px
            &.active {
              width 20px
              border-radius 5px
              background-color $color-text
            }
          }

        }
        .progress-bar-wrap {
          display flex
          /*width 80%*/
          margin 0 auto
          height 30px
          align-items center
          span {
            padding 0 10px
          }

        }
        .control-part {

          /*width 80%*/
          margin 0 auto
          display flex
          justify-content space-around
          align-items center
          font-size 30px
          i {
            color $color-theme
          }
          i.disable {
            color: $color-theme-d
          }
          .icon-play, .icon-pause {
            font-size 40px
          }
        }

      }
    }
    .mini-player-wrap {
      color $color-theme
      width 100%
      height 60px
      background-color $color-highlight-background
      display flex
      justify-content space-between
      align-items center
      position fixed
      bottom 0
      left 0
      .image-name-singer {
        padding 0 0 0 20px
        position relative
        .mini-cd-wrap {
          width 40px
          height 40px
          img {
            width 40px
            height 40px
            border-radius 50%

            &.play {
              animation rotate 10s linear infinite
            }
            &.pause {
              animation-play-state paused
            }

          }
        }
        .name-singer {
          position absolute
          left 70px
          top 50%
          transform translate(0, -50%)
          width 100%
          white-space nowrap
          word-wrap normal
          h2 {
            color $color-text
            font-size $font-size-medium
            margin-bottom 5px
          }
          p {
            color $color-text-d
            font-size $font-size-small

          }

        }
      }
      .state-playlist {
        color $color-theme-d
        padding 0 10px 0 0
        font-size 30px
        display flex
        .icon-mini {
          font-size 32px
          position absolute
          left 0
          top 0
        }
        .icon-playlist {
          padding-left 20px
        }

      }

    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0)
    }

    to {
      transform: rotate(1turn)
    }
  }


</style>
