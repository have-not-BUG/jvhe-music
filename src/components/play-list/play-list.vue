<template>
  <div class="play-list" ref="playList" v-show="isShow" @click="hide">
    <div class="play-list-ct" @click.stop>
      <div class="play-list-mode-clear">
        <div class="play-mode">
          <i :class="playModeIco" @click="changePlayMode"></i>
          <span>{{playModeText}}</span>
        </div>
        <i class="icon-clear" @click="clearAllSongs"></i>
      </div>
      <scroll class="all-play-list" ref="allPlayList" :refreshDelay="refreshDelay" :data="orderPlayList">
        <transition-group tag="ul" name="list" ref="playListUl">
          <li :key="item.mid" class="play-list-li" ref="playListLi"
              v-for="(item,index) in orderPlayList"
              @click="selectItem(item,index)">
            <div class="icon-song-name">
              <p :class="{'play-current-song':item.mid===currentSong.mid}"> {{index + 1}}. {{item.name}}</p>
            </div>
            <div class="favorite-delete">
              <i :class="getFavoriteIcon(item)" @click.stop="toggleFavoriteSong(item)"></i>
              <i class="icon-delete" @click.stop="deleteOne(item)"></i>
            </div>
          </li>
        </transition-group>
      </scroll>
      <div class="add-song-wrap">
        <p @click.stop="showAddSong">
          <span><i class="icon-add"></i></span>
          添加歌曲到该列表中
        </p>
      </div>
      <div class="playlist-close-btn" @click="hide">
        <p>关闭</p>
      </div>
    </div>
    <add-song ref="addSong"></add-song>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import { playMode } from 'common/js/config'
  import { playModeMixin } from 'common/js/mixin'
  import AddSong from 'components/add-song/add-song'

  export default {
    mixins: [playModeMixin],
    data () {
      return {
        isShow: false,
        refreshDelay: 400
      }
    },
    computed: {
      playModeText () {
        return this.mode === playMode.order ? '顺序播放' : this.mode === playMode.loop ? '单曲循环' : '随机播放'
      }
//      ...mapGetters(['orderPlayList'])
    },
    components: {
      Scroll, AddSong
    },
    methods: {
      show () {
        this.isShow = true
        setTimeout(() => {
          this.$refs.allPlayList.refresh()
          this.scrollToCurrentSong(this.currentSong)
        }, 20)
      },
      hide () {
        this.isShow = false
      },
      selectItem (item, index) {
        if (this.mode === playMode.random) {
          index = this.playList.findIndex((song) => {
            return item.mid === song.mid
          })
        }
        this.setCurrentIndex(index)
        this.setPlaying(true)
      },
      scrollToCurrentSong (current) {
        let index = this.orderPlayList.findIndex((song) => {
          return song.mid === current.mid
        })
        this.$refs.allPlayList.scrollToElement(this.$refs.playListUl.$el.children[index], 300)
      },
      deleteOne (song) {
        this.deleteOneSongOnPlayList(song)
        if (!this.playList.length) {
          this.hide()
        }
      },
      clearAllSongs () {
        if (confirm('您确实要清除播放列表中的所有的歌曲吗？')) {
          this.clearAllPlayList()
          if (!this.playList.length) {
            this.hide()
          }
        } else {
          return
        }
      },
      showAddSong () {
        this.$refs.addSong.show()
      },
      ...mapMutations({
        setCurrentIndex: 'SET_CURRENTINDEX',
        setPlaying: 'SET_PLAYING'
      }),
      ...mapActions(['deleteOneSongOnPlayList', 'clearAllPlayList'])
    },
    watch: {
      currentSong (newSong, oldSong) {
        if (!this.isShow || newSong.mid === oldSong.mid) {
          return
        } else {
          this.scrollToCurrentSong(newSong)
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
        .list-enter-active, .list-leave-active {
          transition all 0.2s
        }
        .list-enter, .list-leave-to {
          height 0
        }
        .play-list-li {
          display flex
          justify-content space-between
          align-content center
          flex-wrap nowrap
          padding 15px 30px
          .icon-song-name {
            no-wrap()
            text-align left
            flex 1
            .play-current-song {
              color $color-theme
            }
            p {
              display inline
              no-wrap()
            }
          }
          .favorite-delete {
            .icon-favorite{
              color $color-sub-theme
            }
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
