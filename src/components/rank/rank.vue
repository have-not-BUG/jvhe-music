<template>
  <div class="rank">
    <ul class="rank-ul">
      <li v-for="item in topList " v-if="topList.length" class="ranklist-wrap">
        <div class="rank-icon">
          <img :src="item.picUrl" :alt="item.topTitle">
        </div>
        <div class="rank-detail">
          <p v-for="(detail,index) in item.songList ">
            {{index+1}}.{{detail.songname}}-{{detail.singername}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getQQAllRankData } from 'api/rank'
  export default {
    data () {
      return {
        topList: []
      }
    },
    created(){
      this._getQQAllRankData()
    },
    methods: {
      _getQQAllRankData(){
        getQQAllRankData().then(res => {
          this.topList = res.data.topList
        }).catch(err => {
          console.log('获取QQ音乐所有排行榜数据出错', err)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .rank {
    .rank-ul {
      width 100%
      .ranklist-wrap {
        position relative
        margin 15px 20px
        background-color $color-highlight-background
        no-wrap()
        display: flex
        align-items  center
        .rank-icon {
          height 100px
          width 100px
          img {
            width 100%
            height 100%
          }
        }
        .rank-detail {
          width calc( 100% - 120px )
          margin-left 10px
          p{
            no-wrap()
            color $color-text-d
            font-size $font-size-small
            margin  5px 0
          }
        }

      }

    }

  }

</style>
