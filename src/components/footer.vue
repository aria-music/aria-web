<template>
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
			:background-color="`${themeColor} lighten-3`"
			:color="`${themeColor} lighten-1`"
		></v-progress-linear>
		<div
			class="d-flex flex-row align-center mx-auto px-2"
			:style="{width: `${size.width}px`}"
		>
			<!-- play btn-->
			<v-btn
				icon
				large
				@click="playAndPause(nowState)"
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
						@click="mute"
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
							:color="`${themeColor} lighten-3`"
							track-color="grey lighten-1"
						></v-slider>
					</v-expand-x-transition>
				</div>
			</v-hover>

			<v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>

			<!-- thumnail -->
			<v-card
				height="50"
				width="50"
				:img="playingData.thumbnail_small"
			>
				<!-- <v-img aspect-ratio="1"></v-img> -->
			</v-card>

			<!-- TODO marquee -->

			<!-- love btn -->
			<lovebtn
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

const LeftControlItems = [
	{icon: "skip_next", content: "skip"},
	{icon: "shuffle", content: "shuffle"},
	{icon: "repeat", content: "repeat"},
]

export default {
	props: {
		size: {
			type: Object,
			required: true
		},
	},
	components: {
		lovebtn,
	},
  data: () => ({
		leftControlItems: LeftControlItems,
		nowTime: 0,
		volume: {
			value: 100,
			buff: 100,
			icon: "volume_up"
		},
		themeColor: "pink",
		interval: null,
	}),
	computed: {
		...mapState(["nowState", "playingData", "playingTitle"]),
    countTime() {
      return 10 / this.playingData.duration
    },
	},
	watch: {
		'volume.value': function() {
			if(this.volume.value >= 50) this.volume.icon = "volume_up"
			else if(this.volume.value == 0) this.volume.icon = "volume_off"
			else this.volume.icon = "volume_down"
			// this.$store.commit('setVolume', this.volume.value)
			// localStorage.setItem('volume', this.volume.value)
		},
    nowPlayingData: function() {
      this.nowTime = this.countTime * this.playingData.position * 10
    },
	},
	mounted(){
		this.setIntervalForSeekbar()
	},
	beforeDestroy() {
    clearInterval(this.interval)
  },
	methods: {
		playAndPause(nowState) {
			if(nowState == "paused") this.$store.dispatch('sendAsResume')
      else this.$store.dispatch('sendAsPause')
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
		mute() {
			// TODO: dispatch volume action
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
      if(this.nowTime < 100 && this.nowState == 'playing') this.nowTime += this.countTime
    },
		openSubQueue() {
			this.$store.commit('openSubQueue')
		}
	},
}
</script>