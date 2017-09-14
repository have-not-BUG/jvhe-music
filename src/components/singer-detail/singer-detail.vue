<template>
  <transition name="slide">
    <div class="singer-detail-wrapper">
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getQQSingerDetail }  from  'api/singer'
  import { ERROR_OK } from 'api/config'

  import { createSong } from 'common/js/song'
  export default {
    name: 'singer-detail',
    data() {
      return {
        songs: []
      }
    },
    computed: {
      ...mapGetters(['singer'])
    },
    created(){
      this._getQQSingerDetail()

    },
    methods: {
      _getQQSingerDetail(){
        if (!this.singer.mid) {
          this.$router.push('/singer')
          return
        }
        getQQSingerDetail(this.singer.mid).then(res => {
          if (res.code === ERROR_OK) {
            this.songs = this.optimizeQQSongs(res.data.list);
            console.log('res.data.list是', res.data.list);
            console.log('this.songs是第三大城市的速度', this.songs)
          }

        }).catch(err => {
          console.log('获取歌手详情页出错了', err);
//          alert('获取歌手详情页出错了', err)
        })
      },
      optimizeQQSongs(list){
        let optimized_data = [];
        list.forEach((item) => {
          let {musicData} = item;
          if (musicData.songid && musicData.albummid) {
            optimized_data.push(createSong(musicData))
          }

        })

        return optimized_data

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer-detail-wrapper {
    position fixed
    z-index 9999
    top 0
    left 0
    right 0
    bottom 0
    background-color #000
  }

  .slide-enter-active, .slide-leave-active {
    transition all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform translate3d(100%, 0, 0)
  }


</style>
