<template>
  <div class="rank-wrap" ref="rankWrap">
    <scroll class="rank-scroll" :data="topList" ref="rankScroll">
      <ul class="rank-ul" v-if="musicSourceData==='1'">
        <li v-for="item in topList " v-if="topList.length" class="ranklist-wrap" @click="chooseRank(item)">
          <div class="rank-icon">
            <img v-lazy="item.picUrl" :alt="item.topTitle">
          </div>
          <div class="rank-detail">
            <p v-for="(detail,index) in item.songList ">
              {{index + 1}}.{{detail.songname}}-{{detail.singername}}
            </p>
          </div>
        </li>
      </ul>
      <ul class="rank-ul-wy" v-if="musicSourceData==='2'">
        <li v-for="item in wyTopList " v-if="wyTopList.length" class="ranklist-wrap" @click="chooseRank(item)">
          <div class="rank-icon">
            <img v-lazy="item.imgurl" :alt="item.name">
          </div>
          <div class="rank-detail">
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
    <div class="loading" v-if="musicSourceData==='1'&&!topList.length>0">
      <loading></loading>
    </div>

  </div>
</template>

<script>
  import { getQQAllRankData } from 'api/rank'
  import Scroll from 'base/scroll/scroll'
  import { playListMixin } from 'common/js/mixin'
  import { mapGetters, mapMutations } from 'vuex'
  import Loading from 'base/loading/loading'

  export default {
    mixins: [playListMixin],
    data () {
      return {
        topList: [],
        wyTopList: [
          {name: '云音乐新歌榜', imgurl: 'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg', id: 0},
          {name: '云音乐热歌榜', imgurl: 'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg', id: 1},
          {name: '网易原创歌曲榜', imgurl: 'http://p1.music.126.net/ps6WTvt1FnbOoYvUPDdzOA==/3394192433248383.jpg', id: 2},
          {name: '云音乐飙升榜', imgurl: 'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg', id: 3},
          {name: '云音乐电音榜', imgurl: 'http://p1.music.126.net/itKGQZjyXuRCTynXQohBIA==/1382086120458223.jpg', id: 4},
          {name: ' UK排行榜周榜', imgurl: 'http://p1.music.126.net/mJLDxxdw0tUH5GcvqkBgKw==/1330409069652865.jpg', id: 5},
          {
            name: ' 美国Billboard周榜',
            imgurl: 'http://p1.music.126.net/BmeUMF4Cr0f343lCwj1_7Q==/2105564767199852.jpg',
            id: 6
          },
          {name: ' KTV嗨榜', imgurl: 'http://p1.music.126.net/UN8g4epoFk-I4DV_C8w32A==/2922501907760617.jpg', id: 7},
          {name: ' iTunes榜', imgurl: 'http://p1.music.126.net/2mNuQJ8P3OG3pPQH1MDrpQ==/1996713116054059.jpg', id: 8},
          {
            name: ' Hit FM Top榜',
            imgurl: 'http://p1.music.126.net/ZRvvfxWy6l12Kzth56Jzaw==/2034096511385987.jpg',
            id: 9
          },
          {
            name: ' 日本Oricon周榜',
            imgurl: 'http://p1.music.126.net/Fy6BPbDk08FT-PeAsRehfQ==/2096768674178104.jpg',
            id: 10
          },
          {
            name: ' 韩国Melon排行榜周榜',
            imgurl: 'http://p1.music.126.net/kSDPQ1aRPPf1GXHwICGLvg==/1367792472071827.jpg',
            id: 11
          },
          {
            name: '韩国Mnet排行榜周榜',
            imgurl: 'http://p1.music.126.net/jvKjUrD2inwNsjW5trHwqQ==/2075877953250337.jpg',
            id: 12
          },
          {
            name: '韩国Melon原声周榜',
            imgurl: 'http://p1.music.126.net/kSDPQ1aRPPf1GXHwICGLvg==/1367792472071827.jpg',
            id: 13
          },
          {
            name: '中国TOP排行榜(港台榜)',
            imgurl: 'http://p1.music.126.net/d8faOLHxwWPta02fskrdDQ==/2057186255569164.jpg',
            id: 14
          },
          {
            name: ' 中国TOP排行榜(内地榜)',
            imgurl: 'http://p1.music.126.net/d8faOLHxwWPta02fskrdDQ==/2057186255569164.jpg',
            id: 15
          },
          {
            name: '香港电台中文歌曲龙虎榜',
            imgurl: 'http://p1.music.126.net/2sEDxeLAtypdLG8M_1hxVA==/5932964743618704.jpg',
            id: 16
          },
          {name: '华语金曲榜', imgurl: 'http://p1.music.126.net/N2whh2Prf0l8QHmCpShrcQ==/19140298416347251.jpg', id: 17},
          {name: '中国嘻哈榜', imgurl: 'http://p1.music.126.net/tgLdvFIFcKAx24QCrYdYPw==/19071029184053433.jpg', id: 18},
          {
            name: '法国 NRJ EuroHot 30周榜',
            imgurl: 'http://p1.music.126.net/iTcPIY_Xnvtb7g0jwRr02w==/18609234302158372.jpg',
            id: 19
          },
          {name: '台湾Hito排行榜', imgurl: 'http://p1.music.126.net/j2-VFcgGXRvSzDfHuvwJOw==/2095669162549019.jpg', id: 20},
          {
            name: 'Beatport全球电子舞曲榜',
            imgurl: 'http://p1.music.126.net/seSiaALVBi8876N-pge1Bg==/3125911557823806.jpg',
            id: 21
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['musicSourceData'])
    },
    created () {
      if (this.musicSourceData === '1') {
        this._getQQAllRankData()
      }

    },
    methods: {
      handlePlayList (playList) {
        const bottomValue = playList.length > 0 ? '60px' : ''
        this.$refs.rankWrap.style.bottom = bottomValue
        this.$refs.rankScroll.refresh()
      },
      _getQQAllRankData () {
        getQQAllRankData().then(res => {
          this.topList = res.data.topList
        }).catch(err => {
          console.log('获取QQ音乐所有排行榜数据出错', err)
        })
      },
      chooseRank (item) {
        this.setRankList(item)
        this.$router.push({
          path: `/rank/${item.id}`
        })
      },
      ...mapMutations({
        setRankList: 'SET_RANKLIST'
      })
    },
    components: {
      Scroll, Loading
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
      .rank-ul-wy {
        .ranklist-wrap {
          margin 0 20px 20px 20px
          background-color $color-highlight-background
          no-wrap()
          display: flex
          align-items center
          .rank-icon {
            height 60px
            width 60px
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
              color $color-text
              font-size $font-size-small
              margin 5px 0
            }
          }

        }

      }
    }
    .loading {
      position fixed
      top 50%
      left 50%
      transform translate(-50%, -50%)

    }

  }

</style>
