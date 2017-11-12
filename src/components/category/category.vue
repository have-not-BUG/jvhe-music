<template>
  <div class="category-wrap" ref="categoryWrap">
    <scroll class="category-scroll" :data="category" ref="categoryScroll">
      <ul class="category-ul">
        <li v-for=" item in category">
          <h1 class="category-group-name" v-html="item.categoryGroupName"></h1>
          <ul>
            <li v-for=" it in item.items ">
              <p class="category-name" v-html="it.categoryName"
                 @click="sendCategory(it.categoryId,it.categoryName)"></p>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
    <div class="loading" v-if="!category.length>0">
      <loading></loading>
    </div>

  </div>
</template>

<script>
  import { getQQCategory } from 'api/category'
  import Scroll from 'base/scroll/scroll'
  import { playListMixin } from 'common/js/mixin'
  import { mapGetters, mapMutations } from 'vuex'
  import Loading from 'base/loading/loading'

  export default {
    mixins: [playListMixin],
    data () {
      return {
        category: []
      }
    },
    computed: {
      ...mapGetters(['musicSourceData'])
    },
    created () {
      this._getQQCategory()
    },
    methods: {
      handlePlayList (playList) {
        const bottomValue = playList.length > 0 ? '60px' : ''
        this.$refs.categoryWrap.style.bottom = bottomValue
        this.$refs.categoryScroll.refresh()
      },
      _getQQCategory () {
        getQQCategory().then(res => {
          console.log(res.data)
          this.category = res.data.categories.splice(1)
          console.log(this.category)
        }).catch(err => {
          console.log('获取QQ音乐大分类数据出错', err)
        })
      },
      sendCategory (id, name) {
        let categoryInfo = {categoryId: id, categoryName: name}
        this.setCategory(categoryInfo)
        console.log('sendCategory', id, name)
        this.$router.push({
          path: `/category/${id}`
        })
      },
      ...mapMutations({
        setCategory: 'SET_CATEGRORY'
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
  .category-wrap {
    position fixed
    top 90px
    bottom 0
    left 0
    right 0
    .category-scroll {
      height 100%
      overflow hidden
      position relative
      .category-ul {
        li {
          padding 0 0 15px 0
          .category-group-name {
            color $color-theme
            background-color $color-highlight-background
            height 30px
            line-height 30px
            padding-left 20px
            font-size $font-size-medium
          }
          ul {
            padding 20px
            display flex
            flex-wrap wrap
            li {
              .category-name {
                margin 0 10px
                padding 5px
                color $color-text-l
                border 1px solid  $color-text-l
                border-radius 4px
                font-size $font-size-small

              }
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
