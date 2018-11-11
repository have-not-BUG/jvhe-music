<template>
  <transition name="slide">
    <div class="singer-detail-wrapper">
      <music-list :songs="songs" :title="title" :bg-image='bgImage'></music-list>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getQQSingerDetail, getWYSingerDetail} from 'api/singer'
  import {ERROR_OK, WYNET_OK} from 'api/config'

  import {createSong, createSongWY} from 'common/js/song'

  import musicList from 'components/music-list/music-list'

  export default {
    name: 'singer-detail',
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name

      },
      bgImage() {
        return this.singer.avatar

      },

      ...mapGetters(['singer', 'musicSourceData'])
    },
    created() {
      if (this.musicSourceData === '1') {
        this._getQQSingerDetail()
      }
      if (this.musicSourceData === '2') {
        this._getWYSingerDetail()
      }

    },
    methods: {
      _getQQSingerDetail() {
        if (!this.singer.mid) {
          this.$router.push('/singer')
          return
        }
        getQQSingerDetail(this.singer.mid).then(res => {
          if (res.code === ERROR_OK) {
            this.songs=this.optimizeQQSongs(res.data.list)
          } else {
            console.log('获取QQ歌手详情数据失败：res.code不为0')
//            alert('获取QQ歌手详情数据失败，请刷新重试或联系本人')
            this.$message({
              type: 'error',
              message: `获取QQ歌手详情数据失败，请刷新重试或联系本人`,
              duration: 4500,
            });
          }

        }).catch(err => {
          console.log('获取歌手详情数据出错了', err)
//          alert('获取歌手详情数据出错了，请刷新重试', err)
          this.$message({
            type: 'error',
            message: `'获取歌手详情数据出错了', ${err}`,
            duration: 4500,
          });
        })
      },
      _getWYSingerDetail() {
        if (!this.singer.mid) {
          this.$router.push('/singer')
          return
        }
        getWYSingerDetail(this.singer.mid).then(res => {
          if (res.code === WYNET_OK) {
            this.songs = this.optimizeWYSongs(res.hotSongs)
          } else {
            console.log('获取网易云音乐歌手详情数据失败：res.code不为0')
//            alert('获取网易云音乐歌手详情数据失败，请刷新重试或联系本人')
            this.$message({
              type: 'error',
              message: `获取网易云音乐歌手详情数据失败，请刷新重试或联系本人`,
              duration: 4500,
            });
          }

        }).catch(err => {
          console.log('获取网易云音乐歌手详情数据出错了', err)
//          alert('获取网易云音乐歌手详情数据出错了，请刷新重试', err)
          this.$message({
            type: 'error',
            message: `获取网易云音乐歌手详情数据出错了 ${err}`,
            duration: 4500,
          });
        })
      },
      optimizeQQSongs(list) {
//        return new Promise((resolve,reject)=>{
          let optimized_data = []
          list.forEach((item,index) => {
            let {musicData} = item
            if (musicData.songid && musicData.albummid) {
//              optimized_data.push(createSong(musicData))
              createSong(musicData).then((res)=>{
                optimized_data.push(res)
              }).catch((err)=>{
                console.log('optimizeQQSongs里的createSong出错'+err)
              })
            }

          })
//          resolve(optimized_data)
        console.log('optimized_data'+optimized_data)

          return optimized_data
//        })

      },
      optimizeWYSongs(list) {
        let optimized_data = []
        list.forEach((item) => {
          let musicData = item
          if (musicData.id && musicData.al.id) {
            optimized_data.push(createSongWY(musicData))
          }

        })
        return optimized_data
      }
    },
    components: {
      musicList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer-detail-wrapper {
    position fixed
    z-index 90
    top 0
    left 0
    right 0
    bottom 0
    background: $color-background
  }

  .slide-enter-active, .slide-leave-active {
    transition all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform translate3d(100%, 0, 0)
  }


</style>
