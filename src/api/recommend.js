import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
export function getQQHotSongList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, options)
}
