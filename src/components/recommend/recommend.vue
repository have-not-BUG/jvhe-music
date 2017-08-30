<template>
  <div class="recommend">
    推荐页面
    <slider>
      我是slider
    </slider>
    <button v-on:click="showData">点击</button>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  export default {
    name: 'recommend',
    data () {
      return {}
    },
    components: {
      Slider
    },
    methods: {
      showData: function () {
//        this.$http.get('https://bird.ioliu.cn/v1/?url=' + 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=135662383&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1504085676400')
//          .then(response => console.log(response.data))

        this.$http.get('/api/getSliderData').then(res => {
          console.log("耶！代理数据是。。。", res.data);
          return Promise.resolve(res.data)
        })
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

</style>
