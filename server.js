var express = require('express')
var config = require('./config/index')

var axios = require('axios')
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

apiRoutes.get('/getQQCategory', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/playlist.html',
      host: 'c.y.qq.com',
      'authority': 'c.y.qq.com',
      'method': 'GET',
      'scheme': 'https'
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

    console.log(' 自建获取QQ音乐分类的代理出错!  ', err)
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
apiRoutes.get('/getWYDissByTagProxy', function (req, res) {
  var url = 'http://wangyimusic.leanapp.cn/top/playlist'

  axios.get(url, {
    headers: {
      referer: 'http://wangyimusic.leanapp.cn'
    },
    params: req.query
  }).then((response => {
    var data = response.data
    if (typeof data === 'string') {
      console.log('请求的数据是字符串 jsonp==>json')
      var reg = /^\w+\(({[^()]+})\)$/

      var jsondata = data.match(reg)
      if (jsondata) {
        data = JSON.parse(jsondata[1])
      }
    }
    res.json(data)
  })).catch(err => {

    console.log(' 自建获取网易音乐分类标签歌单的代理出错!  ', err)
  })

})
apiRoutes.get('/getWYSingerListProxy', function (req, res) {
  var url = 'http://wangyimusic.leanapp.cn/top/artists?limit=100'

  axios.get(url, {
    headers: {
      referer: 'http://wangyimusic.leanapp.cn'
    },
    params: req.query
  }).then((response => { res.json(response.data) })).catch(err => {

    console.log(' 自建获取网易热门歌手的代理出错!  ', err)
  })

})
apiRoutes.get('/getWYSingerDetailProxy', function (req, res) {
  var url = 'http://wangyimusic.leanapp.cn/artists'

  axios.get(url, {
    headers: {
      referer: 'wangyimusic.leanapp.cn'
    },
    params: req.query
  }).then((response => { res.json(response.data) })).catch(err => {

    console.log(' 自建获取网易云音乐歌手详情的代理出错!  ', err)
  })

})
apiRoutes.get('/getWYSearchAllProxy', function (req, res) {
  var url = 'http://wangyimusic.leanapp.cn/search/suggest'

  axios.get(url, {
    headers: {
      referer: 'wangyimusic.leanapp.cn'
    },
    params: req.query
  }).then((response => { res.json(response.data) })).catch(err => {

    console.log(' 自建获取网易云音乐搜索全部类型的代理出错!  ', err)
  })

})
apiRoutes.get('/getWYSearchOnlySongProxy', function (req, res) {
  var url = 'http://wangyimusic.leanapp.cn/search'

  axios.get(url, {
    headers: {
      referer: 'wangyimusic.leanapp.cn'
    },
    params: req.query
  }).then((response => { res.json(response.data) })).catch(err => {

    console.log(' 自建获取网易云音乐只搜索歌曲的代理出错!  ', err)
  })

})
app.use('/api', apiRoutes)
// 静态资源配置
app.use(express.static('./dist'))
// 端口配置
var port = process.env.LEANCLOUD_APP_PORT || process.env.PORT || config.build.port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log('自建node服务器出错了，错误原因是:', err)
    return
  }
  console.log('自建node服务器正确启动了，监听端口为：' + port + '\n')
})

