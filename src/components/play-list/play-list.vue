<template>
  <div class="play-list" ref="playList" v-show="isShow" @click="hide">
    <div class="play-list-ct" @click.stop>
      <div class="play-list-mode-clear">
        <div class="play-mode">
          <i class="icon-sequence"></i>
          <span>顺序播放</span>
        </div>
        <i class="icon-clear"></i>
      </div>
      <scroll class="all-play-list" ref="allPlayList" :data="orderPlayList">
        <ul>
          <li class="play-list-li" v-for="(item,index) in orderPlayList">
            <div class="icon-song-name">
              <i :class="{'icon-play':item.mid===currentSong.mid}"></i>
              <p>{{item.name}}</p>
            </div>
            <div class="favorite-delete">
              <i class="icon-not-favorite"></i>
              <i class="icon-delete"></i>
            </div>
          </li>
        </ul>
      </scroll>
      <div class="add-song-wrap">
        <p>
          <span><i class="icon-add"></i></span>
          增加歌曲到该列表中
        </p>
      </div>
      <div class="playlist-close-btn" @click="hide">
        <p>关闭</p>
      </div>
    </div>


  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Scroll from 'base/scroll/scroll'

  export default {
    data () {
      return {
        isShow: false
      }
    },
    computed: {
      ...mapGetters(['orderPlayList', 'currentSong'])
    },
    components: {
      Scroll
    },
    methods: {
      show () {
        this.isShow = true
      },
      hide () {
        this.isShow = false
      }
    },
    watch: {
      isShow (isShowNew) {
        if (isShowNew) {
          setTimeout(() => {
            this.$refs.allPlayList.refresh()
          }, 20)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .play-list {
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background-color $color-background-d
    z-index 999
    .play-list-ct {
      position absolute
      width 100%
      bottom 0
      left 0
      background-color: $color-highlight-background
      color $color-text-d

      .play-list-mode-clear {
        padding 20px 30px 10px 20px
        display: flex
        justify-content space-between
        align-items center
        color $color-text-l
        .play-mode {
          display flex
          align-items center
          i {
            font-size 30px
            color $color-theme
            padding-right 10px
          }

        }
      }
      .all-play-list {
        max-height 240px
        overflow hidden
        .play-list-li {
          display flex
          justify-content space-between
          align-content center
          flex-wrap nowrap
          margin 30px
          .icon-song-name {
            no-wrap()
            text-align left
            flex 1
            .icon-play {
              color $color-theme
            }
            p {
              display inline
              no-wrap()
            }

          }
          .favorite-delete {
          }
        }

      }
      .add-song-wrap {
        margin 25px auto
        border 1px solid $color-text-l
        padding 8px
        width 160px
        border-radius 15px
        height 30px
        box-sizing border-box
        font-size $font-size-small
        p {
          color $color-text-l
          .icon-add {
            padding-right 5px
          }
        }
      }

      .playlist-close-btn {
        padding 15px 0
        background-color $color-background

      }

    }

  }

</style>
