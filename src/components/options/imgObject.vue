<template>
  <v-img
    :src="pure_thumbnail"
    @error="error"
    :height="height"
    :max-width="maxWidth"
    eager
    contain
  >
  </v-img>
</template>
<script>
import thumb from '@/mixin/thumbnail'

export default {
  mixins: [ thumb ],
  props: {
    src: {
      type: String,
      required: true
    },
    height: Number,
    maxWidth: Number,
    eager: Boolean,
    contain: Boolean
  },
  mounted() {
    this.checkSrc(this.src)
  },
  watch: {
    src: function(src){
      this.checkSrc(src)
    }
  }
}
</script>