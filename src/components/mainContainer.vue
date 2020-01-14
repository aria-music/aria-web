<template>
  <v-card
    class="mx-auto pa-3"
    :width="size.width"
    height="100%"
    :flat="false"
  >
    <router-link :to="{ name: 'playlist-view' }"></router-link>
    <router-link :to="{ name: 'playlist-contents', query: { name: 'focused-playlist-name' }}"></router-link>
    <router-link :to="{ name: 'search', query: { contents: 'searched-item' }}"></router-link>
    <router-link :to="{ name: 'play' }"></router-link>
    <v-fade-transition mode="out-in">
      <router-view
        :size="size"
        :theme="theme"
      ></router-view>
    </v-fade-transition>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
		size: {
			type: Object,
			required: true
		}
  },
  computed: {
    ...mapState(["theme"])
  },
}
</script>