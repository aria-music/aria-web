<template>
  <v-card
    class="fill-height pa-3"
  >
    <v-hover #default="{ hover }">
      <v-card
        class="pl-2"
        :color="theme"
      >
        <v-card class="pa-2">
          <v-img
            :src="replaceSrc(thumbnail)"
            :aspect-ratio="1"
            max-height="500"
          >
          </v-img>
        </v-card>
        <v-card class="mt-2">
          <v-card-title
            class="title font-weight-bold"
          >
            <span :class="{'text-truncate': !play && !hover}">{{ name }}</span>
          </v-card-title>
          <v-expand-transition>
            <div v-show="isSmAndDown || hover || play">
              <v-divider class="mx-3"></v-divider>
              <slot></slot>
            </div>
          </v-expand-transition>
        </v-card>
      </v-card>
    </v-hover>
  </v-card>
</template>
<script>
import { isSmAndDown } from '@/mixin/breakpoint'
import thumb from '@/mixin/thumbnail'

export default {
  mixins: [ isSmAndDown, thumb ],
  props: {
    theme: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: ""
    },
    thumbnail: String,
    play: Boolean
  },
}
</script>