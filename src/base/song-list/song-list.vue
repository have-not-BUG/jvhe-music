<template>
  <div class="song-list-wrapper">
    <ul class="song-ul">
      <li v-for="(song , index) in songs" @click="chooseItem(song ,index)">
        <h2 class="song-name">{{song.name}}</h2>
        <p class="song-detail">{{songDetail(song)}} </p>
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
      }
    },
    methods: {
      songDetail(song) {
//        return song.singer + '·' + song.album
        return `${song.singer}·${song.album}`
      },
      chooseItem(item, index) {
        this.$emit('selectEvent', item, index)
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .song-list-wrapper {

    .song-ul {
      position relative

      li {
        padding 10px 30px
        .song-name {
          color $color-text
          line-height 20px
          font-size $font-size-medium

        }
        .song-detail {
          color $color-text-d
          margin-top 4px
          font-size $font-size-small

        }

      }

    }

  }


</style>
