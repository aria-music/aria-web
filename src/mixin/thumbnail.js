export default {
  data: () => ({
    pure_thumbnail: "",
    thinking: require('@/assets/thinking-face.png'),
    noImage: require('@/assets/no-image.png'),
  }),
  methods: {
    checkSrc(src) {
      this.pure_thumbnail = src ? src : this.noImage
    },
    error() {
      this.pure_thumbnail = this.thinking
    }
  }
}