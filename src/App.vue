<template>
  <v-app>
    <div style="height: 100vh, width: 100vh">
      <AriaHeader
        :width="width"
      />
      <AriaFooter
        :width="width"
      />
    </div>
  </v-app>
</template>

<script>
import AriaHeader from './components/header/header'
import AriaFooter from './components/footer/footer'

export default {
  name: 'App',
  components: {
    AriaHeader,
    AriaFooter,
  },
  data: () => ({
    //
  }),
  computed: {
    width() {
      const windowWidth = window.innerWidth
      return windowWidth > 1200 ? 1200 : windowWidth
    }
  }
};
</script>
