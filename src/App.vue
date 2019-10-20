<template>
  <v-app v-resize="setSize">
    <AriaHeader
      :width="size.width"
    />
    <mainContainer
      :size="size"
    />
    <AriaFooter
      :size="size"
    />
  </v-app>
</template>

<script>
import AriaHeader from './components/header'
import mainContainer from './components/container/mainContainer'
import AriaFooter from './components/footer'

export default {
  name: 'App',
  components: {
    AriaHeader,
    mainContainer,
    AriaFooter,
  },
  data: () => ({
    size: {
      width: 0,
      height: 0
    }
  }),
  methods: {
    setSize() {
      this.size.width = window.innerWidth > 1200 ? 1200 : window.innerWidth
      this.size.height = window.innerHeight
    }
  }
};
</script>
