var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
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

app.use('/api', apiRoutes)
app.use(serveStatic(path.join(__dirname, 'dist')))

var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)
