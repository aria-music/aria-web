import { sendJson } from '@/store/container'
import router from '@/router/router'

/**
 * plugin of aria websocket
 *
 * @returns {webSocketCore}
 * @constructor
 */

export const webSocketCore = function() {

  this.ws
  this.connecting = false
  this.session_key
  // _connectWs(this, 'wss://sarisia.cc/player/')

  this.connectWs = (store, addr) => {
    return _connectWs(this, store, `wss://${addr}`)
  }

  this.sendToSocket = (op, data) => {
    return _sendToSocket(this, op, data)
  }
}

const _connectWs = function(core, store, addr) {
  return new Promise((resolve, reject) => {
    if (core.ws) {
      core.ws.close()
    }

    core.connecting = true
    let timeout = setTimeout(() => {
      core.connecting = false
      reject()
    }, 10000)

    core.ws = new WebSocket(addr)
    core.ws.onmessage = (event) => WSonmessage(event, resolve, core, store)
    // ws.onerror = (e) => { console.log(`[WS] WS errored: ${e}`) }
    core.ws.onopen = () => {
      clearTimeout(timeout)
      core.connecting = false
      // console.log("[WS] Connected!")
    }
  })
}

const WSonmessage = function(event, resolve, core, store) {
  const container = JSON.parse(event.data)
  // console.log(`[fetch] ${container.type}`)

  switch (container.type) {
    case 'hello':
      core.session_key = container.key
      sendJson.key = core.session_key
      if (store.state.volume !== 0)
        // TODO: use stream endpoint given in hello packet
        store.state.aria.awPost({ op: 'connect', key: core.session_key })
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
        store.state.aria.awPost({ op: 'flush' })
      // console.log(container.data)
      store.commit('changeState', container.data)
      break

    case 'event_playlists_change':
      store.commit('storePlaylists', container.data.playlists)
      break

    case 'event_playlist_entry_change':
      if (router.currentRoute.path.indexOf("playlist") !== -1)
        store.dispatch('sendAsPlaylist', store.state.focusedPlaylistName)
      break

    default:
      // console.log(`Unknown operation!: ${container.type}`)
      break
  }
}

const _sendToSocket = async function (core, op, data) {
  if (core.connecting) {
    return
  }

  let Json = Object.assign({}, sendJson)
  Json.op = op
  if (data) Json.data = data

  if (core.ws.readyState === WebSocket.OPEN) {
    // console.log('$send op = ' + op)
    core.ws.send(JSON.stringify(Json))
  } else if (!core.connecting) {
    // console.log('[WS] Reconnecting...')

    try {
      await core.connectWs()
      _sendToSocket(core, op, data)
    } catch (er) {
      // console.log(`[WS] Failed to connect: ${er}`)
    }
  }
}
