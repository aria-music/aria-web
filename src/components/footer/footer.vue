<template>
	<v-footer
		absolute
		class="py-0"
	>
		<v-row>
			<v-col class="py-0">

				<!-- progress bar -->
				<v-progress-linear
          :value="nowTime"
					fixed
          height="5"
          :background-color="`${themeColor} lighten-3`"
          :color="`${themeColor} lighten-1`"
        ></v-progress-linear>
				<v-row class="pt-3 pb-2 px-3">
					<div>

						<!-- play btn-->
						<v-btn
							icon
							large
							@click="playAndPause(nowState)"
							class="mr-2"
						><v-icon large>{{ nowState == "paused" ? "play_arrow" : "pause" }}</v-icon>
						</v-btn>

						<!-- skip btn, shuffle btn, repeat btn  -->
						<v-btn
							v-for="(item, index) in leftControlItems"
							:key="index"
							icon
							@click="controlFunc(item.content)"
							class="mr-2"
						><v-icon>{{ item.icon }}</v-icon>
						</v-btn>

						<!-- volume btn -->
						<v-hover v-slot:default="{ hover }">
							<span>
								<v-btn
									icon
									@click="mute"
								><v-icon>{{ volumeIcon }}</v-icon>
								</v-btn>
								<v-slider
									v-if="hover"
									v-model="volume"
									style="width: 75px, transition-duration: .5s"
									:color="`${themeColor} lighten-3`"
								></v-slider>
							</span>
						</v-hover>
					</div>

					<div class="flex-grow-1"></div>

					<div>

					</div>
				</v-row>
			</v-col>
		</v-row>
	</v-footer>
</template>
<script>
const LeftControlItems = [
	{icon: "skip_next", content: "skip"},
	{icon: "shuffle", content: "shuffle"},
	{icon: "repeat", content: "repeat"},
]

export default {
	props: {

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
		playAndPause(nowState) {

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
			if(this.volume == 0){
				this.volumeBuff = this.volume
				this.volume = 0
			}else{
				this.volume = this.volumeBuff
			}
		}
	},
}
</script>