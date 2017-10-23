import storage from 'good-storage'

const SEARCH_HISTORY_KET = '_search-history-key_'
const MAX_SEARCH_HISTORY_LENGTH = 20

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
export function saveHistory (val) {
  let savedSearchHistory = storage.get(SEARCH_HISTORY_KET, [])
  insertArray(savedSearchHistory, val, (item) => {
    return val === item
  }, MAX_SEARCH_HISTORY_LENGTH)
  storage.set(SEARCH_HISTORY_KET, savedSearchHistory)
  return savedSearchHistory
}

export function getSearchHistoryStorage () {
  return storage.get(SEARCH_HISTORY_KET, [])
}

export function clearAllHistory () {
  storage.remove(SEARCH_HISTORY_KET)
  return []
}

export function deleteOneHistory (one) {
  let savedSearchHistory = storage.get(SEARCH_HISTORY_KET, [])
  let deleteIndex = savedSearchHistory.findIndex((item) => {
    return item === one
  })
  savedSearchHistory.splice(deleteIndex, 1)
  storage.set(SEARCH_HISTORY_KET, savedSearchHistory)
  return savedSearchHistory

}
