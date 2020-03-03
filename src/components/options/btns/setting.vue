<template>
	<v-menu
		v-model="active"
		transition="slide-y-transition"
		bottom
		left
		nudge-bottom="50"
		:close-on-content-click="shouldClose"
	>
		<template #activator="{ on }">
			<v-btn
				small
				icon
				v-on="on"
			>
				<v-icon>more_vert</v-icon>
			</v-btn>
		</template>

		<v-alert
			class="mb-0 py-0 pr-0 pl-2"
			border="left"
			colored-border
			:color="theme"
		>
			<v-list subheader shaped dense>
				<v-subheader class="font-italic font-weight-medium">{{ subheader }}</v-subheader>
				<v-divider></v-divider>
				<v-list-item
					v-for="(item, index) in settingItems"
					:key="index"
					class="pl-2"
					@click.stop="setting(item.content)"
				>
					<v-list-item-title class="mr-4">
						<v-icon class="mb-1 mr-3">{{ item.icon }}</v-icon>
						<span>{{ item.text }}</span>
					</v-list-item-title>
				</v-list-item>
				<v-divider></v-divider>
				<version/>
			</v-list>
		</v-alert>
		<themeSelector
			v-model="selectTheme"
		/>
		<configWindow
			v-model="showConfig"
		/><!-- fuck you fuck you fuck you -->
	</v-menu>
</template>
<script>
import themeSelector from '@/components/options/themeSelectDialog'
import configWindow from '@/components/options/configWindow'
import version from '@/components/options/version'
import toaster from '@/mixin/toast'

const settingItems = [
	{content: "theme", text: "Theme Color", icon: "palette"},
	{content: "config", text: "Config", icon: "fas fa-cog"},
	{content: "init", text: "Init Audio", icon: "fas fa-sync"},
	{content: "no", text: "No Idea", icon: "mood_bad"}
]

export default {
	mixins: [ toaster ],
	props: {
		theme: String
	},
	data: () => ({
		settingItems: settingItems,
		subheader: "KANARI VERY FAST",
		selectTheme: false,
		showConfig: false,
		shouldClose: true,
		active: false,
		pianoTimer: null,
		pianoCount: 0
	}),
	methods: {
		setting(contents){
			this.shouldClose = true
			switch(contents){
				case "theme":
					this.changeThemeColor()
					break
				case "config":
					this.openConfig()
					break
				case "init":
					this.initAudioContext()
					break
				case "no":
					this.shouldClose = false
					--this.pianoCount
					if (this.pianoTimer) {
						if (!this.pianoCount) {
							this.resetPianoCount()
							this.active = false
							this.toast(
								"これでピアノになりました！",
								{
									position: "top-center",
									icon: "fab fa-github"
								}
							)
							this.$router.push({ name: "piano" })
								.catch(err => err)
						} else if(this.pianoCount < 3) {
							this.toast(
								`ピアノまであと ${this.pianoCount} ステップです`,
								{
									position: "top-center",
									icon: "plus_one"
								}
							)
						}
					} else {
						this.pianoTimer = setTimeout(() => {
							this.resetPianoCount()
						}, 1500);
					}
					break
				default:
					break
			}
			if (this.shouldClose)
				this.active = false
		},
		resetPianoCount() {
			this.pianoCount = 5
			clearTimeout(this.pianoTimer)
			this.pianoTimer = null
		},
		changeThemeColor(){
			this.selectTheme = !this.selectTheme
		},
		openConfig() {
			this.showConfig = !this.showConfig
		},
		initAudioContext() {
			this.$store.dispatch('initAudio')
            this.toast(
                'Audio Reloaded!',
                {
                    icon: "fas fa-sync",
                    color: "light-green accent-4",
                }
            )
		},
	},
	created: function() { this.resetPianoCount() },
	components: {
		themeSelector,
		configWindow,
		version
	}
}
</script>