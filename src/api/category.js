import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getQQCategory () {
  // 热门歌单完整地址
  // https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg?g_tk=1620604199&inCharset=utf8&outCharset=GB2312&notice=0&format=jsonp&platform=yqq&hostUin=0&needNewCode=0&rnd=59241861503262381&tpl=v12&page=other&jsonpCallback=__jp1
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    needNewCode: 0,
    outCharset: 'utf-8',

    //  0908 查看官网的请求参数
    // g_tk: 843663407,
    // loginUin: 0,
    // hostUin: 0,
    // format: 'jsonp',
    // inCharset: 'utf8',
    // outCharset: 'utf-8',
    // notice: 0,
    // platform: 'yqq',
    // needNewCode: 0,

  })

  return jsonp(url, data, options)
}

export function getQQDissByTag (categoryId) {
  const url = '/api/getQQDissByTagProxy'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    rnd: 0.5334892526345625,
    g_tk: 814876556,
    outCharset: 'utf-8',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: categoryId,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(error => {
    console.log('获取QQ音乐分类标签歌单详情数据出错getQQDissByTagProxy', error)
  })
}

export function getWYDissByTag (categoryName) {
  const url = '/api/getWYDissByTagProxy'
  const data = {
    cat: categoryName
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(error => {
    console.log('获取网易音乐分类标签歌单详情数据出错getWYDissByTagProxy', error)
  })
}

export function getQQHotSongList () {
  // 热门歌单完整地址
  // https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg?g_tk=1620604199&inCharset=utf8&outCharset=GB2312&notice=0&format=jsonp&platform=yqq&hostUin=0&needNewCode=0&rnd=59241861503262381&tpl=v12&page=other&jsonpCallback=__jp1
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

export function getWYHotSongList () {
  const url = '/api/getWYHotSongListProxy'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch(error => {
    console.log('获取网易精品歌单数据出错', error)
  })
}

export function getQQRecommendSongListDetail (disstid) {
  // 热门歌单详情
  // https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?g_tk=1733932805&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&new_format=1&pic=500&disstid=2683023981&type=1&json=1&utf8=1&onlysong=0&nosign=1&_=1506989372829
  const url = '/api/getQQRecommendSongListDetailProxy'
  const data = Object.assign({}, commonParams, {
    g_tk: 1733932805,
    uin: 0,
    disstid,
    notice: 0,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'h5',
    hostUin: 0,
    needNewCode: 1,
    format: 'json',
    outCharset: 'utf-8',
    new_format: 1,
    nosign: 1,
    pic: 500,
    _: Date.now()
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

export function getWYRecommendSongListDetail (disstid) {
  // 热门歌单详情
  // http://wangyimusic.leanapp.cn/playlist/detail?id=311692545
  const url = '/api/getWYRecommendSongListDetailProxy'
  const data = {
    id: disstid
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

