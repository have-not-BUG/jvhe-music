<template>
  <div class="rank-wrap" ref="rankWrap">
    <scroll class="rank-scroll" :data="topList" ref="rankScroll">
      <ul class="rank-ul">
        <li v-for="item in topList " v-if="topList.length" class="ranklist-wrap" @click="chooseRank(item)">
          <div class="rank-icon">
            <img :src="item.picUrl" :alt="item.topTitle">
          </div>
          <div class="rank-detail">
            <p v-for="(detail,index) in item.songList ">
              {{index + 1}}.{{detail.songname}}-{{detail.singername}}
            </p>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getQQAllRankData } from 'api/rank'
  import Scroll from 'base/scroll/scroll'
  import { playListMixin } from 'common/js/mixin'
  import { mapMutations } from 'vuex'

  export default {
    mixins: [playListMixin],
    data () {
      return {
        topList: []
      }
    },
    created(){
      this._getQQAllRankData()
    },
    methods: {
      handlePlayList(playList) {
        const bottomValue = playList.length > 0 ? '60px' : ''
        this.$refs.rankWrap.style.bottom = bottomValue
        this.$refs.rankScroll.refresh()
      },
      _getQQAllRankData(){
        getQQAllRankData().then(res => {
          this.topList = res.data.topList
        }).catch(err => {
          console.log('获取QQ音乐所有排行榜数据出错', err)
        })
      },
      chooseRank(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setRankList(item)
      },
      ...mapMutations({
        setRankList: 'SET_RANKLIST'
      })
    },
    components: {
      Scroll
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .rank-wrap {
    position fixed
    top 100px
    bottom 0
    left 0
    right 0
    .rank-scroll {
      height 100%
      overflow hidden
      .rank-ul {
        .ranklist-wrap {
          margin 0 20px 20px 20px
          background-color $color-highlight-background
          no-wrap()
          display: flex
          align-items center
          .rank-icon {
            height 100px
            width 100px
            img {
              width 100%
              height 100%
            }
          }
          .rank-detail {
            width calc(100% - 120px)
            margin-left 10px
            p {
              no-wrap()
              color $color-text-d
              font-size $font-size-small
              margin 5px 0
            }
          }

        }

      }
    }

  }

</style>
