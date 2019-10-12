<template>
  <v-app>
    <AriaHeader
      :width="width"
    />
    <AriaFooter
      :width="width"
    />
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
