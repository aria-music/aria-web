<template>
  <v-card
    class="pl-2"
    :color="theme"
  >
    <v-card>
      <v-list
        v-if="isContentsExist"
        :height="height"
        style="overflow: auto"
      >
      <perfect-scrollbar>
        <v-list-item-group>
          <v-fade-transition group>
            <v-list-item
              v-for="(item, index) in listContents"
              :key="index"
              :ripple="false"
              style="width: 99%"
              class="pa-0"
              inactive
            >
              <v-lazy
                style="width: 100%; cursor: pointer"
                min-height="50"
                :options="{threshold: .3}"
              >
                <v-tooltip
                  top
                  :open-delay="800"
                  :color="theme"
                >
                  <template #activator="{ on }">
                    <v-hover #default="{ hover }">
                      <div
                        class="ma-0 pa-0"
                      >
                        <v-row
                          no-gutters
                          class="ma-0"
                          style="height: 50px"
                          align="center"
                          v-on="on"
                        >
                          <v-col :cols="isXs ? 2 : 1">
                            <imgObj
                              :src="isXs ? item.thumbnail_small : item.thumbnail"
                              :height="45"
                              contain
                              class="ml-1"
                            />
                          </v-col>
                          <v-col
                            :cols="isXs ? 9 : 10"
                            class="px-3"
                            @click="play(item)"
                          >
                            <div class="text-truncate font-weight-medium">
                              {{item.title}}
                            </div>
                          </v-col>
                          <v-col cols="1">
                            <funcbtn
                              :songData="item"
                              :playlistName="playlistName"
                              :show="hover || isXs"
                              :white="isDark"
                              :theme="theme"
                              playNext
                              playNow
                              removeList
                              addList
                              @afterRemoveList="afterRemoveList"
                            />
                          </v-col>
                        </v-row>
                        <v-divider></v-divider>
                      </div>
                    </v-hover>
                  </template>
                  <span>{{ item.title }}</span>
                </v-tooltip>
              </v-lazy>
            </v-list-item>
          </v-fade-transition>
        </v-list-item-group>
        </perfect-scrollbar>
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
import imgObj from '../imgObject'
import toaster from '@/mixin/toast'
import { isXs } from '@/mixin/breakpoint'

export default {
  mixins: [ isXs, toaster ],
  props: {
    theme: String,
    size: Object,
    playlistName: String,
    listContents: Array,
    isContentsExist: Boolean,
  },
  data: () => ({
    contents: [],
  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.dark
    },
    height() {
      return this.size.height - 145
    }
  },
  methods: {
    play(item) {
      this.$store.dispatch("sendAsQueue", item.uri)
      this.toast(item.title, { color: "pink derken-1" })
    },
    fetchContents() {
      this.$store.dispatch('sendAsPlaylist', this.playlistName)
    },
    afterRemoveList() {
      this.fetchContents()
    }
  },
  components: {
    funcbtn,
    imgObj
  }
}
</script>
