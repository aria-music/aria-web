<template>
	<v-menu
		transition="slide-y-transition"
		bottom
		left
		nudge-bottom="50"
	>
		<template v-slot:activator="{ on }">
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
			:color="themeColor"
		>
			<v-list>
				<v-list-item
					v-for="(item, index) in settingItems"
					:key="index"
					@click="settingFunc(item.contents)"
				>
					<v-list-item-title>
						<v-icon>{{ item.icon }}</v-icon>
						<span>{{ item.text }}</span>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-alert>
	</v-menu>
</template>
<script>
import {version} from "@/assets/VERSION.json"

const settingItems = [
	{text: "Theme Color", icon: "palette"},
	{text: "No Idea", icon: "mood_bad"}
]

export default {
	data: () => ({
		settingItems: settingItems,
		themeColor: "pink lighten-3",
	}),
	computed: {
		ariaVersion() {
      return `https://img.shields.io/badge/version-${version}-ff4081?link=https%3A%2F%2Fgithub.com%2Faria-music%2Faria-web&style=flat-square&logo=github`
    }
	},
	methods: {
		settingFunc(contents){
			switch(contents){
				case "Theme Color":
					this.changeThemeColor()
					break
				case "No Idea":
					break
			}
		},
		changeThemeColor(){
			//
		}
	}
}
</script>