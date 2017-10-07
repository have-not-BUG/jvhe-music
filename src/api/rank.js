import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getQQAllRankData () {
  // 获取QQ各个排行榜
  // https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1733932805&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1507350076787
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 1733932805,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: Date.now()
  })
  return jsonp(url, data, options)
}
