<template>
  <playlists
    view
    :size="size"
  />
</template>
<script>
import playlists from '@/components/mappedPlaylist'

export default {
  props: {
    size: {
      type: Object,
      required: true
    },
  },
  components: {
    playlists
  }
}
</script>
