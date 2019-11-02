import Vue from 'vue'
import Vuex from 'vuex'
import { sendJson, stateContainer, playlistContainer } from './container'
// import AudioWorker from 'worker-loader!@/../static/opus/audio.worker.js'

Vue.use(Vuex)

// const FRAME_SIZE = 960
// const FLUSH_SIZE = FRAME_SIZE * 10
// const FLUSH_PACKET_SIZE = FLUSH_SIZE * 2

// let context = new (window.AudioContext || window.webkitAudioContext)()
// let GainNode = context.createGain()
// GainNode.connect(context.destination)
let session_key

let ws
let connecting = false
connectWs()

// const audioWorker = new AudioWorker()
// audioWorker.onmessage = (event) => {
//   // console.log(event.data)
//   queueAudio(event.data)
// }
// let buf
// let leftchannel
// let rightchannel
// let bufSource
// let offset = 0
// let playing = 0

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
    ws.onerror = (e) => { console.log(`[WS] WS errored: ${e}`) }
    ws.onopen = () => {
      clearTimeout(timeout)
      connecting = false
      console.log("[WS] Connected!")
    }
  })
}

// function resetAudio() {
//   context.close()
//   context = new (window.AudioContext || window.webkitAudioContext)()
//   GainNode = context.createGain()
//   GainNode.gain.value = store.state.volume / 50
//   GainNode.connect(context.destination)
//   playing = 0
//   // refreshBuffer()
// }

// function refreshBuffer(packet_length) {
//   // console.log(`packet length ${packet_length}`)
//   buf = context.createBuffer(2, packet_length / 2, 48000)
//   leftchannel = buf.getChannelData(0)
//   rightchannel = buf.getChannelData(1)
//   bufSource = context.createBufferSource()
//   bufSource.buffer = buf
//   bufSource.connect(GainNode)
//   offset = 0
// }

// function queueAudio(msg) {
//   if (msg.len === 0)
//     return

//   refreshBuffer(msg.len)
//   const decodedF32 = new Float32Array(msg.buf)
//   for (let x = 0; x < msg.len; x += 2) {
//     leftchannel[offset] = decodedF32[x]
//     rightchannel[offset] = decodedF32[x + 1]
//     offset++
//   }

//   if (playing < context.currentTime)
//     playing = context.currentTime + 0.1

//   bufSource.start(playing)
//   playing += bufSource.buffer.duration

//   // refreshBuffer()
// }

function WSonmessage(event, resolve) {
  const container = JSON.parse(event.data)
  console.log(`[fetch] ${container.type}`)

  switch (container.type) {
    case 'hello':
      session_key = container.key
      sendJson.key = session_key
      // store.commit('setVolume', localStorage.getItem('volume'))
      // if (store.state.volume !== 0)
      //   audioWorker.postMessage({ op: 'connect', key: session_key })
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
      console.log(`[event_player_state_change] ${store.state.nowState} => ${container.data.state}`)
      // if (container.data.state === 'stopped') {
      //   audioWorker.postMessage({ op: 'flush' })
      // }
      console.log(container.data)
      store.commit('changeState', container.data)
      break

    case 'event_playlists_change':
      store.commit('storePlaylists', container.data.playlists)
      break

    case 'event_playlist_entry_change':
      break

    default:
      console.log(`Unknown operation!: ${container.type}`)
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
    console.log('$send op = ' + op)
    ws.send(JSON.stringify(Json))
  } else if (!connecting) {
    console.log('[WS] Reconnecting...')

    try {
      await connectWs()
      sendToSocket(op, data)
    } catch (er) {
      console.log(`[WS] Failed to connect: ${er}`)
    }
  }
}

const store = new Vuex.Store({
  state: {
    // theme: false,
    // searchedData: null,
    // searchContents: localStorage.searchContents ? '' : localStorage.searchContents,
    playingData: stateContainer,
    playingTitle: "",
    nowState: "paused",
    queue: [],
    subQueue: false,
    playlists: playlistContainer,
    // forcusedPlaylist: [],
    // volume: 50,
  },
  mutations: {
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
    // changeSubQueue(state) {
    //   if(state.subQueue)
    // },
    changeQueue(state, result) {
      if(result) state.queue = result
      console.log(state.queue)
    },
    changeTheme(state, nowTheme) {
      state.theme = nowTheme
    },
    setTheme(state, theme) {
      state.theme = theme
    },
    storeSearchResult(state, result) {
      state.searchedData = result.map((property, index) => {
        property.key = index
        return property
      })
    },
    setSearchContents(state, text) {
      state.searchContents = text
      localStorage.searchContents = text
    },
    storePlaylists(state, result) {
      state.playlists = result.map(property => {
        property.id = 'playlist'
        return property
      })
    },

    storePlaylistContents(state, contents) {
      state.forcusedPlaylist = contents
    },
    // setVolume(state, volume) {
    //   const newVolume = Number(volume)
    //   // console.log(`Volume: ${state.volume} -> ${newVolume}`)
    //   if (newVolume === 0)
    //     audioWorker.postMessage({ op: 'kill' })
    //   else if (state.volume === 0)
    //     audioWorker.postMessage({ op: 'connect', key: session_key })

    //   state.volume = newVolume
    //   GainNode.gain.value = newVolume / 50
    // }
  },
  actions: {
    sendAsSearch({ commit }, text) {
      commit('setSearchContents', text)
      sendToSocket('search', { query: text })
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
    // initAudio() {
    //   resetAudio()
    //   console.log('audiocontext initialized')
    // }
  }
})

export default store