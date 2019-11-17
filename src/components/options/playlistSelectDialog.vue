<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="500px"
  >
    <v-card>
      <v-card-title>Select Country</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <list
          
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import lists from '@/components/mappedPlaylist'

export default {
  props: {
    dialog: {
      type: Boolean,
      defualt: true
    }
  },
  computed: {
    thumb() {
      return require("@/assets/thinking-face.png")
    }
  },
  components: {

  }
}
</script>