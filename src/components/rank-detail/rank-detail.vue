<template>
  <transition name="slide">
    <div class="rank-detail-wrapper">
      <music-list :songs="songs" :title="title" :bg-image='bgImage' :rank="rank"></music-list>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { ERROR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import musicList from 'components/music-list/music-list'
  import { getQQRankListDetail } from 'api/rank'

  export default {
    data() {
      return {
        songs: [],
        rankTitleAndPic: {
          title: '',
          pic: ''
        }
      }
    },
    props: {
      rank: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      title() {
        return this.rankTitleAndPic.title
      },
      bgImage() {
        return this.rankTitleAndPic.pic
      },
      ...mapGetters(['rankList'])
    },
    created() {
      this._getQQRankListDetail()
    },
    methods: {
      _getQQRankListDetail(){
        if (!this.rankList.id) {
          this.$router.push('/rank')
          return
        }
        getQQRankListDetail(this.rankList.id).then(res => {
          if (res.code === ERROR_OK) {
            this.rankTitleAndPic.title = res.topinfo.ListName
            this.songs = this.optimizeQQRankListSongs(res.songlist)
            this.rankTitleAndPic.pic = this.songs[0].image
          } else {
            console.log('获取QQ排行榜详情数据失败：res.code不为0')
          }
        }).catch(err => {
          console.log('获取QQ排行榜详情数据出错了', err)
        })
      },
      optimizeQQRankListSongs(list){
        let ret = []
        list.forEach((item) => {
          let musicData = item.data
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }

        })
        return ret
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
