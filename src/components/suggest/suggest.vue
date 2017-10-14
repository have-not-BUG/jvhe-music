<template>
  <div class="suggest-wrap">
  </div>
</template>

<script>
  import { ERROR_OK } from 'api/config'
  import { getQQSearchAll } from 'api/search'
  export default {
    props: {
      newInputWord: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        pageNum: 1
      }
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
            console.log(res.data)
          } else {
            console.log('res.code不为0')
          }
        }).catch(err => {
          console.log('获取QQ歌手及歌曲检索数据出错了', err)
        })
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
</style>
