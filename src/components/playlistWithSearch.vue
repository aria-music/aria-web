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
    entries() {
      return this.$store.state.focusedPlaylist.entries
    },
    isContentsExist() {
      return this.playlistContents.length > 0
    },
    thumbnail() {
      const list = this.playlistContents.slice()
      if(!list.length) return ""

      const index = list.findIndex(entry => entry.thumbnail != "")
      return list[index].thumbnail
    }
  },
  watch: {
    entries: function() {
      this.setListContents()
      this.$emit('thumb', this.thumbnail)
    }
  },
  data: () => ({
    playlistContents: [],
    cacheList: []
  }),
  methods: {
    sortPlaylist(searchValue) {
      this.playlistContents = this.cacheList.filter(value => {
        return value.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      })
    },
    setListContents() {
      this.playlistContents = this.cacheList = this.entries ? this.entries.slice() : []
    },
  },
  mounted() {
    this.setListContents()
    this.$emit('thumb', this.thumbnail)
  }
}
</script>