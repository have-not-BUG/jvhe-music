<template>
  <div class="hello">
    <h1 @click=" _getQQSingerList">{{ msg }}</h1>
  </div>
</template>

<script>
  import { getQQSingerList }  from  'api/qqSingerList'
  import { ERROR_OK } from 'api/config'

  const HOT_SINGER_NAME = '热门'
  const HOT_SINGER_LENGTH = 10

  export default {
    name: 'singer',
    data () {
      return {
        msg: '歌手页面',
        singers: []
      }
    },
    methods: {
      _getQQSingerList() {
        getQQSingerList().then(res => {
          if (res.code === ERROR_OK) {
            this.singers = res.data.list
            this.optimizeQQSingerList(this.singers)
          }
        }).catch(err => {
          alert('获取QQ歌手数据出错了,请刷新重试或者联系本人', err)
        })
      },
      optimizeQQSingerList(list){
        let singersData = {
          hot: {
            title: HOT_SINGER_NAME,
            items: []
          }
        };
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LENGTH) {
            singersData.hot.items.push(
              {
                name: item.Fsinger_name,
                mid: item.Fsinger_mid,
                avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
              }
            )

          }

          let initials = item.Findex;
          if (!singersData[initials]) {
            singersData[initials] = {
              title: initials,
              items: []
            }

          }
          singersData[initials].items.push({
              name: item.Fsinger_name,
              mid: item.Fsinger_mid,
              avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
            }
          )

        })
        console.log(singersData)

      }

    },
    created: function () {
      this._getQQSingerList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

</style>
