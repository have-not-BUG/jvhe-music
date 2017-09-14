<template>
  <div class="song-list-wrapper">
    <ul class="song-ul">
      <li v-for="song in songs">
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
      songDetail(song){
//        return song.singer + '·' + song.album
        return `${song.singer}·${song.album}`
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .song-list-wrapper {

    .song-ul {

      li {

        .song-name {
          color $color-text
          line-height 20px
        }
        .song-detail {
          color $color-text-d
          margin-top 4px


        }

      }

    }

  }


</style>
