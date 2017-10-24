import * as types from './mutations-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveHistory, clearAllHistory, deleteOneHistory } from 'common/js/cache'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })

}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_ORDERPLAYLIST, list)
  if (state.mode === playMode.random) {
    let randomlist = shuffle(list)
    commit(types.SET_PLAYLIST, randomlist)
    index = findIndex(randomlist, list[index])
  } else { commit(types.SET_PLAYLIST, list) }
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSRCEEN, true)
  commit(types.SET_PLAYING, true)

}

export const randomPlay = function ({commit, state}, {list}) {
  commit(types.SET_MODE, playMode.random)
  commit(types.SET_ORDERPLAYLIST, list)
  let randomlist = shuffle(list)
  commit(types.SET_PLAYLIST, randomlist)
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_FULLSRCEEN, true)
  commit(types.SET_PLAYING, true)

}

export const insertSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let orderPlayList = state.orderPlayList.slice()
  let currentIndex = state.currentIndex
  let currentSong = playList[currentIndex]
  let sameSongIndex = findIndex(playList, song)
  currentIndex++
  playList.splice(currentIndex, 0, song)

  if (sameSongIndex > -1) {
    // [1,2,4,3,4]  [1,2,1,3,4]
    if (sameSongIndex < currentIndex) {
      playList.splice(sameSongIndex, 1)
      currentIndex--
    } else {
      playList.splice(sameSongIndex + 1, 1)
    }
  }
  let currentOrderIndex = findIndex(orderPlayList, currentSong) + 1
  let sameSongIndexOrder = findIndex(orderPlayList, song)
  orderPlayList.splice(currentOrderIndex, 0, song)
  if (sameSongIndexOrder > -1) {
    if (sameSongIndexOrder < currentOrderIndex) {
      orderPlayList.splice(sameSongIndexOrder, 1)
    } else {
      orderPlayList.splice(sameSongIndexOrder + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_ORDERPLAYLIST, orderPlayList)
  commit(types.SET_CURRENTINDEX, currentIndex)
  commit(types.SET_FULLSRCEEN, true)
  commit(types.SET_PLAYING, true)
}

export const saveSearchHistory = function ({commit}, searchWord) {
  commit(types.SET_SEARCH_HISTORY, saveHistory(searchWord))
}
export const clearAllSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearAllHistory())
}
export const deleteOneSearchHistory = function ({commit}, item) {
  commit(types.SET_SEARCH_HISTORY, deleteOneHistory(item))
}
export const deleteOneSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let orderPlayList = state.orderPlayList.slice()
  let currentIndex = state.currentIndex
  let playListIndex = findIndex(playList, song)
  let orderPlayListIndex = findIndex(orderPlayList, song)
  playList.splice(playListIndex, 1)
  orderPlayList.splice(orderPlayListIndex, 1)

  if (currentIndex > playListIndex || currentIndex === playList.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_ORDERPLAYLIST, orderPlayList)
  commit(types.SET_CURRENTINDEX, currentIndex)
  if (!playList.length) {
    commit(types.SET_PLAYING, false)
  } else {
    commit(types.SET_PLAYING, true)
  }

}
