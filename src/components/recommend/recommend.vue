<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="qqhotSongList">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="item in recommends">
              <a v-bind:href="item.linkUrl">
                <img @load="loadImg" v-bind:src="item.picUrl" alt="代理获取的轮播图片">
              </a>
            </div>
          </slider>
        </div>

        <div class="recommend-list">
          <h1 class="recommend-list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in qqhotSongList">
              <img v-lazy="item.imgurl" :alt="item.dissname">
              <p v-html="item.dissname"></p>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import { getQQHotSongList } from 'api/recommend'
  import { ERROR_OK } from 'api/config'
  export default {
    name: 'recommend',
    data () {
      return {
        recommends: [],
        qqhotSongList: []

      }
    },
    components: {
      Slider,
      Scroll
    },
    methods: {
      showQQSliderData: function () {
        this.$http.get('/api/getQQSliderData').then(res => {
          console.log("代理数据是。。。", res.data.data.slider);
          this.recommends = res.data.data.slider;
          return Promise.resolve(res.data.data.slider)
        })
      },
      _getQQHotSongList: function () {
        getQQHotSongList().then(res => {
          if (res.code === ERROR_OK) {
            this.qqhotSongList = res.data.hotdiss.list
            console.log(this.qqhotSongList)
          }

        })
      },
      loadImg: function () {
        if (!this.loadedImg) {
          this.$refs.scroll.refresh();
          this.loadedImg = true
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

  .recommend {
    position: fixed
    width: 100%
    top: 88px
    bottom: 0

    .recommend-content {
      height 100%
      overflow: hidden
      .slider-wrapper {
        position: relative
        width: 100%
        overflow: hidden
      }

      .recommend-list {
        margin 15px
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

            }

          }

        }

      }
    }
  }


</style>
