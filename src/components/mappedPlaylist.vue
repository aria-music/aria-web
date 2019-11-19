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
          :size="playlistSize"
        >
          <div
            class="d-flex flex-column fill-height justify-center"
            @click="onClick(index)"
          >
            <v-scroll-y-reverse-transition>
              <div
                v-show="!on.hover && !(focusedIndex === index) && view"
                class="font-weight-black headline text-truncate ml-5 black--text"
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
                v-show="!on.hover && !(focusedIndex === index) && view"
                class="text-end font-weight-medium title mr-5 black--text"
                style="text-shadow: 0px 0px 4px rgb(255, 255, 255);"
              >{{ list.length == 0 ? "No" : list.length }} {{ list.length == 1 ? "track" : "tracks" }}</div>
            </v-scroll-y-transition>
          </div>
        </playlistObject>
      </v-fade-transition>
      <v-card
        v-if="list.id == 'add'"
        class="mx-auto d-flex justify-center align-center"
        style="opacity: 0.6;"
        :width="playlistSize"
        :height="playlistSize"
        text
        :ripple="{ center: true }"
        @click="makeList"
      >
        <v-icon size="52">fas fa-plus</v-icon>
      </v-card>
      <playlistObject
        v-if="list.id == 'decoy'"
        decoy
        :size="playlistSize"
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
    size: Object,
    view: Boolean
  },
  computed: {
    ...mapState(["playlists", "focusedPlaylist"]),
    maxRowSize() {
      if(this.view){
        if(this.size.width >= 972) return 3
        if(this.size.width >= 648) return 2
        return 1
      }else{
        if(this.isXs) return 2
        else return 3
      }
    },
    playlistsWithAdd() {
      const _playlist = this.playlists.slice()
      _playlist.push({ id: "add" })
      return _playlist
    },
    decoyNum() {
      const diff = this.playlistsWithAdd.length % this.maxRowSize
      return diff ? this.maxRowSize - diff : diff
    },
    playlistCore() {
      let _playlist = this.playlistsWithAdd.slice()
      for(let i = 0; i < this.decoyNum; i++) _playlist.push({ id: "decoy" })
      return _playlist
    },
    playlistSize() {
      return this.view ? 300 : 100
    }
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
    onClick(index){
      if(this.view) this.goPlaylistContents(index)
      // else this.addToPlaylist(index)
    },
    goPlaylistContents(index) {
      if(this.nowLoading) this.nowLoading = false
      this.focusedIndex = index
      this.nowLoading = true
      this.focusedName = this.playlists[index].name
      this.$store.dispatch('sendAsPlaylist', this.focusedName)
    },
    // addToPlaylist(index){
      
    // },
    makeList() {
      //
    }
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
      setTimeout(()=>{
        if(newPlaylist.name == this.focusedName){
          this.$router.push({ name: 'playlist-contents', params: { name: newPlaylist.name } })
        }
      }, 1000)
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
