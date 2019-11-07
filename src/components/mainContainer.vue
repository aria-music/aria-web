<template>
  <v-card
    class="mx-auto pa-3 scroller"
    style="overflow: auto"
    :width="size.width"
    height="100%"
    :flat="false"
  >
    <router-link :to="{ name: 'playlist-view' }"></router-link>
    <router-link :to="{ name: 'playlist-contents', params: {name: 'focused-playlist-name'}}"></router-link>
    <v-fade-transition>
      <router-view
        :size="size"
      ></router-view>
    </v-fade-transition>
  </v-card>
</template>
<script>
import playlistView from '@/views/playlistView'

export default {
  components: {
    playlistView
  },
  props: {
		size: {
			type: Object,
			required: true
		}
  }
}
</script>
<style lang="scss" src="@/components/options/scss/scroller.scss">