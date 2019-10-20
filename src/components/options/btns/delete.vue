<template>
  <v-btn
    icon
    text
    @click="remove"
  >
    <v-icon
      :small="small"
    >delete</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    small: Boolean,
    where: {
      type: String,
      validator: function (value) {
        return ["queue", "playlist"].indexOf(value) !== -1
      }
    },
    uri: {
      type: String,
      required: true,
    },
    index: Number,
  },
  methods: {
    remove(){
      if(this.where == "queue") this.fromQueue()
      if(this.where == "playlist") this.fromPlaylist()
    },
    fromQueue(){
      this.$store.dispatch('sendAsRemoveFromQueue', {uri: this.uri, index: this.index})
    },
    fromPlaylist(){
      //
    }
  }
}
</script>