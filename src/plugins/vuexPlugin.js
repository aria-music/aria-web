import { audioCore } from '@/audio/audioCore'
import { webSocketCore } from '@/webSocket/socket'

/**
 * plugin of aria websocket
 *
 * @returns {webSocketPlugin}
 */

export const webSocketPlugin = function () {
  return store => {
    const aria = new audioCore()
    store.commit('storeAudioCore', aria)
    const socket = new webSocketCore()
    store.commit('storeWebSoketObj', socket)

    socket.connectWs(store)
    store.subscribe((mutation, state) => {
      let volumeChach = 0

      switch (mutation.type) {
        case 'changeAddr':
          if (!mutation.payload.indexOf('wss://') || !mutation.payload.indexOf('ws://'))
            socket.connectWs(store, mutation.payload)
          break
        case 'setVolume':
          if (mutation.payload === 0)
            aria.awPost({ op: 'kill' })
          else if (volumeChach === 0)
            aria.awPost({ op: 'connect', key: socket.session_key })

          volumeChach = state.volume
          break
        default:
      }
    })
  }
}