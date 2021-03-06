<template>
  <v-dialog
    max-width="600px"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        text
        v-on="on"
      >
        <v-icon
          small
        >fas fa-info-circle</v-icon>
      </v-btn>
    </template>
    <v-card :color="theme">
      <v-card class="ml-2">
        <v-container grid-list-xs>
          <v-row>
            <v-col cols="12">
              <v-card
                class="pa-2 mx-auto"
                elevation="6"
                max-height="400"
                max-width="400"
              >
                <v-img
                  :src="pure_thumbnail"
                  @error="error"
                  contain
                  max-height="350"
                  max-width="400"
                ></v-img>
              </v-card>
            </v-col>
            <v-col cols="10" offset="1">
              <v-card elevation="6" class="mx-auto">
                <v-card-text>
                  <div class="mb-1">
                    <v-icon small>fas fa-music</v-icon>
                    <span class="ml-3 font-weight-bold">{{ title }}</span>
                  </div>
                  <div v-if="isGPM">
                    <div class="mb-1">
                      <v-icon small>fas fa-user</v-icon>
                      <span class="ml-3 font-weight-bold">{{ songData.entry.artist }}</span>
                    </div>
                    <div class="mb-1">
                      <v-icon small>fas fa-compact-disc</v-icon>
                      <span class="ml-3 font-weight-bold">{{ songData.entry.album }}</span>
                    </div>
                  </div>
                  <div class="mb-1">
                    <v-icon small>{{ providerIcon }}</v-icon>
                    <a
                      v-if="httpUri"
                      :href="songData.uri"
                      target="_blank"
                      class="ml-1 font-weight-bold"
                    >{{ songData.uri }}</a>
                    <span v-else class="ml-1 font-weight-bold">{{ songData.uri }}</span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-card>
  </v-dialog>
</template>
<script>
import { isXs } from '@/mixin/breakpoint'
import thumb from '@/mixin/thumbnail'

export default {
  mixins: [ isXs, thumb ],
  props: {
    theme: {
      type: String,
      default: 'pink'
    },
    songData: {
      type: Object,
      required: true,
    }
  },
  computed: {
    source() {
      return this.songData.source
    },
    isGPM() {
      return this.source === 'gpm'
    },
    title() {
      return this.isGPM ? this.songData.entry.title : this.songData.title
    },
    providerIcon() {
      switch(this.source) {
        case 'gpm':
          return 'fab fa-google-play'
        case 'youtube':
          return 'fab fa-youtube'
        case 'soundcloud':
          return 'fab fa-soundcloud'
        default:
          return ''
      }
    },
    httpUri() {
      return !this.songData.uri.indexOf('http')
    },
  },
  mounted() {
    this.checkSrc(this.songData.thumbnail)
  },
  watch: {
    'songData.thumbnail': function(src){
      this.checkSrc(src)
    }
  }
}
</script>