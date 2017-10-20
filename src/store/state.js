import { playMode } from 'common/js/config'
import { getSearchHistoryStorage } from 'common/js/cache'

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
  searchHistory: getSearchHistoryStorage()
}
export default state

