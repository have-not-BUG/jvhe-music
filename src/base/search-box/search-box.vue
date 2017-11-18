<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="search-input"
           v-model="inputWord"
           ref="searchInput" :placeholder="placeholder">
    <i class="icon-dismiss" @click="clearInput" v-show="inputWord"></i>
  </div>

</template>

<script>
  import { debounce } from 'common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌手、歌曲'
      }
    },
    data () {
      return {
        inputWord: ''
      }
    },
    methods: {
      clearInput () {
        if (this.inputWord) {
          this.inputWord = ''
        }
      },
      setInput (word) {
        this.inputWord = word
      },
      blur () {
        this.$refs.searchInput.blur()
      }
    },
    created () {
      this.$watch('inputWord', debounce((newInputWord) => {
        this.$emit('inputWord', newInputWord)
      }, 200))
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-box {
    display flex
    align-items center
    justify-content center
    box-sizing border-box
    border-radius 6px
    height 40px
    padding 10px 5px
    background-color $color-highlight-background
    .icon-search {
      font-size 24px
    }
    .search-input {
      flex 1
      background-color $color-highlight-background
      margin 0 5px
      line-height 18px
      font-size $font-size-medium
      color $color-text
    }
    .icon-dismiss {
      font-size $font-size-medium-x
      color $color-text-l
    }
  }


</style>
