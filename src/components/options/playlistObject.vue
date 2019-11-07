<template>
  <v-hover #default="{ hover }">
    <v-card
      class="mx-auto"
      style="opacity: 0.9;"
      width="300px"
      height="300px"
      :elevation="decoy ? 0 : (hover ? 10 : 4)"
      :img="img"
    >
      <slot :hover="hover"></slot>
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