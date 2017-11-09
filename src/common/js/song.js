import { getQQLyric, getWYLyric } from 'api/lyric'
import { ERROR_OK, WYNET_OK } from 'api/config'
import { Base64 } from 'js-base64'

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

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`

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
