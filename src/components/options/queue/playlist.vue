<template>
  <v-card
    max-height="100%"
    class="pl-2"
    :color="theme"
  >
    <v-card max-height="100%">
      <!-- -201... -->
      <v-list
        v-if="isContentsExist"
        :height="size.height - 201"
        class="scroller"
        style="overflow: auto"
      >
        <v-list-item-group>
          <v-fade-transition group>
            <v-list-item
              v-for="(item, index) in listContents"
              :key="index"
              :ripple="false"
              class="pa-0"
            >
              <v-tooltip
                v-if="index < lazy"
                top
                :open-delay="800"
                :color="theme"
              >
                <template #activator="{ on }">
                  <v-hover #default="{ hover }">
                    <div
                      class="ma-0 pa-0"
                      style="width: 100%"
                    >
                      <v-row
                        no-gutters
                        class="ma-0"
                        style="height: 50px; width: 100%;"
                        align="center"
                        v-on="on"
                      >
                        <v-col :cols="isXs ? 2 : 1">
                          <v-img
                            :src="replaceSrc(item.thumbnail_small)"
                            :aspect-ratio="1"
                            height="45"
                            contain
                            class="ml-1"
                          ></v-img>
                        </v-col>
                        <v-col :cols="isXs ? 9 : 10" class="px-3">
                          <div class="text-truncate font-weight-medium">
                            {{item.title}}
                          </div>
                        </v-col>
                        <v-col cols="1">
                          <funcbtn
                            :songData="item"
                            :playlistName="playlistName"
                            :show="hover || isXs"
                            playNext
                            playNow
                            removeList
                            :white="isDark"
                            :theme="theme"
                          />
                        </v-col>
                      </v-row>
                      <v-divider></v-divider>
                    </div>
                  </v-hover>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>
            </v-list-item>
          </v-fade-transition>
        </v-list-item-group>
      </v-list>
      <div
        v-else
        class="py-5 text-center headline font-weight-bold"
      >No Tracks : )</div>
    </v-card>
  </v-card>
</template>
<script>
import funcbtn from '../btns/functional'
import lazy from '@/mixin/lazy'

export default {
  mixins: [ lazy ],
  props: {
    // contents: {
    //   type: Array,
    //   default: () => []
    // },
    theme: String,
    size: Object,
    playlistName: String
  },
  watch: {
    hover: function(){
      this.$emit()
    }
  },
  computed: {
    listContents() {
      const entries = this.$store.state.focusedPlaylist.entries
      return entries ? entries.slice() : []
    },
    isXs() {
      return this.$vuetify.breakpoint.xs
    },
    isContentsExist() {
      return this.listContents.length > 0
    },
    isDark() {
      return this.$vuetify.theme.dark
    },
    thumbnail() {
      if(!this.listContents.length) return ""

      let i = 0
      const list = this.listContents.slice()

      while(list[i].thumbnail == ""){
        i++
        if(list[i].thumbnail == "undefined") break
      }
      return list[i].thumbnail
    },
  },
  methods: {
    replaceSrc (thumb) {
      return thumb ? thumb : require('@/assets/thinking-face.png')
    },
  },
  mounted() {
    this.lazyload(this.listContents)
    this.$emit('thumb', this.thumbnail)
  },
  components: {
    funcbtn
  }
}
</script>
<style lang="scss" src="@/components/options/scss/scroller.scss">