<template>
  <v-card
    class="fill-height pa-3"
  >
    <v-hover #default="{ hover }">
      <v-card
        class="pl-2"
        :color="theme"
      >
        <v-card class="pa-1">
          <v-img
            :src="thumb"
            :aspect-ratio="1"
          >
          </v-img>
        </v-card>
        <v-card class="mt-2">
          <v-card-title class="title font-weight-bold">
            {{ name }}
          </v-card-title>
          <v-expand-transition>
            <div v-show="isSmAndDown || hover">
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
export default {
  props: {
    theme: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "",
    }
  },
  computed: {
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    thumb() {
      return this.thumbnail ? this.thumbnail : require('@/assets/thinking-face.png')
    }
  }
}
</script>