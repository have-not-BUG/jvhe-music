<template>
  <transition name="slide">
    <div class="singer-detail-wrapper">
      <music-list :songs="songs" :title="title" :bg-image='bgImage'></music-list>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getQQSingerDetail }  from  'api/singer'
  import { ERROR_OK } from 'api/config'

  import { createSong } from 'common/js/song'

  import musicList from 'components/music-list/music-list'

  export default {
    name: 'singer-detail',
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title(){
        return this.singer.name

      },
      bgImage(){
        return this.singer.avatar

      },

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
            console.log(res.data.list)
          }

        }).catch(err => {
          console.log('获取歌手详情页出错了', err);
          alert('获取歌手详情页出错了，请刷新重试', err)
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
