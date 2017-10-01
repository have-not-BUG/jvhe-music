import { mapGetters } from 'vuex'
export const playListMixin = {
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  computed: {
    ...mapGetters(['playList'])
  },
  watch: {
    playList(newValue) {
      this.handlePlayList(newValue)
    }
  },
  methods: {
    handlePlayList() {
      throw new Error('it must be have  handlePlayList methods function')
    }
  }
}
