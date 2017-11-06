import { playMode } from 'common/js/config'
import { getSearchHistoryStorage, getPlayHistoryStorage, getLikeSongList } from 'common/js/cache'

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
  likeList: getLikeSongList()
}
export default state

