<template>
  <v-app v-resize="setSize">
    <AriaHeader
      :width="size.width"
    />
    <v-content>
      <div
        style="position: absolute; z-index: 5; height: 99%; width: 99%;"
        class="d-flex align-end justify-end"
      >
        <subQueue
          class="align-end"
          :height="size.height"
        />
      </div>
      <mainContainer
        style="position: relative; z-index: 4;"
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
import subQueue from './components/subQueue'

export default {
  name: 'App',
  components: {
    AriaHeader,
    mainContainer,
    AriaFooter,
    subQueue,
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
