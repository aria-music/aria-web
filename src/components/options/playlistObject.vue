<template>
  <v-hover #default="{ hover }">
    <v-card
      class="mx-auto"
      width="300px"
      height="300px"
      :elevation="decoy ? 0 : (hover ? 10 : 4)"
      :img="img"
    >
      <slot></slot>
    </v-card>
  </v-hover>
</template>
<script>
export default {
  props: {
    img: {
      type: String,
      default: ""
    },
    decoy: Boolean,
  },
}
</script>