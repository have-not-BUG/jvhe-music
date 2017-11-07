var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
var axios = require('axios')

var app = express()
var apiRoutes = express.Router()
apiRoutes.get('/getSliderData', function (req, res) {
  var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=135662383&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1504085676400'

  axios.get(url, {
    headers: {
      referer: 'https://m.y.qq.com/'
    }
  }).then((response => { res.json(response.data) ; console.log("现在运行的是server.js") })).catch(err => {

    console.log(' 自建的代理出错!  ', err)
  })
})

app.use('/api', apiRoutes)
app.use(serveStatic(path.join(__dirname, 'dist')))

var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)
