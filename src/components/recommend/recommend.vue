<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll"
            class="recommend-content"
            :data="hotSongList">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="item in recommends">
              <a v-bind:href="item.linkUrl">
                <img @load="loadImg" class="needsclick" v-bind:src="item.picUrl" alt="代理获取的轮播图片">
              </a>
            </div>
          </slider>
        </div>

        <div class="recommend-list">
          <h1 class="recommend-list-title">精品歌单推荐</h1>
          <ul v-if="musicSourceData==='1'">
            <li v-for="item in hotSongList" @click="chooseItem(item)">
              <img v-lazy="item.imgurl" :alt="item.dissname">
              <p v-html="item.dissname"></p>
            </li>
          </ul>
          <ul v-if="musicSourceData==='2'">
            <li v-for="item in hotSongList" @click="chooseItem(item)">
              <img v-lazy="item.coverImgUrl" :alt="item.name">
              <p v-html="item.name"></p>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper" v-if="(!recommends.length) || (!hotSongList.length)">
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
  import {getQQHotSongList, getQQSliderData, getWYHotSongList} from 'api/recommend'
  import {ERROR_OK, WYNET_OK} from 'api/config'
  import {playListMixin} from 'common/js/mixin'
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    mixins: [playListMixin],
    name: 'recommend',
    data() {
      return {
        recommends: [],
        hotSongList: []

      }
    },
    computed: {
      ...mapGetters(['musicSourceData'])
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    methods: {
      chooseItem(item) {
        if (this.musicSourceData === '1') {
          this.setDisc(item)
          this.$router.push({
            path: `/recommend/${item.dissid}`
          })
        }
        if (this.musicSourceData === '2') {
          this.setDisc(item)
          this.$router.push({
            path: `/recommend/${item.id}`
          })
        }

      },
      handlePlayList(playList) {
        let bottomValue = playList.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottomValue
        this.$refs.scroll.refresh()

      },
      showQQSliderData: function () {
        getQQSliderData().then(res => {
          if (res.code === ERROR_OK) {
            this.recommends = res.data.slider
          } else {
            console.log('getQQSliderData里的res.code 不为0')
          }
        }).catch(err => {
          console.log('获取QQ轮播数据出错了，请刷新重试或者联系本人', err)
          alert('获取QQ轮播数据出错了，请刷新重试或者联系本人', err)
        })
      },
      _getQQHotSongList: function () {
        getQQHotSongList().then(res => {
          if (res.code === ERROR_OK) {
            this.hotSongList = res.data.hotdiss.list
          } else {
            console.log('getQQHotSongList里的res.code 不为0')
            alert('获取QQ热门歌单数据异常，请刷新重试或联系本人')
          }
        }).catch(err => {
          console.log('获取QQ热门歌单出错了，请刷新重试或者联系本人', err)
          alert('获取QQ热门歌单出错了，请刷新重试或者联系本人', err)
        })
      },
      _getWYHotSongList: function () {
        getWYHotSongList().then(res => {
          if (res.code === WYNET_OK) {
            this.hotSongList = res.playlists
          } else {
            console.log('getWYHotSongList.code 不为200')
            alert('获取网易热门歌单数据异常，请刷新重试或联系本人')
          }
        }).catch(err => {
          console.log('获取网易热门歌单出错了，请刷新重试或者联系本人', err)
          alert('获取网易热门歌单出错了，请刷新重试或者联系本人', err)
        })
      },
      loadImg: function () {
        if (!this.loadedImg) {
          this.loadedImg = true
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)

        }
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })

    },
    created: function () {
      this.showQQSliderData()
      if (this.musicSourceData === '1') {
        this._getQQHotSongList()
      }
      if (this.musicSourceData === '2') {
        this._getWYHotSongList()
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
    width 100%
    top: 88px
    bottom: 0
    right 10px
    left auto
    /*border 1px solid #fff*/
    box-sizing border-box
    .recommend-content {
      height 100%
      width 100%
      overflow: hidden
      /*border 1px solid red*/
      div {
        .slider-wrapper {
          position: relative
          width: 100%
          overflow: hidden
          /*border 1px solid green*/
          .slider {
            width: 100%
            .slider-group {
              .slider-item {
              }
            }
          }
        }
        .recommend-list {
          margin 15px
          position relative
          width 100%
          /*border 1px solid blue*/
          .recommend-list-title {
            text-align center
            margin 10px
            color $color-theme
          }
          ul {
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
      .loading-wrapper {
        position absolute
        top: 50%
        left: 50%
        transform translate(-50%, -50%)
      }
    }
  }


</style>
