import { playMode } from 'common/js/config'
import { getSearchHistoryStorage, getPlayHistoryStorage, getLikeSongList, getMusicSource } from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  orderPlayList: [],
  mode: playMode.order,
  currentIndex: -1,
  disc: {},
  rankList: {},
  searchHistory: getSearchHistoryStorage(),
  playHistory: getPlayHistoryStorage(),
  likeList: getLikeSongList(),
  musicSourceData: getMusicSource(),
  category: {}
}
export default state

