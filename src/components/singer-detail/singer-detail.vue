<template>
  <transition name="slide">
    <div class="singer-detail-wrapper">
      <h1>{{ msg }}</h1>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getQQSingerDetail }  from  'api/singer'
  import { ERROR_OK } from 'api/config'
  export default {
    name: 'singer-detail',
    data () {
      return {
        msg: '歌手详情页面'
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
        }
        getQQSingerDetail(this.singer.mid).then(res => {
          if (res.code === ERROR_OK) {
            console.log('res.data.list是', res.data.list)
          }

        }).catch(err => {
          console.log('获取歌手详情页出错了', err),
            alert('获取歌手详情页出错了', err)
        })
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
