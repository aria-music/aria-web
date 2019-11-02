<template>
  <v-row wrap>
    <v-col
      v-for="(list, index) in playlistCore"
      :key="index"
    >
      <v-fade-transition>
        <playlistObject
          v-if="list.id == 'playlist'"
          :img="list.thumbnails[0]"
        >
        </playlistObject>
      </v-fade-transition>
      <playlistObject
        v-if="list.id == 'decoy'"
        decoy
      >
      </playlistObject>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import playlistObject from '@/components/options/playlistObject'

export default {
  props: {
    size: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["playlists"]),
    maxRowSize() {
      if(this.size.width >= 972) return 3
      if(this.size.width >= 648) return 2
      return 1
    },
    decoyNum() {
      const diff = this.playlists.length % this.maxRowSize
      return diff ? this.maxRowSize - diff : diff
    },
    playlistCore() {
      const _playlist = this.playlists.slice()
      for(let i = 0; i < this.decoyNum; i++) _playlist.push({ id: "decoy" })
      return _playlist
    }
  },
  components: {
    playlistObject
  }
}
</script>
