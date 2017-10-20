<template>
  <div class="search-wrap">
    <div class="search-box-wrap">
      <search-box ref="searchBox" @inputWord="showInputWord"></search-box>
    </div>
    <div class="search-hotkeys-wrap" v-show="!newInputWord">
      <h1>热门搜索</h1>
      <ul class="search-hotkeys-ul">
        <li v-for="hotkey in hotkeys" @click="changeWord(hotkey.k)"> {{hotkey.k}} </li>
      </ul>
    </div>
    <div class="suggest-wrap">
      <suggest :newInputWord="newInputWord"
               @pushBlur="getBlur"
               @chooseIt="saveHistory">
      </suggest>
    </div>
    <div class="search-history-wrap" v-show="!newInputWord && searchHistory &&searchHistory.length">
      <div class="search-history-title">
        <h1>搜索历史</h1> <span @click="clearAllHistory"> <i class="icon-clear"></i> </span>
      </div>
      <history-list :searches="searchHistory" @chooseIt="deleteOne" @clickSavedWord="changeWord"></history-list>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import searchBox from 'base/search-box/search-box'
  import { getQQSearchHotKey } from 'api/search'
  import { ERROR_OK } from 'api/config'
  import Suggest from 'components/suggest/suggest'
  import HistoryList from 'base/history-list/history-list'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        hotkeys: [],
        newInputWord: ''
      }
    },
    components: {
      searchBox, Suggest, HistoryList
    },
    created () {
      this._getQQSearchHotKey()
    },
    methods: {
      _getQQSearchHotKey () {
        getQQSearchHotKey().then(res => {
          if (res.code === ERROR_OK) {
            this.hotkeys = res.data.hotkey.slice(0, 10)
          } else {
            console.log('getQQSearchHotKey 里的res.code 不为0')
          }
        }).catch(err => {
          console.log('QQ热门搜索关键词数据获取失败', err)
        })
      },
      changeWord (key) {
        this.$refs.searchBox.setInput(key)
      },
      showInputWord (newInputWord) {
        this.newInputWord = newInputWord
      },
      getBlur () {
        this.$refs.searchBox.blur()
      },
      saveHistory () {
        this.saveSearchHistory(this.newInputWord)
      },
      clearAllHistory () {
        if (confirm('您确定要清空搜索历史吗？')) {
          this.clearAllSearchHistory()
        } else {
          return
        }
      },
      deleteOne (item) {
        this.deleteOneSearchHistory(item)
      },
      ...mapActions(['saveSearchHistory', 'clearAllSearchHistory', 'deleteOneSearchHistory'])

    },
    computed: {
      ...mapGetters(['searchHistory'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-wrap {
    margin 0 20px
    .search-box-wrap {
      margin 20px 0
    }
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
    .suggest-wrap {

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

</style>
