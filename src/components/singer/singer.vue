<template>
  <div class="singer" ref="singer">
    <listview :data="optimizedSingerList" @choose="chooseSinger" ref="singerListView"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getQQSingerList, getWYSingerList} from 'api/singer'
  import {ERROR_OK, WYNET_OK} from 'api/config'
  import {Singer, SingerWY} from 'common/js/singer'
  import Listview from 'base/listview/listview'
  import {playListMixin} from 'common/js/mixin'
  import {mapGetters, mapMutations} from 'vuex'

  const SINGER_TYPE = '热门'
  const HOT_SINGER_LENGTH = 10

  export default {
    mixins: [playListMixin],
    name: 'singer',
    data() {
      return {
        optimizedSingerList: []
      }
    },
    methods: {
      handlePlayList(playList) {
        const bottomValue = playList.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottomValue
        this.$refs.singerListView.refresh()

      },
      chooseSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.mid}`
        })
        this.setSinger(singer)

      },

      _getQQSingerList() {
        getQQSingerList().then(res => {
          if (res.code === ERROR_OK) {
            this.optimizedSingerList = this.optimizeQQSingerList(res.data.list)
          } else {
            console.log('res.code不为0，getQQSingerList出错')
            alert('获取QQ歌手数据异常，请刷新重试或联系本人')
          }
        }).catch(err => {
          alert('获取QQ歌手数据出错了,请刷新重试或者联系本人', err)
        })
      },
      _getWYSingerList() {
        getWYSingerList().then(res => {
          if (res.code === WYNET_OK) {
            this.optimizedSingerList = this.optimizeWYSingerList(res.artists)
          } else {
            console.log('res.code不为0，getWYSingerList出错')
            alert('获取网易歌手数据异常，请刷新重试或联系本人')
          }
        }).catch(err => {
          console.log('获取网易歌手数据出错了,请刷新重试或者联系本人', err)
        })
      },
      optimizeQQSingerList(list) {
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
      optimizeWYSingerList(list) {
        let singersData = {
          hot: {
            title: SINGER_TYPE,
            items: []
          }
        }
        list.forEach((item, index) => {
          singersData.hot.items.push(
            new SingerWY(
              {
                name: item.name,
                id: item.id,
                picUrl: item.picUrl
              })
          )
        })
        let hotSingerData = []

        for (let key in singersData) {
          let val = singersData[key]

          if (val.title === SINGER_TYPE) {

            hotSingerData.push(val)
          }

        }
//        hotSingerData[0].items.sort((a, b) => {
//          return a.name.charCodeAt(0) - b.name.charCodeAt(0)
//        })
        return hotSingerData

      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })

    },
    computed: {
      ...mapGetters(['musicSourceData'])
    },
    created: function () {
      if (this.musicSourceData === '1') {
        this._getQQSingerList()
      }
      if (this.musicSourceData === '2') {
        this._getWYSingerList()
      }
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
