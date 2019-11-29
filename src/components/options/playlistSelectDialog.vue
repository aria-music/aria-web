<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="400px"
  >
    <v-card>
      <v-card-title class="font-weight-bold">
        <span class="mr-2 font-weight-bold">Select Playlist</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <mappedList
          @added="addToPlaylist"
        />
      </v-card-text>
      <v-divider class="mb-5"></v-divider>
    </v-card>
  </v-dialog>
</template>
<script>
import mappedList from '@/components/mappedPlaylist'
import toaster from '@/mixin/toast'

export default {
  mixins: [ toaster ],
  props: {
    show: Boolean,
    song: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialog: false
  }),
  watch: {
    show: function(){
      setTimeout(() => {
        this.dialog = true
      }, 0);
    }
  },
  methods: {
    addToPlaylist(name){
      this.$store.dispatch('sendAsAddToPlaylist', {
        listname: name,
        addedUri: this.song.uri
      })

      this.toast(name, {
        icon: "fas fa-arrow-alt-circle-up",
        color: "orange darken-2"
      })
      setTimeout(() => {
        this.toast(this.song.title, {
          color: "orange darken-2"
        })
      }, 300);

      this.close()
    },
    close() {
      this.dialog = false
    }
  },
  components: {
    mappedList
  }
}
</script>