<template>
  <v-app>
    <div style="height: 100vh, width: 100vh">
      <AriaHeader/>
    </div>
  </v-app>
</template>

<script>
import AriaHeader from './components/header/header'

export default {
  name: 'App',
  components: {
    AriaHeader,
  },
  data: () => ({
    //
  }),
};
</script>
