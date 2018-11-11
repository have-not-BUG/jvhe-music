<template>
  <div class="search-wrap">
    <div class="search-box-wrap">
      <search-box ref="searchBox" @inputWord="showInputWord"></search-box>
    </div>
    <div class="suggest-wrap" v-show="newInputWord">
      <suggest :newInputWord="newInputWord"
               @pushBlur="getBlur"
               @chooseIt="saveHistory" ref="suggest">
      </suggest>
    </div>
    <scroll class="hotkeys-history-scroll"
            :data="hotkeysAndsearchHistory"
            v-show="!newInputWord" ref="hotkeysHistoryScroll" :refreshDelay="refreshDelay">
      <div class="hotkeys-history-wrap">
        <div class="search-hotkeys-wrap">
          <h1>热门搜索</h1>
          <ul class="search-hotkeys-ul">
            <li v-for="hotkey in hotkeys" @click="changeWord(hotkey.k)"> {{hotkey.k}} </li>
          </ul>
        </div>
        <div class="search-history-wrap" v-show="!newInputWord && searchHistory &&searchHistory.length">
          <div class="search-history-title">
            <h1>搜索历史</h1> <span @click="clearAllHistory"> <i class="icon-clear"></i> </span>
          </div>
          <history-list :searches="searchHistory" @chooseIt="deleteOne" @clickSavedWord="changeWord"></history-list>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import searchBox from 'base/search-box/search-box'
  import { getQQSearchHotKey } from 'api/search'
  import { ERROR_OK } from 'api/config'
  import Suggest from 'components/suggest/suggest'
  import HistoryList from 'base/history-list/history-list'
  import Scroll from 'base/scroll/scroll'
  import { playListMixin, searchMixin } from 'common/js/mixin'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    mixins: [playListMixin, searchMixin],
    data () {
      return {
        hotkeys: []
//        newInputWord: ''
      }
    },
    components: {
      searchBox, Suggest, HistoryList, Scroll
    },
    created () {
      this._getQQSearchHotKey()
    },
    methods: {
      handlePlayList (playlist) {
        let bottom = playlist.length > 0 ? '60px' : 0
        this.$refs.hotkeysHistoryScroll.$el.style.bottom = bottom
        this.$refs.hotkeysHistoryScroll.refresh()
        this.$refs.suggest.changeBottom(bottom)
        this.$refs.suggest.refresh()

      },
      _getQQSearchHotKey () {
        getQQSearchHotKey().then(res => {
          if (res.code === ERROR_OK) {
            this.hotkeys = res.data.hotkey.slice(0, 10)
          } else {
            console.log('getQQSearchHotKey 里的res.code 不为0')
//            alert('获取热门关键词数据异常，请刷新重试或联系本人')
            this.$message({
              type: 'error',
              message: `获取热门关键词数据异常，请刷新重试或联系本人`,
              duration: 4500,
            });
          }
        }).catch(err => {
          console.log('QQ热门搜索关键词数据获取失败', err)
//          alert('QQ热门搜索关键词数据获取失败，请刷新重试或联系本人')
          this.$message({
            type: 'error',
            message: `'QQ热门搜索关键词数据获取失败', ${err}`,
            duration: 4500,
          });
        })
      },

//      showInputWord (newInputWord) {
//        this.newInputWord = newInputWord
//      },
//      getBlur () {
//        this.$refs.searchBox.blur()
//      },
//      saveHistory () {
//        this.saveSearchHistory(this.newInputWord)
//      },
      clearAllHistory () {
        if (confirm('您确定要清空搜索历史吗？')) {
          this.clearAllSearchHistory()
        } else {
          return
        }
      },

      ...mapActions(['saveSearchHistory', 'clearAllSearchHistory'])

    },
    computed: {
      hotkeysAndsearchHistory () {
        return this.hotkeys.concat(this.searchHistory)
      }
    },
    watch: {
      newInputWord (newWord) {
        if (!newWord) {
          setTimeout(() => {
            this.$refs.hotkeysHistoryScroll.refresh()
          }, 20)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-wrap {
    margin 0 20px
    .search-box-wrap {
      padding 20px 0

    }
    .suggest-wrap {
    }
    .hotkeys-history-scroll {
      position fixed
      top 160px
      bottom 0
      left 20px
      right 20px
      z-index -1

      .hotkeys-history-wrap {
        .search-hotkeys-wrap {
          z-index 2
          position relative
          h1 {
            margin-bottom 20px
            color $color-text
          }
          .search-hotkeys-ul {
            display flex
            flex-wrap wrap
            li {
              background-color $color-highlight-background
              padding 5px 10px
              margin 5px 10px
              border-radius 6px
              color $color-text-d
            }
          }

        }

        .search-history-wrap {
          z-index 2
          .search-history-title {
            display flex
            justify-content space-between
            align-items center
            color $color-text

            h1 {
              margin 20px 0
              font-size $font-size-medium

            }
            i {
              color $color-text-l
            }
          }

        }

      }

    }

  }

</style>
