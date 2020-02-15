<template>
  <v-row style="height: 100%">
    <v-col :cols="isSmAndDown ? 12 : 4">
      <titleView
        :theme="theme"
        :thumbnail="thumbnail"
        :name="playlistName"
      >
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              text
              @click="queueAll"
              class="my-0 py-3 px-2"
            >
              <v-icon>fas fa-plus</v-icon>
              <div class="ml-2 pt-1">Queue</div>
            </v-btn>
            <v-btn
              text
              @click="playAll"
              class="my-0 py-3 px-2"
            >
              <v-icon>play_arrow</v-icon>
              <div class="ml-1 pt-1">Play</div>
            </v-btn>
            <deleteBtn
              where="playlist"
              :listname="playlistName"
              dialog
            />
          </v-toolbar-items>
        </v-toolbar>
      </titleView>
    </v-col>
    <v-col
      :cols="isSmAndDown ? 12 : 8"
    >
      <v-card
        height="100%"
        class="pa-3"
      >
        <playlist
          :theme="theme"
          :size="size"
          :playlistName="playlistName"
          @thumb="fetchThumb"
        />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import titleView from '@/components/options/title'
import deleteBtn from '@/components/options/btns/delete'
import toaster from '@/mixin/toast'
import playlist from '@/components/playlistWithSearch'
import { isSmAndDown } from '@/mixin/breakpoint'
import { mapState } from 'vuex'

export default {
  mixins: [ isSmAndDown, toaster ],
  props: {
    size: Object,
    theme: String,
  },
  data: () => ({
    thumbnail: "",
  }),
  computed: {
    ...mapState(["playlists"]),
    playlistName() {
      return this.$route.query.q
    }
  },
  watch: {
    playlistName: function(name) {
      this.fetchContents(name)
    }
  },
  methods: {
    queueAll() {
      this.$store.dispatch('sendAsQueueWithPlaylist', this.playlistName)
      this.toast(this.playlistName, {
        color: "pink lighten-1",
        icon: "fas fa-plus-square"
      })
    },
    playAll() {
      this.$store.dispatch('sendAsPlayWithPlaylist', this.playlistName)
      this.toast(this.playlistName, {
        color: "pink lighten-1",
        icon: "far fa-plus-square"
      })
    },
    fetchThumb(thumb) {
      this.thumbnail = thumb
    },
    fetchContents(name) {
      this.$store.dispatch('sendAsPlaylist', name)
    }
  },
  mounted() {
    this.fetchContents(this.playlistName)
  },
  beforeDestroy() {
    this.$store.commit('initFocus')
  },
  // beforeRouteEnter(to, from, next) {
  //   if (Object.keys(to.query).length !== 0) {
  //     next(vm => {
  //       const listIndex = vm.playlistNames.indexOf(to.query.name)
  //       if(listIndex !== -1){
  //         vm.playlistName = vm.playlistNames[listIndex]
  //         vm.$store.dispatch('sendAsPlaylist', vm.playlistName)
  //         next()
  //       }else{
  //         next('/')
  //       }
  //     })
  //   }
  // },
  components: {
    titleView,
    deleteBtn,
    playlist
  }
}
</script>