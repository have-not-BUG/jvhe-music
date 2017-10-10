<template>
  <div class="song-list-wrapper">
    <ul class="song-ul">
      <li v-for="(song , index) in songs" @click="chooseItem(song ,index)">
        <div class="rank-icon-text" v-show="rank">
          <span :class="showRankIcon(index)"></span>
          <span class="rank-text" v-if="!showRankIcon(index)">{{showRankText(index)}}</span>
        </div>
        <div class="song-name-detail">
          <h2 class="song-name"> <span v-show="!rank"> {{index+1}}. </span> {{song.name}}</h2>
          <p class="song-detail">{{songDetail(song)}} </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      songDetail(song) {
//        return song.singer + '·' + song.album
        return `${song.singer}·${song.album}`
      },
      chooseItem(item, index) {
        this.$emit('selectEvent', item, index)
      },
      showRankIcon(index){
        if (index < 3) {
          return `rank-icon icon${index}`
        }
        else return ''
      },
      showRankText(index){
        if (index > 2) {
          return index + 1
        }
        else return ''
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .song-list-wrapper {

    .song-ul {
      position relative

      li {
        padding 10px 30px
        display flex
        align-items center
        .rank-icon-text {
          margin-right 20px
          .rank-icon {
            display inline-block
            width 25px
            height 24px
            background-size 25px 24px
            &.icon0 {
              bg-image('first')
            }
            &.icon1 {
              bg-image('second')
            }
            &.icon2 {
              bg-image('third')
            }

          }
          .rank-text {
            color $color-theme
            font-size $font-size-large
            display inline-block
            width 25px
            height 24px
            text-align center
            line-height 25px
          }

        }
        .song-name-detail {
          no-wrap()
          .song-name {
            color $color-text
            line-height 20px
            font-size $font-size-medium
            no-wrap()
          }
          .song-detail {
            color $color-text-d
            margin-top 4px
            font-size $font-size-small
            no-wrap()

          }

        }

      }

    }

  }


</style>
