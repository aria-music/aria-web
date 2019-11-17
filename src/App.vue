<template>
  <v-app v-resize="setSize">
    <v-scroll-y-reverse-transition>
      <subQueue
        v-show="subQueue"
        v-click-outside="{
          callback: closeSubQueue,
          isOpen: subQueue
          }"
        style="position: fixed; z-index: 5; right: 1%; bottom: 75px;"
        :height="size.height"
      />
    </v-scroll-y-reverse-transition>
    <AriaHeader
      :width="size.width"
    />
    <v-content>
      <mainContainer
        style="position: relative; z-index: 0;"
        :size="size"
      />
    </v-content>
    <AriaFooter
      :size="size"
    />
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
import AriaHeader from './components/header'
import mainContainer from './components/mainContainer'
import AriaFooter from './components/footer'
import subQueue from './components/subQueue'
import clickOutside from './directives/click-outside'

export default {
  name: 'App',
  components: {
    AriaHeader,
    mainContainer,
    AriaFooter,
    subQueue,
  },
  computed: {
    ...mapState(["subQueue"]),
  },
  mounted(){
    // this.$vuetify.theme.dark = true
  },
  data: () => ({
    size: {
      width: 0,
      height: 0,
    }
  }),
  methods: {
    setSize() {
      this.size.width = window.innerWidth > 1200 ? 1200 : window.innerWidth
      this.size.height = window.innerHeight
    },
    closeSubQueue() {
      this.$store.commit('closeSubQueue')
    }
  },
  directives: {
    clickOutside
  }
}
</script>
