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
            <v-col :cols="isXs ? 12 : 6">
              <v-card
                class="pa-2 mx-auto"
                elevation="6"
                max-height="300"
                max-width="300"
              >
                <v-img
                  :src="thumb"
                  :aspect-ratio="1"
                ></v-img>
              </v-card>
            </v-col>
            <v-col :cols="isXs ? 12 : 6">
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
                    <span v-else class="ml-3 font-weight-bold">{{ songData.uri }}</span>
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
export default {
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
    thumb() {
      return this.songData.thumbnail ? this.songData.thumbnail : require('@/assets/thinking-face.png')
    },
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
      }
    },
    httpUri() {
      return !this.songData.uri.indexOf('http')
    },
    isXs() {
      return this.$vuetify.breakpoint.xs
    }
  }
}
</script>