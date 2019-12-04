<template @keyup.space="playAndPause">
	<v-footer
		app
		fixed
		class="pa-0 d-flex"
		height="65"
	>
		<!-- progress bar -->
		<v-progress-linear
			:value="nowTime"
			fixed
			height="5"
			class="d-flex align-self-start"
			background-color="grey lighten-1"
			:color="theme"
		></v-progress-linear>
		<div
			class="d-flex flex-row align-center mx-auto px-2"
			:style="{width: `${size.width}px`}"
		>
			<!-- play btn-->
			<v-btn
				icon
				large
				@click="playAndPause"
				class="mr-2"
			>
				<v-icon large>{{ nowState == "paused" ? "play_arrow" : "pause" }}</v-icon>
			</v-btn>

			<!-- skip btn, shuffle btn, repeat btn  -->
			<v-btn
				v-for="(item, index) in leftControlItems"
				:key="index"
				icon
				@click="controlFunc(item.content)"
				class="mr-2"
			>
				<v-icon>{{ item.icon }}</v-icon>
			</v-btn>

			<!-- volume btn -->
			<v-hover #default="{ hover }">
				<div class="d-flex flex-row align-center">
					<v-btn
						icon
						@click="onClick(hover)"
					>
						<v-icon>{{ volume.icon }}</v-icon>
					</v-btn>
					<v-expand-x-transition mode="out-in">
						<v-slider
							v-show="hover"
							v-model="volume.value"
							dence
							hide-details
							style="width: 90px"
							:color="theme"
							track-color="grey lighten-1"
						></v-slider>
					</v-expand-x-transition>
				</div>
			</v-hover>

			<v-spacer></v-spacer>

			<!-- thumnail -->
			<v-card
				height="50"
				width="50"
				:img="playingData.thumbnail_small"
				@click="goPlay"
			>
			</v-card>

			<!-- TODO marquee -->
			<div v-if="isSmAndUp">
			</div>

			<!-- love btn -->
			<lovebtn
				v-if="isSmAndUp"
				:isLoved="playingData.is_liked"
				:uri="playingData.uri"
			/>

			<!-- sub queuelist -->
      <v-btn
        icon
				@click="openSubQueue"
      >
        <v-icon>playlist_play</v-icon>
      </v-btn>
		</div>
	</v-footer>
</template>
<script>
import { mapState } from 'vuex'
import lovebtn from './options/btns/love'
import { isSmAndUp } from '@/mixin/breakpoint'
import toaster from '@/mixin/toast'

const LeftControlItems = [
	{icon: "skip_next", content: "skip"},
	{icon: "shuffle", content: "shuffle"},
	{icon: "repeat", content: "repeat"},
]

export default {
	mixins: [ isSmAndUp, toaster ],
	props: {
		size: {
			type: Object,
			required: true
		},
		isFocus: Boolean
	},
	components: {
		lovebtn,
	},
  data: () => ({
		leftControlItems: LeftControlItems,
		nowTime: 0.0,
		volume: {
			value: 100,
			buff: 100,
			icon: "volume_up"
		},
		interval: null,
	}),
	computed: {
		...mapState(["nowState", "playingData", "playingTitle", "theme"]),
    countTime() {
      return 10 / this.playingData.duration
    },
	},
	watch: {
		'volume.value': function(vol) {
			this.volume.icon = vol >= 50 ? "volume_up"
                       : vol == 0  ? "volume_off"
                       : "volume_down"
			this.$store.commit('setVolume', vol)
		},
    nowState: function(val) {
      this.nowTime = this.countTime * this.playingData.position * 10
			if(val == 'playing')
				this.toast(this.playingData.title, { icon: "fas fa-play" })
    },
	},
	mounted(){
		this.setIntervalForSeekbar()
		this.initVolume()
		window.addEventListener('keydown', this.keyEvents)
	},
	beforeDestroy() {
    clearInterval(this.interval)
		window.removeEventListener('keydown', this.keyEvents)
  },
	methods: {
		initVolume() {
			this.volume.value = this.$store.state.volume
		},
		playAndPause() {
			if(this.nowState == "paused")
				this.$store.dispatch('sendAsResume')
      else
				this.$store.dispatch('sendAsPause')
		},
		controlFunc(content) {
			switch(content) {
				case "skip":
					this.skip()
					break
				case "shuffle":
					this.shuffle()
					break
				case "repeat":
					this.repeat()
					break
			}
		},
		skip() {
      this.$store.dispatch('sendAsSkip')
    },
		repeat() {
			this.$store.dispatch('sendAsRepeat', this.playingData.uri)
    },
		shuffle() {
      this.$store.dispatch('sendAsShuffle')
    },
		onClick(hover) {
			if(this.isSmAndUp || hover)
				this.mute()
		},
		mute() {
			if(this.volume.value !== 0){
				this.volume.buff = this.volume.value
				this.volume.value = 0
			}else{
				this.volume.value = this.volume.buff
			}
		},
		setIntervalForSeekbar() {
      this.interval = setInterval(() => {
        this.progressSeekbar()
      }, 100)
    },
    progressSeekbar() {
      if(this.nowTime < 100 && this.nowState == 'playing')
				this.nowTime += this.countTime
    },
		openSubQueue() {
			this.$store.commit('openSubQueue')
		},
		goPlay() {
			this.$router.push({name: 'play'})
		},
		volumeUp() {
			this.volume.value += 10
			if(this.volume.value > 100)
				this.volume.value = 100
		},
		volumeDown() {
			this.volume.value -= 10
			if(this.volume.value < 0)
				this.volume.value = 0
		},
		keyEvents(event) {
			if(this.isFocus) return true
			switch(event.keyCode) {
				case 32: //space
					event.preventDefault()
					this.playAndPause()
					break
				case 38: //up
					event.preventDefault()
					this.volumeUp()
					break
				case 39: //right
					event.preventDefault()
					this.skip()
					break
				case 40: //down
					event.preventDefault()
					this.volumeDown()
					break
				case 77: //'m' key
					event.preventDefault()
					this.mute()
					break
			}
		},
	},
}
</script>