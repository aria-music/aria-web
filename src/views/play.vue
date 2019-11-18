<template>
  <v-row style="height: 100%">
    <v-col :cols="isSmAndDown ? 12 : 4">
      <titleView
        :theme="theme"
        :thumbnail="thumbnail"
        :name="title"
        :play="play"
      >
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              text
              @click="twitterShare(playingData)"
            ><v-icon>fab fa-twitter</v-icon>
            </v-btn>
            <infobtn
              :theme="theme"
              :songData="playingData"
            />
            <funcbtn
              show
              :white="isDark"
              :songData="playingData"
              :theme="theme"
              defualt
              like
              addList
              skip
              @isOpen="statusChange"
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
        <v-card
          height="100%"
          class="pl-2"
          :color="theme"
        >
          <v-card class="mb-2">
            <v-card-title>
              <span class="text-truncate font-weight-medium">NEXT UP</span>
              <v-icon class="ml-3">fas fa-forward</v-icon>
              <v-spacer></v-spacer>
              <deletebtn
                :theme="theme"
                where="queue"
                dialog
                deleteAll
              />
            </v-card-title>
          </v-card>
          <queue
            :theme="theme"
            :size="size"
          />
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import titleView from '@/components/options/title'
import funcbtn from '@/components/options/btns/functional'
import infobtn from '@/components/options/btns/info'
import deletebtn from '@/components/options/btns/delete'
import { mapState } from 'vuex'

export default {
  components: {
    titleView,
    infobtn,
    funcbtn,
    deletebtn,
    queue: () => import('@/components/options/queue/draggableQueue')
  },
  props: {
    theme: String,
    size: Object
  },
  data: () => ({
    play: false,
  }),
  computed: {
    ...mapState(["playingData"]),
    title() {
      return this.playingData.title
    },
    thumbnail() {
      return this.playingData.thumbnail
    },
    isDark() {
      return this.$vuetify.theme.dark
    },
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    httpUri() {
      return !this.playingData.uri.indexOf('http')
    },
  },
  methods: {
    statusChange(newVal) {
      this.play = newVal
    },
    twitterShare(playingData) {
      let twitterText = playingData.title + '\r\n'
      if(this.httpUri) twitterText = twitterText + playingData.uri + '\r\n'
      twitterText = twitterText + '#NowPlaying #AriaMusic'
      twitterText = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(twitterText)
      window.open(twitterText)
    }
  }
}
</script>