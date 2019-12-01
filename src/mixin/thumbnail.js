export default {
  data: () => ({
    pure_thumbnail: "",
    thinking: require('@/assets/thinking-face.png'),
    noImage: require('@/assets/no-image.png'),
  }),
  methods: {
    checkSrc(src) {
      this.pure_thumbnail = src ? src : require('@/assets/no-image.png')
    },
    error() {
      this.pure_thumbnail = require('@/assets/thinking-face.png')
    }
  }
}