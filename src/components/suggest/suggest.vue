<template>
  <scroll class="suggest"
          :data="songOrSingerArry"
          :pullup="pullup"
          @scrollToEnd="MoreSearch"
          ref="scroll"
  >
    <ul class="suggest-ul">
      <li v-for=" item in songOrSingerArry" @click="selectItem(item)">
        <i :class="getIcon(item)" class="icon"></i> <span class="singer-song" v-html="getSingerOrSong(item)"></span>
      </li>
      <loading :title="title" class="loading-wrap" v-show="hasMore && newInputWord"></loading>
    </ul>
    <div class="no-result-wrap" v-show="newInputWord &&!songOrSingerArry.length">
      <no-result title="抱歉！暂无搜索结果，您可更换搜索词重试。"></no-result>
    </div>

  </scroll>
</template>

<script>
  import { ERROR_OK } from 'api/config'
  import { getQQSearchAll } from 'api/search'
  import { createSong } from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import noResult from 'base/no-result/no-result'
  import Singer from 'common/js/singer'
  import { mapMutations, mapActions } from 'vuex'

  const perPageNum = 20
  export default {
    computed: {},
    props: {
      newInputWord: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        pageNum: 1,
        songOrSingerArry: [],
        pullup: true,
        hasMore: true,
        title: ''
      }
    },
    components: {
      Scroll, Loading, noResult
    },
    watch: {
      newInputWord () {
        this._getQQSearchAll()
      }
    },
    methods: {
      _getQQSearchAll () {
        this.pageNum = 1
        this.hasMore = true
        this.$refs.scroll.scrollTo(0, 0)
        getQQSearchAll(this.newInputWord, true, perPageNum, this.pageNum).then(res => {
          if (res.code === ERROR_OK) {
            this.songOrSingerArry = this.concatSongAndSingerData(res.data)
            console.log('res.data', res.data)
            console.log('this.songOrSingerArry', this.songOrSingerArry)
            this.checkMore(res.data)
          } else {
            console.log('res.code不为0')
          }
        }).catch(err => {
          console.log('获取QQ歌手及歌曲检索数据出错了', err)
        })
      },
      concatSongAndSingerData (data) {
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
      optimizeSongData (songData) {

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
      getIcon (item) {
        if (item.type && item.type === 'singer') {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      selectItem (item) {
        if (item.type && item.type === 'singer') {

          const singer = new Singer({
            mid: item.singerMID,
            name: item.singerName
          })
          this.$router.push({
            path: `/search/${singer.mid}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
      },
      getSingerOrSong (item) {
        if (item.type && item.type === 'singer') {
          return item.singerName
        } else {
          return `${item.name}--${item.singer}`
        }
      },
      MoreSearch () {
        if (!this.hasMore) {
          return
        }
        this.hasMore = true
        this.pageNum++
        getQQSearchAll(this.newInputWord, true, perPageNum, this.pageNum).then(res => {
          if (res.code === ERROR_OK) {
            this.songOrSingerArry = this.songOrSingerArry.concat(this.optimizeSongData(res.data.song.list))
            console.log('res.data', res.data)
            console.log('this.songOrSingerArry', this.songOrSingerArry)
            this.checkMore(res.data)
          } else {
            console.log('res.code不为0')
          }
        }).catch(err => {
          console.log('获取QQ歌手及歌曲检索数据出错了', err)
        })
        console.log('要加载更多')
      },
      checkMore (data) {
        const song = data.song
        if (!song.list.length || song.curnum + song.curpage * perPageNum >= song.totalnum) {
          this.hasMore = false
        }
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
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
    left 20px
    right 20px
    overflow hidden
    .suggest-ul {
      font-size $font-size-medium
      color $color-text-d
      no-wrap()
      li {
        padding-bottom 20px
        no-wrap()
        .icon {
        }
        .singer-song {
          no-wrap()
        }

      }
      .loading-wrap {

      }

    }
    .no-result-wrap {
      padding 10px
      margin 0 auto
    }
  }
</style>
