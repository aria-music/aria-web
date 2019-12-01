<template>
  <v-card
    style="overflow: auto"
    :height="size.height - 277"
  >
    <draggable
      v-model="queue"
      handle=".handle"
      ghost-class="ghost"
    >
      <div
        v-for="(item, index) in queue"
        :key="index"
        class="ma-0 pa-0"
      >
        <v-lazy
          style="width: 100%"
          min-height="50"
          :options="{threshold: .3}"
        >
          <v-fade-transition mode="out-in">
            <v-hover v-slot="{ hover }">
              <div>
                <v-row
                  no-gutters
                  align="center"
                  class="ma-0"
                  style="height: 50px"
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
                  <v-col :cols="isXs ? 8 : 9" class="px-3">
                    <div class="text-truncate font-weight-medium">
                      {{item.title}}
                    </div>
                  </v-col>
                  <v-col cols="1">
                    <funcbtn
                      :songData="item"
                      :show="hover || isXs"
                      :white="isDark"
                      :theme="theme"
                      :index='index'
                      like
                      addList
                      removeQueue
                    />
                  </v-col>
                  <v-col cols="1">
                    <v-fade-transition>
                      <v-btn
                        icon
                        v-show="hover || isXs"
                        class="handle"
                      >
                        <v-icon small>fas fa-bars</v-icon>
                      </v-btn>
                    </v-fade-transition>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </div>
            </v-hover>
          </v-fade-transition>
        </v-lazy>
      </div>
    </draggable>
  </v-card>
</template>
<script>
import draggable from 'vuedraggable'
import funcbtn from '../btns/functional'
import thumb from '@/mixin/thumbnail'
import { isXs } from '@/mixin/breakpoint'

export default {
  mixins: [ thumb, isXs ],
  props: {
    theme: String,
    size: Object
  },
  computed: {
    queue: {
      get() {
        return this.$store.state.queue
      },
      set(queue) {
        this.$store.commit('changeQueue', queue)
        this.$store.dispatch('sendAsEditedQueue', queue.map(val => val.uri))
      }
    },
    isDark() {
      return this.$vuetify.theme.dark
    },
  },
  components: {
    draggable,
    funcbtn
  }
}
</script>
<style lang="scss" src="@/components/options/scss/scroller.scss">
