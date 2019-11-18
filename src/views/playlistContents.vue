<template>
  <v-row style="height: 100%">
    <v-col :cols="isSmAndDown ? 12 : 4">
      <titleView
        :theme="theme"
        :thumbnail="thumbnail"
        :name="listname"
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
              :listname="listname"
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
          :playlistName="listname"
          @thumb="fetchThumb"
        />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import titleView from '@/components/options/title'
import playlist from '@/components/options/queue/playlist'
import deleteBtn from '@/components/options/btns/delete'

export default {
  props: {
    size: Object,
    theme: String,
  },
  data: () => ({
    thumbnail: "",
  }),
  computed: {
    listname() {
      return decodeURIComponent(this.$route.params.name)
    },
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    queueAll() {
      this.$store.dispatch('sendAsQueueWithPlaylist', this.listname)
    },
    playAll() {
      this.$store.dispatch('sendAsPlayWithPlaylist', this.listname)
    },
    fetchThumb(thumb) {
      this.thumbnail = thumb
    }
  },
  beforeDestroy() {
    this.$store.commit('initFocus')
  },
  components: {
    titleView,
    playlist,
    deleteBtn
  }
}
</script>