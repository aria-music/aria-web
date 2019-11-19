export const isSmAndUp = {
  computed: {
    isSmAndUp() {
      return this.$vuetify.breakpoint.smAndUp
    },
  },
}

export const isXs = {
  computed: {
    isXs() {
      return this.$vuetify.breakpoint.xs
    }
  }
}

export const isSmAndDown = {
  computed: {
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
  }
}