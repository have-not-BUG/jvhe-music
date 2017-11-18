<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll"
            class="recommend-content"
            :data="hotSongList">
      <div>
        <div class="recommend-list">
          <div class="recommend-list-title">
            <h1></h1>
          </div>
          <ul class="song-list-ul" v-if="musicSourceData==='1'">
            <li v-for="item in hotSongList" @click="chooseItem(item)">
              <img v-lazy="item.imgurl" :alt="item.dissname">
              <p v-html="item.dissname"></p>
            </li>
          </ul>
          <ul class="song-list-ul" v-if="musicSourceData==='2'">
            <li v-for="item in hotSongList" @click="chooseItem(item)">
              <img v-lazy="item.coverImgUrl" :alt="item.name">
              <p v-html="item.name"></p>
            </li>
          </ul>
        </div>
      </div>
      <div class="clone-title">
        <h1><i class="icon-back" @click="goBack"></i>{{category.categoryName}}推荐歌单</h1>
      </div>
      <div class="loading-wrapper" v-if="!hotSongList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getQQDissByTag, getWYDissByTag} from 'api/category'
  import {ERROR_OK, WYNET_OK} from 'api/config'
  import {playListMixin} from 'common/js/mixin'
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    mixins: [playListMixin],
    data() {
      return {
        recommends: [],
        hotSongList: []
      }
    },
    computed: {
      ...mapGetters(['category', 'musicSourceData'])
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      chooseItem(item) {
        if (this.musicSourceData === '1') {
          this.setDisc(item)
          this.$router.push({
            path: `/category/${this.category.categoryId}/${item.dissid}`
          })
        }
        if (this.musicSourceData === '2') {
          this.setDisc(item)
          this.$router.push({
            path: `/category/${this.category.categoryName}/${item.id}`
          })
        }
      },
      handlePlayList(playList) {
        let bottomValue = playList.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottomValue
        this.$refs.scroll.refresh()

      },
      _getQQDissByTag: function () {
        if (!this.category.categoryId) {
          this.$router.push('/category')
          return
        }
        getQQDissByTag(this.category.categoryId).then(res => {
          if (res.code === ERROR_OK) {
            this.hotSongList = res.data.list
          } else {
            console.log('getQQDissByTag里的res.code 不为0')
            alert('获取QQ分类数据异常，请刷新重试或联系本人')
          }
        }).catch(err => {
          console.log('获取QQ音乐标签歌单详情出错了，请刷新重试或者联系本人', err)
          alert('获取QQ音乐标签歌单详情出错了，请刷新重试或者联系本人', err)
        })
      },
      _getWYDissByTag: function () {
        if (!this.category.categoryName) {
          this.$router.push('/category')
          return
        }
        getWYDissByTag(this.category.categoryName).then(res => {
          if (res.code === WYNET_OK) {
            this.hotSongList = res.playlists
          } else {
            console.log('getWYDissByTag里的res.code 不为0')
            alert('获取网易分类数据异常，请刷新重试或联系本人')
          }
        }).catch(err => {
          console.log('获取网易音乐标签歌单详情出错了，请刷新重试或者联系本人', err)
          alert('获取网易音乐标签歌单详情出错了，请刷新重试或者联系本人', err)
        })
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })

    },
    created: function () {
      if (this.musicSourceData === '1') {
        this._getQQDissByTag()
      }
      if (this.musicSourceData === '2') {
        this._getWYDissByTag()
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .recommend {
    position: fixed
    width: 100%
    top: 0
    bottom: 0
    background: $color-background
    /*border 1px solid #fff*/
    box-sizing border-box
    .recommend-content {
      height 100%
      overflow: hidden
      /*border 1px solid red*/
      div {
        .slider-wrapper {
          position: relative
          width: 100%
          overflow: hidden
          /*border 1px solid green*/
        }
        .recommend-list {
          position relative
          /*border 1px solid blue*/
          .recommend-list-title {
            text-align center
            color $color-theme
            h1 {
              height 40px
              line-height 40px
              font-size $font-size-large
              position relative
              background-color $color-background
              .icon-back {
                font-size $font-size-large-x
                position absolute
                left 25px
                top 0
                transform translate(0, 50%)
              }
            }
          }
          .song-list-ul {
            padding 0 15px
            li {
              display flex;
              align-items center;
              margin 15px 0;

              img {
                width 60px
                height 60px
                margin-right 10px
              }
              p {
                color $color-text-ll
                font-size $font-size-small
                no-wrap()
              }
            }
          }

        }
      }
      .clone-title {
        position fixed
        top 0
        left 0
        text-align center
        color $color-theme
        width 100%
        background-color $color-highlight-background
        h1 {
          height 40px
          line-height 40px
          font-size $font-size-large
          position relative
          .icon-back {
            font-size $font-size-large-x
            position absolute
            left 25px
            top 0
            transform translate(0, 50%)
          }
        }

      }
      .loading-wrapper {
        position absolute
        top: 50%
        left: 50%
        transform translate(-50%, -50%)
      }
    }
  }


</style>
