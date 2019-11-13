<template>
  <v-card
    max-height="100%"
    class="pl-2"
    :color="theme"
  >
    <v-card
      max-height="100%"
    >
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
              v-for="(item, index) in contents"
              :key="index"
              :ripple="false"
              class="pa-0"
            >
              <v-tooltip
                top
                :open-delay="800"
                :color="theme"
              >
                <template #activator="{ on }">
                  <v-row
                    no-gutters
                    class="ma-0"
                    style="height: 50px; width: 100%;"
                    align="center"
                    v-on="on"
                  >
                    <v-col :cols="isXs ? 2 : 1">
                      <v-img
                        :src="item.thumbnail_small"
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
                        show
                        playNext
                        playNow
                        removeList
                        :white="isDark"
                      />
                    </v-col>
                  </v-row>
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
import funcbtn from '../btns/fuctional'

export default {
  props: {
    contents: {
      type: Array,
      default: () => []
    },
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
    isXs() {
      return this.$vuetify.breakpoint.xs
    },
    isContentsExist() {
      return this.contents.length > 0
    },
    isDark() {
      return this.$vuetify.theme.dark
    }
  },
  components: {
    funcbtn
  }
}
</script>
<style lang="scss" src="@/components/options/scss/scroller.scss">