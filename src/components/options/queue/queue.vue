<template>
  <v-list
    :max-height="maxHeight"
    :min-height="200"
    :max-width="width"
    style="overflow: auto"
    class="py-0 queue"
    dense
  >
    <v-list-item-group>
      <v-fade-transition group>
        <v-list-item
          v-for="(item, index) in queue"
          :key="index"
          :ripple="false"
          class="pa-0"
        >
          <v-hover #default="{ hover }">
            <v-row
              dense
              class="ma-0"
              style="height: 40px"
              :style="{width: `${width-1}px`}"
            >

              <!-- thumnail -->
              <v-col
                :cols="2"
                class="py-0 d-flex align-center justify-start"
              >
                <v-img
                  :src="item.thumbnail_small"
                  eager
                  :height="imgHeight"
                  :max-width="imgWidth"
                  contain
                  @error.prevent
                ></v-img>
              </v-col>

              <!-- title -->
              <v-col
                :cols="$vuetify.breakpoint.smAndUp ? 6 : 10"
                class="py-0 my-auto"
                :title="item.title"
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

              <!-- btns -->
              <v-col
                :cols="4"
                class="py-0 d-flex align-center"
                v-if="$vuetify.breakpoint.smAndUp"
              >
                <!-- love btn -->
                <lovebtn
                  v-show="hover"
                  small
                  :uri="item.uri"
                  :isLoved="false"
                />
                  <!-- v-show="item.is_liked || hover"
                  :isLoved="item.is_liked" -->

                <div v-show="hover">
                  <!-- delete btn -->
                  <deletebtn
                    small
                    where="queue"
                    :uri="item.uri"
                    :index="index"
                  />

                  <!-- info btn -->
                  <infobtn
                    small
                  />
                </div>
              </v-col>
            </v-row>
          </v-hover>
        </v-list-item>
      </v-fade-transition>
    </v-list-item-group>
  </v-list>
</template>
<script>
import { mapState } from 'vuex'
import lovebtn from '../btns/love'
import deletebtn from '../btns/delete'
import infobtn from '../btns/info'

export default {
  props: {
    maxHeight: {
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
    }
  },
  components: {
    lovebtn,
    deletebtn,
    infobtn,
  },
  computed: {
    ...mapState(["queue"]),
  },
}
</script>
<style lang="scss" scoped>
.queue {
  &::-webkit-scrollbar {
    overflow:hidden;
    width:1px;
    background:#fafafa;

    &:horizontal {
      height:1px;
    }
  }

  &::-webkit-scrollbar-button {
    display:none;
  }

  &::-webkit-scrollbar-piece {
    background:#eee;
    &:start {
      background:#eee;
    }
  }

  &::-webkit-scrollbar-thumb {
    background:#333;
  }

  &::-webkit-scrollbar-corner {
    background:#333;
  }
}
</style>