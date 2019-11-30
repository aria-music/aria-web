<template>
	<v-app-bar
		style="z-index: 1001"
		fixed
		app
	>
		<div
			class="d-flex align-center mx-auto"
			:style="{width: `${width}px`}"
			style="background-color: transparent;"
		>
			<!-- product name -->
			<v-toolbar-title
				style="cursor: pointer"
				class="font-weight-medium"
				@click="pushToHome"
			>
				<span>Aria&ensp;</span>
				<span>Music</span>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<!-- searchbox -->
			<!-- for dt -->
			<div
				v-if="isSmAndUp"
				style="width: 300px;"
				class="mt-5"
			>
				<v-text-field
					ref="searchbox"
					v-model="text"
					dense
					prepend-inner-icon="search"
					:loading="isLoading"
					:color="theme"
					@click:prepend-inner="search"
					@keyup.enter="checkMac"
					@keypress="canSearch = true"
				></v-text-field>
			</div>
			<!-- for sp -->
			<div
				v-else
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
					:color="theme"
					@click:prepend-inner="focusAndSearch"
					@keyup.enter="checkMac"
					@keypress="canSearch = true"
					@focus="isFocus = true"
					@blur="isFocus = false"
				></v-text-field>
			</div>

			<!-- setting btn -->
			<setting
				:theme="theme"
			/>

		</div>
	</v-app-bar>
</template>
<script>
import setting from './options/btns/setting'
import { mapState } from 'vuex'
import { isSmAndUp } from '@/mixin/breakpoint'

export default {
	mixins: [ isSmAndUp ],
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
		spWidth: "25",
		isFocus: false,
	}),
	computed: {
		...mapState(["theme"]),
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
	mounted() {
		window.addEventListener('keydown', this.keyEvents)
	},
	beforeDestroy() {
		window.addEventListener('keydown', this.keyEvents)
	},
	methods: {
		search() {
			this.canSearch = false
			// this.$store.dispatch('sendAsSearch', this.text)
			// this.$store.dispatch('sendAsNewplaylist', this.text)
			this.$router.push({name: 'search', params: {item: this.text}})
			this.text = ""
    },
		checkMac() {
			if(this.canSearch)
				this.search()
			else
				return
		},
		focusAndSearch() {
			if(this.isFocus)
				this.search()
			else
				this.$refs.searchbox.focus()
		},
		pushToHome() {
			this.$router.push({name: 'playlist-view'})
		},
		keyEvents(event) {
			switch(event.keyCode) {
				case 27: //'esc' key
					event.preventDefault()
					this.pushToHome()
					break
				case 83: //'s' key
					event.preventDefault()
					this.$refs.searchbox.focus()
					break
			}
		}
	}
}
</script>