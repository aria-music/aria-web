<template>
  <v-menu
    :close-on-content-click="false"
    transition="slide-y-reverse-transition"
    top
    nudge-top="70"
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
          :src="nowPlaying.thumnail"
        >
          <v-card-text class="py-0">Playing:</v-card-text>
          <v-row class="title pl-4 pb-3 pt-1" no-gutters>
            <v-col cols="11" class="font-weight-medium text-truncate">
              {{ nowPlaying.title }}
            </v-col>
            <v-col cols="1" class="align-self-end">
              <v-fade-transition mode="out-in">
                <!-- TODO functional btn -->
                <v-btn
                  v-show="hover"
                  icon
                  small
                ><v-icon>more_vert</v-icon></v-btn>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-img>
      </v-hover>

      <ariaQueue
        :maxHeight="maxHeight"
      />

    </v-card>
  </v-menu>
</template>
<script>
import ariaQueue from '../options/queue/queue'

export default {
  components: {
    ariaQueue,
  },
  data: () => ({
    nowPlaying: {
      title: "水瀬いのり『Inori Minase LIVE TOUR Catch the Rainbow！』ダイジェスト",
      artist: "水瀬いのり",
      thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg",
    },
  }),
  computed: {
    maxHeight() {
      return window.innerHeight - 360
    }
  }

}
</script>