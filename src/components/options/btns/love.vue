<template>
  <v-btn
    icon
    text
    :color="isLoved? 'pink lighten-3' : ''"
    @click="isLoved = !isLoved"
  >
    <v-scale-transition mode="out-in">
      <v-icon
        v-if="isLoved"
        :small="small"
        color="pink darken-1"
        style="position: absolute;"
      >favorite</v-icon>
    </v-scale-transition>
    <v-icon :small="small">favorite_border</v-icon>
      <!--
				:color="nowPlayingData.is_liked ? 'pink lighten-3' : ''"
				><v-icon v-if="nowPlayingData.is_liked" color="pink darken-1">favorite</v-icon>
			-->
  </v-btn>
</template>
<script>
export default {
  props: {
    small: Boolean,
  },
  data: () => ({
    isLoved: false,
  })
}
</script>
