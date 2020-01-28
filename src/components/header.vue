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
			<div
				:style="{width: `${isSmAndUp ? 300 : Width}px`}"
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
		Width: "25",
		isFocus: false,
	}),
	computed: {
		...mapState(["theme", "stopEvents"]),
	},
	components: {
		setting
	},
	watch: {
		isFocus: function(focused) {
			if(focused){
				this.Width = "200"
				this.$store.commit('removeEvents')
			}else{
				this.Width = "25"
				this.$store.commit('addEvents')
			}
		},
		stopEvents: function(stopEvents) {
			if(stopEvents)
				window.removeEventListener('keydown', this.keyEvents)
			else
				window.addEventListener('keydown', this.keyEvents)
		}
	},
	mounted() {
		window.addEventListener('keydown', this.keyEvents)
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.keyEvents)
	},
	methods: {
		search() {
			this.canSearch = false
			this.$router.push({name: 'search', query: {q: this.text}})
				.catch(err => err)
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
				.catch(err => err)
		},
		keyEvents(event) {
			switch(event.keyCode) {
				case 27: //'esc' key
					event.preventDefault()
					this.pushToHome()
					break
				case 83: //'s' key
					if(this.isFocus) return false
					event.preventDefault()
					this.$refs.searchbox.focus()
					break
			}
		}
	}
}
</script>