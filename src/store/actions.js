import * as types from './mutations-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

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
