<template>
  <v-app v-resize="setSize">
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
import AriaHeader from './components/header'
import mainContainer from './components/mainContainer'
import AriaFooter from './components/footer'

export default {
  name: 'App',
  components: {
    AriaHeader,
    mainContainer,
    AriaFooter,
  },
  mounted(){
    this.parseDark()
  },
  data: () => ({
    size: {
      width: 0,
      height: 0,
    },
  }),
  methods: {
    parseDark() {
      this.$vuetify.theme.dark = JSON.parse(localStorage.dark)
    },
    setSize() {
      this.size.width = window.innerWidth > 1200 ? 1200 : window.innerWidth
      this.size.height = window.innerHeight - 150
    }
  }
}
</script>
