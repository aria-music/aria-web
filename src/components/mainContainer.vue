<template>
  <v-card
    class="mx-auto pa-3 scroller"
    style="overflow: auto"
    :width="size.width"
    height="100%"
    :flat="false"
  >
    <playlistView
      :size="size"
    />
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