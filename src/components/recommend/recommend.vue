<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrap" v-if="recommends.length">
        <slider>
          <div v-for="item in recommends">
            <a v-bind:href="item.linkUrl">
              <img v-bind:src="item.picUrl" alt="代理获取的轮播图片">
            </a>
          </div>
        </slider>
      </div>
    </div>
    <div class="recommend-list">
    </div>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import { getQQHotSongList } from 'api/recommend'
  import { ERROR_OK } from 'api/config'
  export default {
    name: 'recommend',
    data () {
      return {
        recommends: []

      }
    },
    components: {
      Slider
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
            console.log(res.data)
            console.log("相等")
          } else {
            console.log("不相等")
          }

        })
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


</style>
