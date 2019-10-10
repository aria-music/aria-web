<template>
	<v-app-bar>
		<div
			class="d-flex align-center mx-auto"
			:style="{width: `${width}px`}"
		>
			<!-- product name -->
			<v-toolbar-title>Aria_music</v-toolbar-title>

			<v-spacer></v-spacer>

			<!-- searchbox -->
			<!-- for sp -->
			<div
				v-if="$vuetify.breakpoint.xs"
				:style="{width: `${spWidth}px`}"
				style="transition-duration: .3s"
				class="mt-5"
			>
				<v-text-field
					ref="searchbox"
					v-model="text"
					dense
					prepend-inner-icon="search"
					:loading="isLoading"
					:color="themeColor"
					@click:prepend-inner="focusAndSearch"
					@keyup.enter="checkMac"
					@keypress="canSearch = true"
					@focus="isFocus = true"
					@blur="isFocus = false"
				></v-text-field>
			</div>
			<!-- for dt -->
			<div
				v-if="$vuetify.breakpoint.smAndUp"
				style="width: 300px;"
				class="mt-5"
			>
				<v-text-field
					v-model="text"
					dense
					prepend-inner-icon="search"
					:loading="isLoading"
					:color="themeColor"
					@click:prepend-inner="search"
					@keyup.enter="checkMac"
					@keypress="canSearch = true"
				></v-text-field>
			</div>

			<!-- Audio reload btn -->
			<v-btn
				v-if="$vuetify.breakpoint.smAndUp"
				icon
				small
				@click="initAudioContext"
			><v-icon>refresh</v-icon>
			</v-btn>

			<!-- setting btn -->
			<setting/>

		</div>
	</v-app-bar>
</template>
<script>
import setting from './setting'

export default {
	props: {
		width: {
			type: Number,
			required: true,
		}
	},
	data: () => ({
		text: "",
		canSearch: false,
		isLoading: false,
		themeColor: "pink lighten-3",
		spWidth: "25",
		isFocus: false,
	}),
	computed: {

	},
	components: {
		setting
	},
	watch: {
		isFocus: function(focused) {
			if(focused){
				this.spWidth = "200"
			}else{
				this.spWidth = "25"
			}
		}
	},
	methods: {
		initAudioContext() {
			// this.$store.dispatch('initAudio')
      // toast('Audio Reloaded!')
		},
		search() {
			this.canSearch = false
			// this.$store.dispatch('sendAsSearch', this.text)
			// this.text = ""
			// this.$router.push('/search')
    },
		checkMac() {
			if(this.canSearch){
				this.search()
			}else{
				return
			}
		},
		focusAndSearch() {
			if(this.isFocus){
				this.search()
			}else{
				this.$refs.searchbox.focus()
				this.isFocus = true
			}
		},
	}
}
</script>