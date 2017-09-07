import Vue from 'vue'
import App from './App'
import router from './router'

import 'common/stylus/index.styl'

import axios from 'axios'

import VueLazyLoad from 'vue-lazyload'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('common/image/loading.svg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
