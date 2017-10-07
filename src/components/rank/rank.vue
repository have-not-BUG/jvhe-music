<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  import { getQQAllRankData } from 'api/rank'
  export default {
    data () {
      return {
        msg: '排行页面'
      }
    },
    created(){
      this._getQQAllRankData()
    },
    methods: {
      _getQQAllRankData(){
        getQQAllRankData().then(res => {
          console.log(res.data)
        }).catch(err => {
          console.log('获取QQ音乐所有排行榜数据出错', err)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

</style>
