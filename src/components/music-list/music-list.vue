<template>
  <div class="music-list-wrapper">
    <div class="singer-name">
      <i @click="goback"> < </i>
      <h2 v-html="title"></h2>
    </div>
    <div class="singerAvatar" :style="bgStyle" ref="singerAvatar">
      <div class="bg-cover" ref="bgCover"></div>
      <div class="random-play-all-wrap" ref="randomPlayAllWrap" v-if="songs.length>0">
        <div class="random-play-all-button" @click="randomPlayAllMusic"><i>O</i> 随机播放全部</div>
      </div>
    </div>
    <div class="song-list-bg" ref="songListBg"></div>
    <scroll :data="songs"
            class="scroll-song-list-part"
            ref="scrollSongList"
            :probeType="probeType"
            :listenScroll="listenScroll"
            @scroll="scroll"

    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @selectEvent="selectItem"></song-list>
      </div>
    </scroll>
    <div class="loading-wrapper" v-if=" !songs.length">
      <loading></loading>
    </div>

  </div>
</template>

<script>
  const singer_name_height = 40
  import songList from 'base/song-list/song-list'
  import scroll from 'base/scroll/scroll'
  import loading from 'base/loading/loading'
  import { prefixStlye } from  'common/js/dom'
  import { mapActions } from 'vuex'
  let prefixTransform = prefixStlye('transform')
  let prefixBackdropFilter = prefixStlye('backdrop-filter')

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      }
    },
    components: {
      songList,
      scroll,
      loading
    },
    computed: {
      bgStyle(){
        return `background-image:url(${this.bgImage})`
      }
    },
    mounted() {
      this.singerAvatarHeight = this.$refs.singerAvatar.clientHeight
      this.$refs.scrollSongList.$el.style.top = this.singerAvatarHeight + 'px'
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    data(){
      return {
        scrollY: 0
      }
    },
    methods: {
      goback(){
        this.$router.back()
      },
      scroll(pos){
        this.scrollY = pos.y
      },
      randomPlayAllMusic(){
        console.log('随机播放全部音乐啦')
      },
      selectItem(item, index){
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      ...mapActions(['selectPlay'])

    },
    watch: {
      scrollY(newY) {
        let moveHeight = this.singerAvatarHeight - singer_name_height;
//        let mintranslateY = Math.max(newY, -moveHeight);
        if (-newY < moveHeight) {
          this.$refs.songListBg.style[prefixTransform] = `translate3d(0,${newY}px,0)`
          this.$refs.singerAvatar.style.zIndex = 0
          this.$refs.singerAvatar.style.paddingBottom = '70%'
          this.$refs.singerAvatar.style.height = 0;
          this.$refs.randomPlayAllWrap.style.display = ''

        } else {

          this.$refs.singerAvatar.style.zIndex = 30
          this.$refs.singerAvatar.style.paddingBottom = 0
          this.$refs.singerAvatar.style.height = singer_name_height + 'px';
          this.$refs.randomPlayAllWrap.style.display = 'none'

        }
        let scaleNum = 1 + (newY / this.singerAvatarHeight);
        if (newY > 0) {
          this.$refs.singerAvatar.style[prefixTransform] = `scale(${scaleNum})`

        } else {
          let blur = Math.min(20 * ((-newY) / this.singerAvatarHeight), 20);
          this.$refs.bgCover.style[prefixBackdropFilter] = `blur(${blur}px)`;

        }

      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .music-list-wrapper {
    height 100%
    width 100%
    position relative
    .singer-name {
      z-index 40
      color $color-theme
      position absolute
      text-align center
      width 100%
      i {
        left 30px
        top 0
        position absolute
        display block
        height 40px
        line-height 40px
        font-size $font-size-large-x
      }
      h2 {
        font-size $font-size-large
        line-height 40px
        height 40px

      }

    }

    .singerAvatar {
      position relative
      width 100%
      height 0
      background-size cover
      padding-bottom 70%
      transform-origin top
      .bg-cover {
        position absolute
        width 100%
        height 100%
        top 0
        left 0
        background: rgba(7, 17, 27, 0.4)

      }
      .random-play-all-wrap {
        position absolute
        left 50%
        bottom 20px
        transform translate(-50%, 0)
        text-align center
        color $color-theme

        .random-play-all-button {
          box-sizing border-box
          width 135px
          padding 7px 0
          border 1px solid $color-theme
          border-radius 100px

        }
      }
    }
    .song-list-bg {
      background-color $color-background
      position relative
      top 0
      left 0
      height 200%
      width 100%
    }
    .scroll-song-list-part {
      position fixed
      bottom 0
      width 100%

      .song-list-wrapper {

      }

    }
    .loading-wrapper {
      position absolute
      left 50%
      bottom 30%
      z-index 50
      transform translate(-50%, -50%)

    }
  }


</style>
