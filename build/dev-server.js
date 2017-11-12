require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

var axios = require('axios')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var apiRoutes = express.Router()
apiRoutes.get('/getQQSliderDataProxy', function (req, res) {
  var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://m.y.qq.com/'
    },
    params: req.query
  }).then((response => { res.json(response.data) })).catch(err => {

    console.log(' 自建获取QQ音乐推荐歌单轮播图的代理出错!  ', err)
  })

})
apiRoutes.get('/getQQLyricProxy', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/player.html',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var data = response.data
    if (typeof data === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/

      var jsondata = data.match(reg)
      if (jsondata) {
        data = JSON.parse(jsondata[1])
      }
    }
    res.json(data)
  }).catch(err => {

    console.log(' 自建获取QQ音乐歌词的代理出错!  ', err)
  })

})
apiRoutes.get('/getQQRecommendSongListDetailProxy', function (req, res) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    // res.json(response.data)
    res.json(response.data)

  }).catch(err => {

    console.log(' 自建获取QQ音乐热歌榜详情的代理出错!  ', err)
  })

})
// apiRoutes.get('/getQQSearch', function (req, res) {
//   const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
//   axios.get(url, {
//     headers: {
//       origin:'https://m.y.qq.com',
//       referer:'https://m.y.qq.com/',
//       host: 'c.y.qq.com'
//     },
//     params: req.query
//   }).then((response) => {
//     // res.json(response.data)
//     res.json(response.data)
//
//   }).catch(err => {
//     console.log(' 自建获取QQ音乐歌手及歌曲检索的代理出错!  ', err)
//   })
//
// })
apiRoutes.get('/getWYHotSongListProxy', function (req, res) {
  var url = 'http://wangyimusic.leanapp.cn/top/playlist/highquality'

  axios.get(url, {
    headers: {
      referer: 'http://wangyimusic.leanapp.cn'
    },
    params: req.query
  }).then((response => { res.json(response.data) })).catch(err => {

    console.log(' 自建获取网易精品歌单的代理出错!  ', err)
  })

})
apiRoutes.get('/getWYRecommendSongListDetailProxy', function (req, res) {
  const url = 'http://wangyimusic.leanapp.cn/playlist/detail'
  axios.get(url, {
    headers: {
      referer: ''
    },
    params: req.query
  }).then((response) => {
    // res.json(response.data)
    res.json(response.data)

  }).catch(err => {

    console.log(' 自建获取网易精品歌单详情的代理出错!  ', err)
  })

})
apiRoutes.get('/getWYLyricProxy', function (req, res) {
  // http://music.163.com/api/song/lyric?os=pc&id=516657051&lv=-1&kv=-1&tv=-1 官方歌词接口
  var url = 'http://wangyimusic.leanapp.cn/lyric'

  axios.get(url, {
    headers: {
      referer: 'http://wangyimusic.leanapp.cn'
    },
    params: req.query
  }).then((response) => {
    var data = response.data
    if (typeof data === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/

      var jsondata = data.match(reg)
      if (jsondata) {
        data = JSON.parse(jsondata[1])
      }
    }
    res.json(data)
  }).catch(err => {

    console.log(' 自建获取网易音乐歌词的代理出错!  ', err)
  })

})
apiRoutes.get('/getWYRankListDetailProxy', function (req, res) {
  var url = 'http://wangyimusic.leanapp.cn/top/list'

  axios.get(url, {
    headers: {
      referer: 'http://wangyimusic.leanapp.cn'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch(err => {
    console.log(' 自建获取网易音乐排行榜详情的代理出错!  ', err)
  })

})
apiRoutes.get('/getQQDissByTagProxy', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/playlist.html'
    },
    params: req.query
  }).then((response => {
    var data = response.data
    if (typeof data === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/

      var jsondata = data.match(reg)
      if (jsondata) {
        data = JSON.parse(jsondata[1])
      }
    }
    res.json(data)
  })).catch(err => {

    console.log(' 自建获取QQ音乐分类标签歌单的代理出错!  ', err)
  })

})
app.use('/api', apiRoutes)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
