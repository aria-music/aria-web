<template>
  <v-menu
    :close-on-content-click="false"
    transition="slide-y-reverse-transition"
    top
    :nudge-top="70"
    class="my-5"
  >
    <template #activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>playlist_play</v-icon>
      </v-btn>
    </template>
    <v-card
      max-width="600"
    >
      <v-hover #default="{ hover }">
        <v-img
          class="align-end"
          height="150px"
          width="500px"
          :src="playingData.thumbnail"
          gradient="rgba(100,115,201,.33), rgba(25,32,72,.7)"
        >
          <v-card-text class="py-0 font-weight-midium white--text">Playing:</v-card-text>
          <v-row class="title pl-4 pb-3 pt-1" no-gutters>
            <v-col
              cols="11"
              class="text-truncate font-weight-midium white--text"
              :alt="playingTitle"
            >
              {{ playingTitle }}
            </v-col>
            <v-col cols="1" class="align-self-end">
              <!-- functional btn -->
              <funcbtn
                :show="hover"
                hover
                white
                addList
                skip
                like
                :songData="playingData"
              />
            </v-col>
          </v-row>
        </v-img>
      </v-hover>

      <v-row dense class="ma-0">
        <v-col cols="2"></v-col>
        <v-col cols="6" class="d-flex align-center px-0">
          <v-divider vertical></v-divider>
          <v-list-item-title class="font-weight-medium caption py-0 ml-1">Title</v-list-item-title>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-divider vertical></v-divider>
          <v-icon small class="ml-2">favorite_border</v-icon>
          <v-icon small class="ml-5">delete_outline</v-icon>
          <v-icon small class="ml-5" v-if="$vuetify.breakpoint.smAndUp">info</v-icon>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div style="height: 100%">
        <ariaQueue
          :maxHeight="maxHeight"
        />
      </div>

    </v-card>
  </v-menu>
</template>
<script>
import ariaQueue from '../queue/queue'
import funcbtn from './fuctional'

export default {
  props: {
    height: {
      type: Number,
      required: true
    },
    playingData: {
      type: Object,
      required: true
    },
    playingTitle: {
      type: String,
      required: true
    }
  },
  components: {
    ariaQueue,
    funcbtn,
  },
  computed: {
    maxHeight() {
      return this.height - 340
    },
  },
}
</script>