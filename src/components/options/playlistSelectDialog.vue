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
         
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text>Close</v-btn>
        <v-btn color="blue darken-1" text>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import mappedList from '@/components/mappedPlaylist'

export default {
  props: {
    show: Boolean
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
  components: {
    mappedList
  }
}
</script>