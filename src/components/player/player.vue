<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal-player">
      <div class="normal-player-wrap" v-show="fullScreen">
        <div class="player-bg"><img :src="currentSong.image" :alt="currentSong.name"></div>
        <div class="player-top">
          <h1 class="song-name"><i class="icon-back" @click="showMiniPlayer"></i>{{currentSong.name}}</h1>
          <h1 class="singer">{{currentSong.singer}}</h1>
        </div>
        <div class="player-middle">
          <div class="cd-wrap">
            <div class="cd-border" :class="normalCdStateClass">
              <img :src="currentSong.image" :alt="currentSong.name">
            </div>
          </div>
          <div class="song-lyric">歌词</div>
        </div>
        <div class="player-bottom">
          <div class="show-page">分页</div>
          <div class="progress-bar-wrap">{{runningTime}} | {{totalTime}} </div>
          <div class="control-part">
            <i class="icon-sequence"></i>
            <i class="icon-prev" @click="playPrevSong" :class="disableClass"></i>
            <i class="needsclick" :class="normalPlayStateClass" @click="changPlayState"></i>
            <i class="icon-next" @click="playNextSong" :class="disableClass"></i>
            <i class="icon icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini-player">
      <div class="mini-player-wrap" v-show="!fullScreen" @click="showFullScreen">
        <div class="image-name-singer">
          <img :src="currentSong.image" :alt="currentSong.name" :class="miniCdStateClass">
          <div class="name-singer">
            <h2>{{currentSong.name}}</h2>
            <p>{{currentSong.singer}}</p>
          </div>

        </div>
        <div class="state-playlist">
          <i class="icon-mini" :class="miniPlayStateClass" @click.stop="changPlayState"></i>
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio"
           @canplay="changeCanplay" @error="playError"
           @timeupdate="upDateTime"></audio>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'player',
    computed: {
      normalPlayStateClass(){
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniPlayStateClass(){
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      normalCdStateClass(){
        return this.playing ? 'play' : 'play pause'
      },
      miniCdStateClass(){
        return this.playing ? 'play' : 'play pause'
      },
      disableClass(){
        return this.canplay ? '' : 'disable'
      },
      runningTime(){
        return this.showMinuteAndSecond(this.currentTime)
      },
      totalTime(){
        return this.showMinuteAndSecond(this.currentSong.duration)
      },
      ...mapGetters(['playing', 'fullScreen', 'playList', 'currentSong', 'currentIndex'])
    },
    data () {
      return {
        canplay: false,
        currentTime: 0
      }
    },
    methods: {
      showMiniPlayer() {
        this.setFullScreen(false)
      },
      showFullScreen() {
        this.setFullScreen(true)
      },
      changPlayState(){
        this.setPlaying(!this.playing)
        console.log('this.currentTime', this.currentTime)
      },
      playPrevSong() {
        if (!this.canplay) {
          return
        }
        this.setCurrentIndex(this.currentIndex - 1)
        if (this.currentIndex === -1) {
          this.setCurrentIndex(this.playList.length - 1)
        }
        if (!this.playing) {
          this.changPlayState()
        }
        this.canplay = false
      },
      playNextSong(){
        if (!this.canplay) {
          return
        }
        if (this.currentIndex === this.playList.length - 1) {
          this.setCurrentIndex(-1)
        }
        this.setCurrentIndex(this.currentIndex + 1)
        if (!this.playing) {
          this.changPlayState()
        }
        this.canplay = false
        console.log('this.currentTime', this.currentTime)
      },
      changeCanplay(){
        this.canplay = true
      },
      playError() {
        this.canplay = true
      },
      upDateTime(e) {
        this.currentTime = e.target.currentTime
      },
      showMinuteAndSecond(time){
        const minute = time / 60 | 0;
        const second = this.addDigits(time % 60 | 0);
        return `${minute}:${second}`
      },
      addDigits(num, n = 2) {
        let numLength = num.toString().length;
        while (numLength < n) {
          num = '0' + num
          numLength++
        }
        return num
      },

      ...mapMutations({
        setFullScreen: 'SET_FULLSRCEEN',
        setPlaying: 'SET_PLAYING',
        setCurrentIndex: 'SET_CURRENTINDEX'
      })
    },
    watch: {
      currentSong() {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing(newPlaying) {
        let audio = this.$refs.audio;
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .player {
    text-align center
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
      width 100vw
      height 100vh
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
        width 100vw
        height 100vh
        z-index -1
        filter blur(20px)
        img {
          width 100%
          height 100%
        }

      }
      .player-top {
        color $color-theme
        .song-name {
          font-size $font-size-large
          line-height 40px
          height 40px
          position relative
          no-wrap()
          .icon-back {
            position absolute
            top 40%
            transform rotate(-90deg)
            left 20px
            font-size $font-size-large-x
          }
          padding 0 50px
        }
        .singer {
          font-size $font-size-medium-size-large
          line-height 20px
          height 20px
        }

      }
      .player-middle {
        width 100vw
        .cd-wrap {
          padding-top 80%
          height 0
          width 100vw
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

      }
      .player-bottom {
        position absolute
        bottom 50px
        width 100vw

        .show-page {
          height 30px
        }
        .progress-bar-wrap {
          height 30px

        }
        .control-part {

          width 80%
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
      width 100vw
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

        img {
          width 40px
          height 40px
          border-radius 50%
          &.play {
            animation rotate 20s linear infinite
          }
          &.pause {
            animation-play-state paused
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
        color $color-theme
        padding 0 10px 0 0
        font-size 30px
        .icon-mini {
          font-size 32px
        }

      }

    }
  }

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)


</style>
