<template>
  <transition name="slide">
    <div class="rank-detail-wrapper">
      <music-list :songs="songs" :title="title" :bg-image='bgImage' :rank="rank"></music-list>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { ERROR_OK, WYNET_OK } from 'api/config'
  import { createSong, createSongWY } from 'common/js/song'
  import musicList from 'components/music-list/music-list'
  import { getQQRankListDetail, getWYRankListDetail } from 'api/rank'

  export default {
    data () {
      return {
        songs: [],
        rankTitleAndPic: {
          title: '',
          pic: ''
        },
        retArry: [],

      }
    },
    props: {
      rank: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      title () {
        return this.rankTitleAndPic.title
      },
      bgImage () {
        return this.rankTitleAndPic.pic
      },
      ...mapGetters(['rankList', 'musicSourceData'])
    },
    created () {
      if (this.musicSourceData === '1') {
        this._getQQRankListDetail()
      }
      if (this.musicSourceData === '2') {
        this._getWYRankListDetail()
      }
//      let aa;
//      function hee() {
//       return setTimeout(()=>{
//         aa='ijioj'
//        },1000)
//      }
//      hee();
//       console.error(aa)

//      let a=[1,2,3,4,5,6,7,8,9];
//      a.forEach((item)=>{
//        setTimeout(()=>{
//          console.log(item)
//        },5000)
//
//      })
    },
    methods: {
      _getQQRankListDetail () {
        if (this.rankList.id !== 0 && !this.rankList.id) {
          this.$router.push('/rank')
          return
        }
        getQQRankListDetail(this.rankList.id).then(res => {
          if (res.code === ERROR_OK) {
            this.rankTitleAndPic.title = res.topinfo.ListName
            this.songs = this.optimizeQQRankListSongs(res.songlist)
//            setTimeout(()=>{
//              this.rankTitleAndPic.pic = this.songs[0].image
//            },500)
//            (this.optimizeQQRankListSongs(res.songlist)).then((optimizeQQRankListSongsRes) => {
//              setTimeout(()=>{
//                this.songs = this.retArry
////              console.log('resres this.songs ' + optimizeQQRankListSongsRes+'resresresresres')
//                this.rankTitleAndPic.pic = this.songs[0].image
//              },500)
//
//            })

          } else {
            console.log('获取QQ排行榜详情数据失败：res.code不为0')
            alert('获取QQ排行榜详情数据异常，请刷新重试或联系本人')
          }
        }).catch(err => {
          console.log('获取QQ排行榜详情数据出错了', err)
          alert('获取QQ排行榜详情数据出错了，请刷新重试或联系本人')
        })
      },
      _getWYRankListDetail () {
        if (this.rankList.id !== 0 && !this.rankList.id) {
          this.$router.push('/rank')
          return
        }
        getWYRankListDetail(this.rankList.id).then(res => {
          if (res.code === WYNET_OK) {
            this.rankTitleAndPic.title = res.playlist.name
            this.songs = this.optimizeWYRankListSongs(res.playlist.tracks)
            this.rankTitleAndPic.pic = res.playlist.coverImgUrl

          } else {
            console.log('获取网易排行榜详情数据异常：res.code不为200')
            alert('获取网易排行榜详情数据异常，请刷新重试或联系本人')
          }
        }).catch(err => {
          console.log('获取网易排行榜详情数据出错了', err)
          alert('获取网易排行榜详情数据出错了，请刷新重试或联系本人')
        })
      },
      optimizeQQRankListSongs (list) {
//        return new Promise((resolve, reject) => {
        this.retArry = []
        list.forEach((item) => {
          let musicData = item.data
          if (musicData.songid && musicData.albummid) {
//            console.warn(createSong(musicData))
            createSong(musicData).then((res) => {
              this.retArry.push(res)
            }).catch((err) => {
              console.log('optimizeQQRankListSongs' + err)
//                reject('optimizeQQRankListSongs出错了' + err)
            })

          }

        })
        return this.retArry
//          console.warn(this.retArry+'retttttttt')
//          resolve(this.retArry)
//        })

      },
      optimizeWYRankListSongs (list) {
        let ret = []
        list.forEach((item) => {
          let musicData = this.covertMusicDataWY(item)
          if (musicData.id) {
            ret.push(createSongWY(musicData))
          }

        })
        return ret
      },
      covertMusicDataWY (data) {
        data.mid = ''
        return data
      },
      covertMusicDataWYOld (data) {
        let ret = {}
        ret.id = data.id
        ret.mid = ''
        ret.ar = data.artists
        ret.name = data.name
        ret.al = data.album
        ret.dt = data.bMusic.playTime
        return ret
      }
    },
    components: {
      musicList
    },
    watch: {
      songs (newSong) {
        if (newSong.length > 0) {
          this.rankTitleAndPic.pic = newSong[0].image
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .rank-detail-wrapper {
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
