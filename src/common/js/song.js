import { getQQLyric, getWYLyric } from 'api/lyric'
import { ERROR_OK, WYNET_OK,options,commonParams } from 'api/config'
import { Base64 } from 'js-base64'
import jsonp from 'common/js/jsonp'

export class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getQQLyricInSongClass () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
        getQQLyric(this.mid).then((res) => {
          if (res.retcode === ERROR_OK) {
            this.lyric = Base64.decode(res.lyric)
            resolve(this.lyric)
          } else {
            reject('get QQ music lyric error')
          }
        })

      }
    )

  }

  getWYLyricInSongClass () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
        getWYLyric(this.id).then((res) => {
          if (res.code === WYNET_OK) {
            if (res.lrc) {
              this.lyric = res.lrc.lyric
            }
            resolve(this.lyric)
          } else {
            reject('get wangyi music lyric error')
          }
        })
      }
    )

  }
}

// music.163.com/api/song/detail/?id={音乐ID}&ids=%5B{音乐ID}%5D&csrf_token= 官方接口 3404770
//  http://wangyimusic.leanapp.cn/song/detail?ids={音乐ID} 破解接口 3404770
// export class SongWY {
//   constructor ({id, singer, name, album, duration, image, url}) {
//     this.id = id
//     this.singer = singer
//     this.name = name
//     this.album = album
//     this.duration = duration
//     this.image = image
//     this.url = url
//   }
//
//   getWYLyricInSongClass () {
//     if (this.lyric) {
//       return Promise.resolve(this.lyric)
//     }
//     return new Promise((resolve, reject) => {
//         getWYLyric(this.id).then((res) => {
//           if (res.code === WYNET_OK) {
//             if (res.lrc) {
//               this.lyric = res.lrc.lyric
//             }
//             resolve(this.lyric)
//           } else {
//             reject('get wangyi music lyric error')
//           }
//         })
//       }
//     )
//
//   }
// }
// https://y.qq.com/n/yqq/song/000ljlsv1PdzCn.html
//http://ws.stream.qqmusic.qq.com/C100000ljlsv1PdzCn.m4a?fromtag=38
// https://y.qq.com/n/yqq/song/0027zPYs3A9fyb.html
// http://ws.stream.qqmusic.qq.com/C1000027zPYs3A9fyb.m4a?fromtag=38

function getQQSongVkey (musicData) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({},{
    g_tk: 843663407,
    jsonpCallback: 'MusicJsonCallback6926652845824679',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    callback: 'MusicJsonCallback6926652845824679',
    uin: 0,
    songmid: musicData.songmid,
    filename: `C100${musicData.songmid}.m4a`,
   guid: 8741373900,
  })
  return jsonp(url, data)

}

//$typecode	$filetype	码率	fromtag
//C100	.m4a		66  可播放的全  不算清晰
//C400	.m4a		66  不全  清晰
//M500	.mp3	128kbps	30  清晰
//M800	.mp3	320kbps	30  不算清晰

export function createSong (musicData) {
  return new Promise((resolve,reject)=>{
    getQQSongVkey(musicData).then((res)=>{
      let vkey,newSong;
      vkey=res.data.items[0].vkey;
      newSong= new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        // url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=38`
        url: `http://dl.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?guid=8741373900&vkey=${vkey}&uin=0&fromtag=66`
      })
      resolve(newSong)
    }).catch((err)=>{
      console.log('createSong函数里的getQQSongVkey promise出错了'+err)
      reject('createSong函数里的getQQSongVkey promise出错了'+err)
    })
  })
}

export function createSongWY (musicData) {
  return new Song({
    id: musicData.id,
    mid: '',
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: musicData.dt / 1000,
    image: musicData.al.picUrl,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`

  })

}

function filterSinger (singer) {
  let meger_singer = []
  if (!singer) {
    return ''
  }
  if (typeof singer === 'string') {
    return singer
  }

  singer.forEach((item) => {
    meger_singer.push(item.name)
  })
  return meger_singer.join('/')

}
