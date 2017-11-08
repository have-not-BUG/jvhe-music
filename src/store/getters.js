export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const orderPlayList = state => state.orderPlayList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
export const disc = state => state.disc
export const rankList = state => state.rankList
export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory
export const likeList = state => state.likeList
export const musicSourceData = state => state.musicSourceData
