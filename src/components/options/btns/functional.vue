<template>
  <v-menu
    v-model="isOpen"
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
			:color="theme"
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
    <listSelector
      :show="dialog"
      :song="songData"
      :theme="theme"
    />
  </v-menu>
</template>
<script>
import listSelector from '@/components/options/playlistSelectDialog'
import toaster from '@/mixin/toast'

const LIKE = { content: 'like', text: 'Like',  icon: 'fas fa-heart' }
const ADDLIST = { content: 'addList', text: 'Add to Playlist', icon: 'fas fa-plus' }
const REMOVEQUEUE = { content: 'removeQueue', text: 'Remove', icon: 'far fa-trash-alt' }
const REMOVELIST = { content: 'removeList', text: 'Remove', icon: 'far fa-trash-alt' }
const PLAYNEXT = { content: 'playNext', text: 'Play Next', icon: 'fas fa-play-circle' }
const PLAYNOW = { content: 'playNow', text: 'Play Now', icon: 'far fa-play-circle' }
const SKIP = { content: 'skip', text: 'Skip', icon: 'fas fa-forward' }
const MOVETOTOP = { content: 'moveToTop', text: 'Move To Top', icon:'fas fa-arrow-up'}
// const INFO = { content: 'info', text: 'Info', icon: 'fas fa-info-circle' }

export default {
  mixins: [ toaster ],
  props: {
    show: Boolean,
    like: Boolean,
    addList: Boolean,
    removeQueue: Boolean,
    removeList: Boolean,
    playNext: Boolean,
    playNow: Boolean,
    skip: Boolean,
    moveToTop:Boolean,
    white: Boolean,
    defualt: Boolean,
    theme: String,
    index: Number,
    songData: {
      type: Object,
      required: true
    },
    playlistName: String,
  },
  data: () => ({
    funcList: [],
    isOpen: false,
    dialog: false,
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
      if(this.moveToTop) this.funcList.push(MOVETOTOP)
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
          this._removeQueue(this.songData.uri, this.index)
          break
        case 'playNext':
          this._playnext(this.songData)
          break
        case 'playNow':
          this._playnow(this.songData)
          break
        case 'removeList':
          if(this.playlistName) this._removeList(this.playlistName, this.songData.uri)
          break
        case 'skip':
          this._skip()
          break
        case 'moveToTop':
          this._moveToTop(this.songData, this.index)
          break
      }
    },
    _like(uri) {
      this.$store.dispatch('sendAsLike', uri)
    },
    _addList() {
      this.dialog = !this.dialog
    },
    _removeQueue(uri, index) {
      this.$store.dispatch('sendAsRemoveFromQueue', {uri: uri, index: index})
    },
    _playnext(data) {
      this.$store.dispatch('sendAsQueueToHead', data.uri)
      this.toast(data.title, { color: 'indigo darken-1' })
    },
    _playnow(data) {
      this.$store.dispatch('sendAsPlay', data.uri)
      this.toast(data.title, { color: 'blue darken-1' })
    },
    _removeList(name, uri) {
      this.$store.dispatch('sendAsRemoveFromPlaylist', { playlistName: name, removeUri: uri })
      this.$store.dispatch('sendAsPlaylist', name)
      this.$emit('afterRemoveList')
    },
    _skip() {
      this.$store.dispatch('sendAsSkip')
    },
    _moveToTop(data, index) {
      this.$store.dispatch('sendAsRemoveFromQueue', {uri: data.uri, index: index})
      this.$store.dispatch('sendAsQueueToHead', data.uri)
    }
  },
  components: {
    listSelector,
  }
}
</script>