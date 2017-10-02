<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll"
            class="recommend-content"
            :data="qqhotSongList">
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
          <h1 class="recommend-list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in qqhotSongList" @click="chooseItem(item)">
              <img v-lazy="item.imgurl" :alt="item.dissname">
              <p v-html="item.dissname"></p>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper" v-if="(!recommends.length) || (!qqhotSongList.length)">
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
  import { getQQHotSongList } from 'api/recommend'
  import { ERROR_OK } from 'api/config'
  import { playListMixin } from 'common/js/mixin'
  export default {
    mixins: [playListMixin],
    name: 'recommend',
    data () {
      return {
        recommends: [],
        qqhotSongList: []

      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    methods: {
      chooseItem(item){
        this.$router.push({
          path:`/recommend/${item.dissid}`
        })
        console.log(item)

      },
      handlePlayList(playList){
        const bottomValue = playList.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottomValue
        this.$refs.scroll.refresh()

      },
      showQQSliderData: function () {
        this.$http.get('/api/getQQSliderData').then(res => {
          this.recommends = res.data.data.slider;
          return Promise.resolve(res.data.data.slider)
        }).catch(err => {
          console.log('获取QQ轮播数据出错了，请刷新重试或者联系本人', err)
          alert('获取QQ轮播数据出错了，请刷新重试或者联系本人', err)
        })
      },
      _getQQHotSongList: function () {
        getQQHotSongList().then(res => {
          if (res.code === ERROR_OK) {
            this.qqhotSongList = res.data.hotdiss.list
          }
        }).catch(err => {
          console.log('获取QQ热门歌单出错了，请刷新重试或者联系本人', err)
          alert('获取QQ热门歌单出错了，请刷新重试或者联系本人', err)

        })
      },
      loadImg: function () {
        if (!this.loadedImg) {
          this.loadedImg = true;
          setTimeout(() => {
            this.$refs.scroll.refresh();
          }, 20)

        }
      }

    },
    created: function () {
      this.showQQSliderData();
      this._getQQHotSongList();
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
    top: 88px
    bottom: 0
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
          margin 15px
          position relative
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
