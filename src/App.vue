<template>
  <v-app>
    <div style="height: 100vh, width: 100vh">
      <AriaHeader/>
      <AriaFooter/>
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
};
</script>
