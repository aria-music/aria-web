import AudioWorker from 'worker-loader!@/../public/opus/audio.worker.js'

/**
 * core instance of aria audio
 *
 * @returns {audioCore}
 * @constructor
 */
export const audioCore = function(){

  this.context
  this.GainNode
  this.playing = 0
  this.volume = 100
  this.buf
  this.leftchannel
  this.rightchannel
  this.bufSource
  this.offset = 0

  initiateAudioContext(this)

  this.resetAudio = () => {
    return _resetAudio(this)
  }

  this.changeVolume = (newValue) => {
    return _changeVolume(this, newValue)
  }

  this.audioWorker = new AudioWorker()

  this.audioWorker.onmessage = (event) => {
    queueAudio(this, event.data)
  }

  this.awPost = (msgObj) => {
    this.audioWorker.postMessage(msgObj)
  }
}

const refreshBuffer = function (core, plen) {
  // console.log(`packet length ${packet_length}`)
  core.buf = core.context.createBuffer(2, plen, 48000)
  core.bufSource = core.context.createBufferSource()
  core.bufSource.buffer = core.buf
  core.bufSource.connect(core.GainNode)
  core.offset = 0
}

const queueAudio = function(core, msg) {
  if (msg.len === 0)
    return

  refreshBuffer(core, msg.len)
  core.buf.copyToChannel(new Float32Array(msg.left), 0)
  core.buf.copyToChannel(new Float32Array(msg.right), 1)

  if (core.playing < core.context.currentTime)
    core.playing = core.context.currentTime + 0.1

  core.bufSource.start(core.playing)
  core.playing += core.bufSource.buffer.duration
  // refreshBuffer()
}

const _resetAudio = function(core) {
  // console.log("resetAudio")
  core.context.close()
  initiateAudioContext(core)
}

const _changeVolume = function(core, newValue) {
  // console.log("changeVolume")
  core.volume = newValue
  core.GainNode.gain.value = newValue / 100
}

const initiateAudioContext = function(core) {
  core.context = new (window.AudioContext || window.webkitAudioContext)()
  core.GainNode = core.context.createGain()
  core.GainNode.gain.value = core.volume / 100
  core.GainNode.connect(core.context.destination)
  core.playing = 0
  // refreshBuffer()
  // console.log("initiateAudioContext")
}
