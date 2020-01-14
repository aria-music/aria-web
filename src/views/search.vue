<template>
  <div
    style="max-width: 750px;"
    class="mx-auto"
  >
    <v-card
      class="pl-2 pt-2 mb-5"
      :color="theme"
    >
      <v-card>
        <v-list
          class="pb-0"
          two-line
          subheader
        >
          <v-list-item>
            <v-list-item-avatar
              style="margin-right: 10px; padding-bottom: 26px;"
            >
              <v-icon size="32">fas fa-search</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="pt-3 pb-0">
              <v-list-item-title
                class="headline font-weight-bold text-truncate"
                v-text="searchQuery"
              ></v-list-item-title>
              <v-list-item-subtitle>
                <v-chip-group
                  :active-class="theme"
                  v-model="focusedChip"
                >
                  <v-chip
                    v-for="(chip, index) in tags"
                    :key="index"
                    :value="chip.tag"
                    small
                  >
                    <v-icon
                      class="mr-2"
                      small
                    >{{ chip.icon }}</v-icon>
                    <span>{{ chip.tag }}</span>
                  </v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-card>
    <v-card
      class="pl-2"
      :color="theme"
    >
      <v-card
        class="pt-2"
        :height="height"
      >
        <searchList
          :theme="theme"
          :provider="focusedChip"
          :height="height - 70"
        />
      </v-card>
    </v-card>
  </div>
</template>
<script>
import searchList from '@/components/options/queue/searchList'

const tags = [
  {tag: "Youtube", icon: "fab fa-youtube"},
  {tag: "GPM", icon: "fab fa-google-play"},
  {tag: "Playlist", icon: "fas fa-list"},
]

export default {
  components: {
    searchList
  },
  props: {
    theme: String,
    size: Object
  },
  data: () => ({
    tags,
    focusedChip: ""
  }),
  watch: {
    searchQuery: function(query){
      this.search(query)
    }
  },
  computed: {
    searchQuery() {
      return decodeURIComponent(this.$route.params.item)
    },
    height() {
      return this.size.height - 120
    },
  },
  methods: {
    search(query) {
      this.$store.dispatch('sendAsSearch', {text: query, provider: 'gpm'})
    },
  },
  mounted() {
    this.search(this.searchQuery)
  }
}
</script>