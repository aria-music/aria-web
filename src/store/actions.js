export default {
  sendAsSearch({ commit, state }, { text, provider }) {
    commit('setSearchContents', text)
    const serchObj = { query: text }
    if (provider) serchObj.provider = provider
    state.ws.sendToSocket('search', serchObj)
  },
  sendAsNewplaylist({ state }, newName) {
    state.ws.sendToSocket('create_playlist', { name: newName })
  },
  sendAsPlay({ state }, playUri) {
    state.ws.sendToSocket('play', { uri: playUri })
  },
  sendAsPlayWithPlaylist({ state }, list) {
    state.ws.sendToSocket('play', { playlist: list })
  },
  sendAsQueue({ state }, playUri) {
    state.ws.sendToSocket('queue', { uri: playUri })
  },
  sendAsQueueWithPlaylist({ state }, list) {
    state.ws.sendToSocket('queue', { playlist: list })
  },
  sendAsQueueToHead({ state }, playUri) {
    state.ws.sendToSocket('queue', { uri: playUri, head: true })
  },
  sendAsPause({ state }) {
    state.ws.sendToSocket('pause')
  },
  sendAsResume({ state }) {
    state.ws.sendToSocket('resume')
  },
  fetchPlaylists({ state }) {
    state.ws.sendToSocket('playlists')
  },
  sendAsSkip({ state }) {
    state.ws.sendToSocket('skip')
  },
  sendAsSkipTo({ state }, element) {
    state.ws.sendToSocket('skip_to', { index: element.index, uri: element.uri })
  },
  sendAsEditedQueue({ state }, newQueue) {
    state.ws.sendToSocket('edit_queue', { queue: newQueue })
  },
  sendAsShuffle({ state }) {
    state.ws.sendToSocket('shuffle')
  },
  sendAsRemoveFromQueue({ state }, { uri, index }) {
    state.ws.sendToSocket('remove', { uri: uri, index: index })
  },
  sendAsLike({ state }, likeUri) {
    state.ws.sendToSocket('like', { uri: likeUri })
  },
  sendAsPlaylist({ state }, playlistName) {
    state.ws.sendToSocket('playlist', { name: playlistName })
  },
  sendAsRemoveFromPlaylist({ state }, { playlistName, removeUri }) {
    state.ws.sendToSocket('remove_from_playlist', { name: playlistName, uri: removeUri })
  },
  sendAsDeletePlaylist({ state }, listname) {
    state.ws.sendToSocket('delete_playlist', { name: listname })
  },
  sendAsAddToPlaylist({ state }, { listname, addedUri }) {
    state.ws.sendToSocket('add_to_playlist', { name: listname, uri: addedUri })
  },
  sendAsRepeat({ state }, repeatUri) {
    state.ws.sendToSocket('repeat', { uri: repeatUri })
  },
  sendAsClearQueue({ state }) {
    state.ws.sendToSocket('clear_queue')
  },
  initAudio({ state }) {
    state.aria.resetAudio()
  }
}