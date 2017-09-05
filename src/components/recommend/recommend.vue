<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrap" v-if="recommends.length">
        <slider>
          <div  v-for="item in recommends">
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
      showData: function () {
        this.$http.get('/api/getQQSliderData').then(res => {
          console.log("代理数据是。。。", res.data.data.slider);
          this.recommends = res.data.data.slider;
          return Promise.resolve(res.data.data.slider)
        })
      }
    },
    created: function () {
      this.showData();
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"



</style>
