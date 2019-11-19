<template>
  <v-card
    class="mt-2"
    elevation="0"
  >
    <a href="https://github.com/aria-music/aria-web" target="_blank">
      <v-img :src="ariaVersion">
      </v-img>
    </a>
  </v-card>
</template>
<script>
import {version} from "@/assets/version.json"

export default {
  computed: {
		ariaVersion() {
      return `https://img.shields.io/badge/version-${version.slice(0, 7)}-ff4081?link=https%3A%2F%2Fgithub.com%2Faria-music%2Faria-web&style=flat-square&logo=github`
    }
	},
}
</script>