import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export const playListMixin = {
  mounted () {
    this.handlePlayList(this.playList)
  },
  activated () {
    this.handlePlayList(this.playList)
  },
  computed: {
    ...mapGetters(['playList'])
  },
  watch: {
    playList (newValue) {
      this.handlePlayList(newValue)
    }
  },
  methods: {
    handlePlayList () {
      throw new Error('it must be have  handlePlayList methods function')
    }
  }
}

export const playModeMixin = {
  computed: {
    playModeIco () {
      return this.mode === playMode.order ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters(['mode'])
  },
  methods: {
    changePlayMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (this.mode === playMode.random) {
        list = shuffle(this.orderPlayList)
      } else {
        list = this.orderPlayList
      }
      this.restCurrentIndex(list)
      this.setPlayList(list)
    },
    restCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST',
      setPlayMode: 'SET_MODE',
      setCurrentIndex: 'SET_CURRENTINDEX'

    })

  }
}

export const searchMixin = {
  data () {
    return {
      newInputWord: ''
    }
  },
  methods: {
    showInputWord (newInputWord) {
      this.newInputWord = newInputWord
    },
    getBlur () {
      this.$refs.searchBox.blur()
    },
    saveHistory () {
      this.saveSearchHistory(this.newInputWord)
    },
    deleteOne (item) {
      this.deleteOneSearchHistory(item)
    },
    changeWord (key) {
      this.$refs.searchBox.setInput(key)
    },
    ...mapActions(['saveSearchHistory', 'deleteOneSearchHistory'])

  },
  computed: {
    ...mapGetters(['searchHistory'])
  }
}
