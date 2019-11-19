<template>
  <v-card elevation="8">
    <v-hover #default="{ hover }">
      <v-img
        :src="thumb"
        :width="maxWidth"
        class="align-end"
        height="150px"
        gradient="rgba(100,115,201,.33), rgba(25,25,25,.7)"
      >
        <v-card-text class="py-0 font-weight-midium white--text">Playing:</v-card-text>
        <v-row class="title pl-4 pb-3 pt-1" no-gutters>
          <v-col
            :cols="$vuetify.breakpoint.xs ? 10 : 11"
            class="text-truncate font-weight-midium white--text align-self-center"
            :class="{'subtitle-2': $vuetify.breakpoint.xs}"
          >
            <v-tooltip
              top
              open-delay="1000"
            >
              <template #activator="{ on }">
                <span v-on="on">{{ playingTitle }}</span>
              </template>
              <span>{{ playingTitle }}</span>
            </v-tooltip>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.xs ? 2 : 1"
            class="align-self-end"
          >
            <!-- functional btn -->
            <funcbtn
              :show="hover || $vuetify.breakpoint.xs"
              :hover="$vuetify.breakpoint.smAndUp"
              :songData="playingData"
              :theme="theme"
              white
              addList
              skip
              like
            />
          </v-col>
        </v-row>
      </v-img>
    </v-hover>

    <v-row dense class="ma-0">
      <v-col
        offset="2"
        :cols="$vuetify.breakpoint.xs ? 10 : 6"
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
        <v-icon small class="ml-5 pl-3">delete_outline</v-icon>
        <v-icon small class="ml-5 pl-3">fas fa-info-circle</v-icon>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div style="height: 100%">
      <ariaQueue
        :maxHeight="maxHeight"
        :width="maxWidth"
        :imgWidth="imgWidth"
        :theme="theme"
      />
    </div>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import ariaQueue from './options/queue/queue'
import funcbtn from './options/btns/functional'

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
    ...mapState(["playingData", "playingTitle", "theme"]),
    maxHeight() {
      return this.height - 340
    },
    maxWidth() {
      return this.$vuetify.breakpoint.xs ? 250 : 500
    },
    imgWidth() {
      return this.$vuetify.breakpoint.xs ? 35 : 70
    },
    thumb() {
      return this.playingData.thumbnail ? this.playingData.thumbnail : require("@/assets/thinking-face.png")
    }
  },
}
</script>