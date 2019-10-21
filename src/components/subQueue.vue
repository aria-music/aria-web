<template>
  <v-card>
    <v-hover #default="{ hover }">
      <v-img
        class="align-end"
        height="150px"
        :max-width="$vuetify.breakpoint.xs ? 250 : 500"
        :src="playingData.thumbnail"
        gradient="rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
        <v-card-text class="py-0 font-weight-midium white--text">Playing:</v-card-text>
        <v-row class="title pl-4 pb-3 pt-1" no-gutters>
          <v-col
            :cols="$vuetify.breakpoint.xs ? 10 : 11"
            class="text-truncate font-weight-midium white--text"
            :title="playingTitle"
          >
            {{ playingTitle }}
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.xs ? 2 : 1"
            class="align-self-end"
          >
            <!-- functional btn -->
            <funcbtn
              :show="hover || $vuetify.breakpoint.xs"
              :hover="$vuetify.breakpoint.smAndUp"
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
      <v-col
        offset="2"
        :cols="$vuetify.breakpoint.xs ? 10 :6"
        class="d-flex align-center px-0"
      >
        <v-divider vertical></v-divider>
        <v-list-item-title class="font-weight-medium caption py-0 ml-1">Title</v-list-item-title>
      </v-col>
      <v-col
        cols="4"
        class="d-flex align-center"
        v-if="$vuetify.breakpoint.smAndUp"
      >
        <v-divider vertical></v-divider>
        <v-icon small class="ml-2">favorite_border</v-icon>
        <v-icon small class="ml-5">delete_outline</v-icon>
        <v-icon small class="ml-5">info</v-icon>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div style="height: 100%">
      <ariaQueue
        :maxHeight="maxHeight"
        :width="$vuetify.breakpoint.xs ? 250 : 500"
      />
    </div>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import ariaQueue from './options/queue/queue'
import funcbtn from './options/btns/fuctional'

export default {
  props: {
    height: {
      type: Number,
      required: true
    },
  },
  components: {
    ariaQueue,
    funcbtn,
  },
  computed: {
    ...mapState(["playingData", "playingTitle"]),
    maxHeight() {
      return this.height - 340
    },
  },
}
</script>