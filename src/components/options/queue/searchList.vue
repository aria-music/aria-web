<template>
  <div>
    <v-card class="mx-2">
      <v-list
        :height="height"
        style="overflow: auto"
        flat
      >
        <perfect-scrollbar id="search-result">
          <v-list-item-group>
            <v-fade-transition group>
              <v-list-item
                v-for="(item, index) in searchResult"
                :key="index"
                :ripple="false"
                class="mr-3 px-0"
              >
                <v-lazy
                  style="width: 100%"
                  :options="{threshold: .3}"
                >
                  <v-hover #default="{ hover }">
                    <div>
                      <v-row dense>
                        <!-- thumnail -->
                        <v-col
                          @click="play(item)"
                          :cols="11"
                          class="py-0 d-flex align-center"
                        >
                          <div
                            class="mr-2"
                            style="width: 70px"
                          >
                            <imgObj
                              :src="item.thumbnail_small"
                              :height="45"
                              :maxWidth="70"
                              eager
                              contain
                            />
                          </div>
                          <!-- title -->
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
                        <v-col
                          :cols="1"
                          class="my-auto"
                        >
                          <funcbtn
                            :show="hover"
                            :theme="theme"
                            :songData="item"
                            :white="isDark"
                            playNext
                            playNow
                            addList
                          />
                        </v-col>
                      </v-row>
                      <v-divider></v-divider>
                    </div>
                  </v-hover>
                </v-lazy>
              </v-list-item>
            </v-fade-transition>
          </v-list-item-group>
        </perfect-scrollbar>
      </v-list>
    </v-card>

    <v-card max-width="400px" class="mx-auto my-2">
      <v-pagination
        v-model="page"
        :length="10"
        :color="theme"
        total-visible="7"
      ></v-pagination>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import imgObj from '../imgObject'
import toaster from '@/mixin/toast'
import funcbtn from '../btns/functional'

export default {
  mixins: [ toaster ],
  props: {
    theme: String,
    height: Number,
    provider: String,
  },
  data: () => ({
    page: 1,
    searchResult: []
  }),
  watch: {
    provider: function(newProvider) {
      this.sort(newProvider)
    },
    searchData: function() {
      this.review()
    }
  },
  computed: {
    ...mapState(["searchData"]),
    isDark() {
      return this.$vuetify.theme.dark
    },
  },
  methods: {
    play(item) {
      this.$store.dispatch("sendAsQueue", item.uri)
      this.toast(item.title, { color: "teal derken-1" })
    },
    review() {
      this.searchResult = []
      setTimeout(() => {
        this.sort()
      }, 0)
    },
    sort(provider = ""){
      this.searchResult = JSON.parse(JSON.stringify(this.sortBy(provider)))
    },
    sortBy(provider) {
      document.querySelector('#search-result').scrollTop = 0
      if(provider){
        return this.searchData.filter(value => {
          return value.source == provider.toLowerCase()
        })
      }else{
        return this.searchData
      }
    }
  },
  components: {
    imgObj,
    funcbtn
  }
}
</script>
