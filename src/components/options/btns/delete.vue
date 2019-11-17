<template>
  <v-btn
    icon
    text
    @click="checkDialog"
  >
    <v-icon
      :small="small"
    >delete</v-icon>
    <v-dialog
      v-model="show"
      max-width="450"
    >
      <v-card
        class="px-2"
        :color="theme"
      >
        <v-card
          flat
          class="pa-2"
        >
          <div class="d-flex flex-column">
            <div class="d-flex justify-space-between">
              <v-icon
                class="mr-3"
                large
                color="error"
              >fas fa-exclamation-triangle</v-icon>
              <span class="title">Are you sure to delete this playlist <strong>{{ listname }}</strong> ?</span>
            </div>
            <div class="d-flex justify-end mt-5">
              <v-btn
                color="error"
                @click="remove"
              ><span>YES</span></v-btn>
              <v-btn
                class="ml-5"
                @click="show = false"
              ><span>NO</span></v-btn>
            </div>
          </div>
        </v-card>
      </v-card>
    </v-dialog>
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
    uri: String,
    index: Number,
    listname: String,
    dialog: Boolean,
    theme: String
  },
  methods: {
    checkDialog() {
      if(this.dialog){
        this.show = true
        return
      }
      this.remove()
    },
    remove(){
      switch(this.where) {
        case "queue":
          this.fromQueue()
          break
        case "playlistContents":
          this.fromPlaylist()
          break
        case "playlist":
          this.playlist()
          break
      }
    },
    fromQueue() {
      this.$store.dispatch('sendAsRemoveFromQueue', {uri: this.uri, index: this.index})
    },
    fromPlaylist() {
      this.$store.dispatch('sendAsRemoveFromPlaylist',  {playlistName: this.listname, removeUri: this.uri})
    },
    playlist() {
      this.$store.dispatch('sendAsDeletePlaylist', this.listname)
      this.$router.push({name: 'playlist-view'})
    }
  },
  data: () => ({
    show: false,
  })
}
</script>