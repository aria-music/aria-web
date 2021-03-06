<template>
  <v-list
    :height="queueHeight"
    :max-width="width"
    style="overflow: auto"
    class="py-0"
    dense
  >
    <perfect-scrollbar>
      <v-list-item-group>
        <v-list-item
          v-for="(item, index) in queue"
          :key="index"
          :ripple="false"
          class="pa-0"
          style="width: 99%"
        >
          <v-fade-transition>
            <v-lazy
              style="width: 100%"
              min-height="40"
              :options="{threshold: .3}"
            >
              <v-hover #default="{ hover }">
                <v-row
                  dense
                  class="ma-0"
                  style="height: 40px"
                >
                  <!-- thumnail -->
                  <v-col
                    :cols="2"
                    class="py-0 d-flex align-center justify-start"
                  >
                    <imgObj
                      :src="item.thumbnail_small"
                      :height="imgHeight"
                      :maxWidth="imgWidth"
                      contain
                      eager
                    />
                  </v-col>
                  <!-- title -->
                  <v-col
                    :cols="isSmAndUp ? 6 : 10"
                    class="py-0 my-auto"
                    :title="item.title"
                  >
                    <v-list-item-content class="py-0">
                      <v-list-item-title
                        v-text="item.entry ? item.entry.title : item.title"
                        class="text-truncate text-left"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.entry ? item.entry.artist : ''"
                        class="text-truncate text-left"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-col>
                  <!-- btns -->
                  <v-col
                    :cols="4"
                    class="py-0 d-flex align-center"
                    v-if="isSmAndUp"
                  >
                    <!-- love btn -->
                    <lovebtn
                      class="ml-2"
                      v-show="item.is_liked || hover"
                      small
                      :uri="item.uri"
                      :isLoved="item.is_liked"
                    />
                    <div v-show="hover">
                      <!-- delete btn -->
                      <deletebtn
                        class="mx-3"
                        small
                        where="queue"
                        :uri="item.uri"
                        :index="index"
                      />
                      <!-- info btn -->
                      <infobtn
                        :theme="theme"
                        :songData="item"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-hover>
            </v-lazy>
          </v-fade-transition>
        </v-list-item>
      </v-list-item-group>
    </perfect-scrollbar>
  </v-list>
</template>
<script>
import { mapState } from 'vuex'
import lovebtn from '../btns/love'
import deletebtn from '../btns/delete'
import infobtn from '../btns/info'
import imgObj from '../imgObject'
import { isSmAndUp } from '@/mixin/breakpoint'

export default {
  mixins: [ isSmAndUp ],
  props: {
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      default: 500,
    },
    imgHeight: {
      type: Number,
      default: 35
    },
    imgWidth: {
      type: Number,
      default: 70
    },
    theme: String
  },
  computed: {
    ...mapState(["queue"]),
    queueHeight() {
      return (this.height - 150) / 2
    }
  },
  components: {
    lovebtn,
    deletebtn,
    infobtn,
    imgObj
  }
}
</script>
