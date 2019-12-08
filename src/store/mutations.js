export default {
  initFocus(state) {
    state.focusedPlaylist = {}
  },
  changeState(state, result) {
    if (result.entry) {
      state.playingData = Object.assign({}, result.entry)
      switch (state.playingData.source) {
        case 'gpm':
          state.playingTitle = state.playingData.entry.title
          break
        case 'youtube':
          state.playingTitle = state.playingData.title
          break
        case 'soundcloud':
          state.playingTitle = state.playingData.title
          break
        default:
          state.playingTitle = state.playingData.title
          break
      }
    }
    state.nowState = result.state
  },
  openSubQueue(state) {
    setTimeout(() => state.subQueue = true, 0)
  },
  closeSubQueue(state) {
    state.subQueue = false
  },
  changeQueue(state, result) {
    if (result) state.queue = result
  },
  changeTheme(state, nowTheme) {
    state.theme = nowTheme
    localStorage.color = nowTheme
  },
  storeSearchResult(state, result) {
    state.searchData = result
  },
  setSearchContents(state, text) {
    state.searchContents = text
    localStorage.searchContents = text
  },
  storePlaylists(state, result) {
    state.playlists = result.map(i => {
      i.id = 'playlist'
      if (i.thumbnails.length)
        i.thumbnails = i.thumbnails.filter(nail => nail != '')
      i.thumbnail = i.thumbnails.length ? i.thumbnails[0] : ''
      return i
    })
  },
  storePlaylistContents(state, contents) {
    state.focusedPlaylist = contents
  },
  setVolume(state, volume) {
    localStorage.volume = volume
    state.aria.changeVolume(volume)
  },
  storeWebSoketObj(state, wsObj) {
    state.ws = wsObj
  },
  storeAudioCore(state, aria) {
    state.aria = aria
  },
  changeAddr(state, newAddr) {
    state.addr = newAddr
  }
}