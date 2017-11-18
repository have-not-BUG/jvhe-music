export class Singer {
  constructor ({mid, name}) {
    this.mid = mid
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${mid}.jpg?max_age=2592000`
  }
}
export class SingerWY {
  constructor ({id, name ,picUrl}) {
    this.mid = id
    this.name = name
    this.avatar = picUrl
  }
}


