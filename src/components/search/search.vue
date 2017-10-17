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
      <suggest :newInputWord="newInputWord"></suggest>
    </div>
  </div>
</template>

<script>
  import searchBox from 'base/search-box/search-box'
  import { getQQSearchHotKey } from 'api/search'
  import { ERROR_OK } from 'api/config'
  import Suggest from 'components/suggest/suggest'

  export default {
    data() {
      return {
        hotkeys: [],
        newInputWord: ''
      }
    },
    components: {
      searchBox, Suggest
    },
    created(){
      this._getQQSearchHotKey()
    },
    methods: {
      _getQQSearchHotKey() {
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
      changeWord(key){
        this.$refs.searchBox.setInput(key)
      },
      showInputWord(newInputWord){
        this.newInputWord = newInputWord
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
      margin 20px 0
    }
    .search-hotkeys-wrap {
      z-index 2
      position relative
      h1 {
        margin-bottom 20px
        color $color-text-l
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
  }

</style>
