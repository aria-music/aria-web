<template>
  <v-card elevation="8">
    <v-hover #default="{ hover }">
      <v-img
        :src="replaceSrc(playingData.thumbnail)"
        :width="maxWidth"
        class="align-end"
        :height="isXs ? 150 : 200"
        gradient="rgba(100,115,201,.33), rgba(25,25,25,.7)"
      >
        <v-card-text class="py-0 font-weight-midium white--text">Playing:</v-card-text>
        <v-row class="title pl-4 pb-3 pt-1" no-gutters>
          <v-col
            :cols="isXs ? 10 : 11"
            class="text-truncate font-weight-midium white--text align-self-center"
            :class="{'subtitle-2': isXs}"
          >
            <v-tooltip
              top
              open-delay="1000"
              :color="theme"
            >
              <template #activator="{ on }">
                <span v-on="on">{{ playingTitle }}</span>
              </template>
              <span>{{ playingTitle }}</span>
            </v-tooltip>
          </v-col>
          <v-col
            :cols="isXs ? 2 : 1"
            class="align-self-end"
          >
            <!-- functional btn -->
            <funcbtn
              :show="hover || isXs"
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
        :cols="isXs ? 10 : 6"
        class="d-flex align-center px-0"
      >
        <v-divider vertical></v-divider>
        <v-list-item-title class="font-weight-medium caption py-0 ml-1">Title</v-list-item-title>
      </v-col>
      <v-col
        cols="4"
        class="d-flex align-center"
        v-if="isSmAndUp"
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
import thumb from '@/mixin/thumbnail'
import { isXs, isSmAndUp } from '@/mixin/breakpoint'

export default {
  mixins: [ thumb, isXs, isSmAndUp ],
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
      const height = this.height
      return (height - 500) < 450 ? height - 500 : 450
    },
    maxWidth() {
      return this.isXs ? 250 : 500
    },
    imgWidth() {
      return this.isXs ? 35 : 70
    },
  },
}
</script>