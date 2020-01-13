<template>
  <v-dialog
    v-model="dialog"
    max-width="400px"
    @keydown.enter="input"
  >
    <v-card>
      <v-card-title class="font-weight-bold">
        <v-icon>fas fa-plus</v-icon>
        <span class="ml-3 font-weight-bold">New Playlist</span>
      </v-card-title>
      <v-divider class="mx-3"></v-divider>
      <v-card-text>
        <v-text-field
          class="mt-5"
          v-model="listname"
          :error="error"
          label="Title"
          counter
          maxlength="30"
          ref="field"
          :color="theme"
          @focus="focused"
          @blur="blured"
        ></v-text-field>
      </v-card-text>
      <v-divider class="mx-3"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Close</v-btn>
        <v-btn :color="theme" text @click="createPlaylist">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import toaster from '@/mixin/toast'

export default {
  mixins: [ toaster ],
  props: {
    show: Boolean,
    theme: String,
  },
  data: () => ({
    dialog: false,
    isFocus: false,
    error: false,
    listname: "",
  }),
  watch: {
    show: function(){
      this.dialog = true
    },
    dialog: function(val){
      if(!val) this.close()
    }
  },
  methods: {
    input() {
      if(this.isFocus)
        this.createPlaylist()
			else
        this.$refs.field.focus()
    },
    close() {
      this.listname = ""
			this.error = false
			this.dialog = false
    },
    createPlaylist() {
			if(this.listname == "")
        this.error = true
			else {
				this.$store.dispatch('sendAsNewplaylist', this.listname)
        this.toast(this.listname, {
          icon: "fas fa-plus-square",
          color: "orange darken-2"
        })
				this.close()
			}
    },
    focused() {
      this.isFocus = true
      this.$store.commit('removeEvents')
    },
    blured() {
      this.isFocus = false
      this.$store.commit('addEvents')
    }
  }
}
</script>