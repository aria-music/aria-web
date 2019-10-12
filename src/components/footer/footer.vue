<template>
	<v-footer
		absolute
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
			:style="{width: `${width}px`}"
		>
			<!-- play btn-->
			<v-btn
				icon
				large
				@click="playAndPause()"
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
						<v-icon>{{ volumeIcon }}</v-icon>
					</v-btn>
					<v-expand-x-transition mode="out-in">
						<v-slider
							v-show="hover"
							v-model="volume"
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
			>
				<v-img
					src="@/assets/thinkingAria.png"
					:aspect-ratio="1/1"
					contain
				></v-img>
			</v-card>

			<!-- TODO marquee -->

			<!-- love btn -->
			<v-btn
				icon
				text
				:color="g ? 'pink lighten-3' : ''"
				@click="g = !g"
			>
				<v-scale-transition mode="out-in">
					<v-icon
						v-if="g"
						color="pink darken-1"
						style="position: absolute;"
					>favorite</v-icon>
				</v-scale-transition>
					<v-icon>favorite_border</v-icon>
			</v-btn>
			<!--
				:color="nowPlayingData.is_liked ? 'pink lighten-3' : ''"
				><v-icon v-if="nowPlayingData.is_liked" color="pink darken-1">favorite</v-icon>
			-->

			<!-- sub queuelist -->
			<subQueuelist/>
		</div>
	</v-footer>
</template>
<script>
import subQueuelist from './subQueueliist'

const LeftControlItems = [
	{icon: "skip_next", content: "skip"},
	{icon: "shuffle", content: "shuffle"},
	{icon: "repeat", content: "repeat"},
]

export default {
	props: {
		width: {
			type: Number,
			required: true,
		},
	},
	components: {
		subQueuelist
	},
  data: () => ({
		leftControlItems: LeftControlItems,
		nowTime: 55.0,
		volume: 100,
		volumeBuff: 100,
		volumeIcon: "volume_up",
		themeColor: "pink",
		nowState: "paused",
		isRepeat: false,
		g: false,
	}),
	watch: {
		volume: function() {
			if(this.volume >= 50) this.volumeIcon = "volume_up"
			else if(this.volume == 0) this.volumeIcon = "volume_off"
			else this.volumeIcon = "volume_down"
			// this.$store.commit('setVolume', this.volume)
			// localStorage.setItem('volume', this.volume)
		},
	},
	methods: {
		playAndPause() {

		},
		controlFunc(content) {
			switch(content) {
				case "skip":
					break
				case "shuffle":
					break
				case "repeat":
					break
			}
		},
		mute() {
			if(this.volume !== 0){
				this.volumeBuff = this.volume
				this.volume = 0
			}else{
				this.volume = this.volumeBuff
			}
		}
	},
}
</script>