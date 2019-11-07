import opusModule from './opus.js'


let ws

const FRAME_SIZE = 960 // 0.02s (20ms)
const FLUSH_SIZE = FRAME_SIZE * 5
const FLUSH_PACKET_SIZE = FLUSH_SIZE * 2

let buf = new Float32Array(FLUSH_PACKET_SIZE)
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
    postMessage({'buf': buf.buffer, 'len': dispose ? 0 : count}, [buf.buffer])
    buf = new Float32Array(FLUSH_PACKET_SIZE)
    count = 0
}

function queueAudio(packet) {
    rawU8.set(new Uint8Array(packet))
    const frames = opus.ccall('decode', 'number', ['number'], [packet.byteLength])
    // console.log(frames)

    for (let x = 0; x < frames*2; ++x) {
        buf[count++] = decodedF32[x]
    }

    // console.log(count)
    if (count === FLUSH_PACKET_SIZE)
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
        case 'flush':
            doFlush()
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

function doFlush() {
    flushBuffer(true)
}

function doKill() {
    try {
        ws.close()
        console.log("[AudioWorker] WS has killed!")
    } catch (e) {}
}
