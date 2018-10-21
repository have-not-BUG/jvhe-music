<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal-player">
      <div class="normal-player-wrap" v-show="fullScreen">
        <div class="player-bg"><img :src="currentSongImage" :alt="currentSong.name"></div>
        <div class="player-top">
          <i class="icon-back" @click="showMiniPlayer"></i>
          <h1 class="song-name" v-html="currentSong.name"
              @touchstart.prevent="startCanDownload"
              @touchend.prevent="endCanDownload"
              :data-clipboard-text="currentSong.name"
          ></h1>
          <h1 class="singer" v-html="currentSongSinger"></h1>
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
                <img :src="currentSongImage" :alt="currentSong.name">
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
            <i class="needsclick" :class="normalPlayStateClass(disableClass)" @click="changePlayState"></i>
            <i class="icon-next" @click="playNextSong" :class="disableClass"></i>
            <i :class="getFavoriteIcon(currentSong)" @click.stop="toggleFavoriteSong(currentSong)"></i>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini-player">
      <div class="mini-player-wrap" v-show="!fullScreen" @click="showFullScreen">
        <div class="mini-cd-wrap" ref="miniCdWrap">
          <img :class="miniCdStateClass" :src="currentSongImage" :alt="currentSong.name">
        </div>
        <div class="name-singer">
          <h2>{{currentSong.name}}</h2>
          <p>{{currentSong.singer}}</p>
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
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import progressBar from 'base/progress-bar/progress-bar'
  import progressCircle from 'base/progress-circle/progress-circle'
  import { playMode } from 'common/js/config'
  //  import { shuffle } from 'common/js/util'
  import lyricParser from 'lyric-parser'
  import Scroll from 'base/scroll/scroll'
  import { prefixStlye } from 'common/js/dom'
  import PlayList from 'components/play-list/play-list'
  import { playModeMixin } from 'common/js/mixin'
  import Clipboard from 'clipboard'

  let transform = prefixStlye('transform')
  let transitionDuration = prefixStlye('transitionDuration')
  export default {
    mixins: [playModeMixin],
    computed: {
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
      currentSongSinger () {
        return this.canplay ? this.currentSong.singer : '加载歌曲中.....'
      },
      currentSongImage () {
//        return this.canplay ? this.currentSong.image :'data:image/gif;base64,R0lGODlhZABkAKIEAN7e3rq6uv///5mZmQAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBRjA4RUZDMDI3MjA2ODExODA4M0Y1OTQyMzVDRDM3MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMzE0Rjk3NDdDRTgxMUUzOUJCRjk0NjAxMUE1NzRBMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMzE0Rjk3MzdDRTgxMUUzOUJCRjk0NjAxMUE1NzRBMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDVBMTZDQjczOTIwNjgxMTgwODNGNTk0MjM1Q0QzNzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUYwOEVGQzAyNzIwNjgxMTgwODNGNTk0MjM1Q0QzNzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+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'
        return (this.canplay && this.currentSong.image) ? this.currentSong.image : 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibGRzLXNwaW5uZXIiIHdpZHRoPSI2MHB4IiAgaGVpZ2h0PSI2MHB4IiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0iYmFja2dyb3VuZDogbm9uZTsiPjxnIHRyYW5zZm9ybT0icm90YXRlKDAgNTAgNTApIj4KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMWQwZTBiIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiB0aW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuOTE2NjY2NjY2NjY2NjY2NnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgPC9yZWN0Pgo8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMzAgNTAgNTApIj4KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMWQwZTBiIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiB0aW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuODMzMzMzMzMzMzMzMzMzNHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgPC9yZWN0Pgo8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNjAgNTAgNTApIj4KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMWQwZTBiIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiB0aW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNzVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogIDwvcmVjdD4KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDkwIDUwIDUwKSI+CiAgPHJlY3QgeD0iNDciIHk9IjI0IiByeD0iOS40IiByeT0iNC44IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzFkMGUwYiI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIgdGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjY2NjY2NjY2NjY2NjY2NjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogIDwvcmVjdD4KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDEyMCA1MCA1MCkiPgogIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjkuNCIgcnk9IjQuOCIgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IiMxZDBlMGIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAiIHRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSItMC41ODMzMzMzMzMzMzMzMzM0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICA8L3JlY3Q+CjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTAgNTApIj4KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMWQwZTBiIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiB0aW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgPC9yZWN0Pgo8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDUwIDUwKSI+CiAgPHJlY3QgeD0iNDciIHk9IjI0IiByeD0iOS40IiByeT0iNC44IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzFkMGUwYiI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIgdGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjQxNjY2NjY2NjY2NjY2NjdzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogIDwvcmVjdD4KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDIxMCA1MCA1MCkiPgogIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjkuNCIgcnk9IjQuOCIgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IiMxZDBlMGIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAiIHRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSItMC4zMzMzMzMzMzMzMzMzMzMzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICA8L3JlY3Q+CjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgyNDAgNTAgNTApIj4KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMWQwZTBiIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiB0aW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuMjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogIDwvcmVjdD4KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDI3MCA1MCA1MCkiPgogIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjkuNCIgcnk9IjQuOCIgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IiMxZDBlMGIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAiIHRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSItMC4xNjY2NjY2NjY2NjY2NjY2NnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgPC9yZWN0Pgo8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMzAwIDUwIDUwKSI+CiAgPHJlY3QgeD0iNDciIHk9IjI0IiByeD0iOS40IiByeT0iNC44IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzFkMGUwYiI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIgdGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjA4MzMzMzMzMzMzMzMzMzMzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICA8L3JlY3Q+CjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgzMzAgNTAgNTApIj4KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMWQwZTBiIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiB0aW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgPC9yZWN0Pgo8L2c+PC9zdmc+'
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
//      playModeIco () {
//        return this.mode === playMode.order ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
//      },
      showCurrentPage () {
        return this.currentPage === 'cd' ? 'cd' : 'lyric'
      },
      ...mapGetters(['playing', 'fullScreen', 'currentIndex'])
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
        playingLyric: '歌词加载中...',
        canDownload: 0
      }
    },
    methods: {
      normalPlayStateClass (disableClass) {
        if (disableClass){
          return this.playing ? 'icon-pause disable' : 'icon-play disable'
        } else{
          return this.playing ? 'icon-pause' : 'icon-play'

        }

      },
      startCanDownload () {
        this.canDownload = setTimeout(() => {
          this.canDownload = 0
        }, 2000)
      },
      endCanDownload () {
        if (this.canDownload !== 0) {
          clearTimeout(this.canDownload)
          return
        } else {
          this.downloadMusic()
        }
      },
      downloadMusic () {
        if (this.currentSong.url) {
          setTimeout(() => {
            window.open(this.currentSong.url, '_blank')
          }, 300)
        }
      },
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
        if (!this.canplay){
          return
        }
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
          return
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
          return
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
        this.savePlayHistory(this.currentSong)
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
//      changePlayMode () {
//        const mode = (this.mode + 1) % 3
//        this.setPlayMode(mode)
//        let list = null
//        if (this.mode === playMode.random) {
//          list = shuffle(this.orderPlayList)
//        } else {
//          list = this.orderPlayList
//        }
//        this.restCurrentIndex(list)
//        this.setPlayList(list)
//      },
//      restCurrentIndex (list) {
//        let index = list.findIndex((item) => {
//          return item.id === this.currentSong.id
//        })
//        this.setCurrentIndex(index)
//      },
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
      getLyric () {
        if (this.currentSong.mid) {
          this.getQQLyric()
        }
        if (!this.currentSong.mid) {
          this.getWYLyric()
        }
      },
      getQQLyric () {
        this.currentSong.getQQLyricInSongClass().then(res => {
          if (this.currentSong.lyric !== res) {
            return
          }
          this.currentLyric = new lyricParser(res, this.lyricHandle)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch((err) => {
          this.currentLyric = null
          this.playingLyric = '无歌词或获取QQ音乐歌词出错了'
          this.currentLyricLineNum = 0

          console.log('获取QQ音乐歌词出错了getQQLyricInSongClass', err)
        })
      },
      getWYLyric () {
        this.currentSong.getWYLyricInSongClass().then(res => {
          if (this.currentSong.lyric !== res) {
            return
          }
          this.currentLyric = new lyricParser(res, this.lyricHandle)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch((err) => {
          this.currentLyric = null
          this.playingLyric = '无歌词或获取网易音乐歌词出错了'
          this.currentLyricLineNum = 0

          console.log('获取网易音乐歌词出错了getWYLyricInSongClass', err)
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
        setCurrentIndex: 'SET_CURRENTINDEX'
//        setPlayMode: 'SET_MODE',
//        setPlayList: 'SET_PLAYLIST'
      }),
      ...mapActions(['savePlayHistory'])
    },
    watch: {
      currentSong (newSong, oldSong) {
        console.log('newSongnewSongnewSongnewSong', newSong)
        let webTitle = document.getElementsByTagName('title')[0];
        webTitle.innerText = newSong.name + '-' + newSong.singer;
//        history.pushState(null, songNameAndSinger, '?wd=' + songNameAndSinger)
        console.log(webTitle, 'webTitle')
        if (!newSong.id) {
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
//        if (this.playingLyric) {
//          this.playingLyric = ''
//        }
        this.$nextTick(() => {
          this.setPlaying(false)
          clearTimeout(this.timer)
          if (this.currentLyric) {
            this.currentLyric.stop()
            this.currentTime = 0
            this.playingLyric = '歌词加载中...'
            this.currentLyricLineNum = 0
          }
          this.timer = setTimeout(() => {
            this.$refs.audio.play()
            this.setPlaying(true)
            this.$refs.cdWrap.style.transform = `rotate(0deg)`
            this.$refs.miniCdWrap.style.transform = `rotate(0deg)`
            this.getLyric()
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
      var clipboard = new Clipboard('.song-name')
      clipboard.on('error', function (e) {
        alert('复制歌曲名失败，请更换浏览器尝试')
        console.log('复制歌曲名失败，请更换浏览器尝试', e)
      })
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
          margin 0 50px
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
          .icon-favorite {
            color $color-sub-theme
          }

        }

      }
    }
    .mini-player-wrap {
      color $color-theme
      width 100%
      height 60px
      background-color $color-highlight-background
      padding 0 10px
      box-sizing border-box
      display flex
      align-items center
      position fixed
      bottom 0
      left 0
      box-shadow 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28)
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
        white-space nowrap
        word-wrap normal
        flex 1
        max-width calc(100% - 130px)
        padding 0 5px
        text-align left
        no-wrap()
        h2 {
          color $color-text
          font-size $font-size-medium
          margin-bottom 5px
          no-wrap()
        }
        p {
          color $color-text-d
          font-size $font-size-small
          no-wrap()

        }

      }

      .state-playlist {
        color $color-theme-d
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
