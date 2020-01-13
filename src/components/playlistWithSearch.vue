<template>
  <div>
    <searchBox
      :theme="theme"
      @setSearchValue="sortPlaylist"
    />
    <playlist
      :theme="theme"
      :size="size"
      :playlistName="playlistName"
      :listContents="playlistContents"
      :isContentsExist="isContentsExist"
    />
  </div>
</template>
<script>
import playlist from '@/components/options/queue/playlist'
import searchBox from '@/components/options/searchBox'

export default {
  components: {
    playlist,
    searchBox
  },
  props: {
    theme: String,
    size: Object,
    playlistName: String
  },
  computed: {
    isContentsExist() {
      return this.playlistContents.length > 0
    },
    thumbnail() {
      const list = this.playlistContents.slice()
      if(!list.length) return ""

      const index = list.findIndex(entry => entry.thumbnail != "")
      return list[index].thumbnail
    },
  },
  data: () => ({
    playlistContents: [],
    cacheList: []
  }),
  methods: {
    sortPlaylist(searchValue) {
      this.playlistContents = this.cacheList.filter(value => {
        return value.title.toLowerCase().indexOf(searchValue) !== -1
      })
    },
    setListContents() {
      const entries = this.$store.state.focusedPlaylist.entries
      this.playlistContents = this.cacheList = entries ? entries.slice() : []
    },
  },
  mounted() {
    this.setListContents()
    this.$emit('thumb', this.thumbnail)
  }
}
</script>