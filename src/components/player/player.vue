<template>
  <div class="player" v-show="playList.length>0">
    <div class="normal-player-wrap" v-show="fullScreen">正常播放界面</div>
    <div class="mini-player-wrap" v-show="!fullScreen">迷你播放界面</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'player',
    computed: {
      ...mapGetters(['playing', 'fullScreen', 'playList'])
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .player {
    background-color blue
    z-index 100
    position relative
  }


</style>
