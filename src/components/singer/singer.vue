<template>
  <div class="singer">
    <listview :data="optimizedSingerList" @choose="chooseSinger"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getQQSingerList }  from  'api/qqSingerList'
  import { ERROR_OK } from 'api/config'
  import Singer from 'common/js/singer'
  import Listview from 'base/listview/listview'

  const SINGER_TYPE = '热门'
  const HOT_SINGER_LENGTH = 10

  export default {
    name: 'singer',
    data () {
      return {
        optimizedSingerList: []
      }
    },
    methods: {
      chooseSinger(singer){
        this.$router.push({
          path: `/singer/${singer.mid}`
        })

      },
      _getQQSingerList() {
        getQQSingerList().then(res => {
          if (res.code === ERROR_OK) {
            this.optimizedSingerList = this.optimizeQQSingerList(res.data.list)
            console.log('this.optimizedSingerList', this.optimizedSingerList)
          }
        }).catch(err => {
          alert('获取QQ歌手数据出错了,请刷新重试或者联系本人', err)
        })
      },
      optimizeQQSingerList(list){
        let singersData = {
          hot: {
            title: SINGER_TYPE,
            items: []
          }
        };
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LENGTH) {
            singersData.hot.items.push(
              new Singer(
                {
                  name: item.Fsinger_name,
                  mid: item.Fsinger_mid,
                })
            )

          }

          let initials = item.Findex;
          if (!singersData[initials]) {
            singersData[initials] = {
              title: initials,
              items: []
            }

          }
          singersData[initials].items.push(
            new Singer(
              {
                name: item.Fsinger_name,
                mid: item.Fsinger_mid,
              })
          )

        })

        let hotSingerData = [],
          initialsSingerData = [];
        for (let key in singersData) {
          let val = singersData[key];

          if (val.title === SINGER_TYPE) {
            hotSingerData.push(val)

          } else if (val.title.match(/[a-zA-Z]/)) {
            initialsSingerData.push(val)

          }

        }

        initialsSingerData.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

        return hotSingerData.concat(initialsSingerData)

      }

    },
    created: function () {
      this._getQQSingerList()
    },
    components: {
      Listview
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer {
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
  }

</style>
