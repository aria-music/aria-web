<template>
  <v-row>
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
              class="my-0 py-3"
            >
              <v-icon>fas fa-plus</v-icon>
              <div class="ml-2 pt-1">Queue</div>
            </v-btn>
            <v-btn
              text
              @click="playAll"
              class="my-0 py-3"
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
        height=""
      >
        <v-card-title primary-title>
          {{listContents}}
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import titleView from '@/components/options/title'
import deleteBtn from '@/components/options/btns/delete'

export default {
  props: {
    size: Object,
    theme: {
      type: String,
      default: "pink lighten-2"
    }
  },
  computed: {
    listContents() {
      const entries = this.$store.state.focusedPlaylist.entries
      return entries ? entries.slice() : 'undefined'
    },
    listname() {
      return decodeURIComponent(this.$route.params.name)
    },
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    thumbnail() {
      let i = 0
      if(!this.listContents.length) return ""
      while(this.listContents[i].thumbnail == ""){
        i++
        if(this.listContents[i].thumbnail == "undefined") break
      }
      return this.listContents[i].thumbnail
    }
  },
  methods: {
    queueAll() {

    },
    playAll() {

    }
  },
  mounted() {
    if(this.listContents == 'undefined') this.$router.push({name: 'playlist-view'})
  },
  beforeDestroy() {
    this.$store.commit('initFocus')
  },
  components: {
    titleView,
    deleteBtn
  }
}
</script>