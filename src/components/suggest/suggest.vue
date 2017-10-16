<template>
  <scroll class="suggest"
          :data="songOrSingerArry"
          :pullup="pullup"
          @scrollToEnd="MoreSearch">
    <ul class="suggest-ul">
      <li v-for=" item in songOrSingerArry">
        <i :class="getIcon(item)" class="icon"></i> <span class="singer-song" v-html="getSingerOrSong(item)"></span>
      </li>
    </ul>
    <p v-show="newInputWord &&!songOrSingerArry.length">抱歉暂无搜索结果...</p>
  </scroll>
</template>

<script>
  import { ERROR_OK } from 'api/config'
  import { getQQSearchAll } from 'api/search'
  import { createSong } from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  export default {
    computed: {},
    props: {
      newInputWord: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        pageNum: 1,
        songOrSingerArry: [],
        pullup: true
      }
    },
    components: {
      Scroll
    },
    watch: {
      newInputWord(){
        this._getQQSearchAll()
      }
    },
    methods: {
      _getQQSearchAll(){
        getQQSearchAll(this.newInputWord, true, 20, this.pageNum).then(res => {
          if (res.code === ERROR_OK) {
            this.songOrSingerArry = this.concatSongAndSingerData(res.data)
            console.log('res.data', res.data)
            console.log('this.songOrSingerArry', this.songOrSingerArry)
          } else {
            console.log('res.code不为0')
          }
        }).catch(err => {
          console.log('获取QQ歌手及歌曲检索数据出错了', err)
        })
      },
      concatSongAndSingerData(data){
        let ret = []
        if (data.zhida.zhida_singer && data.zhida.zhida_singer.singerMID) {
          ret.push({...data.zhida.zhida_singer, ...{type: 'singer'}})
        }
        if (data.song && data.song.list.length > 0) {
          this.optimizeSongData(data.song.list)
          ret = ret.concat(this.optimizeSongData(data.song.list))
        }
        return ret
      },
      optimizeSongData(songData){

        let ret = []
        songData.forEach(item => {
          let songInfo = {}
          if (item.f.match(/@@/g)) {
            songInfo.songDetail = item.f.split('@@')
            songInfo.songid = songInfo.songDetail[8].match(/\w+/g)[6]
            songInfo.songmid = songInfo.songDetail[0]
            songInfo.singer = songInfo.songDetail[3].replace(/&amp;/g, '&')
            songInfo.albumname = songInfo.songDetail[2]
            songInfo.albummid = songInfo.songDetail[6]
            songInfo.interval = songInfo.songDetail[7]

          } else {
            songInfo.songDetail = item.f.split('|')
            songInfo.songid = songInfo.songDetail[0]
            songInfo.songmid = songInfo.songDetail[20]
            songInfo.singer = songInfo.songDetail[3].replace(/&amp;/g, '&')
            songInfo.albumname = songInfo.songDetail[5]
            songInfo.albummid = songInfo.songDetail[22]
            songInfo.interval = songInfo.songDetail[7]
          }

//          songInfo.singer = item.fsinger
//          songInfo.songname = songInfo.songDetail[1]
          songInfo.songname = item.fsong
          createSong(songInfo)
          ret.push(createSong(songInfo))
        })
        return ret
      },
      getIcon(item) {
        if (item.type && item.type === 'singer') {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getSingerOrSong(item) {
        if (item.type && item.type === 'singer') {
          return item.singerName
        } else {
          return `${item.name}--${item.singer}`
        }
      },
      MoreSearch() {
        console.log("要加载更多")
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .suggest {
    position fixed
    top 160px
    bottom 0
    overflow hidden
    .suggest-ul {
      font-size $font-size-medium
      color $color-text-d
      li {
        padding-bottom 20px
        no-wrap()
        .icon {

        }
        .singer-song {

        }

      }

    }
  }
</style>
