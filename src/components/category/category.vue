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
      if (this.musicSourceData === '1') {
        this._getQQCategory()
      }
      if (this.musicSourceData === '2') {
        this._getWYCategory()
      }

    },
    methods: {
      handlePlayList (playList) {
        const bottomValue = playList.length > 0 ? '60px' : ''
        this.$refs.categoryWrap.style.bottom = bottomValue
        this.$refs.categoryScroll.refresh()
      },
      _getQQCategory () {
        getQQCategory().then(res => {
          this.category = res.data.categories.splice(1)
          console.log('this.category', this.category)
        }).catch(err => {
          console.log('获取QQ音乐大分类数据出错', err)
//          alert('获取音乐分类数据出错，请刷新重试或联系本人')
          this.$message({
            type: 'error',
            message: `获取音乐分类数据出错，请刷新重试或联系本人`,
            duration: 4500,
          });
        })
      },
      _getWYCategory () {
        this.category = [{
          'categoryGroupName': '语种',
          'items': [{
            'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
              'sortId': 4,
              'sortName': '评分'
            }], 'categoryId': 0, 'categoryName': '华语', 'usable': 1
          }, {
            'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
              'sortId': 4,
              'sortName': '评分'
            }], 'categoryId': 1, 'categoryName': '欧美', 'usable': 1
          }, {
            'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
              'sortId': 4,
              'sortName': '评分'
            }], 'categoryId': 2, 'categoryName': '日语', 'usable': 1
          }, {
            'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
              'sortId': 4,
              'sortName': '评分'
            }], 'categoryId': 3, 'categoryName': '韩语', 'usable': 1
          }, {
            'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
              'sortId': 4,
              'sortName': '评分'
            }], 'categoryId': 4, 'categoryName': '粤语', 'usable': 1
          }, {
            'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
              'sortId': 4,
              'sortName': '评分'
            }], 'categoryId': 5, 'categoryName': '小语种', 'usable': 1
          }],
          'usable': 1
        },
          {
            'categoryGroupName': '风格',
            'items': [{
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 6, 'categoryName': '流行', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 7, 'categoryName': '摇滚', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 8, 'categoryName': '民谣', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 9, 'categoryName': '电子', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 10, 'categoryName': '舞蹈', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 11, 'categoryName': '说唱', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 12, 'categoryName': '轻音乐', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 13, 'categoryName': '爵士', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 14, 'categoryName': '乡村', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 15, 'categoryName': 'R&B/Soul', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 16, 'categoryName': '古典', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 17, 'categoryName': '民族', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 18, 'categoryName': '英伦', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 19, 'categoryName': '金属', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 20, 'categoryName': '朋克', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 21, 'categoryName': '蓝调', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 22, 'categoryName': '雷鬼', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 23, 'categoryName': '世界音乐', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 24, 'categoryName': '拉丁', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 25, 'categoryName': '另类/独立', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 26, 'categoryName': 'New Age', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 27, 'categoryName': '古风', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 28, 'categoryName': '后摇', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 29, 'categoryName': 'Bossa Nova', 'usable': 1
            }],
            'usable': 1
          },
          {
            'categoryGroupName': '主题',
            'items': [{
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 30, 'categoryName': '影视原生', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 31, 'categoryName': 'ACG', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 32, 'categoryName': '校园', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 33, 'categoryName': '游戏', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 34, 'categoryName': '70后', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 35, 'categoryName': '80后', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 36, 'categoryName': '90后', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 37, 'categoryName': '网络歌曲', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 38, 'categoryName': 'KTV', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 39, 'categoryName': '经典', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 40, 'categoryName': '翻唱', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 41, 'categoryName': '吉他', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 42, 'categoryName': '钢琴', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 43, 'categoryName': '器乐', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 44, 'categoryName': '儿童', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 45, 'categoryName': '榜单', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 46, 'categoryName': '00后', 'usable': 1
            }],
            'usable': 1
          },
          {
            'categoryGroupName': '情感',
            'items': [{
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 47, 'categoryName': '怀旧', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 48, 'categoryName': '清新', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 49, 'categoryName': '浪漫', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 50, 'categoryName': '性感', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 51, 'categoryName': '伤感', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 52, 'categoryName': '治愈', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 53, 'categoryName': '放松', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 54, 'categoryName': '孤独', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 55, 'categoryName': '感动', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 56, 'categoryName': '兴奋', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 57, 'categoryName': '快乐', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 58, 'categoryName': '安静', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 59, 'categoryName': '思念', 'usable': 1
            }],
            'usable': 1
          },
          {
            'categoryGroupName': '场景',
            'items': [{
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 60, 'categoryName': '清晨', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 61, 'categoryName': '夜晚', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 62, 'categoryName': '学习', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 63, 'categoryName': '工作', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 64, 'categoryName': '午休', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 65, 'categoryName': '下午茶', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 66, 'categoryName': '地铁', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 67, 'categoryName': '驾车', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 68, 'categoryName': '运动', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 69, 'categoryName': '旅行', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 70, 'categoryName': '散步', 'usable': 1
            }, {
              'allsorts': [{'sortId': 2, 'sortName': '最新'}, {'sortId': 3, 'sortName': '最热'}, {
                'sortId': 4,
                'sortName': '评分'
              }], 'categoryId': 71, 'categoryName': '酒吧', 'usable': 1
            }],
            'usable': 1
          }]
      },
      sendCategory (id, name) {
        let categoryInfo = {categoryId: id, categoryName: name}
        this.setCategory(categoryInfo)
        if (this.musicSourceData === '1') {
          this.$router.push({
            path: `/category/${id}`
          })
        }
        if (this.musicSourceData === '2') {
          this.$router.push({
            path: `/category/${name}`
          })
        }
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
