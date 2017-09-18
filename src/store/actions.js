import * as types from './mutations-types'
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_ORDERPLAYLIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSRCEEN, true)
  commit(types.SET_PLAYING, true)

}
