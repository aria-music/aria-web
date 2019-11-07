<template>
  <v-row wrap>
    <v-col
      v-for="(list, index) in playlistCore"
      :key="index"
    >
      <v-fade-transition>
        <playlistObject
          v-if="list.id == 'playlist'"
          :img="list.thumbnail == '' ? require('@/assets/thinking-face.png') : list.thumbnail"
          v-slot="on"
        >
          <div
            class="d-flex flex-column fill-height justify-center"
            @click="goPlaylistContents(index)"
          >
            <v-scroll-y-reverse-transition>
              <div
                v-show="( $vuetify.breakpoint.xs || on.hover ) && !nowLoading"
                class="font-weight-black headline text-truncate ml-5"
                style="text-shadow: 0px 0px 4px rgb(255, 255, 255);"
              >{{ list.name }}</div>
            </v-scroll-y-reverse-transition>
            <v-fade-transition>
              <v-progress-circular
                v-if="nowLoading && focusedIndex === index"
                class="mx-auto"
                :size="100"
                :width="4"
                color="grey darken-1"
                indeterminate
              ></v-progress-circular>
            </v-fade-transition>
            <v-scroll-y-transition>
              <div
                v-show="( $vuetify.breakpoint.xs || on.hover ) && !nowLoading"
                class="text-end font-weight-medium title mr-5"
                style="text-shadow: 0px 0px 4px rgb(255, 255, 255);"
              >{{ list.length == 0 ? "No" : list.length }} {{ list.length == 1 ? "track" : "tracks" }}</div>
            </v-scroll-y-transition>
          </div>
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
    ...mapState(["playlists", "focusedPlaylist"]),
    maxRowSize() {
      const width = this.size.width
      if(width >= 972) return 3
      if(width >= 648) return 2
      return 1
    },
    decoyNum() {
      const diff = this.playlists.length % this.maxRowSize
      return diff ? this.maxRowSize - diff : diff
    },
    playlistCore() {
      let _playlist = this.playlists.slice()
      for(let i = 0; i < this.decoyNum; i++) _playlist.push({ id: "decoy" })
      return _playlist
    },
  },
  data: () => ({
    nowLoading: false,
    focusedIndex: -1,
    // interval: 0,
    // srcNo: 0,
  }),
  components: {
    playlistObject
  },
  methods: {
    goPlaylistContents(index) {
      this.focusedIndex = index
      this.nowLoading = true
      const listname = this.playlists[index].name
      this.$store.dispatch('sendAsPlaylist', listname)
    },
    // changeThumbnails() {
		// 	this.interval = setInterval(() => {
    //     this.srcNo++
    //     if(this.srcNo === 12) this.srcNo = 0
		// 	}, 4000)
		// },
    // thumbnail(thumbnails) {
    //   let thumb = ""
    //   if(thumbnails.length){
    //     thumb = thumbnails[this.srcNo % thumbnails.length]
    //   }else{
    //     thumb = require('@/assets/thinking-face.png')
    //   }
    //   return thumb
    // }
  },
  watch: {
    focusedPlaylist: function(newPlaylist) {
      this.$router.push({ name: 'playlist-contents', params: { name: newPlaylist.name } })
    }
  },
  // mounted() {
  //   this.changeThumbnails()
  // },
  // beforeDestroy() {
	// 	clearInterval(this.interval)
	// },
}
</script>
