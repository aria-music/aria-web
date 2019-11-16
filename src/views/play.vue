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
            <infobtn
              :theme="theme"
              :songData="playingData"
            />
            <funcbtn
              show
              :white="isDark"
              like
              addList
              skip
              :songData="playingData"
              @isOpen="statusChange"
              defualt
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
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import titleView from '@/components/options/title'
import funcbtn from '@/components/options/btns/functional'
import infobtn from '@/components/options/btns/info'
import { mapState } from 'vuex'

export default {
  components: {
    titleView,
    infobtn,
    funcbtn,
  },
  data: () => ({
    theme: 'pink lighten-2',
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
    }
  },
  methods: {
    statusChange(newVal) {
      this.play = newVal
    }
  }
}
</script>