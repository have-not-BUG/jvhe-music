import { commonParams } from './config'
import axios from 'axios'

// 歌词完整地址
// https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?callback=MusicJsonCallback_lrc&pcachetime=1506582583415&songmid=003tbRjy4V1wRt&g_tk=1733932805&jsonpCallback=MusicJsonCallback_lrc&loginUin=1036583615&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0
export function getQQLyric (mid) {
  const url = '/api/getQQLyricProxy'
  const paramsvalue = Object.assign({}, commonParams, {
    pcachetime: Date.now(),
    songmid: mid,
    g_tk: 1733932805,
    format: 'json',
    outCharset: 'utf8',
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url, {
    params: paramsvalue
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function getWYLyric (id) {
  const url = '/api/getWYLyricProxy'
  const paramsvalue = {
    id: id
  }
  return axios.get(url, {
    params: paramsvalue
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
