import storage from 'good-storage'

const SEARCH_HISTORY_KEY = '_search-history-key_'
const MAX_SEARCH_HISTORY_LENGTH = 20
const PLAY_HISTORY_KEY = '_play-history-key_'
const MAX_PLAY_HISTORY_LENGTH = 120
const LIKE_LIST_KEY = '_like-list-key_'
const MAX_LIKE_LIST_LENGTH = 20000000

function insertArray (arr, val, compare, maxLen) {
  let index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function saveHistorySearch (val) {
  let savedSearchHistory = storage.get(SEARCH_HISTORY_KEY, [])
  insertArray(savedSearchHistory, val, (item) => {
    return val === item
  }, MAX_SEARCH_HISTORY_LENGTH)
  storage.set(SEARCH_HISTORY_KEY, savedSearchHistory)
  return savedSearchHistory
}

export function getSearchHistoryStorage () {
  return storage.get(SEARCH_HISTORY_KEY, [])
}

export function clearAllHistorySearch () {
  storage.remove(SEARCH_HISTORY_KEY)
  return []
}

export function deleteOneHistorySearch (one) {
  let savedSearchHistory = storage.get(SEARCH_HISTORY_KEY, [])
  let deleteIndex = savedSearchHistory.findIndex((item) => {
    return item === one
  })
  savedSearchHistory.splice(deleteIndex, 1)
  storage.set(SEARCH_HISTORY_KEY, savedSearchHistory)
  return savedSearchHistory
}

export function saveHistoryPlay (song) {
  let savedPlayHistory = storage.get(PLAY_HISTORY_KEY, [])
  insertArray(savedPlayHistory, song, (item) => {
    return song.id === item.id
  }, MAX_PLAY_HISTORY_LENGTH)
  storage.set(PLAY_HISTORY_KEY, savedPlayHistory)
  return savedPlayHistory
}

export function getPlayHistoryStorage () {
  return storage.get(PLAY_HISTORY_KEY, [])
}

export function saveLikeSong (song) {
  let likeList = storage.get(LIKE_LIST_KEY, [])
  insertArray(likeList, song, (item) => {
    return song.id === item.id
  }, MAX_LIKE_LIST_LENGTH)
  storage.set(LIKE_LIST_KEY, likeList)
  return likeList
}

export function deleteOneLikeSong (one) {
  let likeList = storage.get(LIKE_LIST_KEY, [])
  let deleteIndex = likeList.findIndex((item) => {
    return item.id === one.id
  })
  likeList.splice(deleteIndex, 1)
  storage.set(LIKE_LIST_KEY, likeList)
  return likeList
}

export function getLikeSongList () {
  return storage.get(LIKE_LIST_KEY, [])
}
