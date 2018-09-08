<template>
  <scroll class="suggest"
          :data="songOrSingerArry"
          :pullup="pullup"
          @scrollToEnd="MoreSearch"
          ref="scroll"
          :beforeScroll="beforeScroll"
          @beforeScroll="pushBlur"
          v-show="newInputWord"
  >
    <ul class="suggest-ul">
      <li v-for=" item in songOrSingerArry" @click="selectItem(item)">
        <i :class="getIcon(item)" class="icon"></i> <span class="singer-song" v-html="getSingerOrSong(item)"></span>
      </li>
      <loading :title="title" class="loading-wrap" v-show="hasMore && newInputWord"></loading>
    </ul>
    <div class="no-result-wrap" v-if="newInputWord &&!songOrSingerArry.length && !hasMore">
      <no-result title="抱歉！暂无搜索结果，您可更换搜索词重试。"></no-result>
    </div>

  </scroll>
</template>

<script>
  import {ERROR_OK, WYNET_OK} from 'api/config'
  import {getQQSearchAll, getWYSearchAll} from 'api/search'
  import {createSong, createSongWY} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import noResult from 'base/no-result/no-result'
  import {Singer, SingerWY} from 'common/js/singer'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  const perPageNum = 20
  export default {
    computed: {
      ...mapGetters(['musicSourceData'])
    },
    props: {
      newInputWord: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        pageNum: 1,
        songOrSingerArry: [],
        pullup: true,
        hasMore: true,
        title: '',
        beforeScroll: true,
        offset: 0,
        qqOptimizeSongData:[],
      }
    },
    components: {
      Scroll, Loading, noResult
    },
    watch: {
      newInputWord(newWord) {
        if (!newWord || newWord === ' ') {
          return
        }
        if (this.musicSourceData === '1') {
          this._getQQSearchAll()
        }
        if (this.musicSourceData === '2') {
          this._getWYSearchAll()
        }

      }
    },
    methods: {
      _getQQSearchAll() {
        this.pageNum = 1
        this.hasMore = true
        this.$refs.scroll.scrollTo(0, 0)
        getQQSearchAll(this.newInputWord, this.showSinger, perPageNum, this.pageNum).then(res => {
          if (res.code === ERROR_OK) {
            this.concatSongAndSingerData(res.data)
            this.checkMore(res.data)
          } else {
            console.log('res.code不为0,getQQSearchAll')
            alert('获取QQ搜索数据异常，请刷新重试或联系本人')
          }
        }).catch(err => {
          console.log('获取QQ歌手及歌曲检索数据出错了', err)
          alert('获取QQ歌手及歌曲检索数据出错了，请刷新重试或联系本人')
        })
      },
      _getWYSearchAll() {
        this.offset = 0
        this.hasMore = true
        this.$refs.scroll.scrollTo(0, 0)
        getWYSearchAll(this.newInputWord, this.showSinger, perPageNum, this.offset).then(res => {
          if (this.showSinger) {
            this.hasMore = false
          }
          if (res.code === WYNET_OK) {
            this.songOrSingerArry = this.concatSongAndSingerDataWY(res.result)
            console.log('res.result', res.result)
            this.checkMoreWY(res.result)
          } else {
            console.log('res.code不为200,getWYSearchAll')
            alert('获取网易搜索数据异常，请刷新重试或联系本人')
          }
        }).catch(err => {
          console.log('获取网易歌手及歌曲检索数据出错了', err)
          alert('获取网易歌手及歌曲检索数据出错了，请刷新重试或联系本人')
        })
      },
      concatSongAndSingerData(data) {
       this.songOrSingerArry = []
        // 搜索歌曲
        if (data.song && data.song.list.length > 0) {
//          this.songOrSingerArry = this.songOrSingerArry.concat(this.optimizeSongData(data.song.list))
          this.songOrSingerArry=this.optimizeSongData(data.song.list);
//          this.songOrSingerArry =this.qqOptimizeSongData;
        }
        // 搜索歌手
        if (data.zhida.zhida_singer && data.zhida.zhida_singer.singerMID) {
          this.songOrSingerArry.push({...data.zhida.zhida_singer, ...{type: 'singer'}})
        }
//        return this.songOrSingerArry
      },
      concatSongAndSingerDataWY(data) {
        let ret = []
        if (data.artists && data.artists.length > 0) {
          ret.push({...data.artists[0], ...{type: 'singer'}})
        }
        if (data.songs && data.songs.length > 0) {
          this.optimizeSongDataWY(data.songs)
          ret = ret.concat(this.optimizeSongDataWY(data.songs))
        }
        return ret
      },
      optimizeSongData(songData) {
//          this.qqOptimizeSongData = [];
          let ret = [];
          songData.forEach((item,index) => {
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
            createSong(songInfo).then((res)=>{
//              this.qqOptimizeSongData.push(res)
              ret.push(res)
            }).catch((err)=>{
              console.log('optimizeSongData里的createSong出错了'+err)
            })
        })

        // 异步 此时返回的是空 todo

//        console.table(this.qqOptimizeSongData)
//        return this.qqOptimizeSongData

        return ret

      },
      optimizeSongDataWY(songData) {
//        console.log('songData无album.picUrl数据 因此无专辑图片只显示alt',songData)
        let ret = []
        songData.forEach(item => {
          let songInfo = {};
          songInfo.id = item.id
          songInfo.ar = item.artists
          songInfo.name = item.name
          songInfo.al = item.album
          songInfo.dt = item.duration
//          songInfo.singer = item.fsinger
//          songInfo.songname = songInfo.songDetail[1]
          createSongWY(songInfo)
          ret.push(createSongWY(songInfo))
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
      selectItem(item) {
        if (item.type && item.type === 'singer') {
          let singer;
          if (this.musicSourceData === '1') {
            singer = new Singer({
              mid: item.singerMID,
              name: item.singerName
            })
          }
          if (this.musicSourceData === '2') {
            singer = new SingerWY({
              id: item.id,
              name: item.name,
              picUrl: item.picUrl
            })
          }
          this.$router.push({
            path: `/search/${singer.mid}`
          })
          this.setSinger(singer)
        } else {

          this.insertSong(item)
        }
        this.$emit('chooseIt')
      },
      getSingerOrSong(item) {
        if (item.type && item.type === 'singer') {
          if (this.musicSourceData === '1') {
            return item.singerName
          }
          if (this.musicSourceData === '2') {
            return item.name
          }
        } else {
          return `${item.name}--${item.singer}`
        }
      },
      MoreSearch() {
        if (!this.hasMore) {
          return
        }
        this.hasMore = true
        if (this.musicSourceData === '1') {
          this.pageNum++
          getQQSearchAll(this.newInputWord, this.showSinger, perPageNum, this.pageNum).then(res => {
            if (res.code === ERROR_OK) {
              this.songOrSingerArry = this.songOrSingerArry.concat(this.optimizeSongData(res.data.song.list))
              this.checkMore(res.data)
            } else {
              console.log('res.code不为0')
            }
          }).catch(err => {
            console.log('获取QQ歌手及歌曲检索数据出错了', err)
          })
          console.log('要加载更多')
        }
        if (this.musicSourceData === '2') {
          this.offset += perPageNum
          getWYSearchAll(this.newInputWord, this.showSinger, perPageNum, this.offset).then(res => {
            if (this.showSinger) {
              this.hasMore = false
            }
            if (res.code === WYNET_OK) {
              this.songOrSingerArry = this.songOrSingerArry.concat(this.concatSongAndSingerDataWY(res.result))
              this.checkMoreWY(res.result)
            } else {
              console.log('res.code不为200,getWYSearchAll')
              alert('获取网易搜索数据异常，请刷新重试或联系本人')
            }
          }).catch(err => {
            console.log('获取网易歌手及歌曲检索数据出错了', err)
          })
          console.log('要加载更多')
        }

      },
      checkMore(data) {
        const song = data.song
        if (!song.list.length || song.curnum + song.curpage * perPageNum >= song.totalnum) {
          this.hasMore = false
        }
      },
      checkMoreWY(data) {
        console.log('checkMoreWYData', data)
//        const song = data.songs
        if (!data.songCount || this.offset >= data.songCount || data.songCount <= perPageNum) {
          this.hasMore = false
        }
      },
      pushBlur() {
        this.$emit('pushBlur')
      },
      refresh() {
        this.$refs.scroll.refresh()
      },
      changeBottom(val) {
        this.$refs.scroll.$el.style.bottom = val
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
