import Vue from 'vue'
import Vuex from 'vuex'
import { audioCore } from '@/audio/audioCore'
import { sendJson, stateContainer, playlistContainer } from './container'

Vue.use(Vuex)
const aria = new audioCore()
// const FRAME_SIZE = 960
// const FLUSH_SIZE = FRAME_SIZE * 10
// const FLUSH_PACKET_SIZE = FLUSH_SIZE * 2

let session_key

let ws
let connecting = false
connectWs()

function connectWs() {
  return new Promise((resolve, reject) => {
    if (ws) {
      ws.close()
    }

    connecting = true
    let timeout = setTimeout(() => {
      connecting = false
      reject()
    }, 10000)

    ws = new WebSocket('wss://sarisia.cc/player/')
    ws.onmessage = (event) => WSonmessage(event, resolve)
    // ws.onerror = (e) => { console.log(`[WS] WS errored: ${e}`) }
    ws.onopen = () => {
      clearTimeout(timeout)
      connecting = false
      // console.log("[WS] Connected!")
    }
  })
}

function WSonmessage(event, resolve) {
  const container = JSON.parse(event.data)
  // console.log(`[fetch] ${container.type}`)

  switch (container.type) {
    case 'hello':
      session_key = container.key
      sendJson.key = session_key
      if (store.state.volume !== 0)
        aria.awPost({ op: 'connect', key: session_key })
      resolve()
      break

    case 'search':
      store.commit('storeSearchResult', container.data)
      break

    case 'playlists':
      store.commit('storePlaylists', container.data.playlists)
      break

    case 'playlist':
      store.commit('storePlaylistContents', container.data)
      break

    case 'event_queue_change':
      store.commit('changeQueue', container.data.queue)
      break

    case 'event_player_state_change':
      // console.log(`[event_player_state_change] ${store.state.nowState} => ${container.data.state}`)
      if (container.data.state === 'stopped')
        aria.awPost({ op: 'flush' })
      // console.log(container.data)
      store.commit('changeState', container.data)
      break

    case 'event_playlists_change':
      store.commit('storePlaylists', container.data.playlists)
      break

    case 'event_playlist_entry_change':
      break

    default:
      // console.log(`Unknown operation!: ${container.type}`)
      break
  }
}

async function sendToSocket(op, data) {
  if (connecting) {
    return
  }

  let Json = Object.assign({}, sendJson)
  Json.op = op
  if (data) Json.data = data

  if (ws.readyState === WebSocket.OPEN) {
    // console.log('$send op = ' + op)
    ws.send(JSON.stringify(Json))
  } else if (!connecting) {
    // console.log('[WS] Reconnecting...')

    try {
      await connectWs()
      sendToSocket(op, data)
    } catch (er) {
      // console.log(`[WS] Failed to connect: ${er}`)
    }
  }
}

const store = new Vuex.Store({
  state: {
    theme: localStorage.color ? localStorage.color : "pink lighten-2",
    searchData: {},
    // searchContents: localStorage.searchContents ? '' : localStorage.searchContents,
    playingData: stateContainer,
    playingTitle: "",
    nowState: "paused",
    queue: [],
    subQueue: false,
    playlists: playlistContainer,
    focusedPlaylist: {},
    volume: localStorage.volume ? localStorage.volume : 100
  },
  mutations: {
    initFocus(state) {
      state.focusedPlaylist = {}
    },
    changeState(state, result) {
      if (result.entry){
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
      if(result) state.queue = result
    },
    changeTheme(state, nowTheme) {
      state.theme = nowTheme
      localStorage.color = nowTheme
    },
    storeSearchResult(state, result) {
      state.searchData = Object.assign({}, result)
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
      const newVolume = volume
      if (newVolume === 0)
        aria.awPost({ op: 'kill' })
      else if (state.volume === 0)
        aria.awPost({ op: 'connect', key: session_key })

      localStorage.volume = newVolume
      state.volume = newVolume
      aria.changeVolume(newVolume)
    }
  },
  actions: {
    sendAsSearch({ commit }, {text, provider}) {
      commit('setSearchContents', text)
      const serchObj = { query: text }
      if(provider) serchObj.provider = provider
      sendToSocket('search', serchObj)
    },
    sendAsNewplaylist(context, newName) {
      sendToSocket('create_playlist', { name: newName })
    },
    sendAsPlay(context, playUri) {
      sendToSocket('play', { uri: playUri })
    },
    sendAsPlayWithPlaylist(context, list) {
      sendToSocket('play', { playlist: list })
    },
    sendAsQueue(context, playUri) {
      sendToSocket('queue', { uri: playUri })
    },
    sendAsQueueWithPlaylist(context, list) {
      sendToSocket('queue', { playlist: list })
    },
    sendAsQueueToHead(context, playUri) {
      sendToSocket('queue', { uri: playUri, head: true })
    },
    sendAsPause() {
      sendToSocket('pause')
    },
    sendAsResume() {
      sendToSocket('resume')
    },
    fetchPlaylists() {
      sendToSocket('playlists')
    },
    sendAsSkip() {
      sendToSocket('skip')
    },
    sendAsSkipTo(context, element) {
      sendToSocket('skip_to', { index: element.index, uri: element.uri })
    },
    sendAsEditedQueue(context, newQueue) {
      sendToSocket('edit_queue', { queue: newQueue })
    },
    sendAsShuffle() {
      sendToSocket('shuffle')
    },
    sendAsRemoveFromQueue(context, {uri, index}) {
      sendToSocket('remove', { uri: uri, index: index })
    },
    sendAsLike(context, likeUri) {
      sendToSocket('like', { uri: likeUri })
    },
    sendAsPlaylist(context, playlistName) {
      sendToSocket('playlist', { name: playlistName })
    },
    sendAsRemoveFromPlaylist(context, {playlistName, removeUri}) {
      sendToSocket('remove_from_playlist', { name: playlistName, uri: removeUri })
    },
    sendAsDeletePlaylist(context, listname) {
      sendToSocket('delete_playlist', { name: listname })
    },
    sendAsAddToPlaylist(context, {listname, addedUri}) {
      sendToSocket('add_to_playlist', { name: listname, uri: addedUri })
    },
    sendAsRepeat(context, repeatUri) {
      sendToSocket('repeat', { uri: repeatUri })
    },
    sendAsClearQueue() {
      sendToSocket('clear_queue')
    },
    initAudio() {
      aria.resetAudio()
    }
  }
})

export default store