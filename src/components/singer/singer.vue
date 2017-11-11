<template>
  <div class="singer" ref="singer">
    <listview :data="optimizedSingerList" @choose="chooseSinger" ref="singerListView"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getQQSingerList } from 'api/singer'
  import { ERROR_OK } from 'api/config'
  import Singer from 'common/js/singer'
  import Listview from 'base/listview/listview'
  import { playListMixin } from 'common/js/mixin'
  import { mapMutations } from 'vuex'

  const SINGER_TYPE = '热门'
  const HOT_SINGER_LENGTH = 10

  export default {
    mixins: [playListMixin],
    name: 'singer',
    data () {
      return {
        optimizedSingerList: []
      }
    },
    methods: {
      handlePlayList (playList) {
        const bottomValue = playList.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottomValue
        this.$refs.singerListView.refresh()

      },
      chooseSinger (singer) {
        this.$router.push({
          path: `/singer/${singer.mid}`
        })
        this.setSinger(singer)

      },

      _getQQSingerList () {
        getQQSingerList().then(res => {
          if (res.code === ERROR_OK) {
            this.optimizedSingerList = this.optimizeQQSingerList(res.data.list)
          }
        }).catch(err => {
          alert('获取QQ歌手数据出错了,请刷新重试或者联系本人', err)
        })
      },
      optimizeQQSingerList (list) {
        let singersData = {
          hot: {
            title: SINGER_TYPE,
            items: []
          }
        }
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

          let initials = item.Findex
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
          initialsSingerData = []
        for (let key in singersData) {
          let val = singersData[key]

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

      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })

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
    top: 90px
    bottom: 0
  }

</style>
