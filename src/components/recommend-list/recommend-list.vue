<template>
  <transition name="slide">
    <div class="recomment-list-wrapper">
      <music-list :songs="songs" :title="title" :bg-image='bgImage'></music-list>
    </div>
  </transition>
</template>

<script>
  import musicList from 'components/music-list/music-list'
  import { mapGetters } from 'vuex'
  import { getQQRecommendSongListDetail, getWYRecommendSongListDetail } from 'api/recommend'
  import { ERROR_OK, WYNET_OK } from 'api/config'
  import { createSong, createSongWY } from 'common/js/song'

  export default {
    data () {
      return {
        songs: []
      }
    },
    computed: {
      title () {
        if (this.disc && this.disc.dissname) {
          return this.disc.dissname
        }
        if (this.disc && this.disc.name) {
          return this.disc.name
        }

      },
      bgImage () {
        if (this.disc && this.disc.imgurl) {
          return this.disc.imgurl
        }
        if (this.disc && this.disc.coverImgUrl) {
          return this.disc.coverImgUrl
        }
      },

      ...mapGetters(['disc', 'musicSourceData'])

    },
    components: {
      musicList
    },
    created () {
      if (this.disc && this.disc.imgurl) {
        this._getQQRecommendSongListDetail()
      }
      if (this.disc && this.disc.coverImgUrl) {
        this._getWYRecommendSongListDetail()
      }
    },
    methods: {
      _getQQRecommendSongListDetail () {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getQQRecommendSongListDetail(this.disc.dissid).then(res => {
          console.log('this.disc.dissid this.disc.dissid', this.disc.dissid)
          if (ERROR_OK === res.code) {
            this.songs = this.optimizeQQHotSongList(res.cdlist[0].songlist)
            console.log(res.cdlist[0])
          } else {
            console.log('获取热门歌单详情数据失败：res.code不为0')
          }
        }).catch(err => {
          console.log('获取热门歌单详情数据失败:getQQRecommendSongListDetail', err)
        })
      },
      _getWYRecommendSongListDetail () {
        if (!this.disc.id) {
          this.$router.push('/recommend')
          return
        }
        getWYRecommendSongListDetail(this.disc.id).then(res => {
          if (WYNET_OK === res.code) {
            this.songs = this.optimizeWYHotSongList(res.playlist.tracks)
          } else {
            console.log('获取网易精品歌单详情数据失败：res.code不为200')
          }
        }).catch(err => {
          console.log('获取网易精品歌单详情数据失败:getWYRecommendSongListDetail', err)
        })
      },
      optimizeQQHotSongList (list) {
        let ret = []
        list.forEach((item) => {
          if (item.mid) {
            ret.push(createSong(this.convertSongData(item)))
          }
        })
        return ret
      },
      optimizeWYHotSongList (list) {
        let ret = []
        list.forEach((item) => {
          if (item.id) {
            ret.push(createSongWY(item))
          }
        })
        return ret
      },
      convertSongData (originData) {
        let convertedData = {}
        convertedData.songid = originData.id
        convertedData.songmid = originData.mid
        convertedData.singer = originData.singer
        convertedData.songname = originData.name
        convertedData.albumname = originData.album.name
        convertedData.albummid = originData.album.mid
        convertedData.interval = originData.interval
        return convertedData
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recomment-list-wrapper {
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
