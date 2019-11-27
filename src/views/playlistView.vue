<template>
  <playlists
    view
    :size="size"
    :theme="theme"
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
    theme: String
  },
  components: {
    playlists
  }
}
</script>
