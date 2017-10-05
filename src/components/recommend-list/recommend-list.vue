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
  import { getQQHotSongListDetail } from 'api/recommend'

  export default {
    data() {
      return {}
    },
    computed: {
      title(){
        return this.disc.dissname
      },
      bgImage(){
        return this.disc.imgurl
      },

      ...mapGetters(['disc'])

    },
    components: {
      musicList
    },
    created(){
      this._getQQHotSongListDetail()
    },
    methods: {
      _getQQHotSongListDetail(){
        getQQHotSongListDetail(this.disc.dissid).then(res => {
          console.log(res)
        }).catch(err => {
          console.log('获取热门歌单详情失败:getQQHotSongListDetail', err)
        })
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
