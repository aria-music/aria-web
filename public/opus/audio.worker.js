import opusModule from './opus.js'

const FRAME_SIZE = 960 // 0.02s (20ms)
const FLUSH_SIZE = FRAME_SIZE * 5

let ws
let left = new Float32Array(FLUSH_SIZE)
let right = new Float32Array(FLUSH_SIZE)
let count = 0

let rawU8
let decodedF32
let ready = false
const opus = opusModule({
    onRuntimeInitialized: function() {
        opus.ccall('init', 'number')
        const encodePtr = opus.ccall('encode_buf', 'number')
        const decodePtr = opus.ccall('decode_buf', 'number')
        // console.log(decodePtr)
        rawU8 = new Uint8Array(opus.HEAPU8.buffer, encodePtr)
        decodedF32 = new Float32Array(opus.HEAPF32.buffer, decodePtr)
        ready = true
        console.log('[AudioWorker] Opus is ready!')
    }
})
// console.log(opus)

function flushBuffer(dispose=false) {
    postMessage(
        {
            'left': left.buffer,
            'right': right.buffer,
            'len': dispose ? 0 : count
        }, [left.buffer, right.buffer])
    left = new Float32Array(FLUSH_SIZE)
    right = new Float32Array(FLUSH_SIZE)
    count = 0
}

function queueAudio(packet) {
    rawU8.set(new Uint8Array(packet))
    const frames = opus.ccall('decode', 'number', ['number'], [packet.byteLength])
    // console.log(frames)

    for (let x = 0; x < frames*2;) {
        left[count] = decodedF32[x++]
        right[count++] = decodedF32[x++]
    }
    
    if (count === FLUSH_SIZE)
        flushBuffer()
}

onmessage = (event) => {
    // expected json as event.data
    const packet = event.data
    console.log(`[AudioWorker] received: ${packet.op}`)

    switch (packet.op) {
        case 'connect':
            doConnect(packet)
            break
        case 'kill':
            doKill()
            break
        default:
            break
    }
}

function doConnect(payload) {
    if (!payload.key)
        return

    try {
        ws.close()
    } catch (e) {}

    ws = new WebSocket("wss://sarisia.cc/stream/")
    ws.binaryType ="arraybuffer"
    ws.onopen = () => {
        ws.send(payload.key)
        console.log("[AudioWorker] Connected")
    }
    ws.onmessage = (packet) => {
        if (ready)
            queueAudio(packet.data)
    }
}

function doKill() {
    try {
        ws.close()
        console.log("[AudioWorker] WS has killed!")
    } catch (e) {}
}
