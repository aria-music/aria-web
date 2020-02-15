<template>
  <div>
    <v-img
      :src="pure_thumbnail"
      @error="error"
      :height="height"
      :max-width="maxWidth"
      eager
      contain
    >
      <template #placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-1"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </div>
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