<template>
  <v-menu
    v-model="isOpen"
    :open-on-hover="hover"
    :open-delay="hover ? 250 : 0"
    transition="scale-transition"
    origin="top right"
    bottom
    left
  >
    <template #activator="{ on }">
      <v-fade-transition mode="out-in">
        <v-btn
          icon
          :small="!defualt"
          v-on="on"
          v-show="show"
        ><v-icon :color="white ? 'white' : 'black'">more_vert</v-icon>
        </v-btn>
      </v-fade-transition>
    </template>
    <v-alert
			class="mb-0 py-0 pr-0 pl-2"
			border="left"
			colored-border
			:color="themeColor"
		>
			<v-list shaped dense>
				<v-list-item
					v-for="(item, index) in funcList"
					:key="index"
					class="pl-2"
					@click="settingFunc(item.content)"
				>
					<v-list-item-title class="mr-4">
            <v-icon small class="mb-1 mr-3 ml-1">{{ item.icon }}</v-icon>
						<span>{{ item.text }}</span>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-alert>
  </v-menu>
</template>
<script>
const LIKE = { content: 'like', text: 'Like',  icon: 'fas fa-heart' }
const ADDLIST = { content: 'addList', text: 'Add to Playlist', icon: 'fas fa-plus' }
const REMOVEQUEUE = { content: 'removeQueue', text: 'Remove', icon: 'far fa-trash-alt' }
const REMOVELIST = { content: 'removeList', text: 'Remove', icon: 'far fa-trash-alt' }
const PLAYNEXT = { content: 'playNext', text: 'Play Next', icon: 'fas fa-play-circle' }
const PLAYNOW = { content: 'playNow', text: 'Play Now', icon: 'far fa-play-circle' }
const SKIP = { content: 'skip', text: 'skip', icon: 'fas fa-forward' }

export default {
  props: {
    show: Boolean,
    hover: Boolean,
    like: Boolean,
    addList: Boolean,
    removeQueue: Boolean,
    removeList: Boolean,
    playNext: Boolean,
    playNow: Boolean,
    skip: Boolean,
    songData: {
      type: Object,
      required: true
    },
    white: Boolean,
    playlistName: String,
    defualt: Boolean
  },
  data: () => ({
    themeColor: "pink lighten-2",
    funcList: [],
    isOpen: false
  }),
  mounted() {
    this.makeList();
  },
  watch: {
    isOpen: function(newVal) {
      this.$emit('isOpen', newVal)
    }
  },
  methods: {
    makeList() {
      if(this.like) this.funcList.push(LIKE)
      if(this.addList) this.funcList.push(ADDLIST)
      if(this.playNext) this.funcList.push(PLAYNEXT)
      if(this.playNow) this.funcList.push(PLAYNOW)
      if(this.skip) this.funcList.push(SKIP)
      if(this.removeQueue) this.funcList.push(REMOVEQUEUE)
      if(this.removeList) this.funcList.push(REMOVELIST)
    },
    settingFunc(content) {
      switch(content){
        case 'like':
          this._like(this.songData.uri)
          break
        case 'addList':
          this._addList(this.songData.uri)
          break
        case 'removeQueue':
          this._removeQueue(this.songData)
          break
        case 'playNext':
          this._playnext(this.songData.uri)
          break
        case 'playNow':
          this._playnow(this.songData.uri)
          break
        case 'removeList':
          if(this.playlistName) this._removeList(this.playlistName, this.songData.uri)
          break
        case 'skip':
          this._skip()
          break
      }
    },
    _like(uri) {
      this.$store.dispatch('sendAsLike', uri)
    },
    _addList(url) {
      //
    },
    _removeQueue(songData) {
      this.$store.dispatch('sendAsRemoveFromQueue', songData)
    },
    _playnext(uri) {
      this.$store.dispatch('sendAsQueueToHead', uri)
      // this.toaster(songData.title)
    },
    _playnow(uri) {
      this.$store.dispatch('sendAsPlay', uri)
      // this.toaster(songData.title)
    },
    _removeList(name, uri) {
      this.$store.dispatch('sendAsRemoveFromPlaylist', { playlistName: name, removeUri: uri })
      this.$store.dispatch('sendAsPlaylist', name)
    },
    _skip() {
      this.$store.dispatch('sendAsSkip')
    }
  }
}
</script>