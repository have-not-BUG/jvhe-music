import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getQQSearchHotKey() {
  // QQ热门搜索关键词
  // https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1733932805&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1507730454198
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 1733932805,
    uin: 0,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: Date.now()

  })
  return jsonp(url, data, options)
}

// export function getQQSearchAll (searchWord, showSinger, perPageNum, currentPage) {
//   // QQ歌手及歌曲搜索
//   // https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=James&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1507970756221
//
//   const url = '/api/getQQSearch'
//   // const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
//   const data = {
//     g_tk: 5381,
//     uin: 0,
//     inCharset: 'utf-8',
//     outCharset: 'utf-8',
//     notice: 0,
//     format: 'json',
//     platform: 'h5',
//     needNewCode: 1,
//     w: searchWord,
//     zhidaqu: 1,
//     catZhida: showSinger ? 1 : 0,
//     t: 0,
//     flag: 1,
//     ie: 'utf-8',
//     sem: 1,
//     aggr: 0,
//     perpage: perPageNum,
//     n: perPageNum,
//     p: currentPage,
//     remoteplace: 'txt.mqq.all',
//     _: Date.now()
//
//   }
//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   }).catch(error => {
//     console.log('获取QQ音乐歌手及歌曲检索数据出错', error)
//   })
// }
export function getQQSearchAll(searchWord, showSinger, perPageNum, currentPage) {
  // QQ歌手及歌曲搜索
  // http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=20&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w=%E4%B8%83%E9%87%8C%E9%A6%99
  const url = 'http://s.music.qq.com/fcgi-bin/music_search_new_platform'
  const data = {
    t: 0,
    n: perPageNum,
    aggr: 1,
    cr: 1,
    loginUin: 0,
    format: 'jsonp',
    inCharset: 'GB2312',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'platform:jqminiframe.json',
    needNewCode: 0,
    p: currentPage,
    catZhida: showSinger ? 1 : 0,
    remoteplace: 'sizer.newclient.next_song',
    w: searchWord

  }
  return jsonp(url, data, options)
}

export function getWYSearchAll(searchWord, showSinger, limit, offset) {
  var url
  if (showSinger) {
   url = '/api/getWYSearchAllProxy'
  } else {
   url = '/api/getWYSearchOnlySongProxy'
  }

  const data = {
    keywords: searchWord,
    limit: limit,
    offset: offset
  }
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  }
).catch(error => {
    console.log('获取网易搜索数据出错', error)
})
}

