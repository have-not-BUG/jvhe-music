import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'
import NotFind from 'components/notfind/notfind'
import RecommendList from 'components/recommend-list/recommend-list'
import RankDetail from 'components/rank-detail/rank-detail'
import userCenter from 'components/user-center/user-center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      // name: 'rank',
      component: Rank,
      children: [{
        path: ':id',
        component: RankDetail
      }]
    },
    {
      path: '/recommend',
      // name: 'recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: RecommendList
      }]
    },
    {
      path: '/search',
      // name: 'search',
      component: Search,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/singer',
      // name: 'singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/user',
      component: userCenter
    },
    {
      path: '*',
      // name: 'singer',
      component: NotFind
    }
  ]
})
