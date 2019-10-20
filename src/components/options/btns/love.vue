<template>
  <v-btn
    icon
    text
    :color="isLoved ? 'pink lighten-3' : ''"
    @click="like"
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
  </v-btn>
</template>
<script>
export default {
  props: {
    small: Boolean,
    isLoved: {
      type: Boolean,
      required: true
    },
    uri: {
      type: String,
      required: true
    }
  },
  methods: {
    like(){
      this.$store.dispatch('sendAsLike', this.uri)
    }
  }
}
</script>
