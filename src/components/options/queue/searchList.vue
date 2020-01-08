<template>
  <div>
    <v-list
      :max-height="maxHeight"
      :max-width="maxWidth"
      style="overflow: auto"
    >
      <perfect-scrollbar>
        <v-list-item-group>
          <v-fade-transition group>
            <v-list-item
              v-for="(item, index) in searchData"
              :key="index"
              :ripple="false"
            >
              <v-lazy
                style="width: 100%"
                min-height="50"
                :options="{threshold: .3}"
              >
                <v-row dense>
                  <!-- thumnail -->
                  <v-col
                    :cols="2"
                    class="py-0 d-flex align-center"
                  >
                    <imgObj
                      :src="item.thumbnail_small"
                      :height="45"
                      :maxWidth="70"
                      eager
                      contain
                    />
                  </v-col>
                  <!-- title -->
                  <v-col
                    :cols="6"
                  >
                    <v-list-item-content class="py-0">
                      <v-list-item-title
                        v-text="item.entry ? item.entry.title : item.title"
                        class="text-truncate"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.entry ? item.entry.artist : ''"
                        class="text-truncate"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-col>
                  <!-- <v-col cols="">

                  </v-col> -->
                </v-row>
              </v-lazy>
            </v-list-item>
          </v-fade-transition>
        </v-list-item-group>
      </perfect-scrollbar>
    </v-list>
    <v-pagination
      v-model="page"
      :length="10"
      :color="theme"
      total-visible="7"
    ></v-pagination>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import imgObj from '../imgObject'
import toaster from '@/mixin/toast'

export default {
  mixins: [ toaster ],
  props: {
    theme: String,
    maxHeight: Number,
    maxWidth: Number
  },
  data: () => ({
    page: 1,
  }),
  computed: {
    ...mapState(["searchData"]),
  },
  methods: {
    play(item) {
      this.$store.dispatch("sendAsQueue", item.uri)
      this.toast(item.title, { color: "teal derken-1" })
    }
  },
  components: {
    imgObj
  }
}
</script>
