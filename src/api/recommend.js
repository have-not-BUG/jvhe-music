import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
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
