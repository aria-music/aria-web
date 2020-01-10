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
        v-if="!view"
        elevation="1"
        max-width="100"
        class="mt-1 pl-2 text-truncate font-weight-medium"
        style=""
        >{{ list.name }}</v-card>
      <v-card
        v-if="list.id == 'add'"
        class="mx-auto d-flex justify-center align-center"
        style="opacity: 0.6;"
        :width="playlistSize"
        :height="playlistSize"
        text
        :ripple="{ center: true }"
        @click="show = !show"
      >
        <v-icon size="52">fas fa-plus</v-icon>
        <newPlaylistDialog
          :show="show"
          :theme="theme"
        />
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
import newPlaylistDialog from '@/components/options/newPlaylistDialog'
import { isXs } from '@/mixin/breakpoint'

export default {
  mixins: [ isXs ],
  props: {
    size: Object,
    view: Boolean,
    theme: String
  },
  computed: {
    ...mapState(["playlists", "focusedPlaylist"]),
    maxRowSize() {
      if(this.view)
        return this.size.width >= 972 ? 3
             : this.size.width >= 648 ? 2
             : 1
      else
        return this.isXs ? 2 : 3
    },
    playlistsWithAdd() {
      return [...this.playlists, { id: "add" }]
    },
    decoyNum() {
      const diff = this.playlistsWithAdd.length % this.maxRowSize
      return diff ? this.maxRowSize - diff : diff
    },
    playlistCore() {
      return [...this.playlistsWithAdd, ...(new Array(this.decoyNum).fill({ id: "decoy" }))]
    },
    playlistSize() {
      return this.view ? 300 : 100
    }
  },
  data: () => ({
    nowLoading: false,
    focusedIndex: -1,
    show: false,
  }),
  components: {
    playlistObject,
    newPlaylistDialog
  },
  methods: {
    onClick(index){
      if(this.view) this.goPlaylistContents(index)
      else this.addToPlaylist(index)
    },
    goPlaylistContents(index) {
      if(this.nowLoading) this.nowLoading = false
      this.focusedIndex = index
      this.nowLoading = true
      this.focusedName = this.playlists[index].name
      this.$store.dispatch('sendAsPlaylist', this.focusedName)
    },
    addToPlaylist(index){
      this.$emit('added', this.playlists[index].name)
    },
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
}
</script>
