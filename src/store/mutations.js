import * as types from './mutations-types'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULLSRCEEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_ORDERPLAYLIST] (state, list) {
    state.orderPlayList = list
  },
  [types.SET_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENTINDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },
  [types.SET_RANKLIST] (state, rankList) {
    state.rankList = rankList
  },
  [types.SET_SEARCH_HISTORY] (state, searchHistory) {
    state.searchHistory = searchHistory
  }

}
export default mutations

