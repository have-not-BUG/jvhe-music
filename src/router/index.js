import Vue from 'vue'
import Router from 'vue-router'

// import Recommend from 'components/recommend/recommend'
// import Search from 'components/search/search'
// import Singer from 'components/singer/singer'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import NotFind from 'components/notfind/notfind'
// import RecommendList from 'components/recommend-list/recommend-list'
// import RankDetail from 'components/rank-detail/rank-detail'
// import userCenter from 'components/user-center/user-center'
// import Rank from 'components/rank/rank'

Vue.use(Router)
const Recommend = (resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('components/singer/singer').then((module) => {
    resolve(module)
  })
}
const SingerDetail = (resolve) => {
  import('components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}
const NotFind = (resolve) => {
  import('components/notfind/notfind').then((module) => {
    resolve(module)
  })
}
const RecommendList = (resolve) => {
  import('components/recommend-list/recommend-list').then((module) => {
    resolve(module)
  })
}
const RankDetail = (resolve) => {
  import('components/rank-detail/rank-detail').then((module) => {
    resolve(module)
  })
}
const userCenter = (resolve) => {
  import('components/user-center/user-center').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module)
  })
}
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
