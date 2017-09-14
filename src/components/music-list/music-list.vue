<template>
  <div class="music-list-wrapper">
    <div class="top-part" :style="bgStyle" ref="singerAvatar">
      <div class="singer-name">
        <i> ico</i>
        <h2 v-html="title"></h2>
      </div>
      <div class="bg-cover"></div>
    </div>
    <scroll :data="songs" class="scroll-song-list-part" ref="scrollSongList">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
  import songList from 'base/song-list/song-list'
  import scroll from 'base/scroll/scroll'
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
      scroll
    },
    computed: {
      bgStyle(){
        return `background-image:url(${this.bgImage})`
      }
    },
    mounted(){
      this.$refs.scrollSongList.$el.style.top = this.$refs.singerAvatar.clientHeight + 'px'
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .music-list-wrapper {
    .top-part {
      position relative
      width 100%
      height 0
      background-size cover
      padding-bottom 70%
      .singer-name {
        z-index 40
        color $color-text
        position absolute
        text-align center
        width 100%

      }

      .bg-cover {
        position absolute
        width 100%
        height 100%
        top 0
        left 0
        background: rgba(7, 17, 27, 0.4)

      }
    }
    .scroll-song-list-part {
      position fixed
      top 0
      bottom 0
      width 100%

      .song-list-wrapper {


      }

    }
  }


</style>
